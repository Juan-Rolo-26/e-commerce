from django.urls import path

from cart.views import CartItemList, CartItemDetail, Checkout


urlpatterns = [
    path('items/', CartItemList.as_view(), name='cart-item-list'),
    path('items/<int:item_id>/', CartItemDetail.as_view(), name='cart-item-detail'),
    path('checkout/', Checkout.as_view(), name='cart-checkout'),
]
