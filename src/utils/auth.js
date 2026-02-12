export const login = (username, password) => {
  if (!username.trim() || !password.trim()) return false;

  localStorage.setItem("user", JSON.stringify({ username }));

  return true;
};

export const getUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

export const logout = () => {
  localStorage.removeItem("user");
};
