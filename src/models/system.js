import {ajax} from '../commons/ajax';

export default {
    initialState: {},

    /**
     * 根据 userId 获取系统菜单
     */
    getMenus: {
        payload: ({params, options} = {}) => {
            const {userId} = params;

            // TODO 修改请求路径
            return ajax.get('/mock/system/menus', {userId}, options);
        },
    },

    login: {
        payload: ({params, options} = {}) => {

            const {userName, password} = params;

            // TODO 修改请求路径
            return ajax.post('/mock/login', {userName, password}, options);
        },
    },

    logout: {
        // TODO 修改请求路径
        payload: ({params, options} = {}) => ajax.post('/mock/logout', params, options),
    },
}
