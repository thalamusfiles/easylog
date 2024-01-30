import { action, computed, makeObservable, observable } from 'mobx';
import { createContext, useContext } from 'react';
import { localStorageDef } from '../commons/consts';
import { historyPush } from '../commons/route';
import Storage from '../commons/storage';
//import { AuthDataSource } from '../datasources/auth';
import apiConfigure from '../config/api.config';

type AccessUserInfo = { iat: number; sub: string; name: string; aud: string };

export class Ctx {
  constructor() {
    //Modifica classe pra ser observável
    makeObservable(this);

    this.loadUser(true);
  }

  @observable user = {} as AccessUserInfo;
  @observable token = null as string | null;
  @observable expiresIn = null as number | null;

  changeLanguage(lng?: string) {
    //return i18next.changeLanguage(lng);
  }

  //Realiza autenticação do usuário
  @action
  login(user: any, token: string | null, expiresIn: number | null): void {
    this.saveUser(user, token, expiresIn);
  }

  @action
  logout() {
    this.saveUser({}, null, null);

    historyPush('logout', { absolute: true });
  }

  //Retorna se usuário esta logado
  @computed
  get isAuth(): boolean {
    return !!this.token;
  }

  @action loadUser(reload = false) {
    this.user = Storage.getItem(localStorageDef.userContextKey, {});
    this.token = Storage.getItem(localStorageDef.tokenKey);
    this.expiresIn = Storage.getItem(localStorageDef.tokenKey);

    /*if (!this.token && reload) {
      //Esse setTimeout é um POG
      setTimeout(() => {
        new AuthDataSource()
          .getToken()
          .then((resp) => {
            this.saveUser(resp.data.userInfo, resp.data.idToken, null);
          })
          .catch((error) => {
            console.error(error);
          });
      }, 500);
    }*/
  }

  @action saveUser(user: any, token: string | null, expiresIn: number | null) {
    const isDiff = this.token !== token;

    Storage.setItem(localStorageDef.userContextKey, user);
    Storage.setItem(localStorageDef.tokenKey, token);
    Storage.setItem(localStorageDef.expiresIn, expiresIn);

    this.user = user;
    this.token = token;
    this.expiresIn = expiresIn;

    // Atualiza a chave de autorização se foi auterado.
    if (isDiff) {
      apiConfigure(this.token);
    }
  }
}

const UserCtxInstance = new Ctx();
export default UserCtxInstance;

export const UserContext = createContext<Ctx>({} as Ctx);
export const UserProvider = UserContext.Provider;
export const useUserStore = (): Ctx => useContext(UserContext);
