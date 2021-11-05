from django.db import models
from .models import User
import uuid

# Create your models here.


class Node(models.Model):
    url = models.CharField(primary_key=True,unique=True)
  