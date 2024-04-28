import { getDonateList, deleteDonate, updateDonateState, addDonate, getDonateInfo, makeDonations } from "@/api/donate";
export default {
    state: {

    },
    mutations: {
    },
    actions: {
        async getDonateListAction(_, data) {
            try {
                const res = await getDonateList(data);
                return res;
            } catch (error) {
                console.log(error);
            }

        },
        async deleteDonateAction(_, id) {
            try {
                const res = await deleteDonate(id);
                return res;
            } catch (error) {
                console.log(error);
            }
        },
        async updateDonateStateAction(_, payload) {
            try {
                await updateDonateState(payload.param1, payload.param2);
            } catch (error) {
                console.log(error);
            }
        },
        async addDonateAction(_, data) {
            try {
                await addDonate(data);
                return true;
            } catch (error) {
                console.log(error);
                return false;
            }
        },
        async getDonateInfoAction(_, id) {
            try {
                const res = await getDonateInfo(id);
                return res;
            } catch (error) {
                console.log(error);
                return false;
            }
        },
        async makeDonationsAction(_, data) {
            try {
                await makeDonations(data);
                return true;
            } catch (error) {
                console.log(error);
                return false;
            }
        }
    }
}