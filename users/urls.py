from django.urls import path
from .views import UsersListAPIView, UsersListCreateAPIView

urlpatterns = [
    path('users/', UsersListAPIView.as_view(), name='user-list'),
    path('users/create/', UsersListCreateAPIView.as_view(), name='user-create'),
]
