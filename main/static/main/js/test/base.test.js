import { collapseNavBar } from "../base.js";
import { jest } from "@jest/globals";

// boostrap mock..
global.bootstrap = {
    Collapse: {
        getOrCreateInstance: jest.fn(() => ({
            hide: jest.fn(),
        })),
    },
};

describe("collapseNavBar()", () => {
    let originalInnerWidth;
    beforeEach(() => {
        originalInnerWidth = global.innerWidth;
        document.body.innerHTML = `<div id="navbarNav"></div>`;
    });

    afterEach(() => {
        document.body.innerHTML = "";
        global.innerWidth = originalInnerWidth;
        jest.clearAllMocks();
    });

    test("Calls .hide() when innerWidth <= 768px", () => {
        global.innerWidth = 600;
        collapseNavBar();

        expect(bootstrap.Collapse.getOrCreateInstance).toHaveBeenCalled();
        const instance = bootstrap.Collapse.getOrCreateInstance.mock.results[0].value;
        expect(instance.hide).toHaveBeenCalled();
    });

    test("Doesn't call .hide() when innerWidth > 768px", () => {
        global.innerWidth = 769;
        collapseNavBar();
        expect(bootstrap.Collapse.getOrCreateInstance).not.toHaveBeenCalled();
    });

    test("No misbehavior when body is empty", () => {
        document.body.innerHTML = "";
        global.innerWidth = 600;

        expect(() => collapseNavBar()).not.toThrow();
        expect(bootstrap.Collapse.getOrCreateInstance).not.toHaveBeenCalled();
    });

});