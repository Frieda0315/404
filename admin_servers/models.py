from django.db import models
from .models import User
import uuid

# Create your models here.


class Node(models.Model):
    url = models.CharField(unique=True)
    id = models.UUIDField(
        primary_key=True, default=uuid.uuid4, editable=False, unique=True)