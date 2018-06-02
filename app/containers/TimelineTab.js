/*
 * To display history of user's activities in form of timeline for whole day
*/

import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
    TouchableNativeFeedback,
    DatePickerAndroid,
    DatePickerIOS,
    Platform
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Timeline from 'react-native-timeline-listview';
import { Actions } from 'react-native-router-flux';
import ActivityHistoryStorage from '../actions/ActivityHistoryStorage';
import { getIcon, getIconName, color } from '../config/helper';
import Header from '../components/Header';

/**
 * TimelineTab Container
 * @extends Component
 */
export default class TimelineTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date() // Current date
        };
        ActivityHistoryStorage.createDB();
        this.data = this.getHistoryData();
        this.pickDate = this.pickDate.bind(this);
        this.datePickerView = this.datePickerView.bind(this);
    }

    /**
     * [getHistoryData description]
     * @return {[type]} [description]
     */
    getHistoryData() {
        var obj = ActivityHistoryStorage.getData(
            this.state.date.toDateString()
        );
        data = [];
        for (i = 0; i < obj.length; i++) {
            let temp = {
                title: obj[i].src,
                time: obj[i].startTime,
                activityType: obj[i].actType,
                distance: obj[i].distance.toFixed(2) + ' km',
                duration: obj[i].duration + ' s',
                co2Emitted: obj[i].co2Emitted.toFixed(2) + ' kg',
                co2Saved: obj[i].co2Saved.toFixed(2) + ' kg'
            };
            data.push(temp);
        }
        return data;
    }

    /**
	 * Function to set view of ListView item
	   This function will be sent to Timeline component as prop and will be rendered by it.
	 * @param  {[type]} rowData   [description]
	 * @param  {[type]} sectionID [description]
	 * @param  {[type]} rowID     [description]
	 * @return {[type]}           [description]
	 */
    renderDetail(rowData, sectionID, rowID) {
        var icon = getIconName(rowData.activityType);
        return (
            <View style={styles.container}>
                <View style={styles.locationView}>
                    <View>
                        <Text style={styles.largeText2}>{rowData.title}</Text>
                    </View>
                </View>
                <View style={styles.activityView}>
                    <Icon name={getIcon(icon)} size={25} color="black" />
                    <Text style={styles.mediumText}>
                        {rowData.activityType}
                    </Text>
                    <View style={styles.hrView}>
                        <View>
                            <Text style={styles.smallText}>
                                {rowData.distance}
                            </Text>
                            <Text style={styles.smallText}>
                                {rowData.duration}
                            </Text>
                        </View>
                        <View>
                            <Text style={styles.smallText}>
                                {rowData.co2Emitted}
                            </Text>
                            <Text style={[styles.smallText, styles.greenText]}>
                                {rowData.co2Saved}
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
        );
    }

    /**
     * To format date into desirable form (e.g. - June 30, 2017)
     * @param  Date date [description]
     * @return {String}  date in string
     */
    getDateStr(date) {
        var names = [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December'
        ];
        var dateStr =
            names[date.getMonth()] +
            ' ' +
            date.getDate() +
            ', ' +
            date.getFullYear();
        return dateStr;
    }

    /**
     * Function to open DatePicker view and set date selected by user to current state
     * This is only for Android. For iOS, there is seperate 'DatePickerIOS' component given later.
     */
    async pickDate() {
        try {
            const { action, year, month, day } = await DatePickerAndroid.open({
                date: new Date()
            });
            if (
                action !== DatePickerAndroid.dismissedAction &&
                action === DatePickerAndroid.dateSetAction
            ) {
                var date = new Date(year, month, day);
                this.setState({ date });
                this.data = this.getHistoryData();
                this.forceUpdate();
            }
        } catch ({ code, message }) {
            //console.log("Cannot open date picker: " + message);
        }
    }

    /**
     * For Android, this function will only add DatePicker icon button.
     * For iOS, it will include all logic of DatePicker along with icon
     * (By using DatePickerIOS component - already defined in React Native)
     */
    datePickerView() {
        if (Platform.OS == 'android') {
            return (
                <TouchableNativeFeedback onPress={() => this.pickDate()}>
                    <Icon name="md-calendar" size={30} color="white" />
                </TouchableNativeFeedback>
            );
        } else {
            <DatePickerIOS
                style={styles.datePickerIOSView}
                date={this.state.date}
                onDateChange={date => this.setState({ date })}
                mode="date"
            />;
        }
    }

    /**
     * To set view of header for this screen that displays selected date
     */
    formatHeader() {
        return (
            <View style={styles.header}>
                <Header icon={true} iconName="arrow-back" />
                <View style={styles.dateView}>
                    <Text style={[styles.largeText1, styles.whiteText]}>
                        {this.getDateStr(this.state.date)}
                    </Text>
                </View>
                <View style={styles.datePickerView}>
                    {this.datePickerView()}
                </View>
            </View>
        );
    }

    render() {
        return (
            <View style={styles.viewStyle}>
                {this.formatHeader()}
                {this.data.length > 0 ? (
                    <Timeline
                        data={this.data}
                        circleSize={20}
                        circleColor="rgb(45,156,219)"
                        lineColor="rgb(45,156,219)"
                        timeContainerStyle={{ minWidth: 52 }}
                        timeStyle={{
                            textAlign: 'center',
                            backgroundColor: '#ff9797',
                            color: 'white',
                            padding: 5,
                            borderRadius: 13
                        }}
                        descriptionStyle={{ color: 'gray' }}
                        renderDetail={this.renderDetail}
                        separator={false}
                        innerCircle={'dot'}
                        options={{ style: { padding: 10 } }}
                    />
                ) : (
                    <Text style={styles.warningText}>
                        No Activity found ...
                    </Text>
                )}
            </View>
        );
    }
}
/*StyleSheet*/
const styles = StyleSheet.create({
    viewStyle: {
        flex: 1,
        marginBottom: 45
    },
    container: {
        flex: 1,
        height: 100,
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
    },
    locationView: {
        flex: 1,
        flexDirection: 'row',
        height: 40,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        marginLeft: 10,
        paddingBottom: 10
    },
    activityView: {
        flex: 1,
        flexDirection: 'row',
        height: 40,
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginLeft: 10
    },
    hrView: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        marginRight: 15,
        paddingLeft: 5
    },
    largeText1: {
        fontSize: 20,
        color: 'black'
    },
    largeText2: {
        fontSize: 15,
        color: 'black'
    },
    mediumText: {
        fontSize: 13,
        paddingLeft: 10
    },
    smallText: {
        fontSize: 11,
        paddingRight: 10
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 50,
        backgroundColor: color.primary
    },
    whiteText: {
        color: 'white'
    },
    greenText: {
        color: 'green'
    },
    dateView: {
        alignItems: 'flex-start',
        paddingLeft: 55,
		marginLeft : 10,
        flex: 2
    },
    datePickerView: {
        alignItems: 'flex-end',
        paddingRight: 50,
        flex: 1
    },
    datePickerIOSView: {
        height: 30
    },
    warningText: {
        fontSize: 15,
        color: color.darkPrimary,
        marginTop: 5,
        marginLeft: 10
    }
});
