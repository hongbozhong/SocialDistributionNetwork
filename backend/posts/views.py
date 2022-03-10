from django.shortcuts import render

# Create your views here.
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import permissions
from rest_framework.viewsets import ModelViewSet
from .models import Post, Comment, User
from .serializers import PostSerializer, CommentSerializer, UserSerializer
from .permissions import IsOwnerOrReadOnly

class PostViewSet(ModelViewSet):
    queryset = Post.objects.all()                 
    serializer_class = PostSerializer
    permission_classes = (IsOwnerOrReadOnly,)

class CommentViewSet(ModelViewSet):
    queryset = Comment.objects.all()                 
    serializer_class = CommentSerializer

class UserViewSet(ModelViewSet):
    queryset = User.objects.all()                 
    serializer_class = UserSerializer