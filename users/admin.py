from django.contrib import admin
from .models import AdminUser, User
# Register your models here.
admin.site.register(User)
admin.site.register(AdminUser)
