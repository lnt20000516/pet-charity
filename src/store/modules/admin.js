import { adminLogin, modifyPassword } from "@/api/admin";
export default {
    state: {
        adminToken: localStorage.getItem("adminToken") || "",
        adminInfo: JSON.parse(localStorage.getItem("adminInfo")) || {}
    },
    mutations: {
        updateAdminToken(state, token) {
            state.adminToken = token;
            localStorage.setItem("adminToken", token);
            localStorage.removeItem("userToken");
        },
        updateAdminInfo(state, info) {
            state.adminInfo = info;
            localStorage.setItem("adminInfo", JSON.stringify(info));
            localStorage.removeItem("userInfo");
        },
    },
    actions: {
        async adminLoginAction({ commit }, loginForm) {
            try {
                const res = await adminLogin(loginForm);
                commit("updateAdminToken", res.data.token);
                commit("updateAdminInfo", {
                    create_time: res.data.create_time,
                    head: res.data.head,
                    id: res.data.id,
                    introduction: res.data.introduction,
                    nickname: res.data.nickname,
                    phone: res.data.phone,
                    qq: res.data.qq,
                    sex: res.data.sex,
                    sex_value: res.data.sex_value
                })
                return true;
            } catch (error) {
                console.log(error);
                return false;
            }
        },
        async modifyPasswordAction(_, data) {
            try {
                const res = await modifyPassword(data);
                return res
            } catch (error) {
                console.log(error);
                return false;
            }
        }
    },
};