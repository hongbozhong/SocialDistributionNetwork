from tkinter import E
from urllib import response
from django.shortcuts import render

# Create your views here.
from rest_framework.decorators import action
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions, authentication
from rest_framework.viewsets import ModelViewSet
from .models import Post, Comment, User
from .serializers import PostSerializer, CommentSerializer, UserSerializer
from .permissions import IsOwnerOrReadOnly, IsSelf
from django.db.models import Q 
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import status



class PostView(APIView):
    authentication_classes = []
    permission_classes = []
    model = Post
    serializer = PostSerializer

    def get(self, request):
        queryset = self.model.objects.all()
        Q_initial = Q()
        for key, val in request.query_params.items():
            d = {key+"__iexact": val}
            Q_initial &= Q(**d)
        queryset = queryset.filter(Q_initial)

        serial_res = self.serializer(queryset, many = True)
        return Response(serial_res.data)   

    def post(self, request):
        try:
            post = self.model.objects.create(**request.data)
            return Response(self.serializer(post).data)
        except Exception as e:
            print(e)
            return Response(status=status.HTTP_400_BAD_REQUEST)
    

class CommentView(APIView):
    authentication_classes = []
    permission_classes = []
    model = Comment
    serializer = CommentSerializer

    def get(self, request):
        queryset = self.model.objects.all()
        Q_initial = Q()
        for key, val in request.query_params.items():
            d = {key+"__iexact": val}
            Q_initial &= Q(**d)
        queryset = queryset.filter(Q_initial)

        serial_res = self.serializer(queryset, many = True)
        return Response(serial_res.data)   
    
    def post(self, request):
        try:
            comment = self.model.objects.create(**request.data)
            return Response(self.serializer(comment).data)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST) 

class UserView(APIView):
    authentication_classes = []
    permission_classes = []
    model = User
    serializer = UserSerializer

    def get(self, request):
        print(request.user)
        print(request.auth)
        print(request.headers)
        queryset = self.model.objects.all()
        Q_initial = Q()
        for key, val in request.query_params.items():
            if key != 'password':
                d = {key+"__iexact": val}
                Q_initial &= Q(**d)
            queryset = queryset.filter(Q_initial)
        serial_res = self.serializer(queryset, many = True)
        return Response(serial_res.data)   
    
    def post(self, request):
        try:
            data = {key:request.data[key] for key in request.data}
            user = self.model.objects.create(**data)
            serial_res = self.serializer(user)
            return Response(serial_res.data)
        except Exception as e:
            print(e)
            return Response(status=status.HTTP_400_BAD_REQUEST)
        




class BlacklistTokenUpdateView(APIView):
    permission_classes = []
    authentication_classes = ()

    def post(self, request):
        try:
            refresh_token = request.data["refresh_token"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)



