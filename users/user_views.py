from django.http.response import JsonResponse
from django.db.models import Q
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.parsers import JSONParser
from .serializers import UserSerializer
from .models import User

# Create your views here.


@api_view(['GET'])
def author_list(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    return JsonResponse(serializer.data, safe=False)


@api_view(['GET', 'POST'])
def author_detail(request, id):
    """
    Retrieve, update or delete a user profile info.
    """
    try:
        user = User.objects.get(pk=id)
    except User.DoesNotExist:
        return JsonResponse({"error": "author not found"}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = UserSerializer(user)
        return JsonResponse(serializer.data)

    elif request.method == 'POST':
        user_json_data = JSONParser().parse(request)
        existing_users = User.objects.filter(user_name=user_json_data["user_name"])
        if(user.user_name != user_json_data["user_name"] and existing_users):
            return Response({"error": "user_name already exists"}, status=status.HTTP_400_BAD_REQUEST)
        serializer = UserSerializer(user, data=user_json_data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# need user object (including password)
@api_view(['POST'])
def signup(request):
    user_json_data = JSONParser().parse(request)
    current_user = User.objects.filter(Q(user_name = user_json_data["user_name"]) | Q(pk=user_json_data["id"]))
    if(current_user):
        return Response({"error": "author already exists"}, status=status.HTTP_400_BAD_REQUEST)
    password = user_json_data.pop("password")
    new_user_serializer = UserSerializer(data=user_json_data)
    if new_user_serializer.is_valid():
        new_user_object = new_user_serializer.save()
        new_user_object.password = password
        new_user_object.save()
        return JsonResponse(new_user_serializer.data, status=status.HTTP_201_CREATED)
    return Response(new_user_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# need username and password
@api_view(['POST'])
def login(request):
    login_json_data = JSONParser().parse(request)
    user_name = login_json_data["user_name"]
    password =login_json_data["password"]
    if((not user_name) or (not password)):
        return Response({"error": "incorrect form data"}, status=status.HTTP_400_BAD_REQUEST)
    existing_user = User.objects.filter(user_name=user_name, password=password)
    if(existing_user):
        existing_user_serializer = UserSerializer(existing_user[0])
        return JsonResponse(existing_user_serializer.data, status=status.HTTP_200_OK)
    return Response({"error": "invalid credential"}, status=status.HTTP_401_UNAUTHORIZED)