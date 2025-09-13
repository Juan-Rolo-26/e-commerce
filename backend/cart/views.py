from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from models.cart import cart
from .serializers import CartItemSerializer
from products.models import Product


class CartItemList(APIView):
    def get(self, request):
        serializer = CartItemSerializer(cart.items, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = CartItemSerializer(data=request.data)
        if serializer.is_valid():
            product_id = serializer.validated_data['product_id']
            quantity = serializer.validated_data['quantity']
            try:
                Product.objects.get(pk=product_id)
            except Product.DoesNotExist:
                return Response({'detail': 'Product not found'}, status=status.HTTP_404_NOT_FOUND)
            item = cart.add_item(product_id, quantity)
            return Response(CartItemSerializer(item).data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CartItemDetail(APIView):
    def delete(self, request, item_id):
        cart.remove_item(item_id)
        return Response(status=status.HTTP_204_NO_CONTENT)


class Checkout(APIView):
    def post(self, request):
        cart.clear()
        return Response({'status': 'checked out'}, status=status.HTTP_200_OK)
