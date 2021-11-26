# Generated by Django 3.1.3 on 2021-11-26 20:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('posts', '0004_auto_20211126_1141'),
    ]

    operations = [
        migrations.AlterField(
            model_name='post',
            name='comments',
            field=models.CharField(max_length=300),
        ),
        migrations.AlterField(
            model_name='post',
            name='id',
            field=models.CharField(editable=False, max_length=300, primary_key=True, serialize=False, unique=True),
        ),
    ]
