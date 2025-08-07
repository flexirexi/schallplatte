from django.shortcuts import render, redirect, get_object_or_404
from .services import CalendarCursor, roomFilterGET
from .models import Room, RoomCalendar
from django.utils import timezone
from django.utils.dateparse import parse_date
from datetime import datetime
from .forms import BookingForm
from django.contrib import messages
from django.views.decorators.http import require_POST
from django.contrib.auth.decorators import login_required
import json
from django.http import JsonResponse
from django.urls import reverse


@login_required
def calendar(request):
    selected_date = request.GET.get("selected_date")

    if selected_date:
        date = parse_date(selected_date)
    else:
        date = timezone.now().date()

    cursor = CalendarCursor(date, request.user)
    today = timezone.now().date()

    rooms = roomFilterGET(request)
    print(rooms, rooms.count())

    context = {
        "cursor": cursor,
        "rooms": rooms,
        "hours": range(24),
        "selected_date": date,
        "today": today,
        "user": request.user,
        "form": BookingForm(),
    }

    return render(request, "rooms/calendar.html", context)


@login_required
def booking(request):
    if request.method == "POST":
        form = BookingForm(request.POST)
        if form.is_valid():
            try:
                form.cleaned_data["user"] = request.user
                date = form.cleaned_data["start"].date()
                cursor = CalendarCursor(date, request.user)
                cursor.save_booking(
                    user=request.user,
                    room=form.cleaned_data["room"],
                    start=form.cleaned_data["start"],
                    end=form.cleaned_data["end"],
                )
                messages.success(request, "Booking successful.")
            except ValueError as e:
                messages.error(request, str(e))
                return render(request, "rooms/calendar.html", {
                    "edit_booking": False,
                })
        else:
            print(form.errors)
            messages.error(request, "Booking failed. Please try again.")

    return redirect("rooms:calendar")


@login_required
def edit_booking_calendar(request, booking_id):
    booking = get_object_or_404(RoomCalendar, id=booking_id, user=request.user)
    cursor = CalendarCursor(date=booking.start_daytime.date(
    ), user=request.user, ignore_booking_id=booking.id)
    today = timezone.now().date()
    rooms = roomFilterGET(request)
    context = {
        "cursor": cursor,
        "rooms": rooms,
        "hours": range(24),
        "selected_date": booking.start_daytime.date(),
        "today": today,
        "user": request.user,
        "form": BookingForm(),
        "edit_booking": booking,
        "is_edit": True
    }

    return render(request, "rooms/calendar.html", context)


@require_POST
@login_required
def edit_booking_submit(request, booking_id):
    booking = get_object_or_404(RoomCalendar, id=booking_id, user=request.user)
    data = json.loads(request.body)

    try:
        new_start = datetime.fromisoformat(data["start"])
        new_end = datetime.fromisoformat(data["end"])
    except ValueError:
        return JsonResponse({"error": "wrong date format"}, status=400)

    room = get_object_or_404(Room, id=data["room"])

    booking.room = room
    booking.start_daytime = new_start
    booking.end_daytime = new_end
    try:
        booking.save()
        messages.success(request, "Booking changed successfully.")
    except Exception:
        messages.error(request, "Modification failed. Please try again.")

    return JsonResponse(
        {"status": "ok", "redirect_url": reverse("rooms:calendar")}
    )
