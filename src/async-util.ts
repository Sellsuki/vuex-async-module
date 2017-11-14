import axios from "axios";

const doAsync = (store, { axiosConfig, beforeSave, onSuccess, onError, mutationTypes }): any => {
  store.commit(mutationTypes.BASE, { type: mutationTypes.PENDING, value: true });
  return axios(axiosConfig)
    .then((response) => {
      let data = response;

      if (beforeSave) {
        data = beforeSave(response, store.state);
      }

      store.commit(mutationTypes.BASE, { type: mutationTypes.PENDING, value: false });
      store.commit(mutationTypes.BASE, { type: mutationTypes.SUCCESS, data, statusCode: response.status });

      if (onSuccess && typeof onSuccess === "function") {
        onSuccess(data);
      } else {
        return Promise.resolve(data);
      }
  })
  .catch((error) => {
    store.commit(mutationTypes.BASE, { type: mutationTypes.PENDING, value: false });
    store.commit(mutationTypes.BASE, { type: mutationTypes.FAILURE, statusCode: error.status });

    if (onError && typeof onError === "function") {
      onError(error);
    } else {
      return Promise.reject(error);
    }
  });
};

export default doAsync;
