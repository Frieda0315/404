# Generated by Django 3.1.3 on 2021-11-20 07:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0003_auto_20211120_0638'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='uuid',
            field=models.UUIDField(default='625bc8b7-0ce0-420a-a4b4-ce1e70046e6a', unique=True),
        ),
    ]