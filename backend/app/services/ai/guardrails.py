import re

CRISIS_KEYWORDS = [
    r"\bsuicide\b", r"\bkill myself\b", r"\bend it all\b", r"\bdie\b", r"\bhurt myself\b",
    r"\bworthless\b", r"\bhate my life\b", r"\bcan't go on\b", r"\bgive up on life\b"
]

def check_for_crisis(text: str) -> bool:
    """
    Checks if the user's text contains any crisis keywords using regex.
    """
    text_lower = text.lower()
    for keyword in CRISIS_KEYWORDS:
        if re.search(keyword, text_lower):
            return True
    return False

def mask_pii(text: str) -> str:
    """
    Masks Potential Personally Identifiable Information (PII) before sending to the LLM.
    This is a basic implementation masking email addresses and phone numbers.
    """
    # Mask email addresses
    text = re.sub(r'[\w\.-]+@[\w\.-]+', '[EMAIL REDACTED]', text)
    # Mask simple phone numbers (10 digits)
    text = re.sub(r'\b\d{10}\b', '[PHONE REDACTED]', text)
    return text
