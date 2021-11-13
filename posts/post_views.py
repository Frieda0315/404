from django.http.response import JsonResponse
from rest_framework import status
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.response import Response
from rest_framework.parsers import JSONParser
from rest_framework.utils import json
from .serializers import PostSerializer
from .models import Post
from users.models import User
from backend.helper import *
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated

# Create your views here.


@api_view(['GET'])
@authentication_classes([SessionAuthentication, BasicAuthentication])
@permission_classes([IsAuthenticated])
def public_post(request):
    posts = Post.objects.filter(visibility="PUBLIC")
    serializer = PostSerializer(posts, many=True)
    return JsonResponse(serializer.data, safe=False)


@api_view(['GET', 'POST'])
@authentication_classes([SessionAuthentication, BasicAuthentication])
@permission_classes([IsAuthenticated])
def post_list(request, author_id):

    if request.method == 'GET':
        # retrieve all public posts
        # posts = Post.objects.filter(visibility="PUBLIC")
        # retrieve all posts of this author
        try:
            authorExist = User.objects.get(pk=author_id)
        except:
            return JsonResponse({"Error": "No such arthor"}, status=status.HTTP_400_BAD_REQUEST)

        posts = Post.objects.filter(author_id=author_id)
        serializer = PostSerializer(posts, many=True)
        return JsonResponse(serializer.data, safe=False)
    elif request.method == 'POST':
        # get POST JSON Object
        json_data = JSONParser().parse(request)
        try:
            authorObject = User.objects.get(id=json_data["author"]["id"])
        except:
            # if there is no such object to be found, it will raise an exception
            return JsonResponse({"Error": "No such arthor"}, status=status.HTTP_400_BAD_REQUEST)

        if(Post.objects.filter(pk=json_data["id"])):
            return JsonResponse({"Error": "Post with this ID already exists"}, status=status.HTTP_400_BAD_REQUEST)

        serializer = PostSerializer(data=json_data)
        if serializer.is_valid():
            # give POST object an attribute of author
            serializer.validated_data["author"] = authorObject
            return save_method(serializer)
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'POST', 'DELETE', 'PUT'])
@authentication_classes([SessionAuthentication, BasicAuthentication])
@permission_classes([IsAuthenticated])
def post_detail(request, author_id, id):  # this id here is postID
    """
    Retrieve, create, update or delete a code snippet.
    """

    if request.method == 'GET':
        try:
            post = Post.objects.get(pk=id)
            authorExists = User.objects.get(pk=author_id)
        except:
            return JsonResponse({"Error": "No such arthor or Post"}, status=status.HTTP_404_NOT_FOUND)

        if(post.author.id == author_id and post.visibility == 'PUBLIC'):
            serializer = PostSerializer(post)
            return JsonResponse(serializer.data)
        else:
            return JsonResponse({"Error": "This post is not public or not owned by this author"}, status=status.HTTP_404_NOT_FOUND)

    elif request.method == 'PUT':
        # create a new post with this id
        json_data = JSONParser().parse(request)
        print(json_data)
        try:
            authorObject = User.objects.get(id=json_data["author"]["id"])
        except:
            # if there is no such object to be found, it will raise an exception
            return JsonResponse({"Error": "No such arthor"}, status=status.HTTP_400_BAD_REQUEST)

        if(Post.objects.filter(pk=id)):
            return JsonResponse({"Error": "Post with this ID already exists"}, status=status.HTTP_400_BAD_REQUEST)

        serializer = PostSerializer(data=json_data)
        if serializer.is_valid():
            # give POST object an attribute of author
            serializer.validated_data["author"] = authorObject
            return save_method(serializer)
        print(serializer.errors)
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        try:
            post = Post.objects.get(pk=id)
        except:
            return JsonResponse({"Error": "No such post"}, status=status.HTTP_400_BAD_REQUEST)
        # if current post is owned by this author, then delete
        if(post.author.id == author_id):
            post.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        else:
            # you cannot delete other arthor's post
            return Response(status=status.HTTP_403_FORBIDDEN)

    elif request.method == 'POST':
        # edit this post
        json_data = JSONParser().parse(request)
        try:
            post = Post.objects.get(pk=id)
            authorObject = User.objects.get(id=json_data["author"]["id"])
        except:
            # if there is no such object to be found, it will raise an exception
            return JsonResponse({"Error": "No such arthor or post"}, status=status.HTTP_400_BAD_REQUEST)

        serializer = PostSerializer(post, data=json_data)

        if serializer.is_valid():
            if(post.author.id == author_id):
                serializer.save()
                print(serializer.data)
                return JsonResponse(serializer.data, status=status.HTTP_201_CREATED)
            else:
                return JsonResponse({"Error": "bad permission"}, status=status.HTTP_403_FORBIDDEN)
        return JsonResponse({"Error": "serilizer is not valid"}, status=status.HTTP_400_BAD_REQUEST)


# helper function under


# def imageHelper(request):
#     file_content = ContentFile(request.FILES['img'].read())
#     img = Post(name = request.FILES['img'].name, img = request.FILES['img'])
#     img.save()
