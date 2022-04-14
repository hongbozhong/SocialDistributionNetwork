from tkinter import E
from urllib import response
from django.shortcuts import render

# Create your views here.
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions
from .models import Post, Comment, User, PostImage, Like
from .serializers import PostSerializer, CommentSerializer, UserSerializer, PostImageSerializer, LikeSerializer
from .permissions import IsOwnerOrReadOnly, IsSelf
from django.db.models import Q 
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import status
import json

class PostView(APIView):

    permission_classes = [permissions.IsAuthenticated]
    model = Post
    serializer = PostSerializer

    def get(self, request):
        myposts = request.user.posts.all() if 'public' not in request.query_params else self.model.objects.all()
        if not request.query_params:
            Q_initial = Q()
            for key, val in request.query_params.items():
                d = {key+"__iexact": val}
                Q_initial &= Q(**d)
            myposts = myposts.filter(Q_initial)

        serial_res = self.serializer(myposts, many = True)
        for i in range(len(serial_res.data)):
            #add author name
            postdata = serial_res.data[i]
            author = User.objects.get(id = str(postdata['author']))
            postdata['author_name'] = author.username

            #prettify the date format
            datetime = postdata['created_at'][:-1]
            date, t = datetime.split('T')
            hour, minute, second = t.split(':')
            postdata['created_at'] = f'{date} {hour}:{minute}'

            #add the number of comments, likes
            post = serial_res.instance[i]
            postdata['comment_count'] = post.comments.count()
            postdata['like_count'] = post.likes.count()

            #if the current author likes this post
            likelist = Like.objects.filter(author=request.user, post = post)
            like = likelist[0].on if likelist else False
            postdata['like'] = like

            #images
            postdata['images'] = [str(obj.image) for obj in post.images.all()]

        return Response(serial_res.data)   

    def post(self, request):
        try:
            content = request.data['content']
            newpost = self.model.objects.create(content=content, author=request.user)
            return Response(self.serializer(newpost).data)
        except Exception as e:
            print(e)
            return Response(status=status.HTTP_400_BAD_REQUEST)
    

    def delete(self, request):
        try:
            print(request.data['id'])
            post = self.model.objects.get(id=request.data['id'])
            post.delete()
            return Response(status=status.HTTP_200_OK)
        except Exception as e:
            print(e)
            return Response(status=status.HTTP_400_BAD_REQUEST)


class PostImageView(APIView):
    model = PostImage
    serializer = PostImageSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        try:
            postid = request.query_params['postid']
            images = self.model.objects.filter(post=postid)
            print(images)
            return Response(self.serializer(images, many=True).data) if images else Response(status=status.HTTP_200_OK)
        except Exception as e:
            print(e)
            return Response(status=status.HTTP_400_BAD_REQUEST)

    def post(self, request):
        try:
            image = request.data['image']
            post = Post.objects.get(id=request.data['postid'])
            image = self.model.objects.create(image=image, post=post)
            return Response(self.serializer(image).data)
        except Exception as e:
            print(e)
            return Response(status=status.HTTP_400_BAD_REQUEST)



class CommentView(APIView):
    permission_classes = [permissions.IsAuthenticated]
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



class LikeView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    model = Like
    serializer = LikeSerializer

    def post(self, request):
        print('likeview post data', request.data)
        post = Post.objects.get(id = request.data['postid'])
        likelist = self.model.objects.filter(post=post, author=request.user)
        like = likelist[0] if likelist else self.model.objects.create(post=post, author=request.user)
        like.on = not like.on
        like.save()
        print(like.on)
        return Response(self.serializer(like).data)





class UserView(APIView):
    permission_classes = []
    model = User
    serializer = UserSerializer

    def get(self, request):
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
            data = {key:val for key, val in request.data.items()}
            user = self.model.objects.create(**data)
            serial_res = self.serializer(user)
            return Response(serial_res.data)
        except Exception as e:
            print(e)
            return Response(status=status.HTTP_400_BAD_REQUEST)
        




class BlacklistTokenUpdateView(APIView):
    permission_classes = []

    def post(self, request):
        try:
            refresh_token = request.data["refresh_token"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)


