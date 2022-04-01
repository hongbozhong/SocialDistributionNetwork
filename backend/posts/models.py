from tracemalloc import is_tracing
from django.db import models

# Create your models here.
import uuid
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager

class UserManager(BaseUserManager):
    def create_user(self, email, password, *args, **kargs):
        if not email or not password:
            raise ValueError('empty email or password')
        try:
            user = self.model(email=self.normalize_email(email), *args, **kargs)
        except Exception as e:
            raise e
        
        if not user.username:
            user.username = 'user'+str(len(self.model.objects.all()))
        user.set_password(password)
        user.save()
        return user
    
    def create_superuser(self, email, password):
        user = self.create_user(email, password)
        user.is_admin = True
        return user
    
    def create(self, *args, **kargs):
        return self.create_user(*args, **kargs)

class User(AbstractBaseUser):

    class __Meta__:
        indexes = [models.Index(fields=['id'])]

    id = models.UUIDField(default=uuid.uuid4, primary_key=True, editable=False)
    username = models.CharField(max_length=30, unique=True, default="")
    email = models.CharField(max_length=30, unique=True)
    password = models.CharField(max_length=200)
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    USERNAME_FIELD = "email"
    EMAIL_FIELD = "email"
    REQUIRED_FIELDS = []
    objects = UserManager()

    def __str__(self):
        return self.email

    def is_staff(self):
        return self.is_admin
    
    def has_perm(self, perm, obj=None):
        return True
    
    def has_module_perms(self, app_label):
        return True
    





class Post(models.Model):
    id = models.UUIDField(default=uuid.uuid4, primary_key=True, editable=False)
    content = models.CharField(max_length=256, null=True, blank=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="posts")
    created_at = models.DateTimeField(auto_now_add=True, null=True)

    def __str__(self):
        return self.content



class Comment(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='comments')
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True, null=True)

    def __str__(self):
        return self.content

