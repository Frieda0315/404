import re
from django.test import TestCase, testcases
import uuid
from comments.comment_views import comment_list
from comments.models import Comment
from inbox.inbox_views import inbox_list
from likes.like_views import author_like_list, comment_like_list, post_like_list
from users import *
import users
from users.models import User
from posts.models import Post
from likes.models import Like
from comments.models import Comment
from inbox.models import Inbox
from follows.models import *

from datetime import datetime
from django.urls import reverse, resolve
from posts.post_views import *
from users.user_views import *
from comments.comment_views import *
from follows.follow_views import *

from django.test.client import Client
from rest_framework.test import APIClient
from django.contrib.auth.models import User as UUser


class ModelTests(TestCase):
    def init_author(self, id="testID", uuid=uuid.uuid4(), host="testhost", displayName="test_user", url="123@test", github="test_git", profileImage="image", password='1234', type="author", pending=True):
        return User(
            id=id,
            host=host,
            displayName=displayName,
            url=url,
            profileImage=profileImage,

            uuid=uuid,
            password=password,
            github=github,
            type=type,
            pending=pending
        )

    def init_post(self, type="post", author=None, title="testingPost", content="testingContent", contentType="post", published=datetime.now(), visibility='PUBLIC', source="source@test.com", origin="origin@test.com", shared="shared@test.com"):
        if author == None:
            a = self.init_author()
        return Post(
            author=a,
            title=title,
            content=content,
            contentType=contentType,
            published=published,
            source=source,
            origin=origin,
            shared=shared,
            visibility=visibility,
        )

    def init_comment(self, type="testingType", author=None, comment="testingComment", contentType="testingType", published=datetime.now(), id="localhost:8000//author/authorID/post/postID/comment/commentID", uuid=uuid.uuid4()):
        if author == None:
            a = self.init_author()
        return Comment(
            type=type,
            author=a,
            comment=comment,
            contentType=contentType,
            published=published,
            uuid=uuid,
            id=id
        )

    def init_comments(self, type="comments", page=10, size=5, post="post", id="id", comments=None):
        return Comments(
        )

    def init_likes(self, id=uuid.uuid4(), author=None, summary="testingSummary", type="testingType", object="testingObject", inbox=True):
        if author == None:
            a = self.init_author()
        return Like(
            id=id,
            author=a,
            summary=summary,
            type=type,
            object=object,
            inbox=inbox
        )

    def init_inbox(self, post=None, receive_author=None):
        if receive_author == None:
            r = self.init_author()
            r.save()
        instance = Inbox.objects.create(receive_author=r)
        p = self.init_post()
        p.save()
        instance.post.add(p)
        return instance

    def init_follow(self, id=uuid.uuid4(), follower=None, following=None):
        if follower == None:
            Follower = self.init_author()
        if following == None:
            Following = self.init_author()
        return Follow(
            id=id,
            follower=Follower,
            following=Following
        )

    def init_friend(self, id=uuid.uuid4(), first_user=None, second_user=None):
        if(first_user == None):
            First_user = self.init_author()
        if(second_user == None):
            Second_user = self.init_author()
        return Friend(
            id=id,
            first_user=First_user,
            second_user=Second_user
        )

    def init_friendRequest(self, type="FriendRequest", id=uuid.uuid4(), summary="testSummary", actor=None, object=None):
        if(actor == None):
            Actor = self.init_author()
        if(object == None):
            Object = self.init_author()
        return FriendRequest(
            type=type,
            summary=summary,
            actor=Actor,
            object=Object
        )

    def test_author(self):
        # id="testID", uuid=uuid.uuid4(), host="testhost", displayName="test_user", url="123@test", github="test_git", profileImage="image", password='1234', type="author", pending=True
        authorInstance = self.init_author()
        self.assertTrue(isinstance(authorInstance, User))
        self.assertEqual(authorInstance.id, "testID")
        self.assertEqual(authorInstance.host, "testhost")
        self.assertEqual(authorInstance.displayName, "test_user")
        self.assertEqual(authorInstance.url, "123@test")
        self.assertEqual(authorInstance.github, "test_git")
        self.assertEqual(authorInstance.profileImage, "image")
        self.assertEqual(authorInstance.pending, True)
        self.assertEqual(authorInstance.type, "author")

    def test_post(self):
        # type="post", author=None, title="testingPost", content="testingContent", contentType="post", published=datetime.now(), visibility='PUBLIC', source="source@test.com", origin="origin@test.com", shared="shared@test.com"
        p = self.init_post()
        self.assertTrue(isinstance(p, Post))
        self.assertTrue(isinstance(p.author, User))

        self.assertEqual(p.title, "testingPost")
        self.assertEqual(p.content, "testingContent")
        self.assertEqual(p.contentType, "post")
        self.assertEqual(p.visibility, 'PUBLIC')
        self.assertEqual(p.source, "source@test.com")
        self.assertEqual(p.origin, "origin@test.com")
        self.assertEqual(p.shared, "shared@test.com")

        self.assertEqual(p.author.displayName, "test_user")
        self.assertEqual(p.author.type, "author")
        self.assertEqual(p.author.github, "test_git")

    def test_comment(self):
        comment = self.init_comment()
        self.assertTrue(isinstance(comment, Comment))
        self.assertTrue(isinstance(comment.author, User))
        self.assertTrue(isinstance(comment.published, datetime))
        self.assertTrue(isinstance(comment.uuid, uuid.UUID))
        self.assertEqual(comment.type, "testingType")
        self.assertEqual(comment.comment, "testingComment")
        self.assertEqual(comment.contentType, 'testingType')

    def test_like(self):
        like = self.init_likes()
        self.assertTrue(isinstance(like.author, User))
        self.assertEqual(like.summary, "testingSummary")
        self.assertEqual(like.type, 'testingType')
        self.assertEqual(like.object, "testingObject")
        self.assertEqual(like.inbox, True)

    # def test_inbox(self):
    #     inbox = self.init_inbox()
    #     # print(type(inbox.post))
    #     # print("haha")
    #     self.assertTrue(isinstance(inbox.receive_author, User))
    #     #self.assertTrue(isinstance(inbox.post, Post))

    def test_follow(self):
        follow = self.init_follow()
        self.assertTrue(isinstance(follow.follower, User))
        self.assertTrue(isinstance(follow.following, User))

    def test_friend(self):
        friend = self.init_friend()
        self.assertTrue(isinstance(friend.first_user, User))
        self.assertTrue(isinstance(friend.second_user, User))

    def test_friendRequest(self):
        friendRequest = self.init_friendRequest()
        self.assertTrue(isinstance(friendRequest.actor, User))
        self.assertTrue(isinstance(friendRequest.object, User))

        self.assertEqual(friendRequest.type, 'FriendRequest')
        self.assertEqual(friendRequest.summary, 'testSummary')


class URLTests(TestCase):

    def test_post_list(self):
        url = reverse("post_list", args=[
                      "123e4567-e89b-12d3-a456-426614174000"])
        self.assertEqual(resolve(url).func, post_list)

    def test_post_detail(self):
        url = reverse("post_detail", args=[
                      "123e4567-e89b-12d3-a456-426614174000", "123e4567-e89b-12d3-a456-426614174000"])
        self.assertEqual(resolve(url).func, post_detail)

    def test_posts(self):
        url = reverse("stream_public_post", args=[
                      "123e4567-e89b-12d3-a456-426614174000"])
        self.assertEqual(resolve(url).func, stream_public_post)

    def test_author_list(self):
        url = reverse("author_list")
        self.assertEqual(resolve(url).func, author_list)

    def test_author_detail(self):
        url = reverse("author_detail", args=[
                      "123e4567-e89b-12d3-a456-426614174000"])
        self.assertEqual(resolve(url).func, author_detail)

    def test_signup(self):
        url = reverse("signup")
        self.assertEqual(resolve(url).func, signup)

    def test_login(self):
        url = reverse("login")
        self.assertEqual(resolve(url).func, login)

    # two redirect path havn't done yet

    def test_comment_list(self):
        url = reverse("comment_list", args=[
                      "123e4567-e89b-12d3-a456-426614174000", "123e4567-e89b-12d3-a456-426614174000"])
        self.assertEqual(resolve(url).func, comment_list)

    def test_post_like_list(self):
        url = reverse("post_like_list", args=[
                      "123e4567-e89b-12d3-a456-426614174000", "123e4567-e89b-12d3-a456-426614174000"])
        self.assertEqual(resolve(url).func, post_like_list)

    def test_comment_like_list(self):
        url = reverse("comment_like_list", args=[
                      "123e4567-e89b-12d3-a456-426614174000", "123e4567-e89b-12d3-a456-426614174000", "123e4567-e89b-12d3-a456-426614174000"])
        self.assertEqual(resolve(url).func, comment_like_list)

    def test_author_like_list(self):
        url = reverse("author_like_list", args=[
                      "123e4567-e89b-12d3-a456-426614174000"])
        self.assertEqual(resolve(url).func, author_like_list)

    def test_follower_list(self):
        url = reverse("follower_list", args=[
                      "123e4567-e89b-12d3-a456-426614174000"])
        self.assertEqual(resolve(url).func, follower_list)

    # TODO:follower_detail, friend_list
    def test_follower_detail(self):
        url = reverse("follower_detail", args=[
                      "123e4567-e89b-12d3-a456-426614174000", "123e4567-e89b-12d3-a456-426614174000"])
        self.assertEqual(resolve(url).func, follower_detail)

    def test_friend_list(self):
        url = reverse("friend_list", args=[
                      "123e4567-e89b-12d3-a456-426614174000"])
        self.assertEqual(resolve(url).func, friend_list)

    def test_inbox_list(self):
        url = reverse("inbox_list", args=[
                      "123e4567-e89b-12d3-a456-426614174000"])
        self.assertEqual(resolve(url).func, inbox_list)


client = APIClient()
client.credentials(HTTP_AUTHORIZATION='Basic YWRtaW46YWRtaW4=')


class AuthorTests(TestCase):

    def setUp(self):

        self.auth1 = UUser.objects.create_superuser(
            username="admin", email="", password="admin")

        self.testUser1 = {
            "type": "author",
            "id": "10",
            "host": "https://i-connect.herokuapp.com",
            "displayName": "TestUser1",
            "url": "http://127.0.0.1:8000/author/10",
            "github": "https://github.com/testUser10",
            "profileImage": "None",
            "uuid": "10",
            "password": "1234",
            "pending": "False",
        }

        self.testUser2 = {
            "type": "author",
            "id": "20",
            "host": "https://i-connect.herokuapp.com",
            "displayName": "TestUser2",
            "url": "http://127.0.0.1:8000/author/20",
            "github": "https://github.com/testUser20",
            "profileImage": "None",
            "uuid": "20",
            "password": "1234",
            "pending": "False",
        }

        self.testUser1Obj = User.objects.create(**self.testUser1)
        self.testUser2Obj = User.objects.create(**self.testUser2)
        return None

    def test_get_all_authors(self):
        r = client.get(
            'http://127.0.0.1:8000/service/authors/')
        try:
            result = r.json()
        except:
            self.assertTrue(False, "result cannot convert into JSON")

        self.assertEqual(r.status_code, 200)
        self.assertEqual(type(result), dict)
        self.assertEqual(result["type"], "authors")
        self.assertEqual(type(result["items"]), list)
        self.assertEqual(len(result["items"]), 2)
        self.testUser1.pop("password")
        self.testUser1.pop("uuid")
        self.testUser1.pop("pending")
        self.testUser2.pop("password")
        self.testUser2.pop("uuid")
        self.testUser2.pop("pending")
        self.assertEqual(self.testUser1, result["items"][0])
        self.assertEqual(self.testUser2, result["items"][1])

    def test_author_detail(self):
        r = client.get(
            'http://127.0.0.1:8000/service/author/20/')

        print(r.status_code)
        try:
            result = r.json()
        except:
            self.assertTrue(False, "result cannot convert into JSON")

        self.assertEqual(type(result), dict)
        self.assertEqual(result["id"], "20")
        self.assertEqual(result["displayName"], "TestUser2")
        update_data = {
            "type": "author",
            "id": "20",
            "host": "https://i-connect.herokuapp.com",
            "displayName": "TestUser2",
            "url": "http://127.0.0.1:8000/author/20",
            "github": "https://github.com/testUser20_updated",
            "profileImage": "None",
        }

        r = client.post(
            'http://127.0.0.1:8000/service/author/30/', update_data, format='json')
        self.assertEqual(r.status_code, 404)

        r = client.post(
            'http://127.0.0.1:8000/service/author/20/', update_data, format='json')

        result = r.json()
        self.assertEqual(result["github"],
                         "https://github.com/testUser20_updated")

        r = client.delete(
            'http://127.0.0.1:8000/service/author/20/')
        self.assertEqual(r.status_code, 204)
        r = client.get(
            'http://127.0.0.1:8000/service/author/20/')
        self.assertEqual(r.status_code, 404)


class PostTests(TestCase):
    def setUp(self):

        self.auth1 = UUser.objects.create_superuser(
            username="admin", email="", password="admin")

        self.testUser1 = {
            "type": "author",
            "id": "10",
            "host": "https://i-connect.herokuapp.com",
            "displayName": "TestUser1",
            "url": "http://127.0.0.1:8000/author/10",
            "github": "https://github.com/testUser10",
            "profileImage": "None",
            "uuid": "10",
            "password": "1234",
            "pending": "False",
        }

        self.testUser2 = {
            "type": "author",
            "id": "20",
            "host": "https://i-connect.herokuapp.com",
            "displayName": "TestUser2",
            "url": "http://127.0.0.1:8000/author/20",
            "github": "https://github.com/testUser20",
            "profileImage": "None",
            "uuid": "20",
            "password": "1234",
            "pending": "False",
        }

        self.testUser1Obj = User.objects.create(**self.testUser1)
        self.testUser2Obj = User.objects.create(**self.testUser2)

    def test_post_no_id(self):
        post_data = {
            "type": "post",
            "title": "post_title",
            "id": "http://127.0.0.1:8000/author/10/posts/10",
            "source": "http://lastplaceigotthisfrom.com/posts/yyyyy",
            # where is it actually from
            "origin": "http://whereitcamefrom.com/posts/zzzzz",
            # a brief description of the post
            "description": "test_descr",
            "contentType": "text/plain",
            "content": "test_content",
            "author": {
                "type": "author",
                "id": "10",
                "host": "https://i-connect.herokuapp.com",
                "displayName": "TestUser1",
                "url": "http://127.0.0.1:8000/author/10",
                "github": "https://github.com/testUser10",
                "profileImage": "None",
            },
            "categories": ["web", "tutorial"],
            "count": 0,
            "comments": "http://127.0.0.1:5454/author/10/posts/10/comments",
            "commentsSrc": {
                "type": "comments",
                "page": 1,
                "size": 5,
                "post": "http://127.0.0.1:5454/author/10/posts/10",
                "id": "http://127.0.0.1:5454/author/10/posts/10/comments",
                "comments": [
                ]
            },
            "published": "2015-03-09T13:07:04+00:00",
            "visibility": "PUBLIC",
            "unlisted": False
        }
        r = client.post(
            'http://127.0.0.1:8000/service/author/10/posts/', post_data, format='json')
        result = r.json()
        self.assertEqual(r.status_code, 201)

        r = client.get(
            'http://127.0.0.1:8000/service/author/10/posts/')
        result = r.json()
        self.assertEqual(r.status_code, 200)
        self.testUser1.pop("uuid")
        self.testUser1.pop("password")
        self.testUser1.pop("pending")
        for i in range(len(result)):
            self.assertEqual(result[i]["author"], self.testUser1)

    def test_post_with_id(self):
        post_data = {
            "type": "post",
            "title": "post_title",
            "id": "http://127.0.0.1:8000/author/20/posts/20",
            "source": "http://lastplaceigotthisfrom.com/posts/yyyyy",
            # where is it actually from
            "origin": "http://whereitcamefrom.com/posts/zzzzz",
            # a brief description of the post
            "description": "test_descr",
            "contentType": "text/plain",
            "content": "test_content",
            "author": {
                "type": "author",
                "id": "20",
                "host": "https://i-connect.herokuapp.com",
                "displayName": "TestUser2",
                "url": "http://127.0.0.1:8000/author/20",
                "github": "https://github.com/testUser20",
                "profileImage": "None",
                "uuid": "20",
                "password": "1234",
                "pending": "False",
            },
            "categories": ["web", "tutorial"],
            "count": 0,
            "comments": "http://127.0.0.1:8000/author/20/posts/20/comments",
            "commentsSrc": {
                "type": "comments",
                "page": 1,
                "size": 5,
                "post": "http://127.0.0.1:8000/author/20/posts/20",
                "id": "http://127.0.0.1:8000/author/20/posts/20/comments",
                "comments": [
                ]
            },
            "published": "2015-03-09T13:07:04+00:00",
            "visibility": "PUBLIC",
            "unlisted": False
        }

        r = client.put(
            'http://127.0.0.1:8000/service/author/20/posts/20/', post_data, format='json')
        result = r.json()
        self.assertEqual(r.status_code, 201)
        self.assertEqual(type(result), dict)
        self.assertEqual(
            result["id"], "http://127.0.0.1:8000/author/20/posts/20")

        r = client.get(
            'http://127.0.0.1:8000/service/author/20/posts/20/')
        result = r.json()
        self.assertEqual(r.status_code, 200)
        self.testUser2.pop("uuid")
        self.testUser2.pop("password")
        self.testUser2.pop("pending")
        self.assertEqual(result["author"], self.testUser2)

        post_data["title"] = "update it's title"
        r = client.post(
            'http://127.0.0.1:8000/service/author/20/posts/20/', post_data, format='json')
        result = r.json()
        self.assertEqual(r.status_code, 201)
        self.assertEqual(result["title"], "update it's title")

        r = client.delete(
            'http://127.0.0.1:8000/service/author/20/posts/20/')
        self.assertEqual(r.status_code, 204)
        r = client.get(
            'http://127.0.0.1:8000/service/author/20/posts/20/')
        self.assertEqual(r.status_code, 404)


class CommentTests(TestCase):
    def setUp(self):

        self.auth1 = UUser.objects.create_superuser(
            username="admin", email="", password="admin")

        self.testUser1 = {
            "type": "author",
            "id": "10",
            "host": "https://i-connect.herokuapp.com",
            "displayName": "TestUser1",
            "url": "http://127.0.0.1:8000/author/10",
            "github": "https://github.com/testUser10",
            "profileImage": "None",
            "uuid": "10",
            "password": "1234",
            "pending": "False",
        }

        self.testUser2 = {
            "type": "author",
            "id": "20",
            "host": "https://i-connect.herokuapp.com",
            "displayName": "TestUser2",
            "url": "http://127.0.0.1:8000/author/20",
            "github": "https://github.com/testUser20",
            "profileImage": "None",
            "uuid": "20",
            "password": "1234",
            "pending": "False",
        }

        post_data = {
            "type": "post",
            "title": "post_title",
            "id": "http://127.0.0.1:8000/author/20/posts/20",
            "source": "http://lastplaceigotthisfrom.com/posts/yyyyy",
            # where is it actually from
            "origin": "http://whereitcamefrom.com/posts/zzzzz",
            # a brief description of the post
            "description": "test_descr",
            "contentType": "text/plain",
            "content": "test_content",
            "author": {
                "type": "author",
                "id": "20",
                "host": "https://i-connect.herokuapp.com",
                "displayName": "TestUser2",
                "url": "http://127.0.0.1:8000/author/20",
                "github": "https://github.com/testUser20",
                "profileImage": "None",
                "uuid": "20",
                "password": "1234",
                "pending": "False",
            },
            "categories": ["web", "tutorial"],
            "count": 0,
            "comments": "http://127.0.0.1:8000/author/20/posts/20/comments",
            "commentsSrc": {
                "type": "comments",
                "page": 1,
                "size": 5,
                "post": "http://127.0.0.1:8000/author/20/posts/20",
                "id": "http://127.0.0.1:8000/author/20/posts/20/comments",
                "comments": [
                ]
            },
            "published": "2015-03-09T13:07:04+00:00",
            "visibility": "PUBLIC",
            "unlisted": False
        }

        self.testUser1Obj = User.objects.create(**self.testUser1)
        self.testUser2Obj = User.objects.create(**self.testUser2)

        r = client.put(
            'http://127.0.0.1:8000/service/author/20/posts/20/', post_data, format='json')

    def test_comment(self):
        comment_data = {
            "type": "comment",
            "author": {
                "type": "author",
                "id": "20",
                "host": "https://i-connect.herokuapp.com",
                "displayName": "TestUser2",
                "url": "http://127.0.0.1:8000/author/20",
                "github": "https://github.com/testUser20",
                "profileImage": "None",
            },
            "comment": "test_comment",
            "contentType": "text/markdown",
            "published": "2015-03-09T13:07:04+00:00",
            # ID of the Comment (UUID)
            "id": "http://127.0.0.1:8000/author/20/posts/20/comments/123e4567-e89b-12d3-a456-426614174000",
        }

        r = client.post(
            'http://127.0.0.1:8000/service/author/20/posts/20/comments/', comment_data, format='json')
        result = r.json()
        self.assertEqual(r.status_code, 201)

        # published time will always have 1-2seconds diff, so eliminate them
        comment_data.pop("published")
        result.pop("published")
        self.assertEqual(comment_data, result)

        r = client.get(
            'http://127.0.0.1:8000/service/author/20/posts/20/comments/')
        result = r.json()
        self.assertEqual(r.status_code, 200)
        result["comments"][0].pop("published")
        self.assertEqual(comment_data, result["comments"][0])


class LikeTests(TestCase):
    def setUp(self) -> None:
        self.auth1 = UUser.objects.create_superuser(
            username="admin", email="", password="admin")

        self.testUser1 = {
            "type": "author",
            "id": "10",
            "host": "https://i-connect.herokuapp.com",
            "displayName": "TestUser1",
            "url": "http://127.0.0.1:8000/author/10",
            "github": "https://github.com/testUser10",
            "profileImage": "None",
            "uuid": "10",
            "password": "1234",
            "pending": "False",
        }

        self.testUser2 = {
            "type": "author",
            "id": "20",
            "host": "https://i-connect.herokuapp.com",
            "displayName": "TestUser2",
            "url": "http://127.0.0.1:8000/author/20",
            "github": "https://github.com/testUser20",
            "profileImage": "None",
            "uuid": "20",
            "password": "1234",
            "pending": "False",
        }

        # suppose author2 post a post
        post_data = {
            "type": "post",
            "title": "post_title",
            "id": "http://127.0.0.1:8000/author/20/posts/20",
            "source": "http://lastplaceigotthisfrom.com/posts/yyyyy",
            # where is it actually from
            "origin": "http://whereitcamefrom.com/posts/zzzzz",
            # a brief description of the post
            "description": "test_descr",
            "contentType": "text/plain",
            "content": "test_content",
            "author": {
                "type": "author",
                "id": "20",
                "host": "https://i-connect.herokuapp.com",
                "displayName": "TestUser2",
                "url": "http://127.0.0.1:8000/author/20",
                "github": "https://github.com/testUser20",
                "profileImage": "None",
                "uuid": "20",
                "password": "1234",
                "pending": "False",
            },
            "categories": ["web", "tutorial"],
            "count": 0,
            "comments": "http://127.0.0.1:8000/author/20/posts/20/comments",
            "commentsSrc": {
                "type": "comments",
                "page": 1,
                "size": 5,
                "post": "http://127.0.0.1:8000/author/20/posts/20",
                "id": "http://127.0.0.1:8000/author/20/posts/20/comments",
                "comments": [
                ]
            },
            "published": "2015-03-09T13:07:04+00:00",
            "visibility": "PUBLIC",
            "unlisted": False
        }

        self.testUser1Obj = User.objects.create(**self.testUser1)
        self.testUser2Obj = User.objects.create(**self.testUser2)

        r = client.put(
            'http://127.0.0.1:8000/service/author/20/posts/20/', post_data, format='json')

    def test_likes(self):
        inbox_data = {
            "summary": "TestUser1 Likes your post",
            "type": "Like",
            "author": {
                "type": "author",
                "id": "10",
                "host": "https://i-connect.herokuapp.com",
                "displayName": "TestUser1",
                "url": "http://127.0.0.1:8000/author/10",
                "github": "https://github.com/testUser10",
                "profileImage": "None",
            },
            "object": "http://127.0.0.1:8000/author/20/posts/20"
        }
        #inboxObj = Inbox.objects.create(**inbox_data)
        r = client.post(
            'http://127.0.0.1:8000/service/author/20/inbox/', inbox_data, format='json')
        result = r.json()
        self.assertEqual(r.status_code, 201)
        self.assertEqual(result["type"], "Like")
        self.assertEqual(result["summary"], 'TestUser1 Likes your post')
        self.assertEqual(result["object"],
                         "http://127.0.0.1:8000/author/20/posts/20")
        self.testUser1.pop("password")
        self.testUser1.pop("uuid")
        self.testUser1.pop("pending")
        self.assertEqual(result["author"], self.testUser1)

        r = client.get(
            "http://127.0.0.1:8000/service/author/20/posts/20/likes/")
        result = r.json()
        self.assertEqual(r.status_code, 200)
        self.assertEqual(result[0]["author"], self.testUser1)

# class InboxTests(TestCase):
#     def setUp(self):

#         self.auth1 = UUser.objects.create_superuser(
#             username="admin", email="", password="admin")

#         self.testUser1 = {
#             "type": "author",
#             "id": "10",
#             "host": "https://i-connect.herokuapp.com",
#             "displayName": "TestUser1",
#             "url": "http://127.0.0.1:8000/author/10",
#             "github": "https://github.com/testUser10",
#             "profileImage": "None",
#             "uuid": "10",
#             "password": "1234",
#             "pending": "False",
#         }

#         self.testUser2 = {
#             "type": "author",
#             "id": "20",
#             "host": "https://i-connect.herokuapp.com",
#             "displayName": "TestUser2",
#             "url": "http://127.0.0.1:8000/author/20",
#             "github": "https://github.com/testUser20",
#             "profileImage": "None",
#             "uuid": "20",
#             "password": "1234",
#             "pending": "False",
#         }

#         self.post_data = {
#             "type": "post",
#             "title": "post_title",
#             "id": "http://127.0.0.1:8000/author/20/posts/20",
#             "source": "http://lastplaceigotthisfrom.com/posts/yyyyy",
#             # where is it actually from
#             "origin": "http://whereitcamefrom.com/posts/zzzzz",
#             # a brief description of the post
#             "description": "test_descr",
#             "contentType": "text/plain",
#             "content": "test_content",
#             "author": {
#                 "type": "author",
#                 "id": "20",
#                 "host": "https://i-connect.herokuapp.com",
#                 "displayName": "TestUser2",
#                 "url": "http://127.0.0.1:8000/author/20",
#                 "github": "https://github.com/testUser20",
#                 "profileImage": "None",
#                 "uuid": "20",
#                 "password": "1234",
#                 "pending": "False",
#             },
#             "categories": ["web", "tutorial"],
#             "count": 0,
#             "comments": "http://127.0.0.1:8000/author/20/posts/20/comments",
#             "commentsSrc": {
#                 "type": "comments",
#                 "page": 1,
#                 "size": 5,
#                 "post": "http://127.0.0.1:8000/author/20/posts/20",
#                 "id": "http://127.0.0.1:8000/author/20/posts/20/comments",
#                 "comments": [
#                 ]
#             },
#             "published": "2015-03-09T13:07:04+00:00",
#             "visibility": "PUBLIC",
#             "unlisted": False
#         }

#         self.testUser1Obj = User.objects.create(**self.testUser1)
#         self.testUser2Obj = User.objects.create(**self.testUser2)

#         r = client.put(
#             'http://127.0.0.1:8000/service/author/20/posts/20/', self.post_data, format='json')

#     def test_inbox(self):
#         r = client.get(
#             'http://127.0.0.1:8000/service/author/10/inbox/')
#         # r = client.post(
#         #     'http://127.0.0.1:8000/service/author/10/inbox/', self.post_data, format='json')
#         # print(r.json())
