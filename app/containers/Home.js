import React from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import { useSelector } from 'react-redux';
import ImageHeader from '../components/ImageHeader';
import LandingButtons from '../components/LandingButtons';
import Loader from '../components/Loader';

const Home = props => {
    const loader = useSelector(state => state.loader);
    return (
        <View style={styles.container}>
            <Loader loading={loader.isLoading} />
            <StatusBar hidden={true} />
            <ImageHeader text="Carbonfootprint" />
            <LandingButtons {...props} />
        </View>
    );
};

/*StyleSheet*/
const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

export default React.memo(Home);
