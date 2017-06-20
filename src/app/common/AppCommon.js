"use strict";


/**
 * 项目配置
 */
export {footer} from './Config';

/**
 * 全局变量
 */
export {getBaseModel, LocationHash, Code, Url, consoleMenu, headerMenu} from './Global';


/**
 * 会话对象
 */
export {default as Session} from './Session';


/**
 * 拦截器
 */
export {ajaxInterceptor} from './Interceptor';


/**
 * 公共服务
 */
export {getUserInfo} from './Service';