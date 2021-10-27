from django.db import models
import uuid
from likes.models import Like
from posts.models import Post
from users.models import User
# from follows.models import Follow

# Create your models here.


class Inbox(models.Model):
    id = models.UUIDField(
        primary_key=True, default=uuid.uuid4, editable=False, unique=True)

    post = models.ForeignKey(
        Post, on_delete=models.CASCADE, null=True, blank=True)
    # follow = models.ForeignKey(
    #     Follow, on_delete=models.CASCADE, null=True, blank=True)
    like = models.ForeignKey(
        Like, on_delete=models.CASCADE, null=True, blank=True)

    receive_author = models.ForeignKey(
        User, on_delete=models.CASCADE
    )
