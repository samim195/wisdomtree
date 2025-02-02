from rest_framework import serializers
from .models import Product, HistoricalData

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'

class HistoricalDataSerializer(serializers.ModelSerializer):
    product = ProductSerializer()

    class Meta:
        model = HistoricalData
        fields = '__all__'
