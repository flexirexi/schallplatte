from django.urls import path
from . import views

app_name = "rooms"

urlpatterns = [
    path("calendar/", views.calendar, name="calendar"),
    path("booking/", views.booking, name="booking"),
    path(
        "edit_booking/<int:booking_id>/",
        views.edit_booking_calendar,
        name="edit_booking_calendar"
    ),
    path(
        "edit_booking/<int:booking_id>/submit/",
        views.edit_booking_submit,
        name="edit_booking_submit"
    ),
]
