import axios from "axios";

const doAsync = (store, { axiosConfig, dataCallback, successCallback, errorCallback, mutationTypes }): any => {
  store.commit(mutationTypes.BASE, { type: mutationTypes.PENDING, value: true });
  return axios(axiosConfig)
    .then((response) => {
      let data = response;

      if (dataCallback) {
        data = dataCallback(response, store.state);
      }

      store.commit(mutationTypes.BASE, { type: mutationTypes.SUCCESS, data, statusCode: response.status });
      store.commit(mutationTypes.BASE, { type: mutationTypes.PENDING, value: false });

      // if (successCallback) {
      //   successCallback(data);
      // }

      return Promise.resolve(data);
  })
  .catch((error) => {
    store.commit(mutationTypes.BASE, { type: mutationTypes.PENDING, value: false });
    store.commit(mutationTypes.BASE, { type: mutationTypes.FAILURE, statusCode: error.response.status });

    // if (errorCallback) {
    //   errorCallback(error);
    // }
    return Promise.reject(error);
  });
};

export default doAsync;
