from django.db import models
import uuid
from users.models import User

# Create your models here.


class Post(models.Model):
    id = models.UUIDField(
        primary_key=True, default=uuid.uuid4, editable=False, unique=True)
    title = models.CharField(max_length=120)
    content = models.TextField()
    published = models.DateTimeField(auto_now=True, null=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE, default=1)
    # image type
    # TODO: image field
    # image = models.ImageField(blank=True, upload_to='img')

    # the first column is the actual value in databse, the second column is the human-readable value in admin selecting page
    visibilityTypes = [("PUBLIC",     "Public"),
                       #("FOAF",       "Friends of Friends"),
                       ("FRIENDS",    "Friends"),
                       ("PRIVATE",    "Private"),
                       ("SERVERONLY", "Local Frchiends")]
    visibility = models.CharField(
        max_length=30, choices=visibilityTypes, default="PUBLIC")
