export default {
    initialState: {
       data: null
    },
    syncState: false,

    setData: (state, {payload}) => ({data: payload}),
}
