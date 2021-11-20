from django.test import TestCase
import uuid
from users import *
import users
from users.models import User
from posts.models import Post


class PostModelTests(TestCase):
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

    def init_post(self, author=None, title="testingPost", content="testingContent", contentType="post", visibility='PUBLIC'):
        if author == None:
            a = self.init_author()
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

        self.assertEqual(p.author.displayName, "test_user")
        self.assertEqual(p.author.type, "author")
        self.assertEqual(p.author.github, "test_git")


# Create your tests here.
