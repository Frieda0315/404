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
