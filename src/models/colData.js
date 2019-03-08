export default {
    initialState: {
       data: null,
       colData: [],
    },
    syncState: false,

    setData: (state, {payload}) => ({data: payload}),
    setColData: (state, {payload}) => ({colData: payload})
}
