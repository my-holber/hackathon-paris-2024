from django.urls import path
from rest_framework import routers
from .views import UserViewSet, UserRegistrationView, TravelViewSet, ImageViewSet

urlpatterns = [
    path('users/', UserViewSet.as_view({'get': 'list'}), name='user-list'),
    path('users/<int:pk>/', UserViewSet.as_view({'get': 'retrieve'}), name='user-detail'),
    path('register/', UserRegistrationView.as_view(), name='user-register'),
    path('travels/', TravelViewSet.as_view({'get': 'list'}), name='travel-list'),
    path('travels/<int:pk>/', TravelViewSet.as_view({'get': 'retrieve'}), name='travel-detail'),
    path('images/', ImageViewSet.as_view({'get': 'list', 'post': 'create'}), name='image-list'),
    path('images/<int:pk>/', ImageViewSet.as_view({'get': 'retrieve'}), name='image-detail'),
]