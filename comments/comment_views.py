from django.http.response import JsonResponse
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.parsers import JSONParser
from .serializers import CommentSerializer
from .models import Comment
from posts.models import Post
# Create your views here.


@api_view(['GET', 'POST'])
def comment_list(request, author_id, post_id):
    if request.method == 'GET':
        comments = Comment.objects.filter(post_id=post_id)
        serializer = CommentSerializer(comments, many=True)
        comment_json = {'type': 'comments',
                        'id': 'http://127.0.0.1:5454/author/...', 'comments': serializer.data}

        return JsonResponse(comment_json, safe=False)
    elif request.method == 'POST':
        json_data = JSONParser().parse(request)
        serializer = CommentSerializer(data=json_data)
        if serializer.is_valid():
            post = Post.objects.get(id=post_id)
            new_comment = serializer.save()
            new_comment.post = post
            new_comment.save()
            return JsonResponse(serializer.data, status=status.HTTP_201_CREATED)
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
