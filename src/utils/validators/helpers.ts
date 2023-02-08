/* eslint-disable no-useless-escape */
export const isEmpty = (value?: string | number) =>
  !value || typeof value === 'undefined' || String(value).trim() === '';

export const isNumber = (value: any) => !Number.isNaN(Number(value));

export const isEmail = (string: string) => {
  const regex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (string.match(regex)) {
    return true;
  }

  return false;
};

export const isPhoneNumber = (value: string) => {
  if (value.startsWith('0')) {
    if (value.length !== 11) return false;

    return true;
  }

  return /^\d{13,}$/.test(value.replace(/[\s()+\-\.]|ext/gi, ''));
};

export const isValid = (errors: { [key: string]: string }) => {
  const errorsArray = Object.values(errors);

  for (let i = 0; i < errorsArray.length; i += 1) {
    if (!isEmpty(errorsArray[i])) {
      return false;
    }
  }

  return true;
};
