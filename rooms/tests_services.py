import pytest
from .models import Room, RoomCalendar
from .services import CalendarCursor
from django.contrib.auth.models import User
from django.utils import timezone
from datetime import timedelta


@pytest.mark.django_db
def test_get_cell_key():
    cc = CalendarCursor(timezone.now().date(), user=None)
    assert cc.get_cell_key(15, 0, 5) == "15-0-5"
    assert cc.get_cell_key(0, 1, 1) == "0-1-1"
    assert cc.get_cell_key(23, 1, 9) == "23-1-9"


@pytest.mark.django_db
def test_get_cell_keys_for_booking():
    user = User.objects.create_user(username="testuser")
    room = Room.objects.create(
        name="testroom",
        size_cat="25",
        drum_kit="x",
        guitar_amps="x",
        bass_amps="x",
        piano="x",
        synth="x"
    )
    start = timezone.now().replace(hour=10, minute=0, second=0, microsecond=0)
    end = start + timedelta(hours=1)

    booking = RoomCalendar.objects.create(
        user=user, room=room,
        start_daytime=start,
        end_daytime=end
    )
    cc = CalendarCursor(start.date(), user)
    keys = cc.get_cell_keys_for_booking(booking)

    expected = [
        cc.get_cell_key(10, 0, room.id),
        cc.get_cell_key(10, 1, room.id),
    ]
    assert keys == expected


@pytest.mark.django_db
def test_user_and_all_cell_keys():
    user1 = User.objects.create_user(username="u1")
    user2 = User.objects.create_user(username="u2")
    room = Room.objects.create(
        name="R",
        size_cat="x",
        drum_kit="x",
        guitar_amps="x",
        bass_amps="x",
        piano="x",
        synth="x"
    )

    start = timezone.now().replace(hour=8, minute=0)
    end = start + timedelta(hours=1)

    RoomCalendar.objects.create(
        user=user1, room=room, start_daytime=start, end_daytime=end)
    RoomCalendar.objects.create(user=user2,
                                room=room,
                                start_daytime=start + timedelta(hours=2),
                                end_daytime=end + timedelta(hours=2))

    cc = CalendarCursor(start.date(), user1)
    u_keys = cc.user_cell_keys
    a_keys = cc.all_cell_keys

    assert all(k in a_keys for k in u_keys)
    assert len(u_keys) == 2
    assert len(a_keys) == 4


@pytest.mark.django_db
def test_save_booking_success():
    user = User.objects.create_user(username="book")
    room = Room.objects.create(
        name="R",
        size_cat="x",
        drum_kit="x",
        guitar_amps="x",
        bass_amps="x",
        piano="x",
        synth="x"
    )

    start = timezone.now().replace(hour=12, minute=0)
    end = start + timedelta(hours=1)
    cc = CalendarCursor(start.date(), user)
    cc.save_booking(user, room, start, end)

    assert RoomCalendar.objects.count() == 1


@pytest.mark.django_db
def test_save_booking_conflict_raises():
    user = User.objects.create_user(username="booker")
    room = Room.objects.create(
        name="X",
        size_cat="X",
        drum_kit="X",
        guitar_amps="X",
        bass_amps="x",
        piano="x",
        synth="x"
    )

    start = timezone.now().replace(hour=14, minute=0)
    end = start + timedelta(hours=2)

    RoomCalendar.objects.create(
        user=user,
        room=room,
        start_daytime=start,
        end_daytime=end
    )

    cc = CalendarCursor(start.date(), user)
    with pytest.raises(ValueError):
        cc.save_booking(user, room, start +
                        timedelta(minutes=30), end + timedelta(hours=1))
