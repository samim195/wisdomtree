from celery import shared_task
import requests
from datetime import datetime
from .models import Product, HistoricalData
import logging

logger = logging.getLogger(__name__)

@shared_task
def fetch_coinbase_data():
    print("Fetching Coinbase data...")
    products = Product.objects.all()
    for product in products:
        url = f"https://api.exchange.coinbase.com/products/{product.ticker}/candles?granularity=3600"
        print(f"Requesting data for {product.ticker}...")
        response = requests.get(url)
        print("Making request to coinbase...")
        if response.status_code == 200:
            data = response.json()
            if not data:
                print(f"No data returned for {product.ticker}")
            else:
                logger.info(f"Data fetched: {data}")
                for candle in data:
                    timestamp, open_p, high_p, low_p, close_p, _ = candle
                    HistoricalData.objects.create(
                        product=product,
                        timestamp=datetime.utcfromtimestamp(timestamp),
                        open_price=open_p,
                        high_price=high_p,
                        low_price=low_p,
                        close_price=close_p
                    )
        else:
            print(f"Failed to fetch data: {response.status_code}")

