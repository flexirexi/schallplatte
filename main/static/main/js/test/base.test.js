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

    test("calls .hide() when innerWidth <= 768px", () => {
        global.innerWidth = 600;
        collapseNavBar();

        expect(bootstrap.Collapse.getOrCreateInstance).toHaveBeenCalled();
        const instance = bootstrap.Collapse.getOrCreateInstance.mock.results[0].value;
        expect(instance.hide).toHaveBeenCalled();
    });

});