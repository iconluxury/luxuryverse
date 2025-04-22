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