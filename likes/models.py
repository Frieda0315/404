from django.db import models
import uuid
from users.models import User

# Create your models here.


class Like(models.Model):
    id = models.UUIDField(
        primary_key=True, default=uuid.uuid4, editable=False, unique=True)
    # author of the like
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    summary = models.CharField(max_length=100)
    type = models.CharField(max_length=100, default="like")
    object = models.CharField(max_length=200)
