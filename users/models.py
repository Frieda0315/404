from django.db import models
import uuid
# Create your models here.


class User(models.Model):
    type = models.CharField(max_length=120, default="author")
    # host name + uuid
    id = models.CharField(primary_key=True, max_length=180, unique=True)
    host = models.CharField(
        max_length=160, default="https://i-connect.herokuapp.com/")
    displayName = models.CharField(max_length=120)
    url = models.CharField(max_length=180)
    github = models.CharField(max_length=120)
    profileImage = models.CharField(max_length=300)

    # unique id
    uuid = models.UUIDField(default="625bc8b7-0ce0-420a-a4b4-ce1e70046e6a")
    password = models.CharField(max_length=120, default="PASS")
    pending = models.BooleanField(default=True)


class AdminUser(models.Model):
    id = models.UUIDField(
        primary_key=True, default=uuid.uuid4, editable=False, unique=True)
    user_name = models.CharField(max_length=120)
    password = models.CharField(max_length=120, default="PASS")
    type = models.CharField(max_length=120, default="admin")
