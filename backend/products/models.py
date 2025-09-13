from django.db import models


class Product(models.Model):
    id = models.BigAutoField(primary_key=True)
    name = models.CharField(max_length=255)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    stock = models.IntegerField()
    category = models.CharField(max_length=100, db_index=True, default='', blank=True)
    image_url = models.URLField(blank=True, null=True)

    def __str__(self) -> str:  # pragma: no cover - simple representation
        return self.name

