import axios from 'axios';

import { notification } from 'antd';

function redirectLogin(res) {}
function systemRepair(res) {
  window.location.href = '/system/repair';
}
function popError(err) {}

function createReq(baseApi) {
    const request = axios.create({
      baseURL: baseApi,
      timeout: 15 * 1000
    });
    
    // cors with cookies
    // request.defaults.withCredentials = true;
    request.interceptors.request.use((config) => {
      // if (token) {
      //   config.headers = {
      //     ...config.headers,
      //     token: `${token}`
      //   };
      // }

      return config;
    }, (error) => {
      return Promise.reject(error);
    });
    
    request.interceptors.response.use(
      response => {
        // response.status = 200
        const res = response.data || {};
        if (res.code == 401) {
          return redirectLogin(res);
        } else if (res.code == 502) {
          // return systemRepair(res);
          return;
        } else {
          if (res.code && res.code != 200) {
            // popError(res.msg);
            notification.error({
              message: res.message
            });
            return
          }
          return res;
        }
      },
      error => {
        if (error.response) {
          const res = error.response.data || {};
          switch (error.response.status) {
            case 400:
              if (res.code == 2003 || res.code == 2002) {
                return redirectLogin(res);
              }
              break;
            case 401:
              return redirectLogin(res);
            case 502:
            case 504:
              return systemRepair(res);
            default:
              ;
          }
          // popError(res && res.message || 'Server error');
          return Promise.reject(res); //
        }
        // popError('Unknow error');
        return Promise.reject(error);
      });

  return request;
}

const request = createReq(process.env.baseApi)

export default request;

export { createReq };