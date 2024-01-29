/**
 * Transforma os valores da classe como opcionais
 *
 */
export declare type PartOf<T> = {
  //Permite que apenas propriedades da classe T seja informado.
  //Aceita qualquer valor como filtro: Ex identity: "abcde"
  [P in keyof T]?: PartOf<T[P]>;
};
