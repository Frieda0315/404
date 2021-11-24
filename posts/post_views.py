'''
pagination:
Reference: https://docs.djangoproject.com/en/3.2/topics/pagination/
Author: Django doc
'''
from django.core import paginator
from django.http.response import FileResponse, JsonResponse, HttpResponse
from rest_framework import status
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.response import Response
from rest_framework.parsers import JSONParser
from rest_framework.utils import json

from comments.models import Comments
from .serializers import PostSerializer
from .models import Post
from follows.models import Friend
from users.models import User
from backend.helper import *
from backend.settings import MEDIA_ROOT
from rest_framework.authentication import BasicAuthentication
from rest_framework.permissions import IsAuthenticated
from django.db.models import Q
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from django.core.files.base import ContentFile
import base64
import os


# Create your views here.


@api_view(['GET'])
@authentication_classes([BasicAuthentication])
@permission_classes([IsAuthenticated])
def stream_public_post(request, author_id):
    '''
    Get all posts this author can see
    '''
    try:
        current_user = User.objects.get(uuid=author_id)
    except User.DoesNotExist:
        return JsonResponse({"error": "author not found"}, status=status.HTTP_404_NOT_FOUND)

    friends = Friend.objects.filter(
        Q(first_user_id=author_id) | Q(second_user_id=author_id))
    friend_authors = []
    for friend_object in friends:
        if friend_object.first_user == current_user:
            friend_authors.append(friend_object.second_user)
        else:
            friend_authors.append(friend_object.first_user)
    all_post_list = []
    for author in friend_authors:
        friend_posts = Post.objects.filter(
            author_id=author.id, visibility="FRIENDS", shared=False)
        all_post_list += friend_posts

    public_post_list = Post.objects.filter(
        visibility="PUBLIC", unlisted=False).order_by('-published')
    all_post_list += public_post_list
    paginator = Paginator(all_post_list, 3)
    page = request.GET.get('page', 1)
    try:
        all_post_list = paginator.page(page)
    except PageNotAnInteger:
        all_post_list = paginator.page(1)
    except EmptyPage:
        all_post_list = paginator.page(paginator.num_pages)

    serializer = PostSerializer(all_post_list, many=True)
    return JsonResponse(serializer.data, safe=False)


@api_view(['GET', 'POST'])
@authentication_classes([BasicAuthentication])
@permission_classes([IsAuthenticated])
def post_list(request, author_id):

    if request.method == 'GET':
        # GET get recent posts of author (paginated)
        try:
            author_exist = User.objects.get(uuid=author_id)
        except:
            return JsonResponse({"Error": "No such arthor"}, status=status.HTTP_400_BAD_REQUEST)

        posts = Post.objects.filter(
            author=author_exist, shared=False).order_by('-published')
        paginator = Paginator(posts, 3)
        page = request.GET.get('page', 1)

        try:
            posts = paginator.page(page)
        except PageNotAnInteger:
            posts = paginator.page(1)
        except EmptyPage:
            posts = paginator.page(paginator.num_pages)

        serializer = PostSerializer(posts, many=True)

        return JsonResponse(serializer.data, safe=False)
    elif request.method == 'POST':
        # get POST JSON Object
        json_data = JSONParser().parse(request)
        try:
            authorObject = User.objects.get(uuid=author_id)
        except:
            # if there is no such object to be found, it will raise an exception
            return JsonResponse({"Error": "No such arthor"}, status=status.HTTP_400_BAD_REQUEST)

        if(Post.objects.filter(id=json_data["id"])):
            return JsonResponse({"Error": "Post with this ID already exists"}, status=status.HTTP_400_BAD_REQUEST)
        uuid_data = post_id_parser(json_data)

        serializer = PostSerializer(data=json_data)
        if serializer.is_valid():
            # give POST object an attribute of author
            new_post = serializer.save()
            new_post.uuid = uuid_data
            if json_data["contentType"] == "image/png;base64" or json_data["contentType"] == "image/jpeg;base64":
                image_file = imageUploader(json_data, uuid_data)
                new_post.image = image_file
            new_post.save()
            return JsonResponse(serializer.data, status=status.HTTP_201_CREATED)
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'POST', 'DELETE', 'PUT'])
def post_detail(request, author_id, id):  # this id here is postID
    """
    Retrieve, create, update or delete a code snippet.
    """

    if request.method == 'GET':
        try:
            post = Post.objects.get(uuid=id)
            author_exists = User.objects.get(uuid=author_id)
        except:
            return JsonResponse({"Error": "No such arthor or Post"}, status=status.HTTP_404_NOT_FOUND)

        if(post.author == author_exists and post.visibility == 'PUBLIC'):
            if post.contentType == "image/png;base64":
                binary = base64.b64decode(post.content)
                return HttpResponse(binary, content_type='image/png')
            elif post.contentType == "image/jpeg;base64":
                binary = base64.b64decode(post.content)
                return HttpResponse(binary, content_type='image/jpeg')
            serializer = PostSerializer(post)
            return JsonResponse(serializer.data)
        else:
            return JsonResponse({"Error": "This post is not public or not owned by this author"}, status=status.HTTP_404_NOT_FOUND)

    elif request.method == 'PUT':
        # create a new post with this id
        json_data = JSONParser().parse(request)
        try:
            authorObject = User.objects.get(uuid=author_id)
        except:
            # if there is no such object to be found, it will raise an exception
            return JsonResponse({"Error": "No such arthor"}, status=status.HTTP_400_BAD_REQUEST)

        if(Post.objects.filter(uuid=id)):
            return JsonResponse({"Error": "Post with this ID already exists"}, status=status.HTTP_400_BAD_REQUEST)
        uuid_data = post_id_parser(json_data)
        serializer = PostSerializer(data=json_data)
        print(serializer)
        if serializer.is_valid():
            # give POST object an attribute of author
            new_post = serializer.save()
            new_post.uuid = uuid_data
            if json_data["contentType"] == "image/png;base64" or json_data["contentType"] == "image/jpeg;base64":
                image_file = imageUploader(json_data, uuid_data)
                new_post.image = image_file
            new_post.save()
            return JsonResponse(serializer.data, status=status.HTTP_201_CREATED)
        print(serializer.errors)
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        try:
            post = Post.objects.get(uuid=id)
            author_exists = User.objects.get(uuid=author_id)
        except:
            return JsonResponse({"Error": "No such post"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            comments = Comments.objects.get(post=post.id)
        except Comments.DoesNotExist:
            return JsonResponse({"Error": "No such post"}, status=status.HTTP_400_BAD_REQUEST)
        # if current post is owned by this author, then delete
        if(post.author == author_exists):
            post.delete()
            comments.delete()
            if post.contentType == "image/png;base64":
                os.remove(os.path.join(
                    MEDIA_ROOT, "images/" + str(id) + ".png"))
            elif post.contentType == "image/jpeg;base64":
                os.remove(os.path.join(
                    MEDIA_ROOT, "images/" + str(id) + ".jpeg"))
            return Response(status=status.HTTP_204_NO_CONTENT)
        else:
            # you cannot delete other arthor's post
            return Response(status=status.HTTP_403_FORBIDDEN)

    elif request.method == 'POST':
        # edit this post
        json_data = JSONParser().parse(request)
        try:
            post = Post.objects.get(uuid=id)
            author_exists = User.objects.get(uuid=author_id)
        except:
            # if there is no such object to be found, it will raise an exception
            return JsonResponse({"Error": "No such arthor or post"}, status=status.HTTP_400_BAD_REQUEST)

        serializer = PostSerializer(post, data=json_data)

        if serializer.is_valid():
            if(post.author == author_exists):
                new_post = serializer.save()
                if json_data["contentType"] == "image/png;base64" or json_data["contentType"] == "image/jpeg;base64":
                    image_file = imageUploader(json_data, id)
                    new_post.image = image_file
                    new_post.save()
                return JsonResponse(serializer.data, status=status.HTTP_201_CREATED)
            else:
                return JsonResponse({"Error": "bad permission"}, status=status.HTTP_403_FORBIDDEN)
        return JsonResponse({"Error": "serilizer is not valid"}, status=status.HTTP_400_BAD_REQUEST)


# helper function under

def imageUploader(json_data, id):
    if os.path.isfile(os.path.join(MEDIA_ROOT, "images/" + str(id) + ".png")):
        os.remove(os.path.join(
            MEDIA_ROOT, "images/" + str(id) + ".png"))
    image_data = base64.b64decode(json_data["content"])
    image_name = json_data["id"].split("/")[-1]
    if json_data["contentType"] == "image/png;base64":
        image_extension = ".png"
    else:
        image_extension = ".jpeg"
    image_file = ContentFile(
        image_data, image_name+image_extension)
    return image_file
# def imageHelper(request):
#     file_content = ContentFile(request.FILES['img'].read())
#     img = Post(name = request.FILES['img'].name, img = request.FILES['img'])
#     img.save()
