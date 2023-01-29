import axios from 'axios';

const createUser = async (email, password, firstName, LastName) => {
  let response;
  try {
    response = await axios.post(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCyiL7Sp-sebtwEhrS4_4PpRP3DercnjTU',
      {
        email: email,
        password: password,
        returnSecureToken: true,
      }
    );
  } catch (e) {
    console.log(e);
  }

  const token = response.data.idToken;
  const userAdress = response.data.email;
  const userId = response.data.localId;

  try {
    await axios.put(
      `https://booksapp-e033f-default-rtdb.europe-west1.firebasedatabase.app/Users/${userId}.json?auth=${token}`,
      {
        firstName: firstName,
        LastName: LastName,
        email: userAdress,
      }
    );
  } catch (err) {
    console.log(err);
  }

  return { token, userAdress, userId };
};

const login = async (email, password) => {
  let response;
  try {
    response = await axios.post(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCyiL7Sp-sebtwEhrS4_4PpRP3DercnjTU',
      {
        email: email,
        password: password,
        returnSecureToken: true,
      }
    );
  } catch (e) {
    console.log(e);
  }

  const token = response.data.idToken;
  const userAdress = response.data.email;
  const userId = response.data.localId;

  return { token, userAdress, userId };
};

export { createUser, login };
