# Generated by Django 4.2.20 on 2025-04-14 03:10

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0002_room_alter_profile_user_roomcalendar'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='roomcalendar',
            name='room',
        ),
        migrations.RemoveField(
            model_name='roomcalendar',
            name='user',
        ),
        migrations.DeleteModel(
            name='Room',
        ),
        migrations.DeleteModel(
            name='RoomCalendar',
        ),
    ]
