from django.db import models
from users.models import User
import uuid

# Create your models here.


class Comment(models.Model):
    type = models.CharField(default="comment", max_length=120)
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    comment = models.TextField()
    contentType = models.CharField(max_length=120)
    published = models.DateTimeField(auto_now=True, null=True, blank=True)
    id = models.CharField(primary_key=True, unique=True,
                          max_length=180, editable=False)
    uuid = models.UUIDField(blank=True, null=True, max_length=120)


class Comments(models.Model):
    type = models.CharField(default="comments", max_length=50)
    page = models.IntegerField(default=1)
    size = models.IntegerField(default=5)
    post = models.CharField(max_length=180)
    id = models.CharField(max_length=180, primary_key=True, editable=False)
    comments = models.ManyToManyField(Comment, blank=True)
