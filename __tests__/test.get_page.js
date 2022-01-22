/**
 * @jest-environment jsdom
 */

const fs = require("fs");
const path = require("path"); // to get to my index.html
const html = fs.readFileSync(
    path.resolve(__dirname, "../client/index.html"),
    "utf8"
);

// jest
//     .dontMock('fs');

function testing(doc) {
    console.log("testing...");
    if (doc) {
        console.log("document exists");
        if (doc.getElementById("imported-files")) {
            console.log("input tag exists");
            return true;
        }
    }
    return false;
}

describe("Testing if page generates, if so does the input tag show as well", function () {
    beforeEach(() => {
        document.documentElement.innerHTML = html.toString();
    });

    afterEach(() => {
        // restore the original func after test
        jest.resetModules();
    });

    test("Input file exists?", function () {
        expect(testing(document)).toBeTruthy();
    });
});
