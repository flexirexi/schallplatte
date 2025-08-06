import { jest } from "@jest/globals";
import {
    highlightCell,
    removeHighlights,
    booking_blocked,
    booking_blocked_on_first_touch,
    formatStart,
    formatEnd,
} from "../calendar-utils.js";

import { updateForms } from "../calendar-ux.js";

describe("calendar-utils functions test suite", () => {
    beforeEach(() => {
        document.body.innerHTML = "";
    });

    test("highlightCell adds 'selected-slot'", () => {
        const cell = document.createElement("div");
        highlightCell(cell);
        expect(cell.classList.contains("selected-slot")).toBe(true);
    });

    test("removeHighlights removes 'selected-slot' from all cells", () => {
        document.body.innerHTML = `
            <div class="calendar-cell selected-slot"></div>
            <div class="calendar-cell selected-slot"></div>
        `;
        removeHighlights();
        document.querySelectorAll(".calendar-cell").forEach((cell) => {
            expect(cell.classList.contains("selected-slot")).toBe(false);
        });
    });

    test("booking_blocked disables buttons and raises a message", () => {
        document.body.innerHTML = `
            <button id="booking-submit"></button>
            <div id="form-error-msg"></div>
            <button id="booking-submit-mobile"></button>
            <div id="form-error-msg-mobile"></div>
        `;
        booking_blocked();
        expect(document.getElementById("booking-submit").disabled).toBe(true);
        expect(document.getElementById("form-error-msg").innerHTML).toContain("overlaps");
    });

    test("booking_blocked_on_first_touch shows up the message/hint about the second tap", () => {
        document.body.innerHTML = `
            <button id="booking-submit"></button>
            <div id="form-error-msg"></div>
            <button id="booking-submit-mobile"></button>
            <div id="form-error-msg-mobile"></div>
        `;
        booking_blocked_on_first_touch();
        expect(document.getElementById("form-error-msg").innerHTML).toContain("end time slot");
    });

    test("formatStart creates correct time stamp", () => {
        document.body.innerHTML = `
            <input id="myDatePicker" value="2025-12-01">
        `;
        const result = formatStart(5);
        expect(result).toBe("2025-12-01T02:30");
    });

    test("formatEnd creates a time stamp 30 minutes later", () => {
        document.body.innerHTML = `
            <input id="myDatePicker" value="2025-12-01">
        `;
        const result = formatEnd(5);
        expect(result).toBe("2025-12-01T03:00");
    });

    test("correct values in updateForms", () => {
        document.body.innerHTML = `
            <input id="myDatePicker" value="2025-12-01">
            <input id="id_start">
            <input id="id_end">
            <input id="id_room">
            <input id="id_room_fake">
            <input id="id_start-mobile">
            <input id="id_end-mobile">
            <input id="id_room-mobile">
            <input id="id_room_fake-mobile">
        `;
        updateForms(4, 5, "R1");

        expect(document.getElementById("id_start").value).toBe("2025-12-01T02:00");
        expect(document.getElementById("id_end").value).toBe("2025-12-01T03:00");
        expect(document.getElementById("id_room").value).toBe("R1");
        expect(document.getElementById("id_room_fake-mobile").value).toBe("R1");
    });
});