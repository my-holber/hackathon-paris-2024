from django.contrib import admin
from .models import UserProfile, Travel, Image

@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    list_display = ['id', 'age', 'phonenumber', 'country', 'address', 'latitude', 'longitude', 'created_at', 'updated_at']
    list_per_page = 10
    search_fields = ['age', 'phonenumber']

@admin.register(Travel)
class TravelAdmin(admin.ModelAdmin):
    list_display = ['user', 'country']
    list_per_page = 10
    search_fields = ['user', 'country']

@admin.register(Image)
class ImageAdmin(admin.ModelAdmin):
    list_display = ['image', 'width', 'height', 'travel', 'created_at']
    list_per_page = 10
    search_fields = ['image', 'width', 'height', 'travel']