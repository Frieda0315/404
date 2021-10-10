from django.db import models
import uuid

# Create your models here.

class Post(models.Model):
    id = models.AutoField(primary_key=True)
    uuid = models.UUIDField(
        default=uuid.uuid4, editable=False, unique=True)
    title = models.CharField(max_length=120)
    content = models.TextField()

