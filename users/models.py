from django.db import models
import uuid
# Create your models here.


class User(models.Model):
    id = models.AutoField(primary_key=True)
    uuid = models.UUIDField(
        default=uuid.uuid4, editable=False, unique=True)
    user_name = models.CharField(max_length=120)
    github_name = models.CharField(max_length=120)
