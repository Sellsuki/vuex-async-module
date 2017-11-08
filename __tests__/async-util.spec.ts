"use strict";

import "jest";
import doAsync from "../src/async-util";
import axios from 'axios';
import * as MockAdapter from 'axios-mock-adapter';

describe("doAsync", () => {
    let store
    beforeEach(() => {
        store = {
            state: {},
            commit: jest.fn(),
        }
    });

    it("Should be a function", () => {
        expect(typeof doAsync).toBe("function");
    });

    it("Should call dataCallback and successCallback", () => {
        const mock = new MockAdapter(axios);
        mock.onAny().reply(200, []);

        const dataCallback = jest.fn();
        const successCallback = jest.fn();
        const errorCallback = jest.fn();
        const options = {
            axiosConfig: {},
            dataCallback,
            errorCallback,
            mutationTypes: { BASE: "", PEDNING: "" },
            successCallback,
        };
        doAsync(store, options).then(() => {
            expect(dataCallback.mock.calls.length).toBe(1);
            expect(successCallback.mock.calls.length).toBe(1);
        });
    });

    it("Should't call dataCallback and successCallback when not passing functions to it.", () => {
        const mock = new MockAdapter(axios);
        mock.onAny().reply(200, []);

        const dataCallback = jest.fn();
        const successCallback = jest.fn();

        const options = {
            axiosConfig: {},
            mutationTypes: { BASE: "", PEDNING: "" },
        };
        doAsync(store, options).then(() => {
            expect(dataCallback.mock.calls.length).toBe(0);
            expect(successCallback.mock.calls.length).toBe(0);
        });
    });

    it("Should call errorCallback", () => {
        const mock = new MockAdapter(axios);
        mock.onAny().reply(500, []);

        const dataCallback = jest.fn();
        const successCallback = jest.fn();
        const errorCallback = jest.fn();
        const options = {
            axiosConfig: {},
            dataCallback,
            errorCallback,
            mutationTypes: { BASE: "", PEDNING: "" },
            successCallback,
        };

        doAsync(store, options).then(() => {
            expect(errorCallback.mock.calls.length).toBe(1);
        });
    });

    it("Should't call errorCallback when not passing function to it.", () => {
        const mock = new MockAdapter(axios);
        mock.onAny().reply(500, []);

        const errorCallback = jest.fn();

        const options = {
            axiosConfig: {},
            mutationTypes: { BASE: "", PEDNING: "" },
        };
        doAsync(store, options).then(() => {
            expect(errorCallback.mock.calls.length).toBe(0);
        });
    });
});
