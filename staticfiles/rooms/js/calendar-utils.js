export function highlightCell(cell) {
    cell.classList.add("selected-slot");
}

export function removeHighlights() {
    document.querySelectorAll(".calendar-cell").forEach(c => {
        c.classList.remove("selected-slot");
    });
}

export function booking_blocked() {
    const btn = document.getElementById("booking-submit");
    const msg = document.getElementById("form-error-msg");
    const msg_mobile = document.getElementById("form-error-msg-mobile");
    const btn_mobile = document.getElementById("booking-button-mobile");
    const submit_mobile = document.getElementById("booking-submit-mobile");
    
    btn.disabled = true;
    if (btn_mobile) { btn_mobile.disabled = true;}
    if (submit_mobile) { submit_mobile.disabled = true;}
    msg.innerHTML = "No booking possible. Your selection overlaps with existing bookings.";
    msg_mobile.innerHTML = "No booking possible. Your selection overlaps with existing bookings.";
}

export function booking_blocked_on_first_touch() {
    const btn = document.getElementById("booking-submit");
    const msg = document.getElementById("form-error-msg");
    const msg_mobile = document.getElementById("form-error-msg-mobile");
    const btn_mobile = document.getElementById("booking-button-mobile");
    const submit_mobile = document.getElementById("booking-submit-mobile");
    
    btn.disabled = true;
    if (btn_mobile) { btn_mobile.disabled = true;}
    if (submit_mobile) { submit_mobile.disabled = true;}
    msg.innerHTML = "Please select an end time slot.";
    msg_mobile.innerHTML = "Please select an end time slot.";
}

export function formatStart(selectionStartValue) {
    const hour = Math.floor(selectionStartValue / 2);
    const minutes = selectionStartValue % 2 === 0 ? "00" : "30";
    let dateform = document.getElementById("myDatePicker");
    
    return `${dateform.value}T${ hour.toString().padStart(2, "0")}:${minutes}`;
}

export function formatEnd(selectionEndValue) {
    selectionEndValue = selectionEndValue + 1
    
    let dateform = document.getElementById("myDatePicker");
    const hour = Math.floor(selectionEndValue / 2);
    const minutes = selectionEndValue % 2 === 0 ? "00" : "30";
    return `${dateform.value}T${hour.toString().padStart(2, "0")}:${minutes}`;
}

export function booking_not_blocked() {
    const btn = document.getElementById("booking-submit");
    const msg = document.getElementById("form-error-msg");
    const btn_mobile = document.getElementById("booking-button-mobile");
    const submit_mobile = document.getElementById("booking-submit-mobile");
    const msg_mobile = document.getElementById("form-error-msg-mobile");
    
    btn.disabled = false;
    if (btn_mobile) { btn_mobile.disabled = false;}
    if (submit_mobile) { submit_mobile.disabled = false;}
    msg.innerHTML = "";
    msg_mobile.innerHTML = "";
}