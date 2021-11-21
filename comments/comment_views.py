from django.http.response import JsonResponse
from rest_framework import status
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.parsers import JSONParser
from .serializers import CommentSerializer
from .models import Comment
from posts.models import Post
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated
from backend.helper import *

# Create your views here.


@api_view(['GET', 'POST'])
@authentication_classes([SessionAuthentication, BasicAuthentication])
@permission_classes([IsAuthenticated])
def comment_list(request, author_id, post_id):
    if request.method == 'GET':
        comments = Comment.objects.filter(post_id=post_id)
        serializer = CommentSerializer(comments, many=True)
        comment_json = {'type': 'comments',
                        'id': 'https://i-connect.herokuapp.com/service/author/'+str(author_id)+"/posts/"+str(post_id)+"/comments", 'comments': serializer.data,
                        'post': 'https://i-connect.herokuapp.com/service/author/'+str(author_id)+"/posts/"+str(post_id)
                        }

        return JsonResponse(comment_json, safe=False)
    elif request.method == 'POST':
        json_data = JSONParser().parse(request)
        print(json_data)
        uuid_data = comment_id_parser(json_data)
        serializer = CommentSerializer(data=json_data)
        if serializer.is_valid():
            post = Post.objects.get(id=post_id)
            new_comment = serializer.save()
            new_comment.post = post
            new_comment.uuid = uuid_data
            new_comment.save()
            return JsonResponse(serializer.data, status=status.HTTP_201_CREATED)
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
