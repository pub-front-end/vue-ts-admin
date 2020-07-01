import Vue from 'vue';
import Vuex from 'vuex';
import { IPubStore } from './modules/public';
import { IOtherStore } from './modules/others';

export interface IRootState {
  PubStore: IPubStore;
}
Vue.use(Vuex);
// 由于passenger->dynamic: true: 是动态创建动态模块,所以不需要再次注册
export default new Vuex.Store<IRootState>({});
