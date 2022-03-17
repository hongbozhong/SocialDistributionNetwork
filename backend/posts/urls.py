from django.urls import URLPattern, path, include
from .views import PostView, CommentView, UserView, BlacklistTokenUpdateView

urlpatterns = [
    path('users/', UserView.as_view()),
    path('posts/', PostView.as_view()),
    path('comments/', CommentView.as_view()),
    path('logout/blacklist/', BlacklistTokenUpdateView.as_view()),
]

