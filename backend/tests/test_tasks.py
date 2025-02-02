import pytest
from unittest.mock import patch
from products.tasks import fetch_coinbase_data

@pytest.mark.django_db
@patch("products.tasks.requests.get")  # Mock API request
def test_fetch_coinbase_data(mock_get):
    mock_get.return_value.status_code = 200
    mock_get.return_value.json.return_value = [
        [1700000000, 42000, 43000, 41000, 42500, 100]  # Sample Coinbase API response
    ]

    result = fetch_coinbase_data.apply().get()
    
    assert result is None  # Task doesn't return anything
    assert mock_get.called  # Ensure API call was made
