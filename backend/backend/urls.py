from django.contrib import admin
from django.urls import path

from products.views import ProductDetail, ProductList

urlpatterns = [
    path('admin/', admin.site.urls),
    path('products/', ProductList.as_view(), name='product-list'),
    path('products/<int:pk>/', ProductDetail.as_view(), name='product-detail'),
]
