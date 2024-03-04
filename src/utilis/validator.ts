export const validateEmail = (email: string) => {
  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
    email.replace(/\s/g, ''),
  );
};

export const validateNumber = (num: string) => {
  return /^[+]\d{1}?[0-9]\d{8,13}$/.test(num);
};

// /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
// /^[0]?[0-9]\d{9}$/
//^+0[0-9]{10}$
///^[\+|0]?[0-9]\d{8,13}$/
