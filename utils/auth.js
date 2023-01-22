import axios from "axios";

const auth = async (mode, email, password) => {
  const response = await axios.post(
    `${process.env.AUTH_URL}${mode}?key=${process.env.API_KEY}`,
    {
      email,
      password,
      returnSecureToken: true,
    }
  );

  const token = response.data.idToken;

  return token;
};

const createUser = (email, password) => {
  return auth("signUp", email, password);
};

const login = (email, password) => {
  return auth("signInWithPassword", email, password);
};

export { createUser, login };
