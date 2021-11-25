from os import stat
from re import search
from django.http.response import JsonResponse
from rest_framework import status
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.fields import UUIDField
from .serializers import LikeSerializer
from rest_framework.authentication import BasicAuthentication
from rest_framework.permissions import IsAuthenticated
from .models import Like
from posts.models import Post
from comments.models import Comment, Comments
from users.models import User


@api_view(['GET'])
@authentication_classes([BasicAuthentication])
@permission_classes([IsAuthenticated])
def post_like_list(request, author_id, post_id):
    '''
    Get all likes of the {author_id}'s {post_id}
    '''
    # might need to change to regex later
    post_re = r'/author\/[-a-zA-Z0-9@:%._\+~#=]{2,256}\/posts\/[-a-zA-Z0-9@:%._\+~#=]{2,256}\/'
    post_search_string = "/author/" + str(author_id) + "/posts/" + str(post_id)
    try:
        User.objects.get(uuid=author_id)
    except User.DoesNotExist:
        return JsonResponse({"error": "Author not found"}, status=status.HTTP_404_NOT_FOUND)

    try:
        Post.objects.get(uuid=post_id)
    except Post.DoesNotExist:
        return JsonResponse({"error": "Post not found"}, status=status.HTTP_404_NOT_FOUND)

    likes = Like.objects.filter(object__contains=post_search_string).exclude(
        object__contains="comment")
    like_serializer = LikeSerializer(likes, many=True)
    return JsonResponse(like_serializer.data, status=status.HTTP_200_OK, safe=False)


@api_view(['GET'])
@authentication_classes([BasicAuthentication])
@permission_classes([IsAuthenticated])
def comment_like_list(request, author_id, post_id, comment_id):
    comment_re = r'/author\/[-a-zA-Z0-9@:%._\+~#=]{2,256}\/posts\/[-a-zA-Z0-9@:%._\+~#=]{2,256}\/comments\/[-a-zA-Z0-9@:%._\+~#=]{2,256}'
    comment_search_string = "/author/" + \
        str(author_id) + "/posts/" + str(post_id) + \
        "/comments/" + str(comment_id)
    try:
        User.objects.get(uuid=author_id)
    except User.DoesNotExist:
        return JsonResponse({"error": "Author not found"}, status=status.HTTP_404_NOT_FOUND)

    try:
        Post.objects.get(uuid=post_id)
    except Post.DoesNotExist:
        return JsonResponse({"error": "Post not found"}, status=status.HTTP_404_NOT_FOUND)

    try:
        Comment.objects.get(uuid=comment_id)
    except Comment.DoesNotExist:
        return JsonResponse({"error": "Comment not found"}, status=status.HTTP_404_NOT_FOUND)

    likes = Like.objects.filter(object__contains=comment_search_string)
    like_serializer = LikeSerializer(likes, many=True)
    return JsonResponse(like_serializer.data, status=status.HTTP_200_OK, safe=False)


@api_view(['GET'])
@authentication_classes([BasicAuthentication])
@permission_classes([IsAuthenticated])
def author_like_list(request, author_id):
    try:
        like_author = User.objects.get(uuid=author_id)
    except User.DoesNotExist:
        return JsonResponse({"error": 'Author not found'}, status=status.HTTP_404_NOT_FOUND)
    likes = Like.objects.filter(author=like_author)
    serializer = LikeSerializer(likes, many=True)
    like_json = {'type': 'liked', 'items': serializer.data}
    return JsonResponse(like_json, safe=False)

@api_view(['GET'])
@authentication_classes([SessionAuthentication, BasicAuthentication])
@permission_classes([IsAuthenticated])
def inbox_like_list(request, author_id):
    try:
        inbox_author = User.objects.get(uuid=author_id)
    except User.DoesNotExist:
        return JsonResponse({"error": 'Author not found'}, status=status.HTTP_404_NOT_FOUND)
    search_string = "/author/" + str(author_id) + "/"
    likes = Like.objects.filter(object__contains=search_string)
    like_serializer = LikeSerializer(likes, many=True)
    return JsonResponse(like_serializer.data, status=status.HTTP_200_OK, safe=False)
