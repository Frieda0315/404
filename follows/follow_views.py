from django.http.response import JsonResponse
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.parsers import JSONParser
from .serializers import FollowSerializer
from .models import Follow
from users.models import User

# Create your views here.
@api_view(['GET'])
def follower_list(request, author_id):
    try:
        following = User.objects.get(pk = author_id)
    except User.DoesNotExist:
        return JsonResponse({"error": "no such author"}, status=status.HTTP_400_BAD_REQUEST)
    followers = Follow.objects.filter(following=following)
    follow_serializer = FollowSerializer(followers, many=True)
    follower_list = []
    for follow in follow_serializer.data:
        follower_list.append(follow["follower"])
    # follower_serializer.data
    return JsonResponse(follower_list, status=status.HTTP_200_OK, safe=False)