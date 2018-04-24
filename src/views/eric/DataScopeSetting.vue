<template>
  <el-collapse v-model="activeNames">
    <el-collapse-item title="机构数据范围" name="officeDataScope">
      <OfficeDataScopeDefine :dataScopeId="dataScopeId"></OfficeDataScopeDefine>
    </el-collapse-item>
    <el-collapse-item title="角色数据范围" name="roleDataScope">
      <RoleDataScopeDefine :dataScopeId="dataScopeId"></RoleDataScopeDefine>
    </el-collapse-item>
    <el-collapse-item title="用户数据范围" name="userDataScope">
      <UserDataScopeDefine :dataScopeId="dataScopeId"></UserDataScopeDefine>
    </el-collapse-item>
  </el-collapse>
</template>

<script>
  // 在这里引入新组件
  import UserDataScopeDefine from '@/views/user/UserDataScopeDefine.vue'
  import OfficeDataScopeDefine from '@/views/office/OfficeDataScopeDefine.vue'
  import RoleDataScopeDefine from '@/views/role/RoleDataScopeDefine.vue'
/*  import UserDataScope from '@/views/user/UserDataScope.vue'
  import RoleDataScope from '@/views/role/RoleDataScope.vue'
  import OfficeDataScope from '@/views/office/OfficeDataScope.vue'
  import FunResourceDataScope from '@/views/funResource/FunResourceDataScope.vue'
  import DictDataScope from '@/views/dict/DictDataScope.vue'
  import AreaDataScope from '@/views/area/AreaDataScope.vue'
  */
  export default {
    name: 'DataScopeSetting',
    components: { UserDataScopeDefine, OfficeDataScopeDefine, RoleDataScopeDefine },
    data () {
      return {
        activeNames: ['userDataScope', 'officeDataScope', 'roleDataScope'],
        dataScopeId: null // 数据范围id，页面传来的
      }
    },
    mounted () {
    },
    methods: {
    },
    watch: {
    },
    // tab切换如果参数不一样，重新加载数据
    beforeRouteEnter  (to, from, next) {
      next(vm => {
        // 通过 `vm` 访问组件实例
        if (vm.dataScopeId !== vm.$route.params.id) {
          vm.dataScopeId = vm.$route.params.id
        }
      })
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
<style>
  .el-collapse-item__arrow {
    /* 由于用了rotate 这个东西不是个正方形所以改变角度的时候会出现滚动条 */
    margin-right: 20px;
  }
</style>
