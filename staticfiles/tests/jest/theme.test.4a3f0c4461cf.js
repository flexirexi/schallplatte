/**
 * @jest-environment jsdom
 */
const { toggleClick } = require('../../js/theme.js');

beforeEach(() => {
    document.documentElement.setAttribute('theme', 'dark');
    document.body.innerHTML =       `
        <button id="theme-toggle">
            <span id="theme-icon"><i class="fas fa-sun" style="color: #b7b7b7;"></i></span>
        </button>
        `;
});

describe("toggle test", () => {
    test("expects the toggle button symbol to change to a moon symbol", () => {
        toggleClick();
        const theme_icon = document.getElementById("theme-icon");
        const icon = theme_icon.querySelector("i");
        expect(icon.classList.contains("fa-moon")).tobe(true);
    });
});
