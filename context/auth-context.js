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
  }, []);

  const authenticate = (token, userId, userAdress) => {
    setAuthToken(token);
    AsyncStorage.setItem('token', token);
    setUserId(token);
    AsyncStorage.setItem('userId', userId);
    setUserAdress(token);
    AsyncStorage.setItem('userAdress', userAdress);
  };

  const logout = () => {
    setAuthToken(null);
    AsyncStorage.removeItem('token');
    setUserId(null);
    AsyncStorage.removeItem('userId');
    setUserAdress(null);
    AsyncStorage.removeItem('userAdress');
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
