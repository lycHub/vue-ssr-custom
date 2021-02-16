import createApp from './main'

const { app, router } = createApp()

// 这里假定 App.vue 模板中根元素具有 `id="app"`
router.onReady(() => {
  app.$mount('#app');
});

router.onError((error) => {
  console.error('router error>>>', error);
  // console.log(router.history.pending.fullPath);
});
