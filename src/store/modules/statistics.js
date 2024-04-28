import { donateAmountStatistics, statistics, userSexStatistics,donateAmountTop } from '@/api/statistics'
export default {
    state: {

    },
    mutations: {
    },
    actions: {
        async donateAmountStatisticsAction() {
            try {
                const res = await donateAmountStatistics();
                return res.data;
            } catch (error) {
                console.log(error);
            }
        },
        async donateAmountTopAction() {
            try {
                const res = await donateAmountTop();
                return res.data;
            } catch (error) {
                console.log(error);
            }
        },
        async statisticsAction() {
            try {
                const res = await statistics();
                return res.data;
            } catch (error) {
                console.log(error);
            }
        },
        async userGenderAction() {
            try {
                const res = await userSexStatistics();
                return res.data;
            } catch (error) {
                console.log(error);
            }
        },
    },
};