# Generated by Django 3.1.3 on 2021-11-22 07:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('comments', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='comments',
            name='comments',
            field=models.ManyToManyField(blank=True, to='comments.Comment'),
        ),
    ]
