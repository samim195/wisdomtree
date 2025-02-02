from django.urls import path, include
from rest_framework.routers import DefaultRouter
from products.views import ProductViewSet, HistoricalDataView
from products import views  # Import your custom view for the historical data endpoint

router = DefaultRouter()
router.register(r'products', ProductViewSet)

# You don't need to register 'historical-data' here as it's a dynamic endpoint
urlpatterns = [
    path('api/', include(router.urls)),
    # Add a custom URL pattern for historical data with the ticker as a parameter
    path('api/historical-data/<str:ticker>/', views.HistoricalDataView.as_view(), name='historical-data'),
]
