from rest_framework import viewsets
from .models import Product, HistoricalData
from .serializers import ProductSerializer, HistoricalDataSerializer
from rest_framework.views import APIView

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

class HistoricalDataView(APIView):
    def get(self, request, ticker, format=None):
        # Query HistoricalData using the ticker
        data = HistoricalData.objects.filter(product__ticker=ticker)

        if data.exists():
            serializer = HistoricalDataSerializer(data, many=True)
            return Response(serializer.data)
        else:
            return Response({"error": "No data found for the given ticker."}, status=status.HTTP_404_NOT_FOUND)