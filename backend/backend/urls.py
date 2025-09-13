from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/products/', include('routes.products')),
    path('api/auth/', include('routes.auth')),
    path('api/users/', include('routes.users')),
]
