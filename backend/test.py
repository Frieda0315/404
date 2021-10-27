from django.db.models.fields import DateField, DateTimeField
from django.test import TestCase
import uuid
from comments.models import Comment
from users import *
import users
from users.models import User
from posts.models import Post
from likes.models import Like
from comments.models import Comment
from inbox.models import Inbox
from datetime import datetime


class PostModelTests(TestCase):
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

    def init_inbox(self, id=uuid.uuid4(), post=None, like=None, receive_author=None):
        if post == None:
            p = self.init_post()
        if like == None:
            l = self.init_likes()
        if receive_author == None:
            r = self.init_author()
        return Inbox(
            id=id,
            post=p,
            like=l,
            receive_author=r
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
        self.assertTrue(isinstance(like.author, User))
        self.assertTrue(isinstance(like.post, Post))
        self.assertTrue(isinstance(like.comment, Comment))

        self.assertEqual(like.summary, "testingSummary")
        self.assertEqual(like.type, 'testingType')

    def test_inbox(self):
        inbox = self.init_inbox()
        self.assertTrue(isinstance(inbox.receive_author, User))
        self.assertTrue(isinstance(inbox.post, Post))
        self.assertTrue(isinstance(inbox.like, Like))


class URLTests(TestCase):
    def postURL(self):
        pass
