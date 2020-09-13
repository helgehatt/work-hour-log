import React from 'react';

type Value = any;
type Error = any | undefined;
type OnChange = (event: Value) => void;
type Rule = [Error, (value: Value) => boolean];

interface FormScheme extends Record<string, {
  value: Value
  rules?: Array<Rule>
}> {}

type FormData<T> = Record<keyof T, {
  value: Value
  error: Error
  onChange: OnChange
}>;

type FormComponent<T, R> = React.ComponentType<R & { data: FormData<T> }>

export const createFormScheme = <T extends FormScheme>(scheme: T) => scheme;

export const withFormData = <T extends FormScheme, R>(scheme: T) => (Component: FormComponent<T, R>) => (props: R) => {

  const [rules] = React.useState(Object.keys(scheme).reduce(
    (acc, key) => Object.assign(acc, { [key]: scheme[key].rules || [] }),
    {} as Record<keyof T, Array<Rule>>,
  ));

  const validate = React.useCallback(
    (key: string, value: Value) => rules[key].find(rule => rule[1](value))?.[0], [rules],
  );

  const onChange = React.useCallback(
    (key: string) => (event: any) => {
      const value = getElementValue(event.target);
      const error = validate(key, value);
      setData(prev => ({ ...prev, [key]: { ...prev[key], value, error } }));
    }, [validate],
  );

  const [data, setData] = React.useState(Object.keys(scheme).reduce(
    (acc, key) => Object.assign(acc, { [key]: {
      value: scheme[key].value || '',
      error: validate(key, scheme[key].value),
      onChange: onChange(key),
    }}), {} as FormData<T>,
  ));

  return <Component {...props} data={data} />;
};

const getElementValue = (input: HTMLInputElement) => {
  switch (input.type) {
    case 'checkbox': return getCheckboxValue(input);
    case 'radio': return getRadioValue(input);
    default: return input.value;
  }
};

const getCheckboxValue = (input: HTMLInputElement) => {
  if (input.name === undefined) return input.checked;
  return getElementsByName(input.name)
    .filter(element => element.checked)
    .map(element => element.value);
};

const getRadioValue = (input: HTMLInputElement) => {
  if (input.name === undefined) return input.checked;
  return getElementsByName(input.name)
    .find(element => element.checked)
    ?.value;
};

const getElementsByName = (name: string) => {
  return Array.from(document.getElementsByName(name)) as HTMLInputElement[];
};
