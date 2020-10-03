import Vue from 'vue'
import Router from 'vue-router'
import routes from './routes'
// 路由拦截重定向
import axios from '../store/http'
import store from '../store/store'
Vue.use(Router)

// 页面刷新时，重新赋值token
console.log(window.localStorage.getItem('token'))
if (window.localStorage.getItem('token')) {
  let data = {
    token: window.localStorage.getItem('token'),
    platform: window.localStorage.getItem('platform'),
    service: window.localStorage.getItem('service')
  }
  store.commit('login', data)
}

// 页面刷新时，重新赋值user
if (window.localStorage.getItem('user')) {
  store.commit('newUser', window.localStorage.getItem('user'))
}

const router = new Router({
  mode: 'history',
  routes
})

function getParam (name, url) {
  if (typeof name !== 'string') return false
  if (!url) url = window.location.href
  // 当遇到name[xx]时，对方括号做一下转义为 name\[xxx\]，因为下面还需要使用name做正则
  name = name.replace(/[[]]/g, '\\$&')
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)')
  var results = regex.exec(url)
  if (!results) return null
  if (!results[2]) return ''
  return decodeURIComponent(results[2].replace(/\+/g, ' '))
}

router.beforeEach((to, from, next) => {
  if (to.matched.some(r => r.meta.requireAuth)) {
    // 判断该路由是否需要登录权限
    if (store.state.token) {
      // 通过vuex state获取当前的token是否存在
      GET_USER(store.state.apiUrl + '/getLoginUserInfo').then(response => {
        next()
      })
    } else {
      if (getParam('token', window.location.href) !== null) {
        let data = {
          token: getParam('token', window.location.href),
          platform: getParam('platform', window.location.href),
          service: getParam('service', window.location.href)
        }
        store.commit('login', data)
        GET_USER(store.state.apiUrl + '/getLoginUserInfo').then(response => {
          next()
        })
      } else {
        // 路由拦截重定向
        axios({
          method: 'post',
          url: store.state.apiUrl + '/orderInfo/queryByCondition',
          headers: {
            token: store.state.token
          },
          data: {}
        }).then(function (response) {
          if (response.data.data.ssoLoginIndexUrl) {
            window.location.href = response.data.data.ssoLoginIndexUrl
          } else {
            GET_USER(store.state.apiUrl + '/getLoginUserInfo').then(response => {
              next()
            })
          }
        })
      }
    }
  } else {
    next()
  }
})

export const GET_USER = function (url) {
  return axios({
    method: 'get',
    url: url,
    headers: {
      token: store.state.token
    },
    data: {}
  }).then(function (response) {
    let msg = response.data.data
    store.commit('newUser', msg)
  })
}
export default router
