"use strict";

import "jest";
import { log } from "util";
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

        expect(typeof asyncModule.getters.infoState).toBe("function");

        expect(typeof asyncModule.actions.requestInfoAsync).toBe("function");

        expect(typeof asyncModule.mutations.SET_INFO_ASYNC).toBe("function");

        let result = asyncModule.mutations.SET_INFO_ASYNC({}, {
            type: "SET_INFO_ASYNC_PENDING",
            value: null,
        });
        expect(result).toBeNull();

        result = asyncModule.mutations.SET_INFO_ASYNC({}, {
            data: "data",
            type: "SET_INFO_ASYNC_SUCCESS",
        });
        expect(result).toEqual("data");

        result = asyncModule.mutations.SET_INFO_ASYNC({}, {
            type: "SET_INFO_ASYNC_FAILURE",
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
        asyncModule.actions.requestInfoAsync(store, payload).catch((e) => {
            expect(e).toBeTruthy();
        });
    });

    it("Should be able to return vuex object (have full options)", () => {
        const asyncModule = createVuexAsyncModule("info", {
            actions: {
                addTodo({commit}, data: any) {
                    commit("ADD_TODO", data);
                },
            },
            getters: {
                todos(state) {
                    return state.data;
                },
            },
            mutations: {
                ADD_TODO(state, data: any) {
                    state.data = data;
                },
            },
            state: {
                todos: [],
            },
        });
        expect(typeof asyncModule).toBe("object");
        expect(asyncModule).toHaveProperty("state");
        expect(asyncModule).toHaveProperty("getters");
        expect(asyncModule).toHaveProperty("actions");
        expect(asyncModule).toHaveProperty("mutations");

        expect(typeof asyncModule.state.data).toBe("object");
        expect(typeof asyncModule.state.pending).toBe("boolean");
        expect(typeof asyncModule.state.statusCode).toBe("number");
        expect(typeof asyncModule.state.todos).toBe("object");

        expect(typeof asyncModule.getters.infoState).toBe("function");
        expect(typeof asyncModule.getters.todos).toBe("function");

        expect(typeof asyncModule.actions.requestInfoAsync).toBe("function");
        expect(typeof asyncModule.actions.addTodo).toBe("function");

        expect(typeof asyncModule.mutations.SET_INFO_ASYNC).toBe("function");
        expect(typeof asyncModule.mutations.ADD_TODO).toBe("function");

        let result = asyncModule.mutations.SET_INFO_ASYNC({}, {
            type: "SET_INFO_ASYNC_PENDING",
            value: null,
        });
        expect(result).toBeNull();

        result = asyncModule.mutations.SET_INFO_ASYNC({}, {
            data: "data",
            type: "SET_INFO_ASYNC_SUCCESS",
        });
        expect(result).toEqual("data");

        result = asyncModule.mutations.SET_INFO_ASYNC({}, {
            type: "SET_INFO_ASYNC_FAILURE",
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
        asyncModule.actions.requestInfoAsync(store, payload).catch((e) => {
            expect(e).toBeTruthy();
        });
    });
});
