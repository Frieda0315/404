from django.db import models
import uuid

# Create your models here.

class Post(models.Model):
    id = models.UUIDField(
        primary_key=True, default=uuid.uuid4, editable=False, unique=True)
    title = models.CharField(max_length=120)
    content = models.TextField()
    #image type
    #image = models.BinaryField(blank=True)

