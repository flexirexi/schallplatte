/* global document */
import { calendarUX } from "./calendar-ux.js";

function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== "") {
        const cookies = document.cookie.split(";");
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();

            if (cookie.substring(0, name.length + 1) === name + "=") {
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
            behavior: "smooth",
        });
    }

    document.querySelector(".handle").addEventListener("click", () => {
        const slide = document.getElementById("mobile-slideup");
        const up = slide.style.transform === "translateY(30%)";
        slide.style.transform = up ? "translateY(85%)" : "translateY(30%)";
    });

    document
        .getElementById("myDatePicker")
        .addEventListener("change", function () {
            document.getElementById("dateForm").submit();
        });

    // bind checkboxes to the filterForm
    const filterForm = document.getElementById("filterForm");
    const allCheckboxes = document.querySelectorAll(
        "input[type='checkbox'][form='filterForm']"
    );
    // synchronize mobile and desktop filters (I will never programm separate filters for mobile view anymore..)
    const urlParams = new URLSearchParams(window.location.search);
    allCheckboxes.forEach((cb) => {
        const values = urlParams.getAll(cb.name);
        if (values.includes(cb.value)) {
            cb.checked = true;
        }
    });

    allCheckboxes.forEach((cb) => {
        cb.addEventListener("change", function () {
            const name = cb.name;
            const value = cb.value;
            const checked = cb.checked;

            // synchronize mobile and desktop filters..
            document
                .querySelectorAll(`input[name="${name}"][value="${value}"]`)
                .forEach((otherCb) => {
                    if (otherCb !== cb) {
                        otherCb.checked = checked;
                    }
                });

            filterForm.submit();
        });
    });

    calendarUX(wrapper);
});

["booking-submit", "booking-submit-mobile", "booking-button-mobile"].forEach(
    (id) => {
        const btn = document.getElementById(id);
        if (btn) {
            btn.addEventListener("click", handleBookingSubmit);
        }
    }
);

function handleBookingSubmit(e) {
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

    if (window.editBookingId) {
        e.preventDefault();
        fetch(`/rooms/edit_booking/${window.editBookingId}/submit/`, {
            method: "POST",
            headers: {
                "X-CSRFToken": getCookie("csrftoken"),
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        }).then((response) => {
            if (response.ok) {
                window.location.href = "/rooms/calendar";
            } else {
                alert("Fehler beim Speichern");
            }
        });
    }
}
