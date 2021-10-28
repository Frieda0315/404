from django.contrib import admin
from django.urls import path
from django.urls.conf import re_path
from django.views.generic import TemplateView
from users import user_views
from posts import post_views
from comments import comment_views
from likes import like_views
from inbox import inbox_views
from follows import follow_views

urlpatterns = [
    # TODO: update urls for post and authors
    # TODO: update all urls using posts, in order to support with/without slash in the end
    path('service/authors/<uuid:author_id>/posts/',
         post_views.post_list, name='post_list'),
    path('service/authors/<uuid:author_id>/posts/<uuid:id>/',
         post_views.post_detail, name='post_detail'),

    path('service/posts/', post_views.public_post, name='public_post'),


    path('service/authors/', user_views.author_list, name='author_list'),
    path('service/author/<uuid:id>/',
         user_views.author_detail, name='author_detail'),

    re_path('^service/users/signup/?$', user_views.signup, name='signup'),
    re_path('^service/users/login/?$', user_views.login, name='login'),

    path('service/authors/<uuid:author_id>/posts/<uuid:post_id>/comments/',
         comment_views.comment_list, name='comment_list'),

    path('service/authors/<uuid:author_id>/posts/<uuid:post_id>/likes/',
         like_views.post_like_list, name='post_like_list'),
    path('service/authors/<uuid:author_id>/posts/<uuid:post_id>/comments/<uuid:comment_id>/likes/',
         like_views.comment_like_list, name='comment_like_list'),
    path('service/author/<uuid:author_id>/liked/',
         like_views.author_like_list, name='author_like_list'),

    # follower
    path('service/author/<uuid:author_id>/followers/', follow_views.follower_list, name='follower_list'),
    path('service/author/<uuid:author_id>/followers/<uuid:foreign_author_id>/', follow_views.follower_detail, name='follower_detail'),

    # inbox
    #r'^about$'
    path('service/author/<uuid:author_id>/inbox/',
         inbox_views.inbox_list, name='inbox_list'),


    path('admin/', admin.site.urls),
    re_path('(^(?!(service)).*$)',
            TemplateView.as_view(template_name='index.html'))
]
# # image debug
# if settings.DEBUG:
#     urlpatterns += static(settings.MEDIA_URL,
#                           document_root=settings.MEDIA_ROOT)
