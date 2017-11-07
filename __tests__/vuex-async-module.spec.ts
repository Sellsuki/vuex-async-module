"use strict";

import "jest";
import { createVuexAsyncModule } from "../src";

describe("createVuexAsyncModule", () => {
    it("Should be function", () => {
        expect(typeof createVuexAsyncModule).toBe("function");
    });

    it("Should be able to return object", () => {
        const asyncModule = createVuexAsyncModule("info");
        expect(typeof asyncModule).toBe("object");
        expect(asyncModule).toHaveProperty("state");
        expect(asyncModule).toHaveProperty("getters");
        expect(asyncModule).toHaveProperty("actions");
        expect(asyncModule).toHaveProperty("mutations");
    });
});
