from django.shortcuts import get_object_or_404
from .models import Room, RoomCalendar
from datetime import datetime, timedelta


def delete_booking(id, user):
    booking = get_object_or_404(RoomCalendar, id=id, user=user)
    booking.delete()
    return True


class CalendarCursor:
    def __init__(self, date: datetime.date, user, ignore_booking_id=None):
        self.date = date
        self.user = user
        self.selected_keys = []

        self.all_bookings = RoomCalendar.objects.filter(
            start_daytime__date=self.date
        ).select_related("room", "user")

        if ignore_booking_id:
            self.all_bookings = self.all_bookings.exclude(id=ignore_booking_id)

        self.user_bookings = [
            b for b in self.all_bookings if b.user == self.user
        ]
        self.non_user_bookings = [
            b for b in self.all_bookings if b.user != self.user
        ]

    def get_cell_key(self, hour, half, room_id):
        return f"{hour}-{half}-{room_id}"

    @property
    def user_cell_keys(self):
        keys = []
        for b in self.user_bookings:
            keys.extend(self.get_cell_keys_for_booking(b))
        return set(keys)

    @property
    def all_cell_keys(self):
        keys = []
        for b in self.all_bookings:
            keys.extend(self.get_cell_keys_for_booking(b))
        return set(keys)

    def get_cell_keys_for_booking(self, booking):
        current = booking.start_daytime
        end = booking.end_daytime
        keys = []

        while current < end:
            hour = current.hour
            half = 1 if current.minute >= 30 else 0
            keys.append(self.get_cell_key(hour, half, booking.room.id))
            current += timedelta(minutes=30)

        return keys

    def save_booking(self, user, room, start, end):
        for b in self.all_bookings:
            if b.room == room and not (
                end <= b.start_daytime or start >= b.end_daytime
            ):
                raise ValueError("Conflict with existing booking.")

        RoomCalendar.objects.create(
            user=user, room=room, start_daytime=start, end_daytime=end
        )

    def replace_booking(id, user, new_start, new_end, room):
        booking = get_object_or_404(RoomCalendar, id=id, user=user)
        booking.start_daytime = new_start
        booking.end_daytime = new_end
        booking.room = room
        booking.save()
        return booking


def roomFilterGET(request):
    sizes = request.GET.getlist("filter_sizes")
    instruments = request.GET.getlist("filter_instrument")
    print("Filter sizes:", sizes)
    print("Filter instruments:", instruments)

    instrument_fields = {
        "piano": "piano",
        "drumkit": "drum_kit",
        "amps": ["guitar_amps", "bass_amps"],
        "synth": "synth",
    }

    size_fields = {
        "small": "small (3)",
        "medium": "medium (5)",
        "large": "large (10)",
    }

    rooms = Room.objects.all()

    if sizes:
        mapped_sizes = [size_fields[s] for s in sizes if s in size_fields]
        rooms = rooms.filter(size_cat__in=mapped_sizes)

    if instruments:
        for instr in instruments:
            if instr in instrument_fields:
                fields = instrument_fields[instr]
                if isinstance(fields, list):
                    for f in fields:
                        rooms = rooms.filter(**{f: "yes"})
                else:
                    rooms = rooms.filter(**{fields: "yes"})

    return rooms
