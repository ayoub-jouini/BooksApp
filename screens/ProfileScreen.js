import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import colors from '../styles/colors';
import typography from '../styles/typography';
import Button from '../components/global/Button/Button';
import UserInfo from '../components/global/UserInfo/UserInfo';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/auth-context';
import axios from 'axios';

const ProfileScreen = ({ navigation }) => {
  const authContext = useContext(AuthContext);

  const handleNavigation = () => {
    navigation.goBack();
  };

  const handleLogOut = () => {
    authContext.logout();
  };

  const [userData, setUserData] = useState({});
  useEffect(() => {
    const getData = async () => {
      let response;
      try {
        response = await axios.get(
          `https://booksapp-e033f-default-rtdb.europe-west1.firebasedatabase.app/Users/${authContext.userId}.json?auth=${authContext.token}`
        );
        setUserData({
          firstName: response.data.firstName,
          lastName: response.data.LastName,
          email: response.data.email,
        });
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, []);

  return (
    <View style={styles.screenContainer}>
      <View style={styles.mainContainer}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Pressable onPress={handleNavigation}>
              <View style={styles.iconBox}>
                <Image source={require('../assets/icons/backArrowWhite.png')} />
              </View>
            </Pressable>
          </View>
          <View>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>My Account</Text>
            </View>
          </View>
          <View style={styles.imageNameContainer}>
            <Image
              // source={require('../assets/images/classics.jpg')}
              style={styles.profileImage}
            />
            <Text
              style={styles.userName}
            >{`${userData.firstName} ${userData.lastName}`}</Text>
            <Button type="contained" text="Change Photo" />
          </View>
          <View style={styles.userInfo}>
            <UserInfo
              attribute="Full Name"
              value={`${userData.firstName} ${userData.lastName}`}
            />
            <UserInfo attribute="email" value={`${userData.email}`} />
            <UserInfo attribute="Password" value="Change Password" />
          </View>
          <View style={styles.logoutSection}>
            <Pressable onPress={handleLogOut} style={styles.logoutContainer}>
              <Image source={require('../assets/icons/logoutIcon.png')} />
              <Text style={styles.logoutText}>Log Out</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'flex-start',
    zIndex: 2,
  },
  mainContainer: {
    padding: 10,
    flex: 1,
    width: '100%',
    borderBottomLeftRadius: 52,
    borderBottomRightRadius: 52,
    elevation: 3,
  },
  container: {
    flex: 1,
    marginTop: 50,
    marginBottom: 15,
  },
  header: { marginHorizontal: 20, marginBottom: 10, alignItems: 'flex-end' },
  titleContainer: {
    paddingVertical: 5,
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Asap_400Regular',
    fontWeight: 'bold',
    color: colors.secondaryLight,
    fontSize: typography.h1,
  },
  imageNameContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    height: '35%',
  },
  profileImage: {
    width: 130,
    height: 130,
    borderRadius: 200,
    backgroundColor: colors.secondaryLight,
  },
  userName: {
    fontFamily: 'Asap_400Regular',
    fontSize: typography.large,
    color: colors.secondaryLight,
  },
  userInfo: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    height: '30%',
  },
  logoutText: {
    fontFamily: 'Asap_400Regular',
    fontSize: typography.small,
    color: colors.secondaryLight,
    marginHorizontal: 5,
  },
  logoutSection: {
    height: '15%',
    justifyContent: 'center',
  },
  logoutContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
  },
});

export default ProfileScreen;
