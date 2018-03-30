<template>
<iframe border="0" height="100%" width="100%" v-if="srcUrl" :src="srcUrl"></iframe>
</template>

<script>
  export default {
    name: 'Iframe',
    data () {
      return {
        srcUrl: null
      }
    },
    mounted () {
    },
    methods: {
    },
    // tab切换如果参数不一样，重新加载数据
    beforeRouteEnter  (to, from, next) {
      next(vm => {
        // 通过 `vm` 访问组件实例
        if (vm.srcUrl !== vm.$route.query.url) {
          vm.srcUrl = vm.$route.query.url
        }
      })
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
