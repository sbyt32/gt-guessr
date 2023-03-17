from fastapi.testclient import TestClient


# You really don't have to declare types. I just do.
def test_game_sequence(client: TestClient):
    resp = client.get("/api/game_sequence/")
    values: list = resp.json()
    assert resp.status_code == 200
    assert len(values["loc_ids"]) == 5
