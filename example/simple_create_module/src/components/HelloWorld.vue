<template>
  <div class="hello">
    <button @click="getInfo()">get</button>
    <hr>
    {{infoState}}
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'

export default {
  name: 'HelloWorld',
  data () {
    return {
      url: '//jsonbin.io/b/5a01dc7471fdfc4fe9d09cdb'
    }
  },
  computed: {
    ...mapGetters(['infoState'])
  },
  methods: {
    ...mapActions(['requestInfoAsync']),
    getInfo () {
      this.requestInfoAsync({
        axiosConfig: {
          url: this.url
        },
        beforeSave (data, state) {
          return data.data.msg
        },
        onSuccess (data) {
          console.log(data)
        },
        onError (error) {
          console.log(error)
        }
      })
    }
  }
}
</script>