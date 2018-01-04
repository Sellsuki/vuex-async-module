# vuex-async-module

[![NPM version](https://img.shields.io/npm/v/vuex-async-module.svg)](https://www.npmjs.com/package/vuex-async-module)
[![Coveralls github](https://img.shields.io/coveralls/github/Sellsuki/vuex-async-module.svg)](https://coveralls.io/github/Sellsuki/vuex-async-module?branch=master)
[![Build Status](https://travis-ci.org/Sellsuki/vuex-async-module.svg?branch=master)](https://travis-ci.org/Sellsuki/vuex-async-module)
[![Standard Version](https://img.shields.io/badge/release-standard%20version-brightgreen.svg)](https://github.com/conventional-changelog/standard-version)
[![Maintainability](https://api.codeclimate.com/v1/badges/0b0c7118cf2569e96931/maintainability)](https://codeclimate.com/github/Sellsuki/vuex-async-module/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/0b0c7118cf2569e96931/test_coverage)](https://codeclimate.com/github/Sellsuki/vuex-async-module/test_coverage)

## What is this about ??
* The idea and mainly code in this project have come from this [article](https://medium.com/@lachlanmiller_52885/reducing-vuex-boilerplate-for-ajax-calls-1cd4a74cef26) by [@lachlanmiller_52885](https://medium.com/@lachlanmiller_52885).
* Shortly it's about how to reduce vuex boilerplate with "call — pending — success — failure pattern".
* Each module provide each state of vuex as a API including data, status of request and some hook function to customize your state.
* For more information take a look at our example.

----------------------------------------
## Dependencies
* vue
* vuex
* axios

----------------------------------------
## Installation
Install via npm

```bash
npm install vuex-async-module
```

Install via yarn

```bash
yarn add vuex-async-module
```

----------------------------------------
## Usage
### createVuexAsyncModule
Create vuex store by using our "createVuexAsyncModule" function.<br />
When vuex store was created you don't need to know or write anything inside vuex, But all you need to know is about all functions we provided for you to get the job done easily.

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

### State
This is module state created by createVuexAsyncModule
```js
  state: {
      data: null, // data from AJAX call, You can customize this by using beforeSave callback (look at next section)
      pending: false, // loading status (true = loading, false = done)
      statusCode: 0, // response status code
  },
```

### mapGetters
One getter available for each module and it represent a state itself.<br />
The name of getter is module name then follow by "State" for example module "info" and getter will be "infoState"

```vue
<template>
  <h1>{{infoState.something}}</h1>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  computed: {
    ...mapGetters(['infoState'])
  }
}
</script>
```

### mapActions
One action available for each module and it can be customize for any endpoint you need.<br />
The name of action is "request" follow by module name then "Async" for example module "info" and action will be "requestInfoAsync"<br />
Once you call action with provided endpoint the function will save reponsed data on state immediately.<br />
Note that axiosConfig is the same config from axios libary itself.

```vue
<script>
import {mapActions} from 'vuex'

export default {
  methods: {
    ...mapActions(['requestInfoAsync']),
    getInfo () {
      // after this called all response data will be saved as module state automaticly.
      this.requestInfoAsync({
        axiosConfig: {
          url: '//jsonbin.io/b/5a01dc7471fdfc4fe9d09cdb'
        }
      })
    }
  }
}
</script>
```

* Customize data before it save to module state.
```vue
<script>
import {mapActions} from 'vuex'

export default {
  methods: {
    ...mapActions(['requestInfoAsync']),
    getInfo () {
      this.requestInfoAsync({
        axiosConfig: {
          url: '//jsonbin.io/b/5a01dc7471fdfc4fe9d09cdb'
        },
        beforeSave: (data, state) => {
          // data = reponse data when our request already success
          // state = last data state

          // filter then return to save in module state (last state will be gone by this)
          return data.map(item => item.name)
        }
      })
    }
  }
}
</script>
```

* Handle action with promise using then, catch
```vue
<script>
import {mapActions} from 'vuex'

export default {
  methods: {
    ...mapActions(['requestInfoAsync']),
    getInfo () {
      this.requestInfoAsync({
        axiosConfig: {
          url: '//jsonbin.io/b/5a01dc7471fdfc4fe9d09cdb'
        }
      }).then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>
```

* Handle action with promise using await [2]
```vue
<script>
import {mapActions} from 'vuex'

export default {
  methods: {
    ...mapActions(['requestInfoAsync']),
    getInfo () {
      try {
        await this.requestInfoAsync({
          axiosConfig: {
            url: '//jsonbin.io/b/5a01dc7471fdfc4fe9d09cdb'
          }
        })
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>
```

* Handle action with callback
```vue
<script>
import {mapActions} from 'vuex'

export default {
  methods: {
    ...mapActions(['requestInfoAsync']),
    getInfo () {
      this.requestInfoAsync({
        axiosConfig: {
          url: '//jsonbin.io/b/5a01dc7471fdfc4fe9d09cdb'
        },
        onSuccess: (res) => {
          console.log(res)
        },
        onError: (err) => {
          console.log(err)
        }
      })
    }
  }
}
</script>
```

### mapGetters
When data from AJAX call saved to state then you can map getter to sync your data to the template.<br />
One getter available for each module and it represent a state itself.<br />
The name of getter is module name then follow by "State" for example module "info" and getter will be "infoState"

```vue
<template>
  <div v-if="infoState.pending === false">
    <h1>{{infoState.data.something}}</h1>
  </div>
  <div v-else>
    Loading...
  </div>
</template>

import {mapGetters} from 'vuex'

export default {
  computed: {
    ...mapGetters(['infoState'])
  }
}
```

----------------------------------------
## Example

We provided a lot of way using our libary including.<br />
* Create vuex store (easiest way) [Click]
* Create vuex store by grouping module (by code **Compiled as one module) [Click]
* Create vuex store by grouping module (by module **Compiled as seperated modules) [Click]
* How to handle action using promise and callback [Click]

----------------------------------------
## Unit Test [For Contributors]

If you clone this repo and did some changes do not forget to update the test file then..

Test via npm

```bash
npm run test
```

Test via yarn

```bash
yarn test
```
