import Vue from 'vue'
import Router from 'vue-router'
import Store from '../store/store'
const _import = require('@/router/_import_' + process.env.NODE_ENV)
Vue.use(Router)

const router = new Router({
  // base: '/sss',
  mode: 'history',
  routes: [
    {
      path: '/Login',
      name: 'Login',
      component: _import('login/Login')
    },
    {
      path: '/',
      redirect: '/Main'
    },
    {
      path: '/Main',
      name: 'Main',
      component: _import('main/Main'),
      meta: {
        // 添加该字段，表示进入这个路由是需要登录的
        requireAuth: true
      },
      children: [
        {
          path: 'Home',
          name: 'Home',
          component: _import('home/Home')
        },
        {
          path: 'Dict',
          name: 'Dict',
          component: _import('dict/Dict'),
          meta: { keepAlive: true }
        },
        {
          path: 'DictAdd',
          name: 'DictAdd',
          component: _import('dict/DictAdd'),
          meta: { menu: {name: '字典添加'} }
        },
        {
          path: 'DictEdit/:id',
          name: 'DictEdit',
          component: _import('dict/DictEdit'),
          meta: { menu: {name: '字典修改'}, keepAlive: true }
        },
        {
          path: 'Area',
          name: 'Area',
          component: _import('area/Area')
        },
        {
          path: 'AreaAdd',
          name: 'AreaAdd',
          component: _import('area/AreaAdd'),
          meta: { menu: {name: '区域添加'} }
        },
        {
          path: 'AreaEdit/:id',
          name: 'AreaEdit',
          component: _import('area/AreaEdit'),
          meta: { menu: {name: '区域修改'}, keepAlive: true }
        },
        {
          path: 'Office',
          name: 'Office',
          component: _import('office/Office')
        },
        {
          path: 'OfficeAdd',
          name: 'OfficeAdd',
          component: _import('office/OfficeAdd'),
          meta: { menu: {name: '机构添加'} }
        },
        {
          path: 'OfficeEdit/:id',
          name: 'OfficeEdit',
          component: _import('office/OfficeEdit'),
          meta: { menu: {name: '机构修改'}, keepAlive: true }
        },
        {
          path: 'Role',
          name: 'Role',
          component: _import('role/Role')
        },
        {
          path: 'RoleAdd',
          name: 'RoleAdd',
          component: _import('role/RoleAdd'),
          meta: { menu: {name: '角色添加'} }
        },
        {
          path: 'RoleEdit/:id',
          name: 'RoleEdit',
          component: _import('role/RoleEdit'),
          meta: { menu: {name: '角色修改'}, keepAlive: true }
        },
        {
          path: 'RoleBindDataScope/:roleId',
          name: 'RoleBindDataScope',
          component: _import('role/RoleBindDataScope'),
          meta: { menu: {name: '角色绑定数据范围'} }
        },
        {
          path: 'FunResourceDataScopeDefine/:roleId',
          name: 'FunResourceDataScopeDefine',
          component: _import('funResource/FunResourceDataScopeDefine'),
          meta: { menu: {name: '角色设置功能资源'} }
        },
        {
          path: 'User',
          name: 'User',
          component: _import('user/User')
        },
        {
          path: 'UserAdd',
          name: 'UserAdd',
          component: _import('user/UserAdd'),
          meta: { menu: {name: '用户添加'} }
        },
        {
          path: 'UserEdit/:id',
          name: 'UserEdit',
          component: _import('user/UserEdit'),
          meta: { menu: {name: '用户修改'}, keepAlive: true }
        },
        {
          path: 'UserBindDataScope/:userId',
          name: 'UserBindDataScope',
          component: _import('user/UserBindDataScope'),
          meta: { menu: {name: '用户绑定数据范围'} }
        },
        {
          path: 'UserBindRoles/:userId',
          name: 'UserBindRoles',
          component: _import('user/UserBindRoles'),
          meta: { menu: {name: '用户绑定角色'} }
        },
        {
          path: 'FunResource',
          name: 'FunResource',
          component: _import('funResource/FunResource')
        },
        {
          path: 'FunResourceAdd',
          name: 'FunResourceAdd',
          component: _import('funResource/FunResourceAdd'),
          meta: { menu: {name: '功能资源添加'} }
        },
        {
          path: 'FunResourceEdit/:id',
          name: 'FunResourceEdit',
          component: _import('funResource/FunResourceEdit'),
          meta: { menu: {name: '功能资源修改'}, keepAlive: true }
        },
        {
          path: 'DataScope',
          name: 'DataScope',
          component: _import('dataScope/DataScope')
        },
        {
          path: 'DataScopeAdd',
          name: 'DataScopeAdd',
          component: _import('dataScope/DataScopeAdd'),
          meta: { menu: {name: '数据范围添加'} }
        },
        {
          path: 'DataScopeEdit/:id',
          name: 'DataScopeEdit',
          component: _import('dataScope/DataScopeEdit'),
          meta: { menu: {name: '数据范围修改'}, keepAlive: true }
        },
        {
          path: 'DataScopeSetting/:id',
          name: 'DataScopeSetting',
          component: _import('dataScope/DataScopeSetting'),
          meta: { menu: {name: '数据范围设置'}, keepAlive: true }
        },
        {
          path: 'Iframe',
          name: 'Iframe',
          component: _import('iframe/Iframe'),
          meta: { keepAlive: false }
        },
        // 开发者相关
        {
          path: 'UrlMapping',
          name: 'UrlMapping',
          component: _import('developer/UrlMapping'),
          meta: { keepAlive: true }
        },
        // 流程相关
        {
          path: 'Workflow/Task',
          name: 'Task',
          component: _import('activiti/Task'),
          meta: { keepAlive: true }
        },
        {
          path: 'Workflow/Model',
          name: 'Model',
          component: _import('activiti/Model'),
          meta: { keepAlive: true }
        },
        {
          path: 'Workflow/ProcessDefinition',
          name: 'ProcessDefinition',
          component: _import('activiti/ProcessDefinition'),
          meta: { keepAlive: true }
        },
        {
          path: 'Workflow/ProcessRunning',
          name: 'ProcessRunning',
          component: _import('activiti/ProcessRunning'),
          meta: { keepAlive: true }
        },
        // oa
        {
          path: 'Oa/Leave',
          name: 'Leave',
          component: _import('oa/workattendance/leave/Leave'),
          meta: { keepAlive: true }
        },
        {
          path: 'Oa/LeaveAdd',
          name: 'LeaveAdd',
          component: _import('oa/workattendance/leave/LeaveAdd'),
          meta: { menu: {name: '请假单添加'} }
        },
        {
          path: 'Oa/LeaveEdit/:id',
          name: 'LeaveEdit',
          component: _import('oa/workattendance/leave/LeaveEdit'),
          meta: { menu: {name: '请假单修改'}, keepAlive: true }
        },
        {
          path: 'Oa/LeaveAduit',
          name: 'LeaveAduit',
          component: _import('oa/workattendance/leave/LeaveAduit'),
          meta: { menu: {name: '请假单审核'}, keepAlive: true }
        },
        // 文件管理
        {
          path: 'File',
          name: 'File',
          component: _import('file/File'),
          meta: { keepAlive: true }
        },
        // 微信相关
        {
          path: 'Weixin/Menu',
          name: 'WeixinMenu',
          component: _import('weixin/menu/WeixinMenu')
        },
        {
          path: 'Weixin/Menu/WeixinMenuEdit/:id',
          name: 'WeixinMenuEdit',
          component: _import('weixin/menu/WeixinMenuEdit'),
          meta: { menu: {name: '微信菜单编辑'}, keepAlive: true }
        },
        {
          path: 'Weixin/Menu/WeixinMenuAdd',
          name: 'WeixinMenuAdd',
          component: _import('weixin/menu/WeixinMenuAdd'),
          meta: { menu: {name: '微信菜单添加'}, keepAlive: true }
        },
        // 微信相关
        {
          path: 'Weixin/Account',
          name: 'WeixinAccount',
          component: _import('weixin/account/WeixinAccount')
        },
        {
          path: 'Weixin/Account/WeixinAccountAdd',
          name: 'WeixinAccountAdd',
          component: _import('weixin/account/WeixinAccountAdd'),
          meta: { menu: {name: '公众账号添加'}, keepAlive: true }
        },
        {
          path: 'Weixin/Account/WeixinAccountEdit/:id',
          name: 'WeixinAccountEdit',
          component: _import('weixin/account/WeixinAccountEdit'),
          meta: { menu: {name: '公众账号修改'}, keepAlive: true }
        },
        {
          path: 'Weixin/Account/Templtes/:id',
          name: 'WeixinAccountTemplates',
          component: _import('weixin/account/WeixinAccountTemplates'),
          meta: { menu: {name: '微信账号模板列表'}, keepAlive: true }
        },
        // 日历相关
        {
          path: 'CalendarSetting',
          name: 'CalendarSetting',
          component: _import('calendar/CalendarSetting')
        },
        {
          path: 'CalendarSetting/CalendarSettingAdd/:date',
          name: 'CalendarSettingAdd',
          component: _import('calendar/CalendarSettingAdd'),
          meta: { menu: {name: '日期扩展添加'}, keepAlive: true }
        },
        {
          path: 'CalendarSetting/CalendarSettingEdit/:id',
          name: 'CalendarSettingEdit',
          component: _import('calendar/CalendarSettingEdit'),
          meta: { menu: {name: '日期扩展修改'}, keepAlive: true }
        },
        {
          path: 'CalendarSetting/CalendarView',
          name: 'CalendarView',
          component: _import('calendar/CalendarView')
        },
        // 消息相关
        {
          path: 'Message',
          name: 'Message',
          component: _import('message/Message')
        },
        {
          path: 'MessageAdd',
          name: 'MessageAdd',
          component: _import('message/MessageAdd'),
          meta: { menu: {name: '消息添加'}, keepAlive: true }
        },
        {
          path: 'MessageEdit/:id',
          name: 'MessageEdit',
          component: _import('message/MessageEdit'),
          meta: { menu: {name: '消息修改'}, keepAlive: true }
        },
        {
          path: 'MessageTemplate',
          name: 'MessageTemplate',
          component: _import('message/messageTemplate/MessageTemplate')
        },
        {
          path: 'MessageTemplateAdd',
          name: 'MessageTemplateAdd',
          component: _import('message/messageTemplate/MessageTemplateAdd'),
          meta: { menu: {name: '消息模板添加'}, keepAlive: true }
        },
        {
          path: 'MessageTemplateEdit/:id',
          name: 'MessageTemplateEdit',
          component: _import('message/messageTemplate/MessageTemplateEdit'),
          meta: { menu: {name: '消息模板修改'}, keepAlive: true }
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  next()
  Store.state.token = null
/*  if (to.matched.some(r => r.meta.requireAuth)) {
    if (Store.state.token) {
      next()
    } else {
      next({
        path: '/Login',
        query: {redirect: to.fullPath}
      })
    }
  } else {
    next()
  } */
})
export default router
