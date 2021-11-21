from django.db import models
from users.models import User
from posts.models import Post
import uuid

# Create your models here.


class Comment(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE, null=True)
    type = models.CharField(default="comment", max_length=120)
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    comment = models.TextField()
    contentType = models.CharField(max_length=120)
    published = models.DateTimeField(auto_now=True, null=True)
    id = models.CharField(primary_key=True, unique=True,
                          max_length=180, editable=False)
    uuid = models.UUIDField(blank=True, null=True, max_length=120)
