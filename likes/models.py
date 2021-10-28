from typing import ContextManager
from django.db import models
import uuid
from users.models import User
from posts.models import Post
from comments.models import Comment

# Create your models here.


class Like(models.Model):
    id = models.UUIDField(
        primary_key=True, default=uuid.uuid4, editable=False, unique=True)
    # author of the like, not quite sure yet
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    comment = models.ForeignKey(
        Comment, on_delete=models.CASCADE, null=True, blank=True)
    summary = models.CharField(max_length=100)
    type = models.CharField(max_length=100)
