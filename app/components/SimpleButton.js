import React, { Component } from 'react';
import {
    Button
} from 'react-native';

class SimpleButton extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <Button
                title="Test Button"
                onPress={() => this.props.login()}
                color="#841584"
                accessibilityLabel="Learn more about this purple button"
            />
        )
    }
}

export default SimpleButton;
