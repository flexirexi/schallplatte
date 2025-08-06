/* global document */

import { calendarUX } from "./calendar-ux.js";

function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();

            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}


document.addEventListener("DOMContentLoaded", () => {
    const wrapper = document.getElementById("calendarWrapper");
    document.getElementById("booking-submit").disabled = "true";
    if (wrapper) {
        wrapper.scrollTo({
            top: wrapper.scrollHeight * (2 / 3),
            behavior: "smooth"
        });
    }
    
    document.querySelector('.handle').addEventListener('click', () => {
        const slide = document.getElementById('mobile-slideup');
        const up = slide.style.transform === 'translateY(30%)';
        slide.style.transform = up ? 'translateY(85%)' : 'translateY(30%)';
    });

    document.getElementById("myDatePicker").addEventListener("change", function() {
        document.getElementById("dateForm").submit();
    });

    calendarUX(wrapper)
});


document.getElementById("booking-submit").addEventListener("click", function (e) {
    const realRoom = document.getElementById("id_room");
    const fakeRoom = document.getElementById("id_room_fake");
    realRoom.value = fakeRoom.value;

    document.getElementById("id_start").readOnly = false;
    document.getElementById("id_end").readOnly = false;

    const roomId = fakeRoom.value;
    const startTime = document.getElementById("id_start").value;
    const endTime = document.getElementById("id_end").value;

    const payload = {
        room: roomId,
        start: startTime,
        end: endTime,
    };
    console.log(payload);

    // Edit-Modus: fetch statt Submit
    if (window.editBookingId) {
        e.preventDefault(); // klassisches Form-Submit blockieren

        fetch(`/rooms/edit_booking/${window.editBookingId}/submit/`, {
            method: "POST",
            headers: {
                "X-CSRFToken": getCookie("csrftoken"),
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        }).then(response => {
            if (response.ok) {
                window.location.href = "/user/profile/"; // Nach erfolgreichem Edit
            } else {
                alert("Fehler beim Speichern");
            }
        });

    } 
    // Create-Modus: kein fetch – Form wird klassisch abgeschickt
    // kein e.preventDefault() → normales Submit
});