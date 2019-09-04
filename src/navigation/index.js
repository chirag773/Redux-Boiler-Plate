import React from "react";
import {
  Image,
  TouchableOpacity,
  View,
  SafeAreaView,
  ScrollView,
  Dimensions
} from "react-native";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import {
  createSwitchNavigator,
  createStackNavigator,
  createAppContainer,
  createDrawerNavigator,
  createBottomTabNavigator,
  DrawerItems
} from "react-navigation";

// Implementation of HomeScreen, OtherScreen, SignInScreen, AuthLoadingScreen
// goes here.

// import Welcome from '../screens/Welcome';
import Login from "../screens/Login";
import AuthLoadingScreen from "../screens/AuthLoading";
import Main from "../screens/Main";

import { theme } from "../constants";

const AuthStackNavigator = createStackNavigator(
  {
    //   Welcome,
    Login,
    // LoginId,
    // Location
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        height: theme.sizes.base * 4,
        backgroundColor: theme.colors.white, // or 'white
        borderBottomColor: "transparent",
        elevation: 0 // for android
      },
      // headerBackImage: <Image source={require('../assets/icons/back.png')} />,
      headerBackTitle: null,
      headerLeftContainerStyle: {
        alignItems: "center",
        marginLeft: theme.sizes.base * 2,
        paddingRight: theme.sizes.base
      },
      headerRightContainerStyle: {
        alignItems: "center",
        paddingRight: theme.sizes.base
      }
    }
  }
);

const GradientHeader = props => (
  <View style={{ backgroundColor: "#eee" }}>
    <LinearGradient
      colors={["#192a56", "#ff7675"]}
      start={[0.0, 0.5]}
      end={[1.0, 0.5]}
      locations={[0.0, 1.0]}
    />
  </View>
);



const MainStack = createStackNavigator({
    MainStack: {
    screen: Main,
    navigationOptions: ({ navigation }) => {
      return {
        headerTitle: "Main",
        headerStyle: { backgroundColor: "#192a56" },
        headerTitleStyle: { color: "white" },
        headerLeft: (
          <AntDesign
            style={{ paddingLeft: 10 }}
            onPress={() => navigation.openDrawer()}
            name="bars"
            color="white"
            size={30}
          />
        )
      };
    }
  }
});



const AppDrawerNavigator = createDrawerNavigator(
  {
    Main: {
      screen: MainStack
    }
}
);

const finalRoute = createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      Auth: AuthStackNavigator,
      App: AppDrawerNavigator
    },
    {
      initialRouteName: "AuthLoading"
    }
  )
);

export default finalRoute;