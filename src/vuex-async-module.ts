import { camelCase, upperCaseFirst } from "change-case";
import doAsync from "./async-util";

type ActionFunc = (store, payload: IAsyncActionPayload) => any;
type BeforeSaveFunc = (data: any, state: object) => any;
type OnSuccessFunc = (data: object) => any;
type OnErrorFunc = (error: any) => any;

interface IAsyncType {
    BASE: string;
    SUCCESS: string;
    FAILURE: string;
    PENDING: string;
    loadingKey: string;
    statusCode: string;
    stateKey: string;
}

interface IAsyncActionPayload {
    axiosConfig: object;
    beforeSave: BeforeSaveFunc;
    onError: OnErrorFunc;
    onSuccess: OnSuccessFunc;
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

const createMutations = (type: IAsyncType): any => {
    const mutations: any = {};
    mutations[type.BASE] = (state, payload) => {
        switch (payload.type) {
            case type.PENDING:
                // return Vue.set(state, TYPE.loadingKey, payload.value);
                return state[type.loadingKey] = payload.value;

            case type.SUCCESS:
                // Vue.set(state, TYPE.statusCode, payload.statusCode);
                // return Vue.set(state, TYPE.stateKey, payload.data);
                state[type.statusCode] = payload.statusCode;
                return state[type.stateKey] = payload.data;

            case type.FAILURE:
                // Vue.set(state, TYPE.statusCode, payload.statusCode);
                // return Vue.set(state, TYPE.stateKey, null);
                state[type.statusCode] = payload.statusCode;
                return state[type.stateKey] = null;
        }
    };
    return mutations;
};

const createGetters = (name: string): any => {
    const getters: any = {};
    getters[`${camelCase(name)}State`] = (state) => {
        return {
            data: state.data,
            pending: state.pending,
            statusCode: state.statusCode,
        };
    };
    return getters;
};

const createActions = (name: string, type: IAsyncType): any => {
    const actions: any = {};
    const action: ActionFunc = (store, payload: IAsyncActionPayload) => {
        const { axiosConfig, beforeSave, onSuccess, onError } = payload;
        return doAsync(
            store, {
            axiosConfig,
            beforeSave,
            mutationTypes: type,
            onError,
            onSuccess,
        });
    };

    actions[camelCase(`request${name}Async`)] = action;
    return actions;
};

export const createVuexAsyncModule = (name: string): any => {
    const Name = upperCaseFirst(name);
    const MUTATION_TYPE: IAsyncType = createAsyncType(`SET_${Name.toUpperCase()}_ASYNC`);
    return {
        actions: createActions(Name, MUTATION_TYPE),
        getters: createGetters(Name),
        mutations: createMutations(MUTATION_TYPE),
        state: {
            data: null,
            pending: false,
            statusCode: 0,
        },
    };
};
