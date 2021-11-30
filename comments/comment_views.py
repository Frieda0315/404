from django.http.response import JsonResponse
from rest_framework import status
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.parsers import JSONParser
from .serializers import CommentSerializer, CommentsSerializer
from .models import Comment, Comments
from posts.models import Post
from rest_framework.authentication import BasicAuthentication
from rest_framework.permissions import IsAuthenticated
from backend.helper import *
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger

# Create your views here.


@api_view(['GET', 'POST'])
@authentication_classes([BasicAuthentication])
@permission_classes([IsAuthenticated])
def comment_list(request, author_id, post_id):
    query_string = "author/"+str(author_id)+"/posts/"+str(post_id)
    if request.method == 'GET':
        comments = Comments.objects.filter(post__contains=query_string)
        if not comments:
            return JsonResponse({"error": "comment not found"}, status=status.HTTP_404_NOT_FOUND)
        # pagination
        size = request.GET.get('size', 10000)
        paginator = Paginator(comments, size)
        page = request.GET.get('page', 1)
        try:
            comments = paginator.page(page)
        except PageNotAnInteger:
            comments = paginator.page(1)
        except EmptyPage:
            comments = paginator.page(paginator.num_pages)

        serializer = CommentsSerializer(comments[0])
        return JsonResponse(serializer.data, safe=False)
    elif request.method == 'POST':
        json_data = JSONParser().parse(request)
        try:
            post = Post.objects.get(uuid=post_id)
        except Post.DoesNotExist:
            return JsonResponse({"error": "comment not found"}, status=status.HTTP_404_NOT_FOUND)
        comment_lists = Comments.objects.filter(
            post__contains=query_string)
        if not comment_lists:
            return JsonResponse({"error": "comment not found"}, status=status.HTTP_404_NOT_FOUND)
        comment_list = comment_lists[0]
        uuid_data = comment_id_parser(json_data)
        serializer = CommentSerializer(data=json_data)
        if serializer.is_valid():
            new_comment = serializer.save()
            new_comment.uuid = uuid_data
            new_comment.save()
            # Reference: https://docs.djangoproject.com/en/3.2/topics/db/examples/many_to_many/#many-to-many-relationships
            comment_list.comments.add(new_comment)
            comment_list.save()
            post.count += 1
            post.save()

            return JsonResponse(serializer.data, status=status.HTTP_201_CREATED)
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
