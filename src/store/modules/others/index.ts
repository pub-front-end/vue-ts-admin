/**
 * 业务store数据
 */
import { Module, VuexModule, Mutation, Action, getModule } from 'vuex-module-decorators';
import store from '@/store';

export interface IOtherStore {
  other: string;
}

@Module({ dynamic: true, store, name: 'OtherStore' })
export default class OtherStore extends VuexModule {
  public other = '';
}

export const PubStore = getModule(OtherStore);
