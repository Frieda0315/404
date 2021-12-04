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
from admin_servers import admin_servers_views

from django.conf import settings
from django.conf.urls.static import static

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    # TODO: update urls for post and authors
    # TODO: update all urls using posts, in order to support with/without slash in the end
    path('service/author/<str:author_id>/posts/',
         post_views.post_list, name='post_list'),
    path('service/author/<str:author_id>/posts/<str:id>/',
         post_views.post_detail, name='post_detail'),
    # posts this author can see
    path('service/posts/<str:author_id>/',
         post_views.stream_public_post, name='stream_public_post'),
    path('service/myposts/<str:author_id>/',
         post_views.my_post, name='my_post'),
    path('service/plainpost/<str:post_id>/',
         post_views.plain_post, name='plain_post'),


    path('service/authors/', user_views.author_list, name='author_list'),
    path('service/authors/pendinglist/',
         user_views.pending_author_list, name='pending_author_list'),
    path('service/authors/currentlist/',
         user_views.current_author_list, name='current_author_list'),
    path('service/author/<str:id>/',
         user_views.author_detail, name='author_detail'),

    re_path('^service/users/signup/?$', user_views.signup, name='signup'),
    re_path('^service/users/login/?$', user_views.login, name='login'),

    re_path('^service/admin/signup/?$',
            user_views.admin_signup, name='admin_signup'),
    re_path('^service/admin/login/?$',
            user_views.admin_login, name='admin_login'),

    path('service/author/<str:author_id>/posts/<str:post_id>/comments/',
         comment_views.comment_list, name='comment_list'),

    # likes
    path('service/author/<str:author_id>/posts/<str:post_id>/likes/',
         like_views.post_like_list, name='post_like_list'),
    path('service/author/<str:author_id>/posts/<str:post_id>/comments/<str:comment_id>/likes/',
         like_views.comment_like_list, name='comment_like_list'),
    path('service/author/<str:author_id>/liked/',
         like_views.author_like_list, name='author_like_list'),

    path('service/author/<str:author_id>/inbox/likes/',
         like_views.inbox_like_list, name='inbox_like_list'),

    # follower
    path('service/author/<str:author_id>/followers/',
         follow_views.follower_list, name='follower_list'),
    path('service/author/<str:author_id>/followers/<str:foreign_author_id>/',
         follow_views.follower_detail, name='follower_detail'),

    path('service/author/<str:author_id>/friends/',
         follow_views.friend_list, name='friend_list'),

    path('service/author/<str:author_id>/friendrequests/',
         follow_views.friend_request_list, name='friend_request_list'),

    path('service/friendrequest/actor/<str:actor_id>/object/<str:object_id>/',
         follow_views.friend_request_item, name='friend_request_item'),

    # inbox
    # r'^about$'
    path('service/author/<str:author_id>/inbox/',
         inbox_views.inbox_list, name='inbox_list'),

    # admin server
    path('service/admin/handle/<str:id>/',
         admin_servers_views.handle_signup_request, name='handle_signup_request'),
    path('service/admin/get/', admin_servers_views.get_signup_requests,
         name='get_signup_request'),
    path('service/admin/approveoption/',
         admin_servers_views.approve_option, name='approve_option'),
    path('service/admin/nodes/',
         admin_servers_views.node_list, name='nodes'),
    path('service/admin/node/',
         admin_servers_views.delete_node, name='delete_node'),

    path('admin/', admin.site.urls),
    re_path('(^(?!(service)).*$)',
            TemplateView.as_view(template_name='index.html'))
]


# image debug
# if settings.DEBUG:
urlpatterns += static(settings.MEDIA_URL,
                      document_root=settings.MEDIA_ROOT)
