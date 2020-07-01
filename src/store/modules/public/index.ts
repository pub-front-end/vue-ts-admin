/**
 * 公用store数据
 */
import { Module, VuexModule, Mutation, Action, getModule } from 'vuex-module-decorators';
import { IUser } from '../types';
import { login } from '@/api/user';
import { getToken, setToken, removeToken } from '@/utils/storage';
import store from '@/store';

export interface IPubStore {
  user: IUser;
  token: string;
}

@Module({ dynamic: true, store, name: 'PubStore' })
class PublicStore extends VuexModule implements IPubStore {
  public user: IUser = {};
  public token = getToken() || '';

  /**
   * 登录并保存token信息
   * @param userInfo
   */
  @Action
  public async Login(userInfo: { username: string; password: string }) {
    let { username, password } = userInfo;
    username = username.trim();
    const { data } = await login({ username, password });
    setToken(data.accessToken);
    this.SET_TOKEN(data.accessToken);
  }

  /**
   * 登出并删除token信息
   */
  @Action
  public async LogOut() {
    // if (this.token === '') {
    //   throw Error('LogOut: token is undefined!');
    // }
    // await logout();
    // removeToken();
    // resetRouter();
    // // Reset visited views and cached views
    // TagsViewModule.delAllViews();
    // this.SET_TOKEN('');
    // this.SET_ROLES([]);
  }

  @Mutation
  private SET_TOKEN(token: string) {
    this.token = token;
  }
}

export const PubStore = getModule(PublicStore);
