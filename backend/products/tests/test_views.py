import pytest
from django.urls import reverse
from rest_framework.test import APIClient
from products.models import Product, HistoricalData

@pytest.fixture
def client():
    return APIClient()

@pytest.fixture
def sample_product(db):
    return Product.objects.create(name="Bitcoin", ticker="BTC-USD")

@pytest.mark.django_db
def test_create_product(client):
    url = reverse("product-list")  # Assuming router.register('products', ProductViewSet)
    data = {"name": "Ethereum", "ticker": "ETH-USD"}
    response = client.post(url, data, format="json")

    assert response.status_code == 201
    assert Product.objects.count() == 1
    assert Product.objects.first().name == "Ethereum"

@pytest.mark.django_db
def test_get_products(client, sample_product):
    url = reverse("product-list")
    response = client.get(url)

    assert response.status_code == 200
    assert len(response.json()) == 1
    assert response.json()[0]["name"] == "Bitcoin"

@pytest.mark.django_db
def test_update_product(client, sample_product):
    url = reverse("product-detail", kwargs={"pk": sample_product.id})
    updated_data = {"name": "Bitcoin Updated", "ticker": "BTC-USD"}
    response = client.put(url, updated_data, format="json")

    assert response.status_code == 200
    sample_product.refresh_from_db()
    assert sample_product.name == "Bitcoin Updated"

@pytest.mark.django_db
def test_delete_product(client, sample_product):
    url = reverse("product-detail", kwargs={"pk": sample_product.id})
    response = client.delete(url)

    assert response.status_code == 204
    assert Product.objects.count() == 0
