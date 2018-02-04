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
    <ul>
      <li v-for="(column, index) in columns" :key="index">
        {{userDetailState.data[column]}}
      </li>
    </ul>
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
    ...mapGetters({
      userListState: 'users/userList/userListState',
      userDetailState: 'users/userDetail/userDetailState'})
  },
  created() {
    this.getList()
    this.getUser()
  },
  methods: {
    ...mapActions({
      requestUserListAsync: 'users/userList/requestUserListAsync',
      requestUserDetailAsync: 'users/userDetail/requestUserDetailAsync'}
    ),
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
          console.log(data)
        },
        onError (error) {
          console.log(error)
        }
      })
    },
    getUser () {
      this.requestUserDetailAsync({
        axiosConfig: {
          url: 'https://api.myjson.com/bins/bdyp3'
        },
        beforeSave: (data, state) => {
          return data.data
        },
        onSuccess (data) {
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