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

    it("Should call dataCallback", () => {
        const mock = new MockAdapter(axios);
        mock.onAny().reply(200, []);

        const dataCallback = jest.fn().mockReturnValueOnce("hello");
        const options = {
            axiosConfig: {},
            dataCallback,
            mutationTypes: { BASE: "", PEDNING: "" },
        };
        doAsync(store, options).then((data) => {
            expect(dataCallback.mock.calls.length).toBe(1);
            expect(data).toBe("hello");
        });
    });

    it("Should't call dataCallback and successCallback when not passing functions to it.", () => {
        const mock = new MockAdapter(axios);
        mock.onAny().reply(200, []);

        const dataCallback = jest.fn();

        const options = {
            axiosConfig: {},
            mutationTypes: { BASE: "", PEDNING: "" },
        };
        doAsync(store, options).then(() => {
            expect(dataCallback.mock.calls.length).toBe(0);
        });
    });

    it("Should call errorCallback", () => {
        const mock = new MockAdapter(axios);
        mock.onAny().reply(500, []);

        const dataCallback = jest.fn();
        const options = {
            axiosConfig: {},
            dataCallback,
            mutationTypes: { BASE: "", PEDNING: "" },
        };

        doAsync(store, options).catch((e) => {
            expect(e).toBeTruthy();
        });
    });

    it("Should't call errorCallback when not passing function to it.", () => {
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
});
