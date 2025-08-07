from django.db import models
from django.contrib.auth.models import User


# Create your models here.
class Room(models.Model):
    name = models.CharField(max_length=150)
    size_cat = models.CharField(max_length=150)
    drum_kit = models.CharField(max_length=150)
    guitar_amps = models.CharField(max_length=150)
    bass_amps = models.CharField(max_length=150)
    piano = models.CharField(max_length=150)
    synth = models.CharField(max_length=150)

    def __str__(self):
        return f"{self.id}: {self.name}"


class RoomCalendar(models.Model):
    room = models.ForeignKey(
        Room, on_delete=models.CASCADE, related_name="room_bookings"
    )
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="user_bookings",
        blank=True
    )
    start_daytime = models.DateTimeField()
    end_daytime = models.DateTimeField()

    def __str__(self):
        return (
            f"{self.room.name}, {self.user}: ",
            f"{self.start_daytime} - {self.end_daytime}"
        )
