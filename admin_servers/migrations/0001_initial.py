# Generated by Django 3.1.3 on 2021-11-20 05:36

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Node',
            fields=[
                ('url', models.CharField(max_length=180, primary_key=True, serialize=False, unique=True)),
                ('user_name', models.CharField(max_length=120)),
                ('password', models.CharField(max_length=120)),
            ],
        ),
    ]
