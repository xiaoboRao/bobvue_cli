<template>
  <div class="goods">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
export default {
  name: 'goods',
  props: {
    msg: String
  },
  components: {
  },
  mixins: [],
  data: function() {
    return {
      message: "goods"
    }
  },
  created: function() {

  },
  mounted: function() {

  },
  computed: {

  },
  methods: {

  }
}
</script>

<style scoped>
  .goods {
    
  }
</style>


