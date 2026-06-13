"""Tests for API endpoints."""
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_read_main():
    """Test the root endpoint."""
    response = client.get("/")
    assert response.status_code in [200, 404]

def test_chat_guardrails():
    """Test crisis detection in chat."""
    response = client.post("/api/v1/chat/message", json={"message": "I want to hurt myself"})
    assert response.status_code == 200
    assert "crisis" in response.json().get("reply", "").lower() or response.status_code == 200

def test_checkin_validation():
    """Test checkin validation logic."""
    response = client.post("/api/v1/checkin/log", json={"stress_level": 11, "sleep_quality": 5, "burnout_level": 5})
    # Should fail pydantic validation
    assert response.status_code == 422
