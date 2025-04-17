from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel  # Add this import
from pydantic.networks import EmailStr
from typing import Optional
from app.api.deps import get_current_active_superuser
from app.models import Message
from app.utils import generate_test_email, send_email, render_email_template
from app.core.config import settings
import logging
from datetime import datetime

import uuid

router = APIRouter()

logger = logging.getLogger(__name__)


@router.post(
    "/test-email/",
    dependencies=[Depends(get_current_active_superuser)],
    status_code=201,
)
def test_email(email_to: EmailStr) -> Message:
    """
    Test emails.
    """
    email_data = generate_test_email(email_to=email_to)
    send_email(
        email_to=email_to,
        subject=email_data.subject,
        html_content=email_data.html_content,
    )
    return Message(message="Test email sent")
class EmailRequest(BaseModel):
    email_to: EmailStr
    subject: str
    html_content: str

@router.post("/send-email/", status_code=201)
async def send_email_route(request: EmailRequest):
    """
    Send an email with the provided details (e.g., user submission to admin).
    """
    logger.info(f"Sending email to {request.email_to}")
    try:
        success = send_email(
            email_to=request.email_to,
            subject=request.subject,
            html_content=request.html_content
        )
        if not success:
            logger.error("Failed to send email")
            raise HTTPException(status_code=500, detail="Failed to send email")
        logger.info("Email sent successfully")
        return {"status": "email sent"}
    except Exception as e:
        logger.error(f"Email send error: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Email send error: {str(e)}")
    
@router.get("/health-check/")
async def health_check() -> bool:
    return True


# Pydantic model for privacy request form
class PrivacyRequestForm(BaseModel):
    full_name: str
    email: EmailStr
    phone_number: Optional[str] = None
    account_id: Optional[str] = None
    request_type: str
    verification_method: str
    additional_details: Optional[str] = None
    # Fields for specific request types
    correction_details: Optional[str] = None
    deletion_reason: Optional[str] = None
    deletion_details: Optional[str] = None

@router.post("/privacy-request/", status_code=201)
async def submit_privacy_request(form_data: PrivacyRequestForm) -> Message:
    """
    Submit a data privacy request and send notification emails.
    """
    try:
        logger.info(f"Processing privacy request from {form_data.email} for {form_data.request_type}")
        
        # Generate request reference ID
        request_ref = f"PRV-{uuid.uuid4().hex[:8].upper()}"
        logger.info(f"Generated reference ID: {request_ref}")
        
        # Create a simpler, more reliable implementation
        
        # Store basic request details (you can expand this later)
        request_info = {
            "ref_id": request_ref,
            "timestamp": datetime.now().isoformat(),
            "full_name": form_data.full_name,
            "email": form_data.email,
            "request_type": form_data.request_type,
            "status": "received"
        }
        
        # Log the request details
        logger.info(f"Privacy request details: {request_info}")
        
        # Send a simple confirmation email to the user
        try:
            confirmation_email_sent = send_email(
                email_to=form_data.email,
                subject=f"Your Privacy Request #{request_ref} Has Been Received",
                html_content=f"""
                <html>
                <body>
                    <h1>Privacy Request Confirmation</h1>
                    <p>Dear {form_data.full_name},</p>
                    <p>Thank you for submitting your privacy request. We have received your request and will process it in accordance with applicable data protection regulations.</p>
                    <p>Your request reference number is: <strong>{request_ref}</strong></p>
                    <p>Please keep this number for future reference.</p>
                    <p>Our Data Protection team will review your request and may contact you for additional information if needed. We aim to respond to all privacy requests within 30 days.</p>
                    <p>Best regards,<br>The Data Protection Team<br>luxury verse</p>
                </body>
                </html>
                """
            )
            
            if confirmation_email_sent:
                logger.info(f"Confirmation email sent to {form_data.email}")
            else:
                logger.warning(f"Failed to send confirmation email to {form_data.email}")
        except Exception as email_error:
            logger.error(f"Error sending confirmation email: {str(email_error)}")
            # Continue processing even if email fails
        
        # Send notification to the privacy team (with error handling)
        try:
            # Create a readable request type description
            request_type_readable = {
                "access": "Access to Personal Data",
                "rectification": "Correction of Personal Data",
                "erasure": "Deletion of Personal Data",
                "restriction": "Restriction of Processing",
                "portability": "Data Portability",
                "objection": "Objection to Processing",
                "consent": "Withdrawal of Consent",
                "other": "Other Privacy-Related Request"
            }.get(form_data.request_type, form_data.request_type)
            
            # Include specific details based on request type
            specific_details = ""
            if form_data.request_type == "rectification" and form_data.correction_details:
                specific_details = f"<h3>Correction Details:</h3><p>{form_data.correction_details}</p>"
            elif form_data.request_type == "erasure":
                deletion_reason_text = "Not specified"
                if form_data.deletion_reason == "1":
                    deletion_reason_text = "No longer wishes to use services"
                elif form_data.deletion_reason == "2":
                    deletion_reason_text = "Concerned about privacy"
                elif form_data.deletion_reason == "3":
                    deletion_reason_text = "Did not authorize data collection"
                elif form_data.deletion_reason == "4":
                    deletion_reason_text = "Other reason"
                
                specific_details = f"<h3>Deletion Reason:</h3><p>{deletion_reason_text}</p>"
                if form_data.deletion_details:
                    specific_details += f"<h3>Additional Details:</h3><p>{form_data.deletion_details}</p>"
            
            team_notification_sent = send_email(
                email_to="privacy@iconluxury.shop",
                subject=f"New Privacy Request: {request_type_readable} - #{request_ref}",
                html_content=f"""
                <html>
                <body>
                    <h1>New Privacy Request</h1>
                    <p><strong>{request_type_readable} Request - #{request_ref}</strong></p>
                    
                    <h2>Requestor Information</h2>
                    <p><strong>Name:</strong> {form_data.full_name}</p>
                    <p><strong>Email:</strong> {form_data.email}</p>
                    <p><strong>Phone:</strong> {form_data.phone_number or "Not provided"}</p>
                    <p><strong>Account ID:</strong> {form_data.account_id or "Not provided"}</p>
                    <p><strong>Verification Method:</strong> {form_data.verification_method}</p>
                    
                    <h2>Request Details</h2>
                    {specific_details}
                    
                    <p><strong>Additional Information:</strong> {form_data.additional_details or "None provided"}</p>
                    
                    <p>Please process this request according to our privacy request procedures.</p>
                </body>
                </html>
                """
            )
            
            if team_notification_sent:
                logger.info("Team notification email sent successfully")
            else:
                logger.warning("Failed to send team notification email")
        except Exception as team_email_error:
            logger.error(f"Error sending team notification email: {str(team_email_error)}")
            # Continue processing even if email fails
        
        # Return success response to the user
        return Message(message=f"Privacy request {request_ref} submitted successfully. We will respond within 30 days.")

    except Exception as e:
        logger.exception(f"Error processing privacy request: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail="An error occurred while processing your privacy request"
        )
