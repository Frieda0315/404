
"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from django.urls.conf import re_path
from django.views.generic import TemplateView
from users import user_views
from posts import post_views
from comments import comment_views
from django.conf import settings
from django.urls import include
from django.conf.urls.static import static


urlpatterns = [
    # TODO: update urls for post and authors
    path('authors/<uuid:author_id>/posts/', post_views.post_list, name='post_list'),
    path('authors/<uuid:author_id>/posts/<uuid:id>', post_views.post_detail, name='post_detail'),

    path('users/', user_views.user_list, name='user_list'),
    path('users/<uuid:id>', user_views.user_detail, name='user_detail'),

    path('authors/<uuid:author_id>/posts/<uuid:post_id>/comments',
         comment_views.comment_list, name='comments_list'),

    path('admin/', admin.site.urls),
    re_path('.*', TemplateView.as_view(template_name='index.html'))
]
