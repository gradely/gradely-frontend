const getLocalStorage = (payload = {}) => {
  const response = localStorage.getItem(payload);
  return response;
};

const setLocalStorage = (keyname, payload = {}) => {
  localStorage.setItem(keyname, JSON.stringify(payload));
};

const removeLocalStorage = (keyname) => {
  const response = localStorage.removeItem(keyname);
  return response;
};

export { getLocalStorage, setLocalStorage, removeLocalStorage };
