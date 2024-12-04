from django.contrib.auth.models import User
from django.db import models


#nom prenom age pays email mp ntel
class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, help_text='User')
    # lastname = models.CharField(max_length=50, blank=False, null=False, help_text='Last Name')
    # firstname = models.CharField(max_length=50, blank=False, null=False, help_text='First Name')
    age = models.IntegerField(blank=False, null=False, help_text='Age')
    phonenumber = models.IntegerField(null=False, help_text='Phone Number')
    country = models.CharField(max_length=100, blank=False, null=False, help_text='Country')
    address = models.TextField(max_length=200, blank=False, null=False, help_text='Address')
    latitude = models.FloatField(blank=False, null=False, help_text='Latitude')
    longitude = models.FloatField(blank=False, null=False, help_text='Longitude')
    created_at = models.DateTimeField(auto_now_add=True, help_text='Date of creation')
    updated_at = models.DateTimeField(auto_now=True, help_text='Date of last update')
    
    def __str__(self):
        return f'{self.lastname} {self.firstname}'
    
class Travel(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, help_text='User')
    country = models.CharField(max_length=100, blank=False, null=False, help_text='Country')
    
    def __str__(self):
        return f'travel'

class Image(models.Model):
    image = models.TextField(help_text='Image Base64')
    width = models.IntegerField(blank=False, null=False, help_text='Width')
    height = models.IntegerField(blank=False, null=False, help_text='Height')
    travel = models.ForeignKey(Travel, on_delete=models.CASCADE, help_text='Travel')
    link = models.TextField(help_text='Link')
    created_at = models.DateTimeField(auto_now_add=True, help_text='Date of creation')
    
    def __str__(self):
        return f'{self.image}'