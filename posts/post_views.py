from django.http.response import JsonResponse
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.parsers import JSONParser
from .serializers import PostSerializer
from .models import Post
from users.models import User


# Create your views here.

@api_view(['GET'])
def public_post(request):
    posts = Post.objects.filter(visibility="PUBLIC")
    serializer = PostSerializer(posts, many=True)
    return JsonResponse(serializer.data, safe=False)

@api_view(['GET', 'POST'])
def post_list(request, author_id):
    if request.method == 'GET':

        # retrieve all public posts
        posts = Post.objects.filter(visibility="PUBLIC")
        # retrieve all posts of this author， this might be a bug
        #posts = posts.filter(author_id=author_id)
        serializer = PostSerializer(posts, many=True)
        return JsonResponse(serializer.data, safe=False)
    elif request.method == 'POST':
        # get POST JSON Object
        json_data = JSONParser().parse(request)
        serializer = PostSerializer(data=json_data)
        if serializer.is_valid():
            serializer.validated_data["author"] = User.objects.get(
                id=json_data["author"]["id"])
            serializer.save()
            return JsonResponse(serializer.data, status=status.HTTP_201_CREATED)
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE', 'PUT'])
def post_detail(request, author_id, id):  # this id here is postID
    """
    Retrieve, update or delete a code snippet.
    """
    try:
        post = Post.objects.get(pk=id)
    except Post.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = PostSerializer(post)
        return JsonResponse(serializer.data)

    elif request.method == 'PUT':
        # use serilizer to change post instance data to current request data
        serializer = PostSerializer(post, data=request.data)
        # if you are modifying your own posts
        if(post.author.id == author_id):
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
        # modifying others posts is not allowed
        else:
            return Response(status.HTTP_403_FORBIDDEN)
        # return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        # posts = Post.objects.filter(author_id=)
        # print(post._meta.get_field("published"))
        # print(request.user.id)
        # print(post.author.id)
        post = Post.objects.get(pk=id)
        # if current post is owned by this author, then delete
        if(post.author.id == author_id):
            post.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        else:
            # you cannot delete other arthor's post
            return Response(status=status.HTTP_403_FORBIDDEN)

    # TODO
    # elif request.method == 'POST':


# helper function under


# def imageHelper(request):
#     file_content = ContentFile(request.FILES['img'].read())
#     img = Post(name = request.FILES['img'].name, img = request.FILES['img'])
#     img.save()
