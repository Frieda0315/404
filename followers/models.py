from django.db import models
import uuid
from users.models import User

# Create your models here.

class Follower(models.Model):
    type = models.CharField(max_length=100)
    id = models.UUIDField(
        primary_key=True, default=uuid.uuid4, editable=False, unique=True)
    displayName = models.CharField(max_length=100)
    github = models.CharField(max_length=100)
    # id = models.UUIDField(
    #     primary_key=True, default=uuid.uuid4, editable=False, unique=True)
    # summary = models.CharField(max_length=100)
    # actor = models.ForeignKey(
    #     User, on_delete=models.CASCADE, related_name="sender")
    # object = models.ForeignKey(
    #     User, on_delete=models.CASCADE, related_name="receiver")