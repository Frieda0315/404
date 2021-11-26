from django.db import models
import uuid
# Create your models here.


class User(models.Model):
    type = models.CharField(max_length=120, default="author")
    # host name + uuid
    id = models.CharField(primary_key=True, unique=True,
                          max_length=300, editable=False)
    host = models.CharField(
        max_length=160, default="https://i-connect.herokuapp.com/")
    displayName = models.CharField(max_length=120)
    url = models.CharField(max_length=300)
    github = models.CharField(max_length=120, null=True, blank=True)
    profileImage = models.CharField(max_length=300, null=True, blank=True)

    # unique id
    uuid = models.CharField(blank=True, null=True, max_length=120)
    password = models.CharField(max_length=120, default="PASS")
    pending = models.BooleanField(default=True)


class AdminUser(models.Model):
    id = models.UUIDField(
        primary_key=True, default=uuid.uuid4, editable=False, unique=True)
    user_name = models.CharField(max_length=120)
    password = models.CharField(max_length=120, default="PASS")
    type = models.CharField(max_length=120, default="admin")
