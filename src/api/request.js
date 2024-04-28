import axios from 'axios';
import variable from '@/api/variable'
const baseURL = variable.baseURL;
const service = axios.create({
    baseURL: baseURL,
    timeout: 10000 //访问超时的时间限制
});

//请求拦截器
service.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("userToken") || localStorage.getItem("adminToken");
        const url = config.url;
        if (token && !(url.includes("login") || url.includes("register") || url.includes("retrieve") || url === "/pet/pet/list")) {
            config.headers.TOKEN = token;
        }

        return config;
    },
    (err) => Promise.reject(err));


//响应拦截器
service.interceptors.response.use(
    (response) => {
        if (response.data.code) {
            if (response.data.code !== 200) {
                window.$notification.error({
                    content: response.data.detail,
                    duration: 1500,
                    keepAliveOnHover: true,
                });
                return Promise.reject(response.data.detail)
            }
            return response.data;
        } else if (response.status) {
            if (response.config.method === "delete") {
                if (response.status !== 204) {
                    window.$notification.error({
                        content: "删除失败",
                        duration: 1500,
                        keepAliveOnHover: true,
                    });
                    return Promise.reject("删除失败")
                }
                return true;
            } else if (response.statusText === "Created") {
                if (response.status !== 201) {
                    window.$notification.error({
                        content: "添加失败",
                        duration: 1500,
                        keepAliveOnHover: true,
                    });
                    return Promise.reject("添加失败")
                }
                return response.data;
            } else {
                if (response.status !== 200) {
                    window.$notification.error({
                        content: "请求失败",
                        duration: 1500,
                        keepAliveOnHover: true,
                    });
                    return Promise.reject("请求失败")
                }
                return response.data;
            }
        }



    },
    (err) => {
        if (err.message.indexOf("Network Error") >= 0) {
            window.$notification.error({
                content: err.message,
                meta: '网络错误',
                duration: 1500,
                keepAliveOnHover: true,
            });
        }
        return Promise.reject(err)
    }
)


export default service