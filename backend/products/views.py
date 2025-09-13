from rest_framework import generics
from rest_framework.pagination import PageNumberPagination
from .models import Product
from .serializers import ProductSerializer


class ProductPagination(PageNumberPagination):
    page_size = 10


class ProductList(generics.ListAPIView):
    serializer_class = ProductSerializer
    pagination_class = ProductPagination

    def get_queryset(self):
        queryset = Product.objects.all()
        params = self.request.query_params

        category = params.get('category')
        price_min = params.get('price_min')
        price_max = params.get('price_max')
        query = params.get('query')

        if category:
            queryset = queryset.filter(category=category)
        if price_min:
            queryset = queryset.filter(price__gte=price_min)
        if price_max:
            queryset = queryset.filter(price__lte=price_max)
        if query:
            queryset = queryset.filter(name__icontains=query)

        return queryset.order_by('id')


class ProductDetail(generics.RetrieveAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
