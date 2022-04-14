from rest_framework.serializers import ModelSerializer
from .models import Post, Comment, User, PostImage, Like

class PostSerializer(ModelSerializer):
    class Meta:
        model = Post
        fields = "__all__"

class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = "__all__"

class CommentSerializer(ModelSerializer):
    class Meta:
        model = Comment
        fields = "__all__"

class PostImageSerializer(ModelSerializer):
    class Meta:
        model = PostImage
        fields = "__all__"

class LikeSerializer(ModelSerializer):
    class Meta:
        model = Like
        fields = "__all__"