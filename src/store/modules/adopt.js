import { getAdoptList, deleteAdopt, addAdopt } from "@/api/adopt";
export default {
    state: {

    },
    mutations: {

    },
    getters: {
    },

    actions: {
        async getAdoptListAction(_,data) {
            try {
                const res = await getAdoptList(data);
                return res
            } catch (error) {
                console.log(error);
                return false
            }
        },
        async deleteAdoptAction(_, id) {
            try {
                await deleteAdopt(id);
                return true
            } catch (error) {
                console.log(error);
                return false
            }
        },
        async addAdoptAction(_, data) {
            try {
                await addAdopt(data);
                return true
            } catch (error) {
                console.log(error);
                return false
            }
        },
    },
}