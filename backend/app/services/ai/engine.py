from google import genai
from google.genai import types
from app.core.config import settings
from app.services.ai.prompts import SYSTEM_PROMPT
from app.services.ai.guardrails import check_for_crisis, mask_pii

# Initialize the Gemini client
client = genai.Client(api_key=settings.GEMINI_API_KEY) if settings.GEMINI_API_KEY else None

CRISIS_RESPONSE = """It sounds like you are going through a really difficult time right now. Please know that you are not alone and there is support available. 
If you are in immediate danger or experiencing a mental health crisis, please reach out for help immediately:
- National Emergency Number: 911 (or your local equivalent)
- Suicide & Crisis Lifeline: 988
- Crisis Text Line: Text HOME to 741741

Please talk to someone who can help. I am an AI and cannot provide the human support you deserve right now, but please reach out to the resources above."""

async def generate_chat_response(message: str, history: list[dict]) -> str:
    if not client:
        return "AI Engine is not configured. Please set GEMINI_API_KEY."

    # 1. Crisis Detection (pre-LLM guardrail)
    if check_for_crisis(message):
        return CRISIS_RESPONSE
        
    # 2. PII Masking
    safe_message = mask_pii(message)

    # 3. Format history for Gemini
    formatted_history = []
    for msg in history:
        # Assuming msg has 'role' ("user" or "model") and 'content'
        formatted_history.append(
            types.Content(role=msg["role"], parts=[types.Part.from_text(text=msg["content"])])
        )

    # 4. Generate response using Gemini 2.5 Flash
    try:
        response = client.models.generate_content(
            model='gemini-2.5-flash',
            contents=formatted_history + [
                types.Content(role="user", parts=[types.Part.from_text(text=safe_message)])
            ],
            config=types.GenerateContentConfig(
                system_instruction=SYSTEM_PROMPT,
                temperature=0.7,
            )
        )
        return response.text
    except Exception as e:
        print(f"Error calling Gemini: {e}")
        return "I'm having trouble processing that right now. Please try again later."
