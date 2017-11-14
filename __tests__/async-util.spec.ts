"use strict";

import axios from "axios";
import * as MockAdapter from "axios-mock-adapter";
import "jest";
import doAsync from "../src/async-util";

describe("doAsync", () => {
    let store;
    beforeEach(() => {
        store = {
            commit: jest.fn(),
            state: {},
        };
    });

    it("Should be a function", () => {
        expect(typeof doAsync).toBe("function");
    });

    it("Should call beforeSave", () => {
        const mock = new MockAdapter(axios);
        mock.onAny().reply(200, []);

        const beforeSave = jest.fn().mockReturnValueOnce("hello");
        const options = {
            axiosConfig: {},
            beforeSave,
            mutationTypes: { BASE: "", PEDNING: "" },
        };
        doAsync(store, options).then((data) => {
            expect(beforeSave.mock.calls.length).toBe(1);
            expect(data).toBe("hello");
        });
    });

    it("Should't call beforeSave because not passing through.", () => {
        const mock = new MockAdapter(axios);
        mock.onAny().reply(200, []);

        const beforeSave = jest.fn();

        const options = {
            axiosConfig: {},
            mutationTypes: { BASE: "", PEDNING: "" },
        };

        doAsync(store, options).then(() => {
            expect(beforeSave.mock.calls.length).toBe(0);
        });
    });

    it("Should return promise if not passing onSuccess callback.", () => {
        const mock = new MockAdapter(axios);
        mock.onAny().reply(200, []);

        const options = {
            axiosConfig: {},
            mutationTypes: { BASE: "", PEDNING: "" },
        };

        doAsync(store, options).then(() => {
            expect(e).toBeTruthy();
        });
    });

    it("Shouldn't return promise if not passing onSuccess callback.", () => {
        const mock = new MockAdapter(axios);
        mock.onAny().reply(200, []);

        let success = false;
        const options = {
            axiosConfig: {},
            onSuccess: () => {
                success = true
            },
            mutationTypes: { BASE: "", PEDNING: "" },
        };

        doAsync(store, options).then(() => {
            expect(success).toBe(true);
        });
    });

    it("Should return on catch", () => {
        const mock = new MockAdapter(axios);
        mock.onAny().reply(500, []);

        const options = {
            axiosConfig: {},
            mutationTypes: { BASE: "", PEDNING: "" },
        };

        doAsync(store, options).catch((e) => {
            expect(e).toBeTruthy();
        });
    });

    it("Should't call errorCallback when not passing function to it.", () => {
        const mock = new MockAdapter(axios);
        mock.onAny().reply(500, []);

        let error = false;
        const options = {
            axiosConfig: {},
            onError: () => {
                error = true
            },
            mutationTypes: { BASE: "", PEDNING: "" },
        };
        doAsync(store, options).then((e) => {
            expect(error).toBe(true);
        });
    });
});
