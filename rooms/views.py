from django.shortcuts import render


# Create your views here.
def calendar(request):
    return render(request, "rooms/calendar.html")
