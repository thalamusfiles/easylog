/**
 * Armazenador (storage) local de dados
 */
class Stg {
  clear() {
    localStorage.clear();
  }

  getItem(key: string, def: any = null): any {
    const property = localStorage.getItem(key);
    try {
      return ![undefined, null, 'null'].includes(property) ? JSON.parse(property!).v : def;
    } catch {
      return null;
    }
  }

  setItem(key: string, value: any) {
    return localStorage.setItem(key, JSON.stringify({ v: value }));
  }

  removeItem(key: string) {
    localStorage.removeItem(key);
  }

  key(index: number) {
    return localStorage.key(index);
  }
  set(path: string, key: string, value: any) {
    this.setItem(`${path}/${key}`, value);
  }

  get(path: string, key: string, def: any = null) {
    return this.getItem(`${path}/${key}`, def);
  }
}

const Storage = new Stg();
export default Storage;
