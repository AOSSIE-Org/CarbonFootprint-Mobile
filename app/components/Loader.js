import React, { Component } from 'react';
import { StyleSheet, View, Modal, Animated } from 'react-native';
import { newColors } from '../config/helper';

class Loader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            spinValue: new Animated.Value(0),
            corner1RotateValue: new Animated.Value(0),
            corner2RotateValue: new Animated.Value(0),
            corner3RotateValue: new Animated.Value(0),
            corner4RotateValue: new Animated.Value(0),
        };
        this.spinAnimation = this.spinAnimation.bind(this);
        this.corner1Animation = this.corner1Animation.bind(this);
        this.corner2Animation = this.corner2Animation.bind(this);
        this.corner3Animation = this.corner3Animation.bind(this);
        this.corner4Animation = this.corner4Animation.bind(this);
    }
    componentDidMount() {
        this.spinAnimation();
        this.corner1Animation();
        this.corner2Animation();
        this.corner3Animation();
        this.corner4Animation();
    }
    spinAnimation() {
        Animated.sequence([
            Animated.timing(this.state.spinValue, {
                toValue: 0,
                duration: 0
            }),
            Animated.timing(this.state.spinValue, {
                toValue: 100,
                duration: 2000
            }),
            Animated.timing(this.state.spinValue, {
                toValue: 0,
                duration: 0
            })
        ]).start(() => {
            this.spinAnimation();
        });
    }
    corner1Animation() {
        corner1RotateValue = 0;
        Animated.sequence([
            Animated.timing(this.state.corner1RotateValue, {
                toValue: 0,
                duration: 0
            }),
            Animated.timing(this.state.corner1RotateValue, {
                toValue: 0,
                duration: 1500
            }),
            Animated.timing(this.state.corner1RotateValue, {
                toValue: 100,
                duration: 500
            }),
            Animated.timing(this.state.corner1RotateValue, {
                toValue: 0,
                duration: 0
            })
        ]).start(() => {
            this.corner1Animation();
        });
    }
    corner2Animation() {
        Animated.sequence([
            Animated.timing(this.state.corner2RotateValue, {
                toValue: 0,
                duration: 0
            }),
            Animated.timing(this.state.corner2RotateValue, {
                toValue: 75,
                duration: 600
            }),
            Animated.timing(this.state.corner2RotateValue, {
                toValue: 75,
                duration: 800
            }),
            Animated.timing(this.state.corner2RotateValue, {
                toValue: 100,
                duration: 600
            }),
            Animated.timing(this.state.corner2RotateValue, {
                toValue: 0,
                duration: 0
            })
        ]).start(() => {
            this.corner2Animation();
        });
    }
    corner3Animation() {
        corner3RotateValue = 0;
        Animated.sequence([
            Animated.timing(this.state.corner3RotateValue, {
                toValue: 0,
                duration: 0
            }),
            Animated.timing(this.state.corner3RotateValue, {
                toValue: 50,
                duration: 600
            }),
            Animated.timing(this.state.corner3RotateValue, {
                toValue: 50,
                duration: 800
            }),
            Animated.timing(this.state.corner3RotateValue, {
                toValue: 100,
                duration: 600
            }),
            Animated.timing(this.state.corner3RotateValue, {
                toValue: 0,
                duration: 0
            })
        ]).start(() => {
            this.corner3Animation();
        });
    }
    corner4Animation() {
        corner4RotateValue = 0;
        Animated.sequence([   
            Animated.timing(this.state.corner4RotateValue, {
                toValue: 0,
                duration: 0
            }),     
            Animated.timing(this.state.corner4RotateValue, {
                toValue: 25,
                duration: 600
            }),
            Animated.timing(this.state.corner4RotateValue, {
                toValue: 25,
                duration: 800
            }),
            Animated.timing(this.state.corner4RotateValue, {
                toValue: 100,
                duration: 600
            }),
            Animated.timing(this.state.corner4RotateValue, {
                toValue: 0,
                duration: 0
            })
        ]).start(() => {
            this.corner4Animation();
        });
    }
    render() {
        const { loading } = this.props;
        const interpolatedSpinAnimation = this.state.spinValue.interpolate({
            inputRange: [0, 100],
            outputRange: ['0deg', '360deg']
        });
        const interpolatedCorner1Animation = this.state.corner1RotateValue.interpolate({
            inputRange: [0, 100],
            outputRange: ['0deg', '360deg']
        });
        const interpolatedCorner2Animation = this.state.corner2RotateValue.interpolate({
            inputRange: [0, 100],
            outputRange: ['0deg', '360deg']
        });
        const interpolatedCorner3Animation = this.state.corner3RotateValue.interpolate({
            inputRange: [0, 100],
            outputRange: ['0deg', '360deg']
        });
        const interpolatedCorner4Animation = this.state.corner4RotateValue.interpolate({
            inputRange: [0, 100],
            outputRange: ['0deg', '360deg']
        });
        return (
            <Modal
                transparent={true}
                animationType={'none'}
                visible={loading}
                onRequestClose={() => {
                    this.spinAnimation();
                    this.corner1Animation();
                    this.corner2Animation();
                    this.corner3Animation();
                    this.corner4Animation();
                }}
            >
                <View style={styles.modalBackground}>
                    <View style={styles.activityIndicatorWrapper}>
                        <Animated.View style={[styles.corners, {
                            transform: [{ rotate: interpolatedSpinAnimation }]
                        }]}>
                            <Animated.View style={[styles.container, {
                            transform: [{ rotate: interpolatedCorner1Animation }]
                            }]}>
                                <View style={styles.corner}>
                                </View>
                            </Animated.View>
                            <Animated.View style={[styles.container, {
                            transform: [{ rotate: interpolatedCorner2Animation }]
                            }]}>
                                <View style={styles.corner}>
                                </View>
                            </Animated.View>
                            <Animated.View style={[styles.container, {
                            transform: [{ rotate: interpolatedCorner3Animation }]
                            }]}>
                                <View style={styles.corner}>
                                </View>
                            </Animated.View>
                            <Animated.View style={[styles.container, {
                            transform: [{ rotate: interpolatedCorner4Animation }]
                            }]}>
                                <View style={styles.corner}>
                                </View>
                            </Animated.View>

                        </Animated.View>
                    </View>
                </View>
            </Modal>
        );
    }
} 

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-around',
        backgroundColor: '#00000040'
    },
    activityIndicatorWrapper: {
        backgroundColor: '#FFFFFF',
        height: 100,
        width: 100,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    corners: {
        width: 60,
        height: 60,
        position: 'relative'
    },
    corner: {
        width: '40%',
        height: '40%',
        borderBottomLeftRadius: 15,
        borderTopRightRadius: 15,
        backgroundColor: newColors.secondary
    },
    container: {
        width: '100%',
        height: '100%',
        position: 'absolute'
    }
});

export default Loader;
