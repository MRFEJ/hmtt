import axios from "axios"

const requery = axios.create({
    baseURL:'http://ttapi.research.itcast.cn/app/v1_0/'
})

requery.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});
  
requery.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response.data;
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});
  
export default requery