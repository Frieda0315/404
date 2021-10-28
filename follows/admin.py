from django.contrib import admin
from .models import Follow, Friend, FriendRequest
# Register your models here.
admin.site.register(Follow)
admin.site.register(Friend)
admin.site.register(FriendRequest)