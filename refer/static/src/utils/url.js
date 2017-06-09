
const HOST = '/';
// const HOST = 'http://rap.taobao.org/mockjsdata/11550/';
// const HOST = 'http://172.30.0.66:8080/';
// const HOST = 'http://172.30.3.98:8080/';
const CONTEXT = `${HOST}InnerEval/service/`;

module.exports = {
    LOGIN:              `${CONTEXT}user/login`,                         // 登录
    LOGOUT:             `${HOST}InnerEval/logout`,                      // 登出
    RSA_KEY:            `${CONTEXT}key`,                                // 获取秘钥
    PWD_EDIT:           `${CONTEXT}sys/user/modifyPwd`,                 // 修改密码

    JOB_LIST:           `${CONTEXT}job/manage/jobList`,                 // 所有job列表
    RUN_JOB_LIST:       `${CONTEXT}job/manage/runJobList`,              // 正在执行job列表
    JOB_ADD:            `${CONTEXT}job/manage/add`,                     // 添加job
    JOB_EDIT:           `${CONTEXT}job/manage/edit`,                    // 编辑job
    JOB_DEL:            `${CONTEXT}job/manage/delete`,                  // 删除job
    JOB_PAUSE:          `${CONTEXT}job/manage/pause`,                   // 暂停job
    JOB_RESUME:         `${CONTEXT}job/manage/resume`,                  // 启动job
    JOB_EXC:            `${CONTEXT}job/manage/executeImmediately`,      // 立即执行job

    GROUP_LIST:         `${CONTEXT}rule/getAllGroupList`,               // 规则组列表
    GROUP_FORM:         `${CONTEXT}rule/getGroupForm`,                  // 获取规则组信息
    GROUP_ADD:          `${CONTEXT}rule/addRuleGroup`,                  // 添加规则组
    GROUP_EDIT:         `${CONTEXT}rule/editRuleGroup`,                 // 修改规则组
    CODE_LIST:          `${CONTEXT}rule/getCodeMap`,                    // 获取规则列表
    OBJECT_LIST:        `${CONTEXT}rule/getAllCodeList`,                // 获取所有业务对象 
    RULE_DETAIL:        `${CONTEXT}rule/getGroupRuleDetail`,            // 具体规则内容
    RULE_MAP:           `${CONTEXT}rule/getCodeMapDetail`,              // 添加规则-获取规则表达式
    RULE_ADD:           `${CONTEXT}rule/addCodeMapDetail`,              // 规则明细修改-添加规则表达式
    RULE_EDIT:          `${CONTEXT}rule/updateCodeMapDetail`,           // 规则明细修改-更新规则明细
    RULE_DEL:           `${CONTEXT}rule/deleteRule`,                    // 删除规则
    UPDATE_CONFIG:      `${CONTEXT}rule/updateFromTmp`,                 // 更新规则配置
    FACTCODE_LIST:      `${CONTEXT}rule/getFactCodeList`,               // 获取业务对象及明细字段

    FLOW_INFO:          `${CONTEXT}flow/getFlowRules`,                  // 获取流程配置
    FLOW_SAVE:          `${CONTEXT}flow/saveFlowRules`,                 // 保存流程配置
}

