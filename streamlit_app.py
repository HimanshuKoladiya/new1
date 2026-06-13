import streamlit as st
import re
import os
from google import genai
from google.genai import types

# ---- CONFIG & SETUP ----
st.set_page_config(page_title="Zenith Mental Wellness", page_icon="🧘", layout="centered")

st.title("Zenith: Mental Wellness Companion 🧘")

# ---- AI CONFIGURATION ----
SYSTEM_PROMPT = """You are Zenith, a highly empathetic, supportive, and non-judgmental AI academic coach and mental wellness companion designed exclusively for students facing extreme pressure from high-stakes exams.
Your core mission is to provide emotional support, effective study strategies, and stress-reduction techniques.

STRICT GUARDRAILS & RULES:
1. NO MEDICAL ADVICE: You are NOT a doctor or therapist. You cannot diagnose or treat.
2. CRISIS PROTOCOL: If the user indicates self-harm or suicidal ideation, respond ONLY with emergency hotline info.
3. EMPATHY FIRST: Validate feelings before offering solutions.
4. ACTIONABLE ADVICE: Focus on evidence-based techniques (Pomodoro, active recall).
5. CONCISENESS: Keep responses concise.
"""

CRISIS_KEYWORDS = [
    r"\bsuicide\b", r"\bkill myself\b", r"\bend it all\b", r"\bdie\b", r"\bhurt myself\b",
    r"\bworthless\b", r"\bhate my life\b", r"\bgive up on life\b"
]

CRISIS_RESPONSE = """It sounds like you are going through a really difficult time right now. Please know that you are not alone and there is support available. 
If you are in immediate danger or experiencing a mental health crisis, please reach out for help immediately:
- National Emergency Number: 911 (or your local equivalent)
- Suicide & Crisis Lifeline: 988
- Crisis Text Line: Text HOME to 741741"""

def check_for_crisis(text: str) -> bool:
    text_lower = text.lower()
    for keyword in CRISIS_KEYWORDS:
        if re.search(keyword, text_lower):
            return True
    return False

def mask_pii(text: str) -> str:
    text = re.sub(r'[\w\.-]+@[\w\.-]+', '[EMAIL REDACTED]', text)
    text = re.sub(r'\b\d{10}\b', '[PHONE REDACTED]', text)
    return text

# ---- SESSION STATE ----
if "messages" not in st.session_state:
    st.session_state.messages = []
if "stress_data" not in st.session_state:
    st.session_state.stress_data = []

# ---- SIDEBAR: CHECK-IN ----
with st.sidebar:
    st.header("Daily Check-In")
    stress = st.slider("Stress Level", 1, 10, 5)
    sleep = st.slider("Sleep Quality", 1, 10, 5)
    burnout = st.slider("Study Burnout", 1, 10, 5)
    if st.button("Log Daily Wellness"):
        st.session_state.stress_data.append({"stress": stress, "sleep": sleep, "burnout": burnout})
        st.success("Logged successfully!")
        
    st.divider()
    if st.session_state.stress_data:
        st.subheader("Your Resilience Trends")
        stress_list = [x["stress"] for x in st.session_state.stress_data]
        st.line_chart(stress_list)

# ---- CHAT INTERFACE ----
st.write("Welcome to your safe space. How are you feeling about your studies today?")

# Display chat messages
for message in st.session_state.messages:
    with st.chat_message(message["role"]):
        st.markdown(message["content"])

# Handle new user input
if prompt := st.chat_input("I'm feeling overwhelmed..."):
    # 1. Add user message to state
    st.session_state.messages.append({"role": "user", "content": prompt})
    with st.chat_message("user"):
        st.markdown(prompt)

    # 2. Guardrails (Crisis check)
    if check_for_crisis(prompt):
        with st.chat_message("model"):
            st.markdown(CRISIS_RESPONSE)
        st.session_state.messages.append({"role": "model", "content": CRISIS_RESPONSE})
    else:
        # 3. Call Gemini
        safe_prompt = mask_pii(prompt)
        api_key = st.secrets.get("GEMINI_API_KEY", os.getenv("GEMINI_API_KEY"))
        
        if not api_key:
            st.error("GEMINI_API_KEY is not set in Streamlit secrets!")
        else:
            client = genai.Client(api_key=api_key)
            
            # Format history
            formatted_history = []
            for msg in st.session_state.messages[:-1]: # exclude the latest prompt
                role = "user" if msg["role"] == "user" else "model"
                formatted_history.append(types.Content(role=role, parts=[types.Part.from_text(text=msg["content"])]))
            
            formatted_history.append(types.Content(role="user", parts=[types.Part.from_text(text=safe_prompt)]))
            
            with st.chat_message("model"):
                with st.spinner("Zenith is typing..."):
                    try:
                        response = client.models.generate_content(
                            model='gemini-2.5-flash',
                            contents=formatted_history,
                            config=types.GenerateContentConfig(
                                system_instruction=SYSTEM_PROMPT,
                                temperature=0.7,
                            )
                        )
                        st.markdown(response.text)
                        st.session_state.messages.append({"role": "model", "content": response.text})
                    except Exception as e:
                        st.error(f"Failed to connect to AI: {str(e)}")
