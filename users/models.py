from django.db import models
import uuid
# Create your models here.


class User(models.Model):
    id = models.UUIDField(
        primary_key=True, default=uuid.uuid4, editable=False, unique=True)
    user_name = models.CharField(max_length=120)
    github_name = models.CharField(max_length=120)
    password = models.CharField(max_length=120, default="PASS")
    type = models.CharField(max_length=120, default="author")
    host = models.CharField(
        max_length=160, default="https://i-connect.herokuapp.com/")
    profileImage = models.CharField(max_length=300)

    pending = models.BooleanField(default=True)


class AdminUser(models.Model):
    id = models.UUIDField(
        primary_key=True, default=uuid.uuid4, editable=False, unique=True)
    user_name = models.CharField(max_length=120)
    password = models.CharField(max_length=120, default="PASS")
    type = models.CharField(max_length=120, default="admin")
