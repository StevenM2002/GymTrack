# Generated by Django 4.1.4 on 2022-12-20 12:01

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("tracking", "0004_setrepinfo_user_id_weightexercise_user_id"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="setrepinfo",
            name="user_id",
        ),
        migrations.RemoveField(
            model_name="weightexercise",
            name="user_id",
        ),
    ]
