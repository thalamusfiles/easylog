/**
 * Definição de todos os tipos de componente React
 */
export type IReactComponent<P = any> =
  | React.ClassicComponentClass<P>
  | React.ComponentClass<P>
  | React.FunctionComponent<P>
  | React.ForwardRefExoticComponent<P>;

/**
 * Definição dos tipos de componente do tipo classe
 */
export type IReactClassComponent<P = any> = React.ClassicComponentClass<P> | React.ComponentClass<P>;

/**
 * Definição de HOC - Higher-Order Component
 */
export type IWrappedComponent<P> = {
  wrappedComponent: IReactComponent<P>;
};
