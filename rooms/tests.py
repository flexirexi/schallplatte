from django.test import TestCase
import pytest
from django.contrib.auth.models import User
from .models import Room, RoomCalendar
from datetime import timedelta
from django.utils import timezone


# Create your tests here.
@pytest.mark.django_db
def test_room_str():
    room = Room.objects.create(
        name="Studio A",
        size_cat="25qm",
        drum_kit="Yamaha",
        guitar_amps="Marshall",
        bass_amps="Ampeg",
        piano="Yamaha Grand",
        synth="Korg"
    )
    assert str(room == f"{room.id}: Studio A")


@pytest.mark.django_db
def test_roomcalendar_str():
    user = User.objects.create_user(username="tester")
    room = Room.objects.create(
        name="Studio B",
        size_cat="35qm",
        drum_kit="Roland",
        guitar_amps="Fender",
        bass_amps="Markbass",
        piano="Keins",
        synth="Moog"
    )
    start = timezone.now()
    end = start + timedelta(hours=1)
    
    booking = RoomCalendar.objects.create(
        room=room, user=user,
        start_daytime=start,
        end_daytime=end
    )
    
    expected = f"{room.name},{user}: {start} - {end}"
    assert str(booking) == expected