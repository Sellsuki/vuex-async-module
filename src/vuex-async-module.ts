import { camelCase, upperCaseFirst } from "change-case";
// import Vue from "vue";
import doAsync from "./async-util";

interface IAsyncType {
    BASE: string;
    SUCCESS: string;
    FAILURE: string;
    PENDING: string;
    loadingKey: string;
    statusCode: string;
    stateKey: string;
}

const createAsyncType = (typeName: string): IAsyncType => {
    return {
        BASE: `${typeName}`,
        FAILURE: `${typeName}_FAILURE`,
        PENDING: `${typeName}_PENDING`,
        SUCCESS: `${typeName}_SUCCESS`,
        loadingKey: `pending`,
        stateKey: `data`,
        statusCode: `statusCode`,
    };
};

const createMutations = (TYPE: IAsyncType) => {
    const mutations = {};
    mutations[TYPE.BASE] = (state, payload) => {
        switch (payload.type) {
            case TYPE.PENDING:
                // return Vue.set(state, TYPE.loadingKey, payload.value);
                return state[TYPE.loadingKey] = payload.value;

            case TYPE.SUCCESS:
                // Vue.set(state, TYPE.statusCode, payload.statusCode);
                // return Vue.set(state, TYPE.stateKey, payload.data);
                state[TYPE.statusCode] = payload.statusCode;
                return state[TYPE.stateKey] = payload.data;

            case TYPE.FAILURE:
                // Vue.set(state, TYPE.statusCode, payload.statusCode);
                // return Vue.set(state, TYPE.stateKey, null);
                state[TYPE.statusCode] = payload.statusCode;
                return state[TYPE.stateKey] = null;
        }
    };
    return mutations;
};

const createGetters = (name: string) => {
    const getters = {};
    getters[camelCase(name)] = (state) => {
        return {
            data: state.data,
            pending: state.pending,
            statusCode: state.statusCode,
        };
    };
    return getters;
};

const createActions = (NAME: string, TYPE: IAsyncType) => {
    const actions = {};
    actions[camelCase(`get${NAME}Async`)] = (store, payload) => {
        const {axiosConfig, dataCallback, successCallback, errorCallback} = payload;
        return doAsync(
            store, {
            axiosConfig,
            dataCallback,
            errorCallback,
            mutationTypes: TYPE,
            successCallback,
        });
    };
    return actions;
};

export const createVuexAsyncModule = (name: string) => {
    const Name = upperCaseFirst(name);
    const TYPE: IAsyncType = createAsyncType(`GET_${Name.toUpperCase()}_ASYNC`);
    return {
        actions: createActions(Name, TYPE),
        getters: createGetters(Name),
        mutations: createMutations(TYPE),
        state: {
            data: null,
            pending: false,
            statusCode: null,
        },
    };
};
