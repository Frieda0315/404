from django.http.response import JsonResponse
from rest_framework import status
from rest_framework.decorators import api_view
from .serializers import CommentSerializer, LikeSerializer
from .models import Like
from posts.models import Post
from comments.models import Comment

# Create your views here.

# TODO: check if the author_id matches the post/comment's author

# GET a list of likes from other authors on author_id’s post post_id
# @param {author_id} The author's id, we want to find the like under this author's post
# @param {post_id} The post's id, we want to find the like under this post


@api_view(['GET'])
def post_like_list(request, author_id, post_id):
    if request.method == 'GET':
        # find the post with input post_id and author_id
        # TODO: add author id filter
        # post = Post.objects.filter(author_id=author_id, post_id=post_id)
        post = Post.objects.filter(id=post_id)[0]
        if(not post):
            return JsonResponse({'status': 'false', 'message': 'like object not found'}, status=status.HTTP_404_NOT_FOUND)
        # search the like list of the found post
        likes = Like.objects.filter(post=post)
        if(not likes):
            return JsonResponse({'status': 'false', 'message': 'like object not found'}, status=status.HTTP_404_NOT_FOUND)
        serializer = LikeSerializer(likes, many=True)
        like_json = {'type': 'likes',
                     'post': 'http://127.0.0.1:5454/author/.../posts/...', 'likes': serializer.data}

        return JsonResponse(like_json, safe=False)


# GET a list of likes from other authors on author_id’s post post_id comment comment_id
# @param {author_id} The author's id, we want to find the like under this author's post's comment
# @param {post_id} The post's id, we want to find the like under this post's comment
# @param {comment_id} The comment's id, we want to find the like under this comment
@api_view(['GET'])
def comment_like_list(request, author_id, post_id, comment_id):
    if request.method == 'GET':
        # TODO: add author id filter
        #post = Post.objects.filter(author_id=author_id, id=post_id)
        post = Post.objects.filter(id=post_id)[0]
        comment = Comment.objects.filter(post_id=post_id, id=comment_id)[0]
        if((not post) or (not comment)):
            return JsonResponse({"error": "like object not found"}, status=status.HTTP_404_NOT_FOUND)
        likes = Like.objects.filter(post=post, comment=comment)
        if(not likes):
            return JsonResponse({"error": "like object not found"}, status=status.HTTP_404_NOT_FOUND)
        serializer = CommentSerializer(likes, many=True)
        like_json = {"type": 'likes',
                     "post": "http://127.0.0.1:5454/author/.../posts/.../comments/...", "likes": serializer.data}

        return JsonResponse(like_json, safe=False)


# GET list what public things author_id liked
# @param {author_id} The author's id, we want to find this author's likes
@api_view(['GET'])
def author_like_list(request, author_id):
    likes = Like.objects.filter(author_id=author_id)
    if(not likes):
        return JsonResponse({'status': 'false', 'message': 'like object not found'}, status=status.HTTP_404_NOT_FOUND)
    serializer = LikeSerializer(likes, many=True)
    like_json = {'type': 'liked', 'items': serializer.data}
    return JsonResponse(like_json, safe=False)
