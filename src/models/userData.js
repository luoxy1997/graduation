export default {
    initialState: {
        userData: null,
    },
    syncState: false,
    setUserData: (state, {payload}) => ({userData: payload}),
}
