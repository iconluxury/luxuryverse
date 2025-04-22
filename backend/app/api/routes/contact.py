from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, EmailStr
from typing import Optional
from app.utils import send_email
from app.models import Message
from app.core.config import settings
import logging
import uuid
from datetime import datetime

router = APIRouter()

logger = logging.getLogger(__name__)

# Pydantic model for contact form
class ContactForm(BaseModel):
    name: str
    email: EmailStr
    message: str

@router.post("/contact/", status_code=201)
async def submit_contact_form(form_data: ContactForm) -> Message:
    """
    Submit a contact form and send notification emails to user and admin.
    """
    try:
        logger.info(f"Processing contact form submission from {form_data.email}")
        
        # Generate contact reference ID
        contact_ref = f"CON-{uuid.uuid4().hex[:8].upper()}"
        logger.info(f"Generated reference ID: {contact_ref}")
        
        # Store basic contact details
        contact_info = {
            "ref_id": contact_ref,
            "timestamp": datetime.now().isoformat(),
            "name": form_data.name,
            "email": form_data.email,
            "message": form_data.message,
            "status": "received"
        }
        
        logger.info(f"Contact form details: {contact_info}")
        
        # Send confirmation email to user
        try:
            user_confirmation_sent = send_email(
                email_to=form_data.email,
                subject=f"Your Contact Request #{contact_ref} Has Been Received",
                html_content=f"""
                <html>
                <body>
                    <h1>Contact Request Confirmation</h1>
                    <p>Dear {form_data.name},</p>
                    <p>Thank you for contacting us. We have received your message and will respond as soon as possible.</p>
                    <p>Your reference number is: <strong>{contact_ref}</strong></p>
                    <p>Please keep this number for future reference.</p>
                    <p>Your message:<br>{form_data.message}</p>
                    <p>Best regards,<br>Luxury Verse Team</p>
                </body>
                </html>
                """
            )
            
            if user_confirmation_sent:
                logger.info(f"Confirmation email sent to {form_data.email}")
            else:
                logger.warning(f"Failed to send confirmation email to {form_data.email}")
        except Exception as email_error:
            logger.error(f"Error sending user confirmation email: {str(email_error)}")
            # Continue processing even if email fails
        try:
            admin_notification_sent = send_email(
                email_to="nik@luxurymarket.com",
                subject=f"New Contact Form Submission #{contact_ref}",
                html_content=f"""
                <html>
                <body>
                    <h1>New Contact Form Submission</h1>
                    <p><strong>Contact Request #{contact_ref}</strong></p>
                    
                    <h2>Contact Information</h2>
                    <p><strong>Name:</strong> {form_data.name}</p>
                    <p><strong>Email:</strong> {form_data.email}</p>
                    
                    <h2>Message</h2>
                    <p>{form_data.message}</p>
                    
                    <p>Please respond to this contact request as needed.</p>
                </body>
                </html>
                """
            )
            
            if admin_notification_sent:
                logger.info("Admin notification email sent successfully")
            else:
                logger.warning("Failed to send admin notification email")
        except Exception as admin_email_error:
            logger.error(f"Error sending admin notification email: {str(admin_email_error)}")
            # Continue processing even if email fails
        
        return Message(message=f"Contact request {contact_ref} submitted successfully. We'll get back to you soon!")

    except Exception as e:
        logger.exception(f"Error processing contact form: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail="An error occurred while processing your contact request"
        )
