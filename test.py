from django.test import TestCase
import uuid
from users import *
import users
from users.models import User
from posts.models import Post


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
        a = author if author != None else self.init_author()
        return Post(
            author=a,
            title=title,
            content=content,
            visibility=visibility,
        )

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


# Create your tests here.
