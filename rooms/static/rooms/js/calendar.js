/* global document */

import { calendarUX } from "./calendar-ux.js";

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

document.getElementById("booking-submit").addEventListener("click", function () {
    const realRoom = document.getElementById("id_room");
    const fakeRoom = document.getElementById("id_room_fake");
    realRoom.value = fakeRoom.value;

    document.getElementById("id_start").readOnly = false;
    document.getElementById("id_end").readOnly = false;
});