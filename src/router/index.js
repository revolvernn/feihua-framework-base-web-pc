import Vue from 'vue'
import Router from 'vue-router'
import Store from '../store/store'
import Login from '@/views/login/Login.vue'
import Main from '@/views/main/Main.vue'
import Area from '@/views/area/Area.vue'
import AreaAdd from '@/views/area/AreaAdd.vue'
import AreaEdit from '@/views/area/AreaEdit.vue'
import Dict from '@/views/dict/Dict.vue'
import DictAdd from '@/views/dict/DictAdd.vue'
import DictEdit from '@/views/dict/DictEdit.vue'
import Office from '@/views/office/Office.vue'
import OfficeAdd from '@/views/office/OfficeAdd.vue'
import OfficeEdit from '@/views/office/OfficeEdit.vue'
import Role from '@/views/role/Role.vue'
import RoleAdd from '@/views/role/RoleAdd.vue'
import RoleEdit from '@/views/role/RoleEdit.vue'
import User from '@/views/user/User.vue'
import UserAdd from '@/views/user/UserAdd.vue'
import UserEdit from '@/views/user/UserEdit.vue'
import FunResource from '@/views/funResource/FunResource.vue'
import FunResourceAdd from '@/views/funResource/FunResourceAdd.vue'
import FunResourceEdit from '@/views/funResource/FunResourceEdit.vue'
import DataScope from '@/views/dataScope/DataScope.vue'
// import DataScopeAdd from '@/views/dataScope/DataScopeAdd.vue'
// import DataScopeEdit from '@/views/dataScope/DataScopeEdit.vue'
const _import = require('@/router/_import_' + process.env.NODE_ENV)
Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/Login',
      name: 'Login',
      component: Login
    },
    {
      path: '/',
      redirect: '/Main'
    },
    {
      path: '/Main',
      name: 'Main',
      component: Main,
      meta: {
        // 添加该字段，表示进入这个路由是需要登录的
        requireAuth: true
      },
      children: [
        {
          path: 'Home',
          name: 'Home',
          component: null
        },
        {
          path: 'Dict',
          name: 'Dict',
          component: Dict,
          meta: { keepAlive: true }
        },
        {
          path: 'DictAdd',
          name: 'DictAdd',
          component: DictAdd,
          meta: { menu: {name: '字典添加'} }
        },
        {
          path: 'DictEdit/:id',
          name: 'DictEdit',
          component: DictEdit,
          meta: { menu: {name: '字典修改'}, keepAlive: true }
        },
        {
          path: 'Area',
          name: 'Area',
          component: Area
        },
        {
          path: 'AreaAdd',
          name: 'AreaAdd',
          component: AreaAdd,
          meta: { menu: {name: '区域添加'} }
        },
        {
          path: 'AreaEdit/:id',
          name: 'AreaEdit',
          component: AreaEdit,
          meta: { menu: {name: '区域修改'}, keepAlive: true }
        },
        {
          path: 'Office',
          name: 'Office',
          component: Office
        },
        {
          path: 'OfficeAdd',
          name: 'OfficeAdd',
          component: OfficeAdd,
          meta: { menu: {name: '机构添加'} }
        },
        {
          path: 'OfficeEdit/:id',
          name: 'OfficeEdit',
          component: OfficeEdit,
          meta: { menu: {name: '机构修改'}, keepAlive: true }
        },
        {
          path: 'Role',
          name: 'Role',
          component: Role
        },
        {
          path: 'RoleAdd',
          name: 'RoleAdd',
          component: RoleAdd,
          meta: { menu: {name: '角色添加'} }
        },
        {
          path: 'RoleEdit/:id',
          name: 'RoleEdit',
          component: RoleEdit,
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
          component: User
        },
        {
          path: 'UserAdd',
          name: 'UserAdd',
          component: UserAdd,
          meta: { menu: {name: '用户添加'} }
        },
        {
          path: 'UserEdit/:id',
          name: 'UserEdit',
          component: UserEdit,
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
          component: FunResource
        },
        {
          path: 'FunResourceAdd',
          name: 'FunResourceAdd',
          component: FunResourceAdd,
          meta: { menu: {name: '功能资源添加'} }
        },
        {
          path: 'FunResourceEdit/:id',
          name: 'FunResourceEdit',
          component: FunResourceEdit,
          meta: { menu: {name: '功能资源修改'}, keepAlive: true }
        },
        {
          path: 'DataScope',
          name: 'DataScope',
          component: DataScope
        },
        {
          path: 'DataScopeAdd',
          name: 'DataScopeAdd',
          // component: DataScopeAdd,
          component: _import('dataScope/DataScopeAdd'),
          meta: { menu: {name: '数据范围添加'} }
        },
        {
          path: 'DataScopeEdit/:id',
          name: 'DataScopeEdit',
          // component: DataScopeEdit,
          component: _import('dataScope/DataScopeEdit'),
          meta: { menu: {name: '数据范围修改'}, keepAlive: true }
        },
        {
          path: 'DataScopeSetting/:id',
          name: 'DataScopeSetting',
          // component: DataScopeEdit,
          component: _import('dataScope/DataScopeSetting'),
          meta: { menu: {name: '数据范围设置'}, keepAlive: true }
        },
        {
          path: 'EricUser',
          name: 'EricUser',
          component: _import('eric/EricUser')
        },
        {
          path: 'EricUserAdd',
          name: 'EricUserAdd',
          component: _import('eric/EricUserAdd'),
          meta: { menu: {name: '用户添加'} }
        },
        {
          path: 'EricUserEdit/:id',
          name: 'EricUserEdit',
          component: _import('eric/EricUserEdit'),
          meta: { menu: {name: '用户修改'}, keepAlive: true }
        },
        {
          path: 'Iframe',
          name: 'Iframe',
          component: _import('iframe/Iframe'),
          meta: { keepAlive: true }
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
