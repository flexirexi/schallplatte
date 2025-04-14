from django.urls import path
from . import views

app_name = "rooms"

urlpatterns = [
    path('calendar/', views.calendar, name='calendar'),
]
