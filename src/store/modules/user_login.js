export const user_login = {
    namespaced: true,
    state: {
        isLoggedIn: false,
        customer: null,
        user: {
            token: null,
            tokenExpiresAt: null,
            username:'',
            shouldSignup: true,
            isAuthenticated: false


        }},
    actions: {
        saveLoginCredentials({ commit }, tokenData) {
            commit('mutateToken',tokenData.token)
            commit('mutateTokenExpiresAt',tokenData.expires_at)
        },
        saveCustomerInfo({ commit }, customer) {
            commit('mutateCustomerInfo',customer)
        },
        loginUser({ commit }) {
            commit("markAsLoggedIn");
        },
        logoutUser({ commit }) {
            commit("markAsLoggedOut");
        }

    },
    mutations: {
        markAsLoggedIn(state) {
            state.isLoggedIn = true;
            state.user.isAuthenticated = true;
        },
        markAsLoggedOut(state) {
            state.isLoggedIn = false;
            state.user.isAuthenticated = false;

        },
        mutateToken(state, token) {
            state.user.token = token;
        },
        mutateCustomerInfo(state, customerInfo) {
            state.user.shouldSignup = false
            state.customer = customerInfo;
        },
        mutateTokenExpiresAt(state, expiresAt) {
            state.user.tokenExpiresAt = expiresAt;
        }

    },
    getters:{
        shouldFetchToken: (state, getters)=>{
            if( state.user.token == null){
                return true
            } else{
                    if(getters.isTokenExpired){
                        return true
                        }
            }
            return false

        },
        isTokenExpired: state =>{
            let expiresAt = new Date(state.user.tokenExpiresAt)
            let now = new Date();
            return expiresAt < now
        }
    }
};

