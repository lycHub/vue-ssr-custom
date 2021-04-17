import createApp from './main'

export default context => {
  return new Promise((resolve, reject) => {
    const { app, router, store } = createApp()

    // 设置服务器端 router 的位置
    router.push(context.url)
    context.meta = app.$meta()

    // 等到 router 将可能的异步组件和钩子函数解析完
    router.onReady(() => {
      const matchedComponents = router.getMatchedComponents(); // 只会匹配到路由组件
      // 匹配不到的路由，执行 reject 函数，并返回 404
      if (matchedComponents.length) {
        Promise.all(matchedComponents.map(Component => {
          console.log('Component asyncData', Component.name);
          if (Component.asyncData) {
            return Component.asyncData({
              store,
              route: router.currentRoute
            })
          }
        })).then(() => {
          context.state = store.state
          resolve(app)
        }).catch(reject);
      } else {
        reject({ code: 404 })
      }
    }, reject)
  })
}
