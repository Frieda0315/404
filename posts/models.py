from django.db import models
from comments.models import Comments

from django.db.models.base import ModelBase
from users.models import User

# Create your models here.


class Post(models.Model):
    # the first column is the actual value in databse, the second column is the human-readable value in admin selecting page
    visibilityTypes = [("PUBLIC",     "Public"),
                       #("FOAF",       "Friends of Friends"),
                       ("FRIENDS",    "Friends"),
                       ("PRIVATE",    "Private"),
                       ("SERVERONLY", "Local Frchiends")]

    type = models.CharField(max_length=120, default="post")
    title = models.CharField(max_length=120)
    id = models.CharField(primary_key=True, unique=True,
                          max_length=180, editable=False)
    source = models.CharField(max_length=300)
    origin = models.CharField(max_length=300)
    description = models.CharField(max_length=200)
    contentType = models.CharField(max_length=120)
    content = models.TextField()
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    categories = models.JSONField()
    count = models.IntegerField(default=0)
    comments = models.CharField(max_length=180)
    # Reference: https://stackoverflow.com/a/34003965
    # Author: https://stackoverflow.com/users/3945375/gocht
    commentsSrc = models.ForeignKey(
        Comments, on_delete=models.CASCADE, related_name='+')
    published = models.DateTimeField(auto_now=True, null=True)
    visibility = models.CharField(
        max_length=30, choices=visibilityTypes, default="PUBLIC")
    unlisted = models.BooleanField(default=False)
    # image type
    # Reference: https://docs.djangoproject.com/en/3.2/topics/files/#using-files-in-models
    image = models.ImageField(null=True, blank=True, upload_to='images/')
    uuid = models.CharField(blank=True, null=True, max_length=120)
    shared = models.BooleanField(default=False)
