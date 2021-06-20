import axios, { AxiosInstance, AxiosRequestConfig, AxiosError } from 'axios';

function handleApiError<T>(error: AxiosError<T>) {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    console.error(error.response.data);
    console.error(error.response.status);
    console.error(error.response.headers);
  } else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    console.error(error.request);
  } else {
    // Something happened in setting up the request that triggered an Error
    console.error('Error', error.message);
  }
  console.error(error.config);
}

class AppApi {
  private axiosInstance: AxiosInstance;

  readonly apiUrl = 'https://swapi.dev/api/';

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: this.apiUrl,
      timeout: 20000,
    });
  }

  private async callApi<TResponse>(config: AxiosRequestConfig) {
    try {
      const response = await this.axiosInstance(config);
      return response.data as TResponse;
    } catch (ex) {
      handleApiError<TResponse>(ex);
      return null;
    }
  }

  async get<TResponse>(url: string, config: AxiosRequestConfig = {}) {
    const responseData = await this.callApi<TResponse>({
      ...config,
      method: 'GET',
      url,
    });
    return responseData;
  }

  async post<TResponse, TData = unknown>(url: string, data?: TData, config?: AxiosRequestConfig) {
    const responseData = await this.callApi<TResponse>({
      ...config,
      data,
      method: 'POST',
      url,
    });
    return responseData;
  }

  async put<TResponse, TData = unknown>(url: string, data?: TData, config?: AxiosRequestConfig) {
    const responseData = await this.callApi<TResponse>({
      ...config,
      data,
      method: 'PUT',
      url,
    });
    return responseData;
  }

  async delete<TResponse>(url: string, config?: AxiosRequestConfig) {
    const responseData = await this.callApi<TResponse>({
      ...config,
      method: 'DELETE',
      url,
    });
    return responseData;
  }
}

const appApiInstance = new AppApi();
Object.freeze(appApiInstance);

export default appApiInstance;
