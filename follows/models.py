from django.db import models
import uuid
from users.models import User

# Create your models here.


class Follow(models.Model):
    id = models.UUIDField(
        primary_key=True, default=uuid.uuid4, editable=False, unique=True)
    follower = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="follower")
    following = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="following")


class Friend(models.Model):
    id = models.UUIDField(
        primary_key=True, default=uuid.uuid4, editable=False, unique=True)
    first_user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="first_user")
    second_user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="second_user")


class FriendRequest(models.Model):
    type = models.CharField(max_length=100)
    id = models.UUIDField(
        primary_key=True, default=uuid.uuid4, editable=False, unique=True)
    summary = models.CharField(max_length=120)
    actor = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="actor")
    object = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="object")
