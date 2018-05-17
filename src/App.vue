<template>
  <div id="app" class="container">
    <GuideHeader/>
    <router-view/>
  </div>
</template>

<script>
import GuideHeader from '@/components/GuideHeader'
export default {
  components: {
    GuideHeader
  },
  name: 'App'
}
</script>

<style>
</style>
