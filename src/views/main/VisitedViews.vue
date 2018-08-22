<template>
  <div class="content-tabs">
    <button class="roll-nav roll-left J_tabLeft" @click="leftTab"><i class="el-icon-d-arrow-left"></i>
    </button>
    <nav class="page-tabs J_menuTabs">
      <div class="page-tabs-content" v-bind:style="{ marginLeft: marginLeft + 'px' }">
        <router-link class="J_menuTab" :class="isActive(item) ? 'active' : ''" v-for="item in visitedViews" :to="item.path" :key="item.path">
          {{generateName(item.name)}}
          <i class='el-icon-close' @click='close(item,$event)'></i>
        </router-link>
      </div>
    </nav>
    <button class="roll-nav roll-right J_tabRight"  @click="rightTab">
      <i class="el-icon-d-arrow-right"></i>
    </button>
    <div class="btn-group roll-nav roll-right">
      <button class="dropdown J_tabClose"  @click.stop="toggleOperationShow">
        操作
        <span style="top:.2rem" class="glyphicon glyphicon-chevron-down"></span>
      </button>
      <ul class="dropdown-menu" v-bind:style="{display: operationShow ? 'block' : 'none'}">
        <li>
          <a @click="afterAdd">定位当前选项卡</a>
        </li>
        <li class="divider"></li>
        <li><a @click="closeOthers">关闭其他选项卡</a>
        </li>
        <li><a @click="closeAll">关闭全部选项卡</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import $ from 'jquery'
  import { mapGetters } from 'vuex'
  export default {
    name: 'VisitedViews',
    props: {
      menus: {
        type: Array
      }
    },
    data () {
      return {
        // tab的左右位置
        marginLeft: 0,
        // 操作菜单显示
        operationShow: false
      }
    },
    computed: {
      ...mapGetters([
        'visitedViews'
      ])
    },
    methods: {
      // 计算宽度
      cwith (l) {
        var k = 0
        $(l).each(function () {
          k += $(this).outerWidth(true)
        })
        return k
      },
      // 点击按钮左移动
      leftTab () {
        var o = Math.abs(parseInt($('.page-tabs-content').css('margin-left')))
        var l = this.cwith($('.content-tabs').children().not('.J_menuTabs'))
        var k = $('.content-tabs').outerWidth(true) - l
        var p = 0
        if ($('.page-tabs-content').width() < k) {
          return null
        } else {
          var m = $('.J_menuTab:first')
          var n = 0
          while ((n + $(m).outerWidth(true)) <= o) {
            n += $(m).outerWidth(true)
            m = $(m).next()
          }
          n = 0
          if (this.cwith($(m).prevAll()) > k) {
            while ((n + $(m).outerWidth(true)) < (k) && m.length > 0) {
              n += $(m).outerWidth(true)
              m = $(m).prev()
            }
            p = this.cwith($(m).prevAll())
          }
          this.marginLeft = 0 - p
        }
      },
      // 点击按钮右移动
      rightTab () {
        var o = Math.abs(parseInt($('.page-tabs-content').css('margin-left')))
        var l = this.cwith($('.content-tabs').children().not('.J_menuTabs'))
        var k = $('.content-tabs').outerWidth(true) - l
        var p = 0
        if ($('.page-tabs-content').width() < k) {
          return null
        } else {
          var m = $('.J_menuTab:first')
          var n = 0
          while ((n + $(m).outerWidth(true)) <= o) {
            n += $(m).outerWidth(true)
            m = $(m).next()
          }
          n = 0
          while ((n + $(m).outerWidth(true)) < (k) && m.length > 0) {
            n += $(m).outerWidth(true)
            m = $(m).next()
          }
          p = this.cwith($(m).prevAll())
          if (p > 0) {
            this.marginLeft = 0 - p
          }
        }
      },
      // 定位到当前选项卡
      afterAdd () {
        if (this.operationShow === true) {
          this.operationShow = false
        }
        var n = $('.J_menuTab.active')
        var o = this.cwith($(n).prevAll())
        var q = this.cwith($(n).nextAll())
        var l = this.cwith($('.content-tabs').children().not('.J_menuTabs'))
        var k = $('.content-tabs').outerWidth(true) - l
        var p = 0
        if ($('.page-tabs-content').outerWidth() < k) {
          p = 0
        } else {
          if (q <= (k - $(n).outerWidth(true) - $(n).next().outerWidth(true))) {
            if ((k - $(n).next().outerWidth(true)) > q) {
              p = o
              var m = n
              while ((p - $(m).outerWidth()) > ($('.page-tabs-content').outerWidth() - k)) {
                p -= $(m).prev().outerWidth()
                m = $(m).prev()
              }
            }
          } else {
            if (o > (k - $(n).outerWidth(true) - $(n).prev().outerWidth(true))) {
              p = o - $(n).prev().outerWidth(true)
            }
          }
        }
        this.marginLeft = 0 - p
      },
      // 关闭全部选项卡
      closeAll () {
        this.$store.commit('delVisitedViewsAll')
        this.toggleOperationShow()
        this.afterAdd()
        this.$router.push('/')
      },
      closeOthers () {
        let menu = this.getMenuByPath(this.menus, this.$route.path)
        if (menu == null) {
          menu = this.getMenuByPath(this.menus, decodeURIComponent(this.$route.fullPath))
        }
        this.$store.commit('delVisitedViewsOthers', menu)
        this.toggleOperationShow()
        this.afterAdd()
      },
      // 切换操作菜单
      toggleOperationShow () {
        this.operationShow = !this.operationShow
      },
      // 是否为当前选项
      isActive (currentMenu) {
        let menu = this.getMenuByPath(this.menus, this.$route.path)
        if (menu == null) {
          menu = this.getMenuByPath(this.menus, decodeURIComponent(this.$route.fullPath))
        }
        if (!menu && this.$route.meta.menu) {
          menu = this.$route.meta.menu
          if (menu == null) {
            return
          }
          let matchedRoutes = this.$route.matched
          if (matchedRoutes && matchedRoutes.length > 0) {
            menu.path = this.$route.path
            menu.id = matchedRoutes[matchedRoutes.length - 1].path
          } else {
            menu.path = this.$route.path
            menu.id = this.$route.path
          }
        }
        let flag = currentMenu.id === menu.id
        if (flag) {
          let visitedViews = this.visitedViews
          for (let i = 0; i < visitedViews.length; i++) {
            if (visitedViews[i].id === menu.id) {
              visitedViews[i].path = menu.path
              break
            }
          }
        }
        return flag
      },
      // 获取名称，这里加了一个方法可以作其它处理，如国际化
      generateName (name) {
        return name
      },
      // 关闭当前选项
      close (menu, $event) {
        this.$store.commit('delVisitedViews', menu)
        if (this.isActive(menu)) {
          // 如果把当前选项卡关闭了，默认显示最后一个
          const latestView = this.visitedViews.slice(-1)[0]
          if (latestView) {
            this.$router.push(latestView.path)
          } else {
            this.$router.push('/')
          }
        }
        $event.preventDefault()
      },
      // 根据路径得到menu
      getMenuByPath (menus, path) {
        for (let i = 0; i < menus.length; i++) {
          if (menus[i].path === path) {
            return menus[i]
          }
          if (menus[i].children && menus[i].children.length > 0) {
            let menu = this.getMenuByPath(menus[i].children, path)
            if (menu == null) {
              continue
            } else {
              return menu
            }
          }
        }
        return null
      },
      // 添加到选项卡
      add () {
        let menu = this.getMenuByPath(this.menus, this.$route.path)
        if (menu == null) {
          menu = this.getMenuByPath(this.menus, decodeURIComponent(this.$route.fullPath))
        }
        if (!menu && this.$route.meta.menu) {
          menu = this.$route.meta.menu
          if (menu == null) {
            return
          }
          let matchedRoutes = this.$route.matched
          if (matchedRoutes && matchedRoutes.length > 0) {
            menu.path = this.$route.path
            menu.id = matchedRoutes[matchedRoutes.length - 1].path
          } else {
            menu.path = this.$route.path
            menu.id = this.$route.path
          }
        }
        if (menu) {
          this.$store.commit('addVisitedViews', menu)
          let self = this
          self.afterAdd()
        }
      }
    },
    mounted () {
      this.add()
      let self = this
      $(window).resize(function () {
        self.afterAdd()
      })
      $('body').on('click', function () {
        if (self.operationShow === true) {
          self.operationShow = false
        }
      })
    },
    watch: {
      $route () {
        this.add()
      },
      menus () {
        this.add()
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .content-tabs {
    position: relative;
    height: 34px;
    background: #fafafa;
    line-height: 34px;
    z-index:1;
    border-bottom: solid 2px #ededed;
    font-size:14px;
  }
  .content-tabs .roll-nav, .page-tabs-list {
    position: absolute;
    width: 34px;
    height: 32px;
    text-align: center;
    color: #999;
    z-index: 2;
    top: 0
  }
  .content-tabs .roll-left {
    left: 0;
    border-right: solid 1px #eee;
  }
  .content-tabs .roll-right {
    right: 0;
    border-left: solid 1px #eee;
  }
  .content-tabs button {
    background: #fff;
    border: 0;
    height: 31px;
    width: 34px;
    outline: 0
  }
  .content-tabs button:hover {
    background: #fafafa
  }
  nav.page-tabs {
     width: 100000px;
     height: 34px;
     overflow: hidden;
   }
  nav.page-tabs .page-tabs-content {
    float: left;
    transition: 0.5s;
  }
  .page-tabs a {
    display: block;
    float: left;
    border-right: solid 1px #eee;
    padding: 0 15px;
    color:#999;
  }
  .page-tabs a i:hover {
    color: #fff
  }
  .page-tabs-content a:hover{ color:#fff;}
  .content-tabs .roll-nav:hover{
    cursor: pointer
  }
  .page-tabs a:hover {
    /*color: #fff;*/
    background: #089ded;
    cursor: pointer
  }
  .roll-right.J_tabRight {
    right: 80px
  }
  .roll-right.btn-group {
    width: 80px;
    padding: 0
  }
  .roll-right.btn-group button {
    width: 80px
  }
  .roll-right.J_tabExit {
    background: #fff;
    height: 34px;
    width: 60px;
    outline: 0
  }
  .dropdown-menu-right {
    left: auto
  }
  .content-tabs .roll-nav:hover{
    cursor: pointer
  }
  .J_menuTab {
    -webkit-transition: all .3s ease-out 0s;
    transition: all .3s ease-out 0s
  }
  .page-tabs a {
    color: #999;
    text-decoration: none;
    position: relative;
  }
  .page-tabs a:first-child{
    margin-left:34px;
  }
  .page-tabs a i {
    color: #ccc
  }
  .page-tabs a.active i {
    color: #fff
  }
  .page-tabs a.active {
    background: #089ded;
    color: #fff
  }
  .page-tabs a.active i:hover, .page-tabs a.active:hover {
    background: #089ded;
    color: #fff
  }
  .page-tabs a.active:hover i {
    color: #fff
  }
  .dropdown-menu {
    border: medium none;
    display: none;
    float: left;
    list-style: none outside none;
    padding: 0;
    position: absolute;
    text-shadow: none;
    top: 100%;
    z-index: 1000;
    border-radius: 0;
    box-shadow: 0 0 3px rgba(86,96,117,.3);
    margin-left: -40px;
  }
  .dropdown-menu>li>a {
    border-radius: 3px;
    color: inherit;
    line-height: 25px;
    margin: 4px;
    text-align: left;
    font-weight: 400;
  }
  .dropdown-menu>li:hover{ color:#000;}
  .dropdown-menu>li>a.font-bold {
    font-weight: 600;
  }
  nav.page-tabs {
    width: 100000px;
    height: 34px;
    overflow: hidden;
  }
</style>
