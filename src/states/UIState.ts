import { atom } from 'recoil';

const UIState = atom({
    key: 'UIState',
    default: {
        blog: {
            isVivsibleContents: false
        }
    },
  });

  export default UIState