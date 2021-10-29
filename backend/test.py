from django.test import TestCase
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


class ModelTests(TestCase):
    def init_author(self, id=uuid.uuid4(), user_name="test_user", github_name="test_git", password='1234', type="author"):
        return User(
            id=id,
            user_name=user_name,
            password=password,
            github_name=github_name,
            type=type
        )

    def init_post(self, author=None, title="testingPost", content="testingContent", visibility='PUBLIC'):
        if author == None:
            a = self.init_author()
        return Post(
            author=a,
            title=title,
            content=content,
            visibility=visibility,
        )

    def init_comment(self, post=None, type="testingType", author=None, comment="testingComment", contentType="testingType", published=datetime.now(), id=uuid.uuid4()):
        if author == None:
            a = self.init_author()
        if post == None:
            p = self.init_post()
        return Comment(
            post=p,
            type=type,
            author=a,
            comment=comment,
            contentType=contentType,
            published=published,
            id=id
        )

    def init_likes(self, id=uuid.uuid4(), author=None, post=None, comment=None, summary="testingSummary", type="testingType"):
        if author == None:
            a = self.init_author()
        if post == None:
            p = self.init_post()
        if comment == None:
            c = self.init_comment()
        return Like(
            id=id,
            author=a,
            post=p,
            comment=c,
            summary=summary,
            type=type
        )

    def init_inbox(self, post=None, receive_author=None):
        if receive_author == None:
            r = self.init_author()
            r.save()
        instance = Inbox.objects.create(receive_author=r)
        p = self.init_post()
        p.save()
        instance.post.add(p)
        print(type(instance))
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
        authorInstance = self.init_author()
        self.assertTrue(isinstance(authorInstance, User))

    def test_post(self):
        p = self.init_post()
        self.assertTrue(isinstance(p, Post))
        self.assertTrue(isinstance(p.author, User))

        self.assertEqual(p.title, "testingPost")
        self.assertEqual(p.content, "testingContent")
        self.assertEqual(p.visibility, 'PUBLIC')

        self.assertEqual(p.author.user_name, "test_user")
        self.assertEqual(p.author.type, "author")
        self.assertEqual(p.author.github_name, "test_git")

    def test_comment(self):
        comment = self.init_comment()
        self.assertTrue(isinstance(comment, Comment))
        self.assertTrue(isinstance(comment.author, User))
        self.assertTrue(isinstance(comment.post, Post))
        self.assertTrue(isinstance(comment.published, datetime))

        self.assertEqual(comment.type, "testingType")
        self.assertEqual(comment.comment, "testingComment")
        self.assertEqual(comment.contentType, 'testingType')

    def test_like(self):
        like = self.init_likes()
        print(type(like))
        self.assertTrue(isinstance(like.author, User))
        self.assertTrue(isinstance(like.post, Post))
        self.assertTrue(isinstance(like.comment, Comment))

        self.assertEqual(like.summary, "testingSummary")
        self.assertEqual(like.type, 'testingType')

    def test_inbox(self):
        inbox = self.init_inbox()
        # print(type(inbox.post))
        # print("haha")
        self.assertTrue(isinstance(inbox.receive_author, User))
        #self.assertTrue(isinstance(inbox.post, Post))

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
        url = reverse("public_post")
        self.assertEqual(resolve(url).func, public_post)

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
