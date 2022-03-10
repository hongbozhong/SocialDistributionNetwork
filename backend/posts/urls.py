from django.urls import path, include
from rest_framework.routers import DefaultRouter, SimpleRouter
from .views import PostViewSet, CommentViewSet, UserViewSet

router = SimpleRouter()
router.register(r'posts', PostViewSet)
router.register(r'comments', CommentViewSet)
router.register(r'users', UserViewSet)

urlpatterns = router.urls