from rest_framework import serializers
from models.cart import CartItem


class CartItemSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    product_id = serializers.IntegerField()
    quantity = serializers.IntegerField()
