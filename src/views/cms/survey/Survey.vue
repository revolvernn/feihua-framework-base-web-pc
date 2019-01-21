<template>

  <div class="wrapper">
    <el-container>
      <el-main>
        <el-collapse value="1">
          <el-collapse-item title="查询条件" name="1">
            <el-form ref="searchForm" :model="searchFormModel" :inline="true" size="small">
              <el-form-item label="关键字" prop="title">
                <el-input  v-model="searchFormModel.title"></el-input>
              </el-form-item>
              <el-form-item label="调查状态" prop="status">
                <self-dict-select v-model="searchFormModel.status" type="survey_status"></self-dict-select>
              </el-form-item>
              <el-form-item label="调查类型" prop="type">
                <self-dict-select v-model="searchFormModel.type" type="survey_type"></self-dict-select>
              </el-form-item>
              <el-form-item label="注册参与" prop="register">
                <self-dict-select v-model="searchFormModel.register" type="yes_no"></self-dict-select>
              </el-form-item>
              <el-form-item label="重复参与" prop="repeatLimit">
                <self-dict-select v-model="searchFormModel.repeatLimit" type="yes_no"></self-dict-select>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="searchBtnClick">查询</el-button>
                <el-button type="primary" @click="addTableRowClick">添加</el-button>
                <el-button @click="resetFormClick">重置</el-button>
              </el-form-item>
            </el-form>
          </el-collapse-item>
        </el-collapse>
        <self-table :columns="columns" :tableData="tableData" :page="page" :table-loading="tableLoading" v-on:pageSizeChange="pageSizeChange" v-on:pageNoChange="pageNoChange"></self-table>
      </el-main>
    </el-container>
    <el-dialog
      title="调查发布"
      :visible.sync="rowDialogVisible"
      width="350px"
      @before-close="rowDialogVisible = false" style="word-break: break-all;">
      <el-form ref="surveyForm" :model="surveyForm" :rules="surveyFormRules" style="width: 300px;" label-width="100px">
        <el-form-item label="调查状态" prop="status">
          <self-dict-select v-model="surveyForm.status" type="survey_status"></self-dict-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="publishSurvey" :loading="addLoading">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
  import SelfPage from '@/components/SelfPage.vue'
  import SelfTable from '@/components/SelfTable.vue'
  import loadDataControl from '@/utils/storeLoadDataControlUtils.js'
  import SelfDictSelect from '@/components/SelfDictSelect.vue'
  export default {
    name: 'survey',
    components: {
      SelfDictSelect,
      SelfTable,
      SelfPage
    },
    data () {
      return {
        addLoading: false,
        rowDialogVisible: false,
        surveyForm: {
          status: null
        },
        surveyFormRules: {
          status: [
            {required: true, message: '必填', trigger: 'change'}
          ]
        },
        columns: [
          {
            name: 'status',
            dict: 'survey_status',
            label: '调查状态'
          },
          {
            name: 'title',
            label: '调查主题'
          },
          {
            name: 'type',
            dict: 'survey_type',
            label: '调查类型'
          },
          {
            name: 'description',
            label: '调查描述'
          },
          {
            name: 'startTime',
            label: '开始时间'
          },
          {
            name: 'endTime',
            label: '结束时间'
          },
          {
            name: 'register',
            dict: 'yes_no',
            label: '注册参与'
          },
          {
            name: 'count',
            label: '参与量'
          },
          {
            name: 'repeatLimit',
            dict: 'yes_no',
            label: '重复参与'
          },
          {
            name: 'sequence',
            label: '排序'
          },
          {
            name: 'updateAt',
            label: '修改时间'
          },
          {
            label: '操作',
            width: '200',
            buttons: [
              {
                label: '发布',
                click: this.openPublishSurvey
              },
              {
                label: '预览',
                click: this.previewSurvey
              },
              {
                label: '修改',
                click: this.editTableRowClick
              },
              {
                label: '添加问题',
                click: this.questionList
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
          title: '',
          repeatLimit: '',
          register: '',
          status: '',
          type: '',
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
      resetFormClick () {
        this.$refs['searchForm'].resetFields()
      },
      // 加载表格数据
      loadTableData (pageNo) {
        let self = this
        if (pageNo) {
          self.searchFormModel.pageNo = pageNo
        }
        self.tableLoading = true
        this.$http.get('/cms/surveys', self.searchFormModel)
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
              self.tableOffice = {}
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
      previewSurvey (index, row) {
        let self = this
        self.$alert('<a href="#" target="_blank">问卷调查预览URL</a>', '问卷调查预览', {
          confirmButtonText: '关闭',
          dangerouslyUseHTMLString: true
        })
      },
      // 发布调查
      publishSurvey () {
        let self = this
        if (self.addLoading === false) {
          this.$refs['surveyForm'].validate((valid) => {
            if (valid) {
              // 请求添加
              self.addLoading = true
              self.$http.put('/cms/survey/publish', self.surveyForm)
                .then(function (response) {
                  self.$message.info('调查发布状态修改成功')
                  self.addLoading = false
                  self.rowDialogVisible = false
                  self.searchBtnClick()
                })
                .catch(function (response) {
                  if (response.response.status === 404) {
                    self.$message.error('调查发布状态修改失败，数据不存在或已被他人修改，请刷新列表后再试')
                  } else {
                    self.$message.error(response.response.data.msg)
                  }
                  self.addLoading = false
                })
            } else {
              return false
            }
          })
        } else {
          self.$message.info('正在请求中，请耐心等待')
        }
      },
      // 打开发布调查
      openPublishSurvey (index, row) {
        let self = this
        self.rowDialogVisible = true
        self.surveyForm.status = row.status
        self.surveyForm.id = row.id
        self.surveyForm.updateTime = row.updateAt
      },
      // 添加问题，列表
      questionList (index, row) {
        this.$router.push('/Main/Cms/Question/' + row.id)
      },
      // 编辑调查
      editTableRowClick (index, row) {
        this.$router.push('/Main/Cms/SurveyEdit/' + row.id)
      },
      // 添加调查
      addTableRowClick () {
        loadDataControl.add(this.$store, 'SurveyAddLoadData=true')
        this.$router.push('/Main/Cms/SurveyAdd')
      },
      // tablb 表格删除行
      deleteTableRowClick (index, row) {
        let self = this
        this.$confirm('确定要删除吗, 是否继续?', '提示', {
          type: 'warning'
        }).then(() => {
          this.$http.delete('/cms/survey/' + row.id)
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
