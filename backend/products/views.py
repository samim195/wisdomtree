from rest_framework import viewsets, status
from .models import Product, HistoricalData
from .serializers import ProductSerializer, HistoricalDataSerializer
from rest_framework.views import APIView
from rest_framework.response import Response


class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

class HistoricalDataView(APIView):
    def get(self, request, ticker, format=None):
        # Query HistoricalData using the ticker
        data = HistoricalData.objects.filter(product__ticker=ticker)

        print(f"🔍 Searching for historical data for {ticker}... Found: {data.exists()}")  # ✅ Debugging output

        if data.exists():
            serializer = HistoricalDataSerializer(data, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response({"error": "No data found for the given ticker."}, status=status.HTTP_404_NOT_FOUND)
