import { createNumbers } from "../client/scripts/number_scale.js";

test("Testing the createNumbers func, should return false", () => {
    expect(createNumbers()).toBeFalsy();
});
