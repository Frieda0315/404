from django.db import models
from users.models import User
from posts.models import Post
import uuid

# Create your models here.


class Comment(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE, null=True)
    type = models.CharField(max_length=120)
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    comment = models.TextField()
    contentType = models.CharField(max_length=120)
    published = models.DateTimeField(auto_now=True, null=True)
    id = models.UUIDField(
        primary_key=True, default=uuid.uuid4, editable=False, unique=True)
