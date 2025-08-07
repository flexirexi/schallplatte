import pytest
from django.urls import reverse
from django.contrib.auth.models import User
from rooms.models import Room, RoomCalendar
from django.utils import timezone
from datetime import timedelta


@pytest.mark.django_db
def test_calendar_view_authenticate(client):
    # Needed to create a valid user for the auth test setup
    user = User.objects.create_user(username="tester", password="pass")
    client.login(username="tester", password="pass")

    response = client.get(reverse("rooms:calendar"))
    assert response.status_code == 200
    assert "rooms/calendar.html" in [t.name for t in response.templates]
    assert "cursor" in response.context
    assert "rooms" in response.context
    assert "form" in response.context


@pytest.mark.django_db
def test_booking_success(client):
    # Needed to create a valid user for the auth test setup
    user = User.objects.create_user(username="booker", password="pass")
    room = Room.objects.create(
        name="Studio C",
        size_cat="35",
        drum_kit="Y",
        guitar_amps="M",
        bass_amps="A",
        piano="N",
        synth="K"
    )
    client.login(username="booker", password="pass")

    start = timezone.now() + timedelta(days=1)
    end = start + timedelta(hours=1)

    data = {
        "room": room.id,
        "start": start.isoformat(),
        "end": end.isoformat(),
    }

    response = client.post(reverse("rooms:booking"), data, follow=True)
    assert response.status_code == 200
    assert RoomCalendar.objects.count() == 1
    assert "Booking successful." in [
        msg.message for msg in response.context["messages"]]


@pytest.mark.django_db
def test_booking_invalid(client):
    # Needed to create a valid user for the auth test setup
    user = User.objects.create_user(username="badbooker", password="pass")
    client.login(username="badbooker", password="pass")

    data = {
        "start:": "",
        "end": "",
        "room": ""
    }

    response = client.post(reverse("rooms:booking"), data, follow=True)
    assert response.status_code == 200
    assert RoomCalendar.objects.count() == 0
    assert "Booking failed. Please try again." in [
        msg.message for msg in response.context["messages"]]
