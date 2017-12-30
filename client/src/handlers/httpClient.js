import axios from "axios";

const httpClient = axios.create();

function errorHandler(err) {
  const errorResponse = err.response;
  if (errorResponse.status === 401 || errorResponse.status === 403) {
    window.location.replace(err.response.data.redirectUrl);
  }
}

httpClient.interceptors.response.use(res => res, errorHandler);

export default httpClient;
