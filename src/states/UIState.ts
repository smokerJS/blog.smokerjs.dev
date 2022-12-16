import {
  atom,
  DefaultValue,
  selector,
  useRecoilState,
  selectorFamily,
} from 'recoil';

const isVisibleContents = atom({
  key: 'isVisibleContents',
  default: false,
});

export const isVisibleContentsSelector = selector<boolean>({
  key: 'isVisibleContentsSelector',
  get: ({ get }) => {
    return get(isVisibleContents);
  },
  set: ({ set }, isVisible) => {
    set(isVisibleContents, isVisible);
  },
});

interface FormState {
  name?: string;
  addr?: string;
  age?: number;
}

const nameState = atom({
  key: 'name',
  default: '',
});
const addrState = atom({
  key: 'addr',
  default: '',
});
const ageState = atom({
  key: 'age',
  default: 0,
});

export const formState = selector<FormState>({
  key: 'formState',
  get: ({ get }) => {
    const name = get(nameState);
    const addr = get(addrState);
    const age = get(ageState);

    return { name, addr, age };
  },
  set: ({ set }, value) => {
    if (value instanceof DefaultValue) {
      set(nameState, value);
      set(addrState, value);
      set(ageState, value);
      return;
    }
    const { name, addr, age } = value;
    name && set(nameState, name);
    addr && set(addrState, addr);
    age && set(ageState, age);
  },
});

interface Form2 {
  field1: string;
  field2: string;
  field3: string;
}

const formState2 = atom<Form2>({
  key: 'formState',
  default: {
    field1: '1',
    field2: '2',
    field3: '3',
  },
});

interface Param extends Form2 {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

const formFieldState = selectorFamily<Form2, Param>({
  key: 'FormField',
  get:
    field =>
    ({ get }) =>
      get(formState2)[field],
  set:
    field =>
    ({ set }, newValue) =>
      set(formState2, prevState => ({ ...prevState, [field]: newValue })),
});
