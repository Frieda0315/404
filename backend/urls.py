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
    path('service/authors/<uuid:author_id>/posts/', post_views.post_list, name='post_list'),
    path('service/authors/<uuid:author_id>/posts/<uuid:id>', post_views.post_detail, name='post_detail'),

    path('service/users/', user_views.user_list, name='user_list'),
    path('service/users/<uuid:id>', user_views.user_detail, name='user_detail'),

    path('service/authors/<uuid:author_id>/posts/<uuid:post_id>/comments',
         comment_views.comment_list, name='comments_list'),

    path('admin/', admin.site.urls),
    re_path(r'^.*$', TemplateView.as_view(template_name='index.html'))
]
