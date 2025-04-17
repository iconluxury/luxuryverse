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

# Pydantic model for demo request form
class DemoRequestForm(BaseModel):
    first_name: str
    last_name: str
    business_email: EmailStr
    phone_number: str
    company_name: str
    job_title: str
    primary_use_case: str
    other_use_case: Optional[str] = None
    additional_requirements: Optional[str] = None
    preferred_demo_datetime: Optional[str] = None

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

@router.post("/demo-request/", status_code=201)
async def submit_demo_request(form_data: DemoRequestForm) -> Message:
    """
    Submit a demo request and send notification email.
    """
    try:
        # Prepare email context with all form data
        email_context = {
            "first_name": form_data.first_name,
            "last_name": form_data.last_name,
            "business_email": form_data.business_email,
            "phone_number": form_data.phone_number,
            "company_name": form_data.company_name,
            "job_title": form_data.job_title,
            "primary_use_case": form_data.primary_use_case,
            "other_use_case": form_data.other_use_case,
            "additional_requirements": form_data.additional_requirements,
            "preferred_demo_datetime": form_data.preferred_demo_datetime
        }

        # Render email content
        html_content = render_email_template(
            template_name="demo_request.html",
            context=email_context
        )

        # Send email and check the return value
        email_success = send_email(
            email_to="form_submission@iconluxury.shop",
            subject=f"New Demo Request from {form_data.company_name}",
            html_content=html_content
        )
        
        # If email failed, raise an exception instead of returning success
        if not email_success:
            logger.error("Demo request email notification failed")
            raise HTTPException(
                status_code=500,
                detail="Failed to submit demo request due to notification error"
            )

        return Message(message="Demo request submitted successfully")

    except Exception as e:
        logger.error(f"Error processing demo request: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail="An error occurred while processing your demo request"
        )

# Pydantic model for contact sales form
class ContactSalesForm(BaseModel):
    first_name: str
    last_name: str
    business_email: EmailStr
    phone_number: str
    company_name: str
    job_title: str
    business_size: str
    budget_range: str
    primary_interest: str
    project_timeline: Optional[str] = None
    requirements: Optional[str] = None
    contact_preference: Optional[str] = None

@router.post("/contact-sales/", status_code=201)
async def submit_contact_sales(form_data: ContactSalesForm) -> Message:
    """
    Submit a sales contact request and send notification email.
    """
    try:
        # Prepare email context with all form data
        email_context = {
            "first_name": form_data.first_name,
            "last_name": form_data.last_name,
            "business_email": form_data.business_email,
            "phone_number": form_data.phone_number,
            "company_name": form_data.company_name,
            "job_title": form_data.job_title,
            "business_size": form_data.business_size,
            "budget_range": form_data.budget_range,
            "primary_interest": form_data.primary_interest,
            "project_timeline": form_data.project_timeline,
            "requirements": form_data.requirements,
            "contact_preference": form_data.contact_preference
        }

        # Render email content
        html_content = render_email_template(
            template_name="contact_sales.html",
            context=email_context
        )

        # Send email to sales team
        email_success = send_email(
            email_to="sales@iconluxury.shop",
            subject=f"New Sales Inquiry from {form_data.company_name}",
            html_content=html_content
        )
        
        # If email failed, raise an exception
        if not email_success:
            logger.error("Sales contact form email notification failed")
            raise HTTPException(
                status_code=500,
                detail="Failed to submit sales inquiry due to notification error"
            )

        return Message(message="Sales inquiry submitted successfully")

    except Exception as e:
        logger.error(f"Error processing sales contact form: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail="An error occurred while processing your sales inquiry"
        )




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

class WhistleblowerReportForm(BaseModel):
    category: str
    details: str
    amount_involved: Optional[str] = None
    is_immediate_risk: Optional[bool] = False
    evidence_description: Optional[str] = None
    witnesses: Optional[str] = None
    communication_preference: str
    anonymous_email: Optional[EmailStr] = None

@router.post("/whistleblower-report/", status_code=201)
async def submit_whistleblower_report(form_data: WhistleblowerReportForm) -> dict:
    """
    Submit a whistleblower report and send notification emails.
    """
    try:
        # Generate unique report ID and access key
        report_id = f"REP-{uuid.uuid4().hex[:8].upper()}"
        access_key = uuid.uuid4().hex[:16]
        
        # Prepare email context
        email_context = {
            "report_id": report_id,
            "category": form_data.category,
            "details": form_data.details,
            "amount_involved": form_data.amount_involved,
            "is_immediate_risk": form_data.is_immediate_risk,
            "evidence_description": form_data.evidence_description,
            "witnesses": form_data.witnesses,
            "communication_preference": form_data.communication_preference,
            "anonymous_email": form_data.anonymous_email,
            "submission_date": datetime.now().isoformat()
        }

        # Readable category mapping
        category_map = {
            "financial": "Financial Fraud or Accounting Irregularities",
            "corruption": "Corruption, Bribery, or Illegal Activities",
            "data": "Data Security or Privacy Violations",
            "ethics": "Ethics Violations or Conflicts of Interest",
            "harassment": "Harassment or Discrimination",
            "safety": "Environmental, Health, or Safety Concerns",
            "conduct": "Code of Conduct Violations",
            "other": "Other Compliance Concerns"
        }
        
        # Team notification email
        team_html_content = f"""
        <html>
        <body>
            <h1>New Whistleblower Report #{report_id}</h1>
            <p><strong>Category:</strong> {category_map.get(form_data.category, form_data.category)}</p>
            <p><strong>Details:</strong> {form_data.details}</p>
            {'<p><strong>Amount Involved:</strong> ' + form_data.amount_involved + '</p>' if form_data.amount_involved else ''}
            <p><strong>Immediate Risk:</strong> {'Yes' if form_data.is_immediate_risk else 'No'}</p>
            {'<p><strong>Evidence Description:</strong> ' + form_data.evidence_description + '</p>' if form_data.evidence_description else ''}
            {'<p><strong>Witnesses:</strong> ' + form_data.witnesses + '</p>' if form_data.witnesses else ''}
            <p><strong>Communication Preference:</strong> {form_data.communication_preference}</p>
            {'<p><strong>Anonymous Email:</strong> ' + form_data.anonymous_email + '</p>' if form_data.anonymous_email else ''}
            <p>Please review and initiate investigation within 1 business day.</p>
        </body>
        </html>
        """

        # Send notification to compliance team
        team_email_success = send_email(
            email_to="compliance@iconluxury.shop",
            subject=f"New Whistleblower Report #{report_id}",
            html_content=team_html_content
        )

        if not team_email_success:
            logger.warning("Failed to send team notification email")

        # Send confirmation to user if anonymous email provided
        if form_data.anonymous_email and form_data.communication_preference == "notify":
            user_html_content = f"""
            <html>
            <body>
                <h1>Your Report #{report_id} Has Been Received</h1>
                <p>Your confidential report has been submitted successfully.</p>
                <p><strong>Report ID:</strong> {report_id}</p>
                <p><strong>Access Key:</strong> {access_key}</p>
                <p>Please save this information securely to track your report anonymously.</p>
                <p>We will review your report within 1 business day.</p>
            </body>
            </html>
            """
            user_email_success = send_email(
                email_to=form_data.anonymous_email,
                subject=f"Your Whistleblower Report #{report_id}",
                html_content=user_html_content
            )
            if not user_email_success:
                logger.warning(f"Failed to send confirmation email to {form_data.anonymous_email}")

        # Log submission
        logger.info(f"Whistleblower report submitted: {report_id}")

        # Return report ID and access key to frontend
        return {
            "message": "Report submitted successfully",
            "report_id": report_id,
            "access_key": access_key
        }

    except Exception as e:
        logger.error(f"Error processing whistleblower report: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail="An error occurred while processing your report"
        )