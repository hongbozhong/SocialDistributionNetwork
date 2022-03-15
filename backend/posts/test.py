from django.test import TestCase

# Create your tests here.
from .models import User
from django.urls import reverse
from django.contrib.auth import get_user_model




class UserTests(TestCase):

    def test_createUser(self):
        self.client.post('/users', {"email":"hzhong1@google.com", "password":"123456780a"})
        print(get_user_model().objects.all())