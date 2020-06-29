import React from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import { Actions } from 'react-native-router-flux';
import BackHeader from '../components/BackHeader';
import RegisterForm from '../components/RegisterForm';
import StatusBarBackground from '../components/StatusBarBackground';

/**
 * Register Screen Container
 */
const Register = props => {
    return (
        <View style={styles.container}>
            <StatusBar hidden={true} />
            <StatusBarBackground style={{ backgroundColor: 'white' }} />
            <BackHeader text="Login" link={() => Actions.pop()} icon toIcon="sign-in" />
            <RegisterForm {...props} />
        </View>
    );
};

/*StyleSheet*/
const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

export default React.memo(Register);
