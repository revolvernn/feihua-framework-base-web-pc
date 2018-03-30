<template>

  <div class="wrapper">
    <el-popover
      ref="searchOfficeSelect"
      placement="right"
      trigger="click">
      <el-scrollbar wrapStyle="max-height:500px;">
        <office-tree v-on:nodeClick="officeTreeNodeClick"></office-tree>
      </el-scrollbar>
    </el-popover>
    <el-container>
      <el-aside width="200px">
        <el-scrollbar style="height: 100%;" wrapStyle="height:100%;overflow:auto;" >
          <funResource-tree ref="lefttree" v-on:nodeClick="treeNodeClick"></funResource-tree>
         </el-scrollbar>
      </el-aside>
      <el-main>
        <el-collapse value="1">
          <el-collapse-item title="查询条件" name="1">
            <el-form ref="searchForm" :model="searchFormModel" :inline="true" size="small">
              <el-form-item label="名称">
                <el-input  v-model="searchFormModel.name"></el-input>
              </el-form-item>
              <el-form-item label="类型">
                <self-dict-select v-model="searchFormModel.type" type="funResource_type"></self-dict-select>
              </el-form-item>
              <el-form-item label="是否显示">
                <self-dict-select v-model="searchFormModel.isShow" type="yes_no"></self-dict-select>
              </el-form-item>
              <el-form-item label="父级">
                <el-input  v-model="searchFormParentName" :readonly="true" clearable></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="searchBtnClick">查询</el-button>
                <el-button type="primary" @click="addTableRowClick">添加</el-button>
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
  import FunResourceTree from './FunResourceTree.vue'
  import SelfPage from '@/components/SelfPage.vue'
  import SelfTable from '@/components/SelfTable.vue'
  import loadDataControl from '@/utils/storeLoadDataControlUtils.js'
  import SelfDictSelect from '@/components/SelfDictSelect.vue'
  import { getDictByValueSync } from '@/utils/dictUtils.js'
  import OfficeTree from '@/views/office/OfficeTree.vue'
  export default {
    name: 'FunResource',
    components: {
      OfficeTree,
      SelfDictSelect,
      SelfTable,
      FunResourceTree,
      SelfPage
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
            dict: 'funResource_type'
          },
          {
            name: 'isShow',
            label: '是否显示',
            dict: 'yes_no'
          },
          {
            name: 'icon',
            label: '图标'
          },
          {
            name: 'permissions',
            label: '权限标识'
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
          dataNum: 0
        },
        // 表格数据
        tableData: [],
        tableLoading: false,
        // 搜索的查询条件
        searchFormModel: {
          name: '',
          type: '',
          isShow: '',
          parentId: '',
          dataOfficeId: '',
          pageable: true,
          pageNo: 1,
          pageSize: 10
        },
        // 搜索的查询条件父级名称显示
        searchFormParentName: ''
      }
    },
    mounted () {
      this.loadTableData(1)
    },
    methods: {
      // 点击树节点事件
      treeNodeClick (data) {
        this.searchFormParentName = data.name
        this.searchFormModel.parentId = data.id
        this.searchBtnClick()
      },
      // 查询按钮点击事件
      searchBtnClick () {
        this.loadTableData(1)
      },
      // 加载表格数据
      loadTableData (pageNo) {
        let self = this
        if (pageNo) {
          self.searchFormModel.pageNo = pageNo
        }
        self.tableLoading = true
        this.$http.get('/base/functionResources', self.searchFormModel)
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
        this.loadTableData(val)
      },
      // tablb 表格编辑行
      editTableRowClick (index, row) {
        this.$router.push('/Main/FunResourceEdit/' + row.id)
      },
      // tablb 表格删除行
      deleteTableRowClick (index, row) {
        let self = this
        this.$confirm('确定要删除吗, 是否继续?', '提示', {
          type: 'warning'
        }).then(() => {
          this.$http.delete('/base/functionResource/' + row.id)
            .then(function (response) {
              self.$message.success('删除成功')
              // 重新加载数据
              self.searchBtnClick()
            })
            .catch(function (error) {
              if (error.response.status === 404) {
                self.$message.success('删除失败，请刷新数据再试')
              }
            })
        })
      },
      addTableRowClick () {
        loadDataControl.add(this.$store, 'FunResourceAddLoadData=true')
        this.$router.push('/Main/FunResourceAdd')
      },
      officeTreeNodeClick (data) {
        this.searchFormModel.dataOfficeId = data.id
        this.searchFormOfficeName = data.name
      },
      typeFormatter (row) {
        let dict = getDictByValueSync(this, 'funResource_type', row.type)
        return dict ? dict.name : null
      },
      disabledFormatter (row) {
        let dict = getDictByValueSync(this, 'yes_no', row.disabled)
        return dict ? dict.name : null
      }
    },
    watch: {
      searchFormParentName (value) {
        if (value === '') {
          this.searchFormModel.parentId = ''
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.wrapper{

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
