<template>

  <div class="wrapper">
    <el-container>
      <el-main>
        <el-collapse value="1">
          <el-collapse-item title="查询条件" name="1">
            <el-form ref="searchForm" :model="searchFormModel" :inline="true" size="small">
              <el-form-item label="标题">
                <el-input  v-model="searchFormModel.title"></el-input>
              </el-form-item>
              <el-form-item label="消息分类">
                <self-dict-select v-model="searchFormModel.msgType" type="message_type"></self-dict-select>
              </el-form-item>
              <el-form-item label="消息紧急性">
                <self-dict-select v-model="searchFormModel.msgLevel" type="message_level"></self-dict-select>
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
  import SelfPage from '@/components/SelfPage.vue'
  import SelfTable from '@/components/SelfTable.vue'
  import loadDataControl from '@/utils/storeLoadDataControlUtils.js'
  import SelfDictSelect from '@/components/SelfDictSelect.vue'
  export default {
    name: 'Message',
    components: {
      SelfDictSelect,
      SelfTable,
      SelfPage
    },
    data () {
      return {
        columns: [
          {
            name: 'title',
            label: '标题'
          },
          {
            name: 'profile',
            label: '简介'
          },
          {
            name: 'content',
            label: '内容'
          },
          {
            name: 'predictNum',
            label: '预计人数'
          },
          {
            name: 'msgType',
            label: '消息分类',
            dict: 'message_type'
          },
          {
            name: 'msgState',
            label: '消息状态',
            dict: 'message_state'
          },
          {
            label: '操作',
            width: '300',
            buttons: [
              {
                label: '查看已读人员',
                click: this.viewReadPeopleClick
              },
              {
                label: '发送消息',
                click: this.sendMessageClick
              },
              {
                label: '编辑',
                click: this.editTableRowClick
              },
              {
                label: '删除',
                click: this.deleteTableRowClick
              },
              {
                label: '复制消息',
                click: this.copyTableRowClick
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
          title: '',
          msgLevel: '',
          msgType: '',
          pageable: true,
          pageNo: 1,
          pageSize: 10
        }
      }
    },
    mounted () {
      this.loadTableData(1)
    },
    methods: {
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
        this.$http.get('/base/messages', self.searchFormModel)
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
        // sended 为字典值，代表已发送
        if (row.msgState === 'sended') {
          this.$message.error('消息已发送，不能修改')
        } else {
          this.$router.push('/Main/MessageEdit/' + row.id)
        }
      },
      // tablb 表格删除行
      deleteTableRowClick (index, row) {
        let self = this
        this.$confirm('确定要删除吗, 是否继续?', '提示', {
          type: 'warning'
        }).then(() => {
          this.$http.delete('/base/message/' + row.id)
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
      // 复制一条消息
      copyTableRowClick (index, row) {
        let self = this
        this.$confirm('确定要复制吗,复制后列表会添加一条相同的待发送消息, 是否继续?', '提示', {
          type: 'warning'
        }).then(() => {
          this.$http.post('/base/message/' + row.id + '/copy')
            .then(function (response) {
              self.$message.success('复制成功')
              // 重新加载数据
              self.searchBtnClick()
            })
            .catch(function (error) {
              if (error.response.status === 404) {
                self.$message.error('复制失败，请刷新数据再试')
              }
            })
        })
      },
      addTableRowClick () {
        loadDataControl.add(this.$store, 'MessageAddLoadData=true')
        this.$router.push('/Main/MessageAdd')
      },
      // 发送消息
      sendMessageClick (index, row) {
        if (row.msgState !== 'to_be_sended') {
          this.$message.error('消息状态不符合发送要求，请刷新数据再试')
        } else {
          loadDataControl.add(this.$store, 'MessageSendLoadData=true')
          this.$router.push('/Main/MessageSend/' + row.id)
        }
      },
      // 查看已读人员
      viewReadPeopleClick (index, row) {
        // to_be_sended 为字典值，代表待发送
        if (row.msgState !== 'sended') {
          this.$message.error('消息尚未发送，请发送后再试')
        } else {
          this.$router.push('/Main/ViewReadPeople/' + row.id)
        }
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
