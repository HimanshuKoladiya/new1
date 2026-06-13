import pytest
from app.services.ai.guardrails import check_for_crisis, mask_pii

def test_crisis_detection():
    assert check_for_crisis("I want to end it all") is True
    assert check_for_crisis("I feel worthless today") is True
    assert check_for_crisis("I am feeling a bit stressed about my exam") is False

def test_pii_masking():
    text = "My email is test@example.com and phone is 1234567890."
    masked = mask_pii(text)
    assert "test@example.com" not in masked
    assert "1234567890" not in masked
    assert "[EMAIL REDACTED]" in masked
    assert "[PHONE REDACTED]" in masked
