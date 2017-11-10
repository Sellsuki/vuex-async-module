"use strict";

import "jest";
import { createVuexAsyncModule } from "../src";

describe("createVuexAsyncModule", () => {
    it("Should be a function", () => {
        expect(typeof createVuexAsyncModule).toBe("function");
    });

    it("Should be able to return vuex object", () => {
        const asyncModule = createVuexAsyncModule("info");
        expect(typeof asyncModule).toBe("object");
        expect(asyncModule).toHaveProperty("state");
        expect(asyncModule).toHaveProperty("getters");
        expect(asyncModule).toHaveProperty("actions");
        expect(asyncModule).toHaveProperty("mutations");

        expect(typeof asyncModule.state.data).toBe("object");
        expect(typeof asyncModule.state.pending).toBe("boolean");
        expect(typeof asyncModule.state.statusCode).toBe("number");

        expect(typeof asyncModule.getters.info).toBe("function");

        expect(typeof asyncModule.actions.getInfoAsync).toBe("function");

        expect(typeof asyncModule.mutations.GET_INFO_ASYNC).toBe("function");

        let result = asyncModule.mutations.GET_INFO_ASYNC({}, {
            type: "GET_INFO_ASYNC_PENDING",
            value: null,
        });
        expect(result).toBeNull();

        result = asyncModule.mutations.GET_INFO_ASYNC({}, {
            data: "data",
            type: "GET_INFO_ASYNC_SUCCESS",
        });
        expect(result).toEqual("data");

        result = asyncModule.mutations.GET_INFO_ASYNC({}, {
            type: "GET_INFO_ASYNC_FAILURE",
        });
        expect(result).toBeNull();

        const store: object = {
            commit() {
                return null;
            },
        };
        const payload: object = {
            axiosConfig: {
                url: "",
            },
            dataCallback(data) {
                return data;
            },
        };
        asyncModule.actions.getInfoAsync(store, payload).catch((e) => {
            expect(e).toBeTruthy();
        });
    });
});
