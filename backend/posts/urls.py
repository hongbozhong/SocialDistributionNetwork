from django.urls import URLPattern, path, include
from .views import PostView, CommentView, UserView, BlacklistTokenUpdateView
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView
)

urlpatterns = [
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/token/verify/', TokenVerifyView.as_view(), name='token_verify'),
    path('users/', UserView.as_view()),
    path('posts/', PostView.as_view()),
    path('comments/', CommentView.as_view()),
    path('logout/blacklist/', BlacklistTokenUpdateView.as_view()),
]

