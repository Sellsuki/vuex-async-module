# vuex-async-module

[![Coverage Status](https://coveralls.io/repos/github/Sellsuki/vuex-async-module/badge.svg?branch=master)](https://coveralls.io/github/Sellsuki/vuex-async-module?branch=master)

[![Build Status](https://travis-ci.org/Sellsuki/vuex-async-module.svg?branch=master)](https://travis-ci.org/Sellsuki/vuex-async-module)

## Install

```bash
yarn add vuex-async-module
```

## Example

store.js

```js
import Vue from 'vue'
import Vuex from 'vuex'
import { createVuexAsyncModule } from 'vuex-async-module'

Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    Info: {
      ...createVuexAsyncModule('info')
    }
  }
})
```

Hello.vue

```vue
<template>
  <div class="hello">
    <button @click="getInfo">get</button>
    <hr>
    {{info}}
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
    ...mapGetters(['info'])
  },
  methods: {
    ...mapActions(['getInfoAsync']),
    getInfo () {
      this.getInfoAsync({
        axiosConfig: {
          url: this.url
        },
        dataCallback (data, state) {
          return data.data.msg
        },
        successCallback (data) {
          console.log(data)
        },
        errorCallback (error) {
          console.log(error)
        }
      })
    }
  }
}
</script>
```