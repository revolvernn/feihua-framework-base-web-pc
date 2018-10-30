<template>

  <div class="wrapper">

    <el-dialog
      title="请选择要同步的公众平台"
      :visible.sync="dialogVisible"
      width="30%">
      <self-dict-select v-model="dialogValue" type="weixin_publicplatform_type"></self-dict-select>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="synToWeixinClick" :loading="synToWeixinLoading">确 定</el-button>
  </span>
    </el-dialog>

    <el-container>
      <el-aside width="200px">
        <el-scrollbar style="height: 100%;" wrapStyle="height:100%;overflow:auto;" >
          <WeixinMenuTree ref="lefttree" v-on:nodeClick="treeNodeClick"></WeixinMenuTree>
         </el-scrollbar>
      </el-aside>
      <el-main>
        <el-collapse value="1">
          <el-collapse-item title="查询条件" name="1">
            <el-form ref="searchForm" :model="searchFormModel" :inline="true" size="small">
              <el-form-item label="名称" prop="name">
                <el-input  v-model="searchFormModel.name"></el-input>
              </el-form-item>
              <el-form-item label="类型" prop="which">
                <self-dict-select v-model="searchFormModel.which" type="weixin_publicplatform_type"></self-dict-select>
              </el-form-item>
              <el-form-item label="父级" prop="parentId">
                <WeixinMenuInputSelect ref="weixinmenuinput"  v-model="searchFormModel.parentId">
                </WeixinMenuInputSelect>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="searchBtnClick">查询</el-button>
                <el-button type="primary" @click="addTableRowClick">添加</el-button>
                <el-button type="primary" @click="dialogVisible = true">同步到微信</el-button>
                <el-button @click="resetFormClick">重置</el-button>
              </el-form-item>
            </el-form>
          </el-collapse-item>
        </el-collapse>
        <self-table :columns="columns" :tableData="tableData" :page="page" :table-loading="tableLoading" v-on:pageSizeChange="pageSizeChange" v-on:pageNoChange="pageNoChange"></self-table>
      </el-main>
    </el-container>

  </div>
</template>

<script>
  import WeixinMenuTree from './WeixinMenuTree.vue'
  import SelfPage from '@/components/SelfPage.vue'
  import SelfTable from '@/components/SelfTable.vue'
  import loadDataControl from '@/utils/storeLoadDataControlUtils.js'
  import SelfDictSelect from '@/components/SelfDictSelect.vue'
  import { getDictByValueSync } from '@/utils/dictUtils.js'
  import WeixinMenuInputSelect from '@/views/weixin/menu/WeixinMenuInputSelect.vue'
  export default {
    name: 'WeixinMenu',
    components: {
      SelfDictSelect,
      SelfTable,
      WeixinMenuTree,
      SelfPage,
      WeixinMenuInputSelect
    },
    data () {
      return {
        columns: [
          {
            name: 'name',
            label: '名称'
          },
          {
            name: 'type',
            label: '类型',
            formatter: this.typeFormatter
          },
          {
            label: '操作',
            buttons: [
              {
                label: '编辑',
                click: this.editTableRowClick
              },
              {
                label: '删除',
                click: this.deleteTableRowClick
              }
            ]
          }
        ],
        page: {
          pageNo: 1,
          dataNum: 0
        },
        // 表格数据
        tableData: [],
        tableLoading: false,
        // 搜索的查询条件
        searchFormModel: {
          name: '',
          type: '',
          which: '',
          parentId: '',
          pageable: true,
          pageNo: 1,
          pageSize: 10
        },
        dialogVisible: false,
        synToWeixinLoading: false,
        dialogValue: null
      }
    },
    mounted () {
      this.loadTableData(1)
    },
    methods: {
      // 点击树节点事件
      treeNodeClick (data) {
        this.$refs.weixinmenuinput.setLabelName(data.name)
        this.searchFormModel.parentId = data.id
        this.searchBtnClick()
      },
      resetFormClick() {
        this.$refs['searchForm'].resetFields()
      },
      // 查询按钮点击事件
      searchBtnClick () {
        this.loadTableData(1)
      },
      // 加载表格数据
      loadTableData (pageNo, pageNoChange) {
        let self = this
        if (pageNo > 0) {
          if (pageNoChange) {
            self.searchFormModel.pageNo = pageNo
          } else {
            if (self.page.pageNo !== pageNo) {
              self.page.pageNo = pageNo
              return
            }
          }
        }
        self.tableLoading = true
        this.$http.get('/weixinmenu/menus', self.searchFormModel)
          .then(function (response) {
            let content = response.data.data.content
            self.tableData = content
            self.page.dataNum = response.data.data.page.dataNum
            self.tableLoading = false
          })
          .catch(function (error) {
            if (error.response.status === 404) {
              self.tableData = []
              self.page.dataNum = 0
            }
            self.tableLoading = false
          })
      },
      // 页面大小改变重新查询数据
      pageSizeChange (val) {
        this.searchFormModel.pageSize = val
        this.searchBtnClick()
      },
      // 页码改变加载对应页码数据
      pageNoChange (val) {
        this.page.pageNo = val
        this.loadTableData(val, true)
      },
      // tablb 表格编辑行
      editTableRowClick (index, row) {
        this.$router.push('/Main/Weixin/Menu/WeixinMenuEdit/' + row.id)
      },
      // tablb 表格删除行
      deleteTableRowClick (index, row) {
        let self = this
        this.$confirm('确定要删除吗, 是否继续?', '提示', {
          type: 'warning'
        }).then(() => {
          this.$http.delete('/weixinmenu/menu/' + row.id)
            .then(function (response) {
              self.$message.success('删除成功')
              // 重新加载数据
              self.searchBtnClick()
            })
            .catch(function (error) {
              if (error.response.status === 404) {
                self.$message.error('删除失败，请刷新数据再试')
              }
            })
        })
      },
      addTableRowClick () {
        loadDataControl.add(this.$store, 'WeixinMenuAddLoadData=true')
        this.$router.push('/Main/Weixin/Menu/WeixinMenuAdd')
      },
      synToWeixinClick () {
        let self = this
        if (!self.dialogValue) {
          self.dialogValue = self.searchFormModel.which
        }
        if (!self.dialogValue) {
          self.$message.error('请先选择同步到哪一个公众平台')
          return
        }
        self.synToWeixinLoading = true
        self.$http.post('/weixinmenu/synToWeixinServer', {which: self.dialogValue})
          .then(res => {
            self.$message.success('同步成功')
            self.synToWeixinLoading = false
          }).catch(function (error) {
            self.synToWeixinLoading = false
            if (error.response.status === 404) {
              self.$message.error('同步失败，请确认已添加菜单')
            }
            if (error.response.status === 400) {
              self.$message.error('同步失败，请确认添加的菜单规则正确')
            }
          })
      },
      typeFormatter (row) {
        let dict = getDictByValueSync(this, 'weixin_menu_type', row.type)
        return dict ? dict.name : null
      }
    },
    watch: {
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .wrapper .el-collapse{
    padding: 0 10px;
  }
.el-main{
  padding:0;
}
.el-aside{
  border-right: 1px solid #e6ebf5;
}
.wrapper,.el-container{
  height:100%;
}
</style>
<style>
.el-collapse-item__arrow {
  /* 由于用了rotate 这个东西不是个正方形所以改变角度的时候会出现滚动条 */
  margin-right: 20px;
}
</style>
