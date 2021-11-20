from django.db import models
import uuid
from likes.models import Like
from posts.models import Post
from users.models import User
# from follows.models import Follow

# Create your models here.


class Inbox(models.Model):

    post = models.ManyToManyField(
        Post, blank=True)

    like = models.ManyToManyField(
        Like, blank=True)

    receive_author = models.OneToOneField(
        User, on_delete=models.CASCADE, primary_key=True
    )
