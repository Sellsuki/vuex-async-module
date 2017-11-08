"use strict";

import "jest";
import doAsync from "../src/async-util";

describe("doAsync", () => {
    it("Should be a function", () => {
        expect(typeof doAsync).toBe("function");
    });
})