# Generated by Django 4.1.4 on 2022-12-20 06:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("tracking", "0002_setrepinfo_date_created_weightexercise_date_created"),
    ]

    operations = [
        migrations.AlterField(
            model_name="weightexercise",
            name="weight",
            field=models.FloatField(),
        ),
    ]
