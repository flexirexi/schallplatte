import {
    highlightCell,
    removeHighlights,
    booking_blocked,
    booking_blocked_on_first_touch,
    booking_not_blocked,
    formatStart,
    formatEnd
} from "./calendar-utils.js";

// The heavy stuff - selecting time slots in the calendar interface
export function calendarUX(wrapper) {
    let isSelecting = false;
    let selectionStartValue = null;
    let selectedRoom = null;
    let selectedSlots = new Set();
    let touchSelectionStart = null;

    document.querySelectorAll(".calendar-cell").forEach(cell => {
        cell.addEventListener("mousedown", () => {
            removeHighlights();   
            isSelecting = true;
            const hour = parseInt(cell.dataset.hour);
            const half = parseInt(cell.dataset.half);
            selectedRoom = cell.dataset.room;
            selectionStartValue = hour * 2 + half;
            selectedSlots.clear();
            highlightCell(cell);
            const blocked = cell.dataset.blocked;
            if (blocked=="true") {
                booking_blocked();
            } else {
                booking_not_blocked();
            }
        });
    
        cell.addEventListener("mouseenter", () => {
            if (isSelecting && cell.dataset.room === selectedRoom) {
                const hour = parseInt(cell.dataset.hour);
                const half = parseInt(cell.dataset.half);
                const currentValue = hour * 2 + half;
                const blocked = cell.dataset.blocked;

                const from = Math.min(selectionStartValue, currentValue);
                const to = Math.max(selectionStartValue, currentValue);
                if (blocked=="true") {
                    booking_blocked();
                } 

                document.querySelectorAll(`.calendar-cell[data-room="${selectedRoom}"]`).forEach(c => {
                    const h = parseInt(c.dataset.hour);
                    const m = parseInt(c.dataset.half);
                    const val = h * 2 + m;

                    if (val >= from && val <= to) {
                        highlightCell(c);
                        
                    } else {
                        c.classList.remove("selected-slot");
                    }
                });

                // adding to the DESKTOP-form for confirmation
                const startInput = document.getElementById("id_start");
                const endInput = document.getElementById("id_end");
                const roomSelect = document.getElementById("id_room");
                const roomSelectFake = document.getElementById("id_room_fake");
                //from and to cant be used here, that's why I do it again:
                const dynamicStart = Math.min(selectionStartValue, currentValue);
                const dynamicEnd = Math.max(selectionStartValue, currentValue);
                startInput.value = formatStart(dynamicStart);
                endInput.value = formatEnd(dynamicEnd);
                roomSelect.value = selectedRoom; 
                roomSelectFake.value = selectedRoom;


                // adding to the MOBILE-form for confirmation
                const startInputMobile = document.getElementById("id_start-mobile");
                const endInputMobile = document.getElementById("id_end-mobile");
                const roomSelectMobile = document.getElementById("id_room-mobile");
                const roomSelectFakeMobile = document.getElementById("id_room_fake-mobile");
                startInputMobile.value = formatStart(dynamicStart);
                endInputMobile.value = formatEnd(dynamicEnd);
                roomSelectMobile.value = selectedRoom; 
                roomSelectFakeMobile.value = selectedRoom;
                

                // clear
                selectedSlots.clear();
                for (let i = from; i <= to; i++) {
                    const h = Math.floor(i / 2);
                    const m = i % 2;
                    selectedSlots.add(`${h}-${m}-${selectedRoom}`);
                }
            }
        });
    
        cell.addEventListener("mouseup", () => {
            isSelecting = false;
            selectedRoom = null;
            selectionStartValue = null;
        });

        cell.addEventListener("click", (e) => {
            e.preventDefault();
            // if (!isTouchDevice()) return;
            console.log("click event funzt");
            const hour = parseInt(cell.dataset.hour);
            const half = parseInt(cell.dataset.half);
            const currentValue = hour * 2 + half;
            const room = cell.dataset.room;

            if (cell.dataset.blocked === "true") {
                booking_blocked();
                return;
            }

            if (!touchSelectionStart) {
                // first touch: remember start
                touchSelectionStart = {value: currentValue, room};
                removeHighlights();
                highlightCell(cell);
                booking_blocked_on_first_touch();
            } else if (touchSelectionStart.room == room) {
                // second touch
                const from = Math.min(touchSelectionStart.value, currentValue);
                const to = Math.max(touchSelectionStart.value, currentValue);
                document.querySelectorAll(`.calendar-cell[data-room="${room}"]`).forEach(c => {
                    const h = parseInt(c.dataset.hour);
                    const m = parseInt(c.dataset.half);
                    const val = h * 2 + m;
                    if (val >= from && val <= to) {
                        if (c.dataset.blocked === "true") {
                            booking_blocked();
                            return;
                        }
                        highlightCell(c);
                    }
                });

                updateForms(from, to, room);
                touchSelectionStart = null;
            } else {
                touchSelectionStart = null;
                removeHighlights();
            }
        });
    }); 
    
    document.addEventListener("mouseup", () => {
        isSelecting = false;
    });
}

function updateForms(from, to, roomId) {
    const startVal = formatStart(from);
    const endVal = formatEnd(to);

    // desktop version
    document.getElementById("id_start").value = startVal;
    document.getElementById("id_end").value = endVal;
    document.getElementById("id_room").value = roomId;
    document.getElementById("id_room_fake").value = roomId;

    // mobile version
    document.getElementById("id_start-mobile").value = startVal;
    document.getElementById("id_end-mobile").value = endVal;
    document.getElementById("id_room-mobile").value = roomId;
    document.getElementById("id_room_fake-mobile").value = roomId;
}