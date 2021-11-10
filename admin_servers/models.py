from django.db import models

# Create your models here.


class Node(models.Model):
    url = models.CharField(primary_key=True,unique=True,max_length=180)
    user_name = models.CharField(max_length=120)
    password = models.CharField(max_length=120)


  