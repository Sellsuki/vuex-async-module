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
            commit: jest.fn()
        }
    });

    it("Should be a function", () => {
        expect(typeof doAsync).toBe("function");
    });

    it("Should call dataCallback and successCallback", () => {
        let mock = new MockAdapter(axios)
        mock.onAny().reply(200, [])

        let dataCallback = jest.fn()
        let successCallback = jest.fn()
        let options = {
            axiosConfig: {},
            dataCallback,
            successCallback,
            errorCallback: {},
            mutationTypes: { BASE: '', PEDNING: '' } 
        }
        
        doAsync(store, options).then(() => {
            expect(dataCallback.mock.calls.length).toBe(1)
            expect(successCallback.mock.calls.length).toBe(1)
        })
    })
})