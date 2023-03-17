import pytest
from fastapi.testclient import TestClient


# This sets up a fake client to test endpoints!
@pytest.fixture
def client():
    from gtguessr.main import app

    with TestClient(app) as test_client:
        yield test_client
