// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

global.console = ((oldCons: Console) => {
  return {
    log: oldCons.log,
    info: oldCons.info,
    warn: function (text: any) {
      if (typeof text === "string" && text.includes('[MobX] Since strict-mode is enabled')) return;
      oldCons.warn(text);
    },
    error: function (text: any) {
      if (typeof text === "string" && text.includes('Could not find icon')) return;
      if (typeof text === "string" && text.includes('Each child in a list should')) return;
      if (typeof text === "string" && text.includes('make sure to pass up the same props that your component')) return;

      oldCons.error(text);
    }
  };
})(global.console);