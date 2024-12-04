# Generated by Django 5.1.3 on 2024-12-03 10:52

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Travel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('country', models.CharField(help_text='Country', max_length=100)),
                ('user', models.ForeignKey(help_text='User', on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Image',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image', models.TextField(help_text='Image Base64')),
                ('width', models.IntegerField(help_text='Width')),
                ('height', models.IntegerField(help_text='Height')),
                ('links', models.TextField(help_text='Links, separated by comma')),
                ('created_at', models.DateTimeField(auto_now_add=True, help_text='Date of creation')),
                ('travel', models.ForeignKey(help_text='Travel', on_delete=django.db.models.deletion.CASCADE, to='api.travel')),
            ],
        ),
        migrations.CreateModel(
            name='UserProfile',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('age', models.IntegerField(help_text='Age')),
                ('phonenumber', models.IntegerField(help_text='Phone Number')),
                ('country', models.CharField(help_text='Country', max_length=100)),
                ('address', models.TextField(help_text='Address', max_length=200)),
                ('latitude', models.FloatField(help_text='Latitude')),
                ('longitude', models.FloatField(help_text='Longitude')),
                ('created_at', models.DateTimeField(auto_now_add=True, help_text='Date of creation')),
                ('updated_at', models.DateTimeField(auto_now=True, help_text='Date of last update')),
                ('user', models.OneToOneField(help_text='User', on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]