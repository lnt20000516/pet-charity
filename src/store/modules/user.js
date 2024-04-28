import {
    userLogin, userSendCode, userRegister, userRetrieve,
    getFeedback, deleteFeedback, getUserInfo, updateUserInfo,
    updateContact, authentication, updatePayPassword, addFeedback,
    getUserInfoId, getFriendList, followOrCancel
} from "@/api/user";
export default {
    state: {
        userToken: localStorage.getItem("userToken") || "",
        userInfo: JSON.parse(localStorage.getItem("adminInfo")) || {}
    },
    getters: {
        getUserInfo(state) {
            return state.userInfo
        }
    },
    mutations: {
        updateUserToken(state, token) {
            state.userToken = token;
            localStorage.setItem("userToken", token);
            localStorage.removeItem("adminToken");
        },
        updateUserInfo(state, info) {
            state.userInfo = info;
            localStorage.setItem("userInfo", JSON.stringify(info));
            localStorage.removeItem("AdminInfo");
        },
        updateUserPartInfo(state, info) {
            state.userInfo.introduction = info.introduction;
            state.userInfo.nickname = info.nickname;
            state.userInfo.qq = info.qq;
            state.userInfo.sex = info.sex;
            localStorage.setItem("userInfo", JSON.stringify(state.userInfo));
        },
        updateContactInfo(state, info) {
            state.userInfo.contact.phone = info.phone;
            state.userInfo.contact.mail = info.mail;
            state.userInfo.contact.qq = info.qq;
            state.userInfo.contact.wechat = info.wechat;
            localStorage.setItem("userInfo", JSON.stringify(state.userInfo));
        },
        updateRealName(state, info) {
            state.userInfo.real_name = info;
            state.userInfo.verified = true;
            localStorage.setItem("userInfo", JSON.stringify(state.userInfo));
        }
    },
    actions: {
        async userLoginAction({ commit }, loginForm) {
            try {
                const res = await userLogin(loginForm);
                commit("updateUserToken", res.data.token);
                commit("updateUserInfo", res.data)
                return true;
            } catch (error) {
                console.log(error);
                return false;
            }
        },
        async registerAction(_, registerForm) {
            try {
                await userRegister(registerForm);
                return true;
            } catch (error) {
                console.log(error);
                return false;
            }
        },
        async sendCodeAction(_, phone) {
            try {
                await userSendCode(phone);
                return true;
            } catch (error) {
                console.log(error);
                return false
            }
        },
        async retrieveAction(_, retrieveForm) {
            try {
                await userRetrieve(retrieveForm);
                return true;
            } catch (error) {
                console.log(error);
                return false
            }
        },
        async getFeedbackAction(_, data) {
            try {
                const res = await getFeedback(data);
                return res;
            } catch (error) {
                console.log(error);
                return false
            }
        },
        async deleteFeedbackAction(_, id) {
            try {
                const res = await deleteFeedback(id);
                return res;
            } catch (error) {
                console.log(error);
                return false
            }
        },
        async getUserInfoAction({ commit }) {
            try {
                const res = await getUserInfo();
                commit("updateUserInfo", res)
                return res;
            } catch (error) {
                console.log(error);
                return false
            }
        },
        async updateUserInfoAction({ commit }, data) {
            try {
                const res = await updateUserInfo(data);
                commit("updateUserPartInfo", res)
                return true
            } catch (error) {
                return error
            }
        },
        async updateContactAction({ commit }, data) {
            try {
                await updateContact(data);
                commit("updateContactInfo", data);
                return true
            } catch (error) {
                console.log(error);
                return error
            }
        },
        async authenticationAction({ commit }, data) {
            try {
                await authentication(data);
                commit("updateRealName", data.real_name);
                return true
            } catch (error) {
                console.log(error);
                return error
            }
        },
        async updatePayPasswordAction(_, data) {
            try {
                await updatePayPassword(data);
                return true;
            } catch (error) {
                console.log(error);
                return error
            }
        },
        async addFeedbackAction(_, data) {
            try {
                await addFeedback(data);
                return true;
            } catch (error) {
                console.log(error);
                return false
            }
        },
        async getUserInfoIdAction(_, id) {
            try {
                const res = await getUserInfoId(id);
                return res;
            } catch (error) {
                console.log(error);
                return false
            }
        },
        async getFriendListAction(_, data) {
            try {
                const res = await getFriendList(data);
                return res;
            } catch (error) {
                console.log(error);
                return false
            }
        },
        async followOrCancelAction(_, data) {
            try {
                await followOrCancel(data);
                return true
            } catch (error) {
                console.log(error);
                return false
            }
        }
    },
};