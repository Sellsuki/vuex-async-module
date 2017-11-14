<template>
  <div class="hello">
    <table border="1">
      <tr>
        <td v-for="(column, index) in columns" :key="index">{{column}}</td>
      </tr>
      <tr v-for="user in userListState.data" :key="user.id">
        <td v-for="(column, index) in columns" :key="index">
           {{user[column]}}
        </td>
      </tr>
    </table>
    <hr>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'

export default {
  name: 'HelloWorld',
  data () {
    return {
      columns: []
    }
  },
  computed: {
    ...mapGetters(['userListState','userDetailState'])
  },
  mounted() {
    this.getListAsyncAwait()
  },
  methods: {
    ...mapActions(['requestUserListAsync','requestUserDetailAsync']),
    async getListAsyncAwait () {
      try{
        await this.requestUserListAsync({
          axiosConfig: {
            url: 'https://api.myjson.com/bins/16p5ef'
          },
          beforeSave: (data, state) => {
            this.columns = Object.keys(data.data[0])
            return data.data
          }
        })
        alert('fetch list success')
        this.getListPromise()
      } catch(e) {
        alert('fetch list error')
      }
      
    },
    getListPromise () {
      this.requestUserListAsync({
        axiosConfig: {
          url: 'https://api.myjson.com/bins/16p5ef'
        },
        beforeSave: (data, state) => {
          this.columns = Object.keys(data.data[0])
          return data.data
        }
      }).then((res)=>{
        alert('fetch list success')
        this.getList()
      }).catch((err)=>{
        alert('fetch list error')
      })
      
    },
    getList () {
      this.requestUserListAsync({
        axiosConfig: {
          url: 'https://api.myjson.com/bins/16p5ef'
        },
        beforeSave: (data, state) => {
          this.columns = Object.keys(data.data[0])
          return data.data
        },
        onSuccess (data) {
          alert('fetch list success')
          console.log(data)
        },
        onError (error) {
          console.log(error)
        }
      })
    },
  }
}
</script>