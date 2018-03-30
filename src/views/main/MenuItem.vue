<template>
  <div>
  <template v-for="item in menus">
    <router-link v-if="item.type === 'link'" :to="item.path" :key="item.id">
      <el-menu-item :index="item.path">
        <span>{{generateName(item.name)}}</span>
      </el-menu-item>
    </router-link>
    <a :href="item.path" target="_blank" v-else-if="item.type === 'link_page' && isStartHttp(item)" :key="item.id">
      <el-menu-item :index="item.path">
        <span>{{generateName(item.name)}}</span>
      </el-menu-item>
    </a>
    <router-link v-else-if="item.type === 'link_page'" :to="item.path" :key="item.id">
      <el-menu-item :index="item.path">
        <span>{{generateName(item.name)}}</span>
      </el-menu-item>
    </router-link>
    <el-submenu v-else-if="item.type === 'menu'" :index="item.id"  :key="item.id">
      <template slot="title">
        <span>{{generateName(item.name)}}</span>
      </template>

      <template v-for="child in item.children">
        <menu-item v-if="child.children&&child.children.length>0" :menus="[child]"></menu-item>

        <router-link v-else :to="child.path" :key="child.id">
          <el-menu-item :index="child.path">
            <span>{{generateName(child.name)}}</span>
          </el-menu-item>
        </router-link>
      </template>
    </el-submenu>
  </template>
  </div>
</template>

<script>
  export default {
    name: 'MenuItem',
    props: {
      menus: {
        type: Array
      }
    },
    methods: {
      generateName (name) {
        return name
      },
      isStartHttp (menu) {
        return menu.path && menu.path.indexOf('http') === 0
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  a{
    text-decoration: none;
    cursor: pointer;
    color: inherit;
    text-decoration-line: none;
  }
</style>
