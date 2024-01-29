import type { Router as RemixRouter } from '@remix-run/router';
import qs from 'qs';
import { createBrowserRouter, Navigate, RouteObject } from 'react-router-dom';
import Endpoints from '../datasources/endpoints';
import { localStorageDef } from './consts';
import { RoutesName } from './routes-name';
import Storage from './storage';

export type RouteDefinition = { path: string; component: any; index?: boolean };
export type RoutesDefinition = { [key: string]: RouteDefinition };

let router: RemixRouter;
export const createBaseRouter = (routes: RouteObject[]): RemixRouter => (router = createBrowserRouter(routes));

export function getLinkTo(owner: RoutesName | string | number, options: any = {}): string {
  let push;
  switch (owner as RoutesName) {
    // PUBLIC
    case 'login':
      push = `${Endpoints.eAuth}${Endpoints.eAuthIam}`;
      break;
    case 'logout':
      push = `${Endpoints.eAuth}${Endpoints.eAuthLogout}`;
      break;
    case 'home_public':
      push = '/public/home';
      break;
    // APIs
    case 'persons':
      push = '/public/person';
      break;
    case 'person_legal':
      push = '/public/person/legal';
      break;
    case 'person_legal_view':
      push = `/public/person/legal/${options.document.replace(/[\\.\\/\\-]/g, '')}`;
      break;
    case 'person_partner':
      push = '/public/person/partner';
      break;
    case 'contact':
      push = '/public/person/contact';
      break;
    case 'types':
      push = '/public/types';
      break;
    case 'addresses':
      push = '/public/addresses';
      break;
    case 'addresses_zipcode':
      push = '/public/addresses/zipcode';
      break;
    // Relatórios
    case 'rel_estab':
      push = '/public/rel/establishment';
      break;
    case 'rel_estab_tt_month_state':
      push = '/public/rel/establishment/total_month_state';
      break;
    case 'rel_estab_tt_month_state_history':
      push = '/public/rel/establishment/total_month_state_history';
      break;
    case 'rel_type':
      push = '/public/rel/type';
      break;
    case 'rel_type_tt_nature':
      push = '/public/rel/type/total_month_nature';
      break;
    case 'rel_type_tt_activity':
      push = '/public/rel/type/total_month_activity';
      break;
    default:
      push = owner as string;
      break;
  }

  if (options?.inModal) {
    const search = window.location.search + qs.stringify(options.search);
    let newLocation = window.location.pathname + '/modal' + push.replace(/\/mgt/, '') + '?' + search;
    if (options?.showSave) {
      newLocation = newLocation + '&show_save=show_save';
    }
    return newLocation;
  } else if (options.search) {
    push += '?' + qs.stringify(options.search);
  }

  return push;
}

export function historyPush(
  owner: RoutesName | string | number,
  options: { inModal?: boolean; showSave?: boolean; open?: boolean; absolute?: boolean; search?: string } & any = {},
) {
  // Quando informado número, volta pra páginas anteriores ou posteriores.
  if (typeof owner === 'number') router.navigate(owner);

  const push = getLinkTo(owner, options);

  if (options?.open) {
    window.open(push);
  } else if (options.absolute) {
    window.location.href = push;
  } else {
    router.navigate(push);
  }
}

/**
 * Altera os filtros informados na URL.
 * Altera tudo que tem depois do ? na URL.
 * @param params
 */
export function historyReplace(search: any = {}, route: string | null = null) {
  search = Object.assign({}, search);

  if (route) {
    router.navigate(getLinkTo(route, search), { replace: true });
  } else {
    router.navigate({ pathname: router.state.location.pathname, search: qs.stringify(search) }, { replace: true });
  }
}

/**
 * Retorna os filtros informados na url
 */
export function historySearch(options: { parseArrays?: boolean } = {}) {
  return qs.parse(window.location.search.slice(1), options);
}

/**
 * Dispara uma função quando o usuário clica em historyback
 */
const hPopsCallbacks: any[] = [];
export function historyOnPop(listener: any) {
  hPopsCallbacks.push(listener);
}

/**
 * Verifica se esta autenticado e libera a rota
 * @param param0
 */
export const PrivateRoutes = ({ redirect, element }: { redirect: string; element: JSX.Element }): JSX.Element => {
  return Storage.getItem(localStorageDef.tokenKey) ? element : <Navigate to={redirect} />;
};
