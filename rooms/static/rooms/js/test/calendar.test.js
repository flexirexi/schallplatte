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
});