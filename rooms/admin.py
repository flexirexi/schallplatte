from django.contrib import admin
from .models import Room, RoomCalendar

# Register your models here.
admin.site.register(RoomCalendar)


@admin.register(Room)
class RoomAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "name",
        "size_cat",
        "piano",
        "drum_kit",
        "guitar_amps",
        "bass_amps",
        "synth"
    )
