from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets
import wikipedia

from api.camara_requests import get_device_location
from api.opain import process_image_for_landmarks
from .models import User, Travel, Image
from .serializers import UserSerializer, TravelSerializer, ImageSerializer, ImageSerializerPayload, ImageSerializerBase
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from .geocode_scripts import get_country_from_coordinates
from django.contrib.auth.models import User
from .serializers import UserSerializer, UserRegistrationSerializer
from rest_framework import status


class UserRegistrationView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response({'message': 'User registered successfully'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class UserViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated,]
    
    queryset = User.objects.all()
    serializer_class = UserSerializer

class TravelViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated,]

    serializer_class = TravelSerializer

    def get_queryset(self):
        return Travel.objects.all().filter(user=self.request.user)

class ImageViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated,]
    
    serializer_class = ImageSerializer

    def get_serializer_class(self):
        if self.action == "retrieve":
            return ImageSerializer
        return ImageSerializerBase
    
    def get_queryset(self):
        print(self.action)
        if self.action in ["retrieve", "list"]:
            return Image.objects.all()
        return Image.objects.all().filter(travel__user=self.request.user)
    
    def create(self, request, *args, **kwargs):
        serializer = ImageSerializerPayload(data=request.data)
        if not serializer.is_valid():
            return Response({'message': 'Invalid data'}, status=400)
        
        image = serializer.validated_data.get('image')
        width = serializer.validated_data.get('width')
        height = serializer.validated_data.get('height')
        
        location = get_device_location()
        if not location:
            return Response({'message': 'Error obtaining device location'}, status=400)
        
        latitude = location.get('latitude')
        longitude = location.get('longitude')
        country = get_country_from_coordinates(latitude, longitude)
        # country = "France"
        if not country:
            return Response({'message': 'Error obtaining country from coordinates'}, status=400)
        
        travels = Travel.objects.filter(country=country, user=request.user)
        if not travels:
            travel = Travel.objects.create(country=country, user=request.user)
        else:
            travel = travels[0]
        
        travel_id = travel.id
       
        link_wiki = process_image_for_landmarks(f"data:image/jpeg;base64,{image}", "en")
        if not link_wiki:
            return Response({'message': 'No result found with process picture'}, status=400)

        a = wikipedia.search(link_wiki.replace('https://en.wikipedia.org/wiki/', ''))
        if not a:
            return Response({'message': 'No result found with process picture #W'}, status=400)

        new_image = Image.objects.create(image=image, width=width, height=height, travel_id=travel_id, link=link_wiki)
        return Response({'id': new_image.id}, status=201)
