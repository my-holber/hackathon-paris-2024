import wikipedia
from rest_framework import serializers
from .models import User, UserProfile, Travel, Image
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('lastname', 'firstname', 'age', 'email', 'phonenumber', 'country', 'address', 'latitude', 'longitude')
    
    def create(self, validated_data):
        return User.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.lastname = validated_data.get('lastname', instance.lastname)
        instance.firstname = validated_data.get('firstname', instance.firstname)
        instance.age = validated_data.get('age', instance.age)
        instance.email = validated_data.get('email', instance.email)
        instance.phonenumber = validated_data.get('phonenumber', instance.phonenumber)
        instance.country = validated_data.get('country', instance.country)
        instance.address = validated_data.get('address', instance.address)
        instance.latitude = validated_data.get('latitude', instance.latitude)
        instance.longitude = validated_data.get('longitude', instance.longitude)
        instance.save()
        return instance
    
    def delete(self, instance):
        instance.delete()
        return instance

class UserRegistrationSerializer(serializers.ModelSerializer):
    age = serializers.IntegerField(write_only=True)
    phonenumber = serializers.IntegerField(write_only=True)
    country = serializers.CharField(write_only=True)
    address = serializers.CharField(write_only=True)
    latitude = serializers.FloatField(write_only=True)
    longitude = serializers.FloatField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'password', 'email', 'age', 'phonenumber', 'country', 'address', 'latitude', 'longitude']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user_data = {
            'username': validated_data['username'],
            'password': validated_data['password'],
            'email': validated_data['email']
        }
        user = User.objects.create_user(**user_data)
        profile_data = {
            'user': user,
            'age': validated_data['age'],
            'phonenumber': validated_data['phonenumber'],
            'country': validated_data['country'],
            'address': validated_data['address'],
            'latitude': validated_data['latitude'],
            'longitude': validated_data['longitude']
        }
        UserProfile.objects.create(**profile_data)
        
        return user


class TravelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Travel
        fields = ('user', 'departure_place', 'arrival_place', 'departure_date', 'arrival_date')

    def create(self, validated_data):
        return Travel.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.user = validated_data.get('user', instance.user)
        instance.departure_place = validated_data.get('departure_place', instance.departure_place)
        instance.arrival_place = validated_data.get('arrival_place', instance.arrival_place)
        instance.departure_date = validated_data.get('departure_date', instance.departure_date)
        instance.arrival_date = validated_data.get('arrival_date', instance.arrival_date)
        instance.save()
        return instance

    def delete(self, instance):
        instance.delete()
        return instance

class ImageSerializerBase(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = ('width', 'height', 'travel', 'link')

class ImageSerializer(serializers.ModelSerializer):
    title = serializers.SerializerMethodField()
    description = serializers.SerializerMethodField()

    def get_title(self, instance):
        return instance.link.replace('https://en.wikipedia.org/wiki/', '')

    def get_description(self, instance):
        return wikipedia.search(instance.link.replace('https://en.wikipedia.org/wiki/', ''))

    class Meta:
        model = Image
        fields = ('title', 'description', 'image', 'width', 'height', 'travel', 'link')
    
class ImageSerializerPayload(serializers.Serializer):
    image = serializers.CharField()
    width = serializers.IntegerField()
    height = serializers.IntegerField()
