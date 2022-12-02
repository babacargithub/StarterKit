export const loader = {
    namespaced: true,
    state: {
        isLoading: false,
        serverErrorOccurred: false,
        savedSuccessfully: false
    },
    actions: {
        showIsLoadingIndicator({ commit }) {
            commit("showIsLoadingIndicator");
        },
        hideIsLoadingIndicator({ commit }) {
            commit("hideIsLoadingIndicator");
        },
        showIsSavedSuccessfully({ commit }) {
            commit("toggleTrueSavedSuccessfully");
        },
        hideIsSavedSuccessfully({ commit }) {
            commit("toggleFalseSavedSuccessfully");
        } ,
        showErrorOccurred({ commit }) {
            commit("toggleServerErrorOccurred");
        }
    },
    mutations: {
        showIsLoadingIndicator(state) {
            state.isLoading = true;
        },
        hideIsLoadingIndicator(state) {
            state.isLoading = false;
        },
        toggleTrueSavedSuccessfully(state) {
            state.savedSuccessfully = true;
        },
        toggleFalseSavedSuccessfully(state) {
            state.savedSuccessfully = false;
        },
        toggleServerErrorOccurred(state) {
            state.serverErrorOccurred = !!state.serverErrorOccurred;
        }
    }
};
