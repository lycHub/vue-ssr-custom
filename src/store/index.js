import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";

Vue.use(Vuex)

export default () => {
  return new Vuex.Store({
    state: {
      channels: []
    },
    actions: {
      fetchChannels({ commit }) {
        return axios.get('https://toutiao.m.lipengzhou.com/api/app/v1_0/user/channels').then(({ data }) => {
          commit('setChannels', data.data.channels);
        }).catch(error => {
          console.log('请求失败>>>>>>');
        });
      }
    },
    mutations: {
      setChannels (state, channels) {
        state.channels = channels || [];
      }
    }
  })
}
