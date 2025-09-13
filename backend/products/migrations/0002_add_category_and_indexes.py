from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("products", "0001_initial"),
    ]

    operations = [
        migrations.AddField(
            model_name="product",
            name="category",
            field=models.CharField(blank=True, db_index=True, default="", max_length=100),
        ),
        migrations.AlterField(
            model_name="product",
            name="name",
            field=models.CharField(db_index=True, max_length=255),
        ),
        migrations.AlterField(
            model_name="product",
            name="price",
            field=models.DecimalField(db_index=True, decimal_places=2, max_digits=10),
        ),
    ]
