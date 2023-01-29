import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useEffect, useState } from 'react';

const AuthContext = createContext({
  token: '',
  userId: '',
  userAdress: '',
  isAuthenticated: false,
  authenticate: (token, userId, userAdress) => {},
  logout: () => {},
});

const AuthContextProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState();
  const [userId, setUserId] = useState();
  const [userAdress, setUserAdress] = useState();

  useEffect(() => {
    const fetchUserData = async () => {
      const storedToken = await AsyncStorage.getItem('token');
      const storedUserId = await AsyncStorage.getItem('userId');
      const storedUserAdress = await AsyncStorage.getItem('userAdress');

      if (storedToken && storedUserId && storedUserAdress) {
        setAuthToken(storedToken);
        setUserId(storedUserId);
        setUserAdress(storedUserAdress);
      }
    };
    fetchUserData();
  }, [authToken, userId, userAdress]);

  const authenticate = async (token, userId, userAdress) => {
    setAuthToken(token);
    await AsyncStorage.setItem('token', token);
    setUserId(token);
    await AsyncStorage.setItem('userId', userId);
    setUserAdress(token);
    await AsyncStorage.setItem('userAdress', userAdress);
  };

  const logout = async () => {
    setAuthToken(null);
    await AsyncStorage.removeItem('token');
    setUserId(null);
    await AsyncStorage.removeItem('userId');
    setUserAdress(null);
    await AsyncStorage.removeItem('userAdress');
  };

  const value = {
    token: authToken,
    userId: userId,
    userAdress: userAdress,
    isAuthenticated: !!authToken,
    authenticate,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthContext };
export default AuthContextProvider;
