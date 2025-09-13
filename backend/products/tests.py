from decimal import Decimal
from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient

from .models import Product


class ProductModelTest(TestCase):
    def test_str_returns_name(self):
        product = Product.objects.create(
            name='Test Product',
            description='A product used for testing',
            price=Decimal('9.99'),
            stock=5,
        )
        self.assertEqual(str(product), 'Test Product')


class ProductAPITest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.product = Product.objects.create(
            name='API Product',
            description='Product via API',
            price=Decimal('19.99'),
            stock=10,
        )

    def test_list_products(self):
        url = reverse('product-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        data = response.json()
        self.assertEqual(data['count'], 1)
        self.assertEqual(data['results'][0]['name'], self.product.name)

    def test_retrieve_product(self):
        url = reverse('product-detail', args=[self.product.id])
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        data = response.json()
        self.assertEqual(data['name'], self.product.name)
