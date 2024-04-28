import { getBreedList, getOneselfPets, getOthersPets, updatePetInfo, addPet, delPet } from "@/api/pet";
export default {
    state: {
    },
    mutations: {

    },
    actions: {
        async getBreedListAction(_, data) {
            try {
                const res = await getBreedList(data);
                return res;
            } catch (error) {
                console.log(error);
            }

        },
        async getOneselfPetsAction(_, data) {
            try {
                const res = await getOneselfPets(data);
                return res;
            } catch (error) {
                console.log(error);
            }

        },
        async getOthersPetsAction(_, data) {
            try {
                const res = await getOthersPets(data);
                return res;
            } catch (error) {
                console.log(error);
            }

        },
        async updatePetInfoAction(_, data) {
            try {
                const res = await updatePetInfo(data.data, data.id);
                return res;
            } catch (error) {
                console.log(error);
            }

        },
        async addPetAction(_, data) {
            try {
                await addPet(data);
                return true;
            } catch (error) {
                console.log(error);
                return false;
            }

        },
        async delPetAction(_, id) {
            try {
                await delPet(id);
                return true;
            } catch (error) {
                console.log(error);
                return false;
            }

        },
    }
}