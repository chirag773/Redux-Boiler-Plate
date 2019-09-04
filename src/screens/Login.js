import React, { PureComponent } from "react";
import {
  ActivityIndicator,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  NetInfo,
  Alert,
  Image,
  ScrollView,
  SafeAreaView,
  TextInput,
  View,
  AppState
} from "react-native";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { loginUser } from "../actions/authActions";

import { Button, Block, Input, Text } from "../components";
import { theme } from "../constants";
// import { logoutuser } from "../actions/authActions";
import { AsyncStorage } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

class Login extends PureComponent {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      errors: {},
      errorMessage: "",
      loading: false,
      placeholder: "Username",
      passwordPlaceholder: "Password",
      keyboardType: "default",
      secure: true
    };
    this.onLoginPress = this.onLoginPress.bind(this);
    this.option = this.option.bind(this);
    this.onUsername = this.onUsername.bind(this);
    this.onPassword = this.onPassword.bind(this);
  }

  componentWillMount() {
    NetInfo.isConnected.fetch().then(isConnected => {
      if (!isConnected) {
        Alert.alert("No Internet Connection.");
      }
    });
  }

  async checkAuth() {
    const { navigation } = this.props;
    const token = await AsyncStorage.getItem("jwtToken");
    if (token) {
      navigation.navigate("Site");
    }
  }

  componentWillReceiveProps = nextProps => {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
    this.checkAuth(nextProps);
  };

  onUsername(username) {
    this.setState({ username });
  }

  onPassword(password) {
    this.setState({ password });
  }

  option() {
    if (this.state.secure) {
      this.setState({
        placeholder: "Employee Id",
        passwordPlaceholder: "Aadhar Card",
        keyboardType: "numeric",
        secure: false
      });
    } else {
      this.setState({
        placeholder: "Username",
        passwordPlaceholder: "Password",
        keyboardType: "default",
        secure: true
      });
    }
  }

  onLoginPress() {
    const { user, loading } = this.props.auth;

    this.setState({ loading: true });

    NetInfo.isConnected.fetch().then(isConnected => {
      if (!isConnected) {
        Alert.alert("No Internet Connection.");
      } else {
        const userData = {
          username: this.state.username,
          password: this.state.password,
          grant_type: "password"
        };

        var formBody = [];
        for (var property in userData) {
          var encodedKey = encodeURIComponent(property);
          var encodedValue = encodeURIComponent(userData[property]);
          formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");
        // this.checkAuth()

        Keyboard.dismiss();

        this.props.loginUser(formBody);
      }
    });
  }

  render() {
    const { navigation } = this.props;
    const { errors } = this.state;
    const { loading } = this.state;

    let renderButton;
    if (this.state.secure) {
      renderButton = (
        <Button
          onPress={this.option}
          style={{
            borderWidth: 1,
            borderRadius: 30,
            borderColor: "#E46932"
          }}
        >
          <Text gray caption center style={{ color: "#E46932" }}>
            Login with Employe Id
          </Text>
        </Button>
      );
    } else {
      renderButton = (
        <Button
          onPress={this.option}
          style={{
            borderWidth: 1,
            borderRadius: 30,
            borderColor: "#E46932"
          }}
        >
          <Text gray caption center style={{ color: "#E46932" }}>
            Back To Login
          </Text>
        </Button>
      );
    }

    return (
      <KeyboardAvoidingView style={styles.login} behavior="padding">
        <Block>
          <Image
            source={require("../../assets/Narsi.png")}
            style={styles.logo}
          />
        </Block>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Block padding={[0, theme.sizes.base * 2]} onPress={Keyboard.dismiss}>
            <Block middle>
              <Input
                placeholder={this.state.placeholder}
                keyboardType={this.state.keyboardType}
                style={[styles.input]}
                value={this.state.username}
                onChangeText={this.onUsername}
              />

              <Input
                secure={this.state.secure}
                keyboardType={this.state.keyboardType}
                placeholder={this.state.passwordPlaceholder}
                style={[styles.input]}
                value={this.state.password}
                onChangeText={this.onPassword}
              />

              {errors && (
                <Text style={{ color: "red" }}>{errors.error_description}</Text>
              )}
              {errors && <Text style={{ color: "red" }}>{errors.error}</Text>}

              <Button
                gradient
                style={styles.loginButton}
                onPress={this.onLoginPress}
              >
                {loading ? (
                  <ActivityIndicator size="small" color="white" />
                ) : (
                  <Text bold white center>
                    Login
                  </Text>
                )}
              </Button>
            </Block>
            <Block
              style={{
                marginTop: 10
              }}
            >
              <Text
                gray
                caption
                center
                style={{ color: "#E46932" }}
                onPress={() => navigation.navigate("Forgot")}
              >
                Forgot password?
              </Text>
            </Block>

            {renderButton}
            {/* <Button
              onPress={this.option}
              style={{
                borderWidth: 1,
                borderRadius: 30,
                borderColor: "#E46932"
              }}
            >
              <Text gray caption center style={{ color: "#E46932" }}>
                Login with Employe Id
              </Text>
            </Button> */}
            {/* <Button
              onPress={() => navigation.navigate("Location")}
              style={{
                borderWidth: 1,
                borderRadius: 30,
                borderColor: "#E46932"
              }}
            >
              <Text gray caption center style={{ color: "#E46932" }}>
                Location
              </Text>
            </Button> */}
          </Block>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  //   auth:PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth.user,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  {
    loginUser
  }
)(Login);

const styles = StyleSheet.create({
  login: {
    flex: 1
  },
  logo: {
    width: 200,
    height: 200,
    flex: 1,
    alignSelf: "center",
    resizeMode: "contain",
    justifyContent: "center"
  },
  loginButton: {
    borderRadius: 30
  },
  input: {
    borderRadius: 0,
    borderWidth: 0,
    borderBottomColor: theme.colors.gray2,
    borderBottomWidth: StyleSheet.hairlineWidth,
    height: theme.sizes.base * 3,
    marginTop: 10
  },
  hasErrors: {
    borderBottomColor: theme.colors.accent
  }
});