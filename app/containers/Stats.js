import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  Image,
  StatusBar,
  Dimensions,
  ActivityIndicator,
  Share
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Actions } from 'react-native-router-flux';
// For 'RUNNING' activity - MaterialCommunityIcons, Others - Ionicons
import Icon from 'react-native-vector-icons/Ionicons';
import RunningIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import ShareIcon from 'react-native-vector-icons/Feather';
import PropTypes from 'prop-types';
import * as ProfileAction from '../actions/ProfileAction';
import { getIcon, color } from '../config/helper';

/**
 * Stats Section Container
 * @extends Component
 */
class Stats extends Component {
  componentWillMount() {
    this.props.getProfile();
  }

  ShareMessage(msg) {
    Share.share({
      message: msg
    })
      .then(res => console.log(res))
      .catch(err => console.log(err));
  }
  render() {
    const auth = this.props.auth;
    const user = auth.user;
    const rows = [
      [
        {
          activityType: 'walking',
          icon: 'walk',
          value: user && user.data && user.data.walking ? user.data.walking : {}
        },
        {
          activityType: 'running',
          icon: 'run',
          value: user && user.data && user.data.running ? user.data.running : {}
        }
      ],
      [
        {
          activityType: 'cycling',
          icon: 'bicycle',
          value: user && user.data && user.data.cycling ? user.data.cycling : {}
        },
        {
          activityType: 'vehicle',
          icon:
            this.props.storage.data.automobile === 'Car'
              ? 'car'
              : this.props.storage.data.automobile === 'Bus'
                ? 'bus'
                : 'train',
          value: user && user.data && user.data.driving ? user.data.driving : {}
        }
      ]
    ];
    return (
      <View style={styles.container}>
        <StatusBar
          backgroundColor={color.darkPrimary}
          barStyle="light-content"
        />
        {auth.isFetching ? (
          <View style={styles.activity}>
            <ActivityIndicator size="large" color={color.primary} />
          </View>
        ) : (
          <ScrollView contentContainerStyle={styles.main}>
            <View style={styles.header}>
              <View style={styles.shareStyle}>
                <ShareIcon
                  name="share-2"
                  size={25}
                  color="white"
                  onPress={() =>
                    this.ShareMessage(
                      `I saved ${
                        user && user.data
                          ? user.data.total.co2Saved.toFixed(2)
                          : 0.0
                      } kg Co2. Analyse yours too, download the CarbonFootprint-Mobile app now play.google.com`
                    )
                  }
                />
              </View>
              <Icon
                name={getIcon('analytics')}
                size={56}
                color={color.white}
                style={styles.iconHeader}
              />
              <Text style={[styles.largeInfo, styles.whiteText]}>
                Co2 saved:{' '}
                {user && user.data ? user.data.total.co2Saved.toFixed(2) : 0.0}{' '}
                kg
              </Text>
              <Text style={[styles.largeInfo, styles.whiteText]}>
                Co2 Emitted:{' '}
                {user && user.data
                  ? user.data.total.footprint.toFixed(2) + ' kg'
                  : '0 kg'}
              </Text>
              <Text style={[styles.smallText, styles.whiteText]}>
                Distance:{' '}
                {user && user.data
                  ? user.data.total.distance.toFixed(2) + ' km'
                  : '0 km'}
              </Text>
              <Text style={[styles.smallText, styles.whiteText]}>
                Time: {user && user.data ? user.data.total.time + ' s' : '0 s'}
              </Text>
            </View>
            <ScrollView contentContainerStyle={styles.content}>
              {rows.map((row, index) => {
                let rowStyle = [styles.row];
                if (rows.length - 1 === index) {
                  rowStyle.push(styles.rowBottom);
                }
                return (
                  <View style={rowStyle} key={index}>
                    {row.map((column, i) => {
                      let columnStyle = [styles.column];
                      if (i === 1) {
                        columnStyle.push(styles.columnBorder);
                      }
                      return (
                        <View style={columnStyle} key={i}>
                          {column.icon === 'run' ? (
                            <RunningIcon
                              name={column.icon}
                              size={32}
                              color={color.darkPrimary}
                            />
                          ) : (
                            <Icon
                              name={getIcon(column.icon)}
                              size={32}
                              color={color.darkPrimary}
                            />
                          )}
                          <View style={styles.columnInfo}>
                            <Text
                              style={
                                column.icon == 'car'
                                  ? styles.emittedCo2
                                  : styles.largeInfo
                              }
                            >
                              {column.value.footprint
                                ? column.value.footprint.toFixed(2) + ' kg'
                                : '0 kg'}
                            </Text>
                            <Text style={styles.smallText}>
                              {column.value.distance
                                ? column.value.distance.toFixed(2) + ' km'
                                : '0 km'}
                            </Text>
                            <Text style={styles.smallText}>
                              {column.value.time
                                ? column.value.time + ' s'
                                : '0 s'}
                            </Text>
                          </View>
                        </View>
                      );
                    })}
                  </View>
                );
              })}
            </ScrollView>
          </ScrollView>
        )}
      </View>
    );
  }
}

/*StyleSheet*/
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.greyBack
  },
  main: {
    flex: 1
  },
  header: {
    flex: 0.4,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: color.primary,
    paddingTop: 20
  },
  iconHeader: {
    marginBottom: 5
  },
  content: {
    flex: 1
  },
  largeText: {
    fontSize: 13,
    letterSpacing: 1,
    color: color.black,
    marginTop: 8,
    marginBottom: 4
  },
  smallText: {
    fontSize: 11,
    letterSpacing: 1,
    color: color.black,
    marginTop: 4,
    textAlign: 'center'
  },
  row: {
    borderColor: '#ddd',
    borderTopWidth: 1,
    flexDirection: 'row',
    height: Dimensions.get('window').height * 0.3
  },
  column: {
    flexDirection: 'column',
    alignItems: 'center',
    flex: 0.5,
    justifyContent: 'center',
    borderColor: '#ddd'
  },
  rowBottom: {
    borderBottomWidth: 1
  },
  columnBorder: {
    borderLeftWidth: 1
  },
  largeInfo: {
    fontSize: 18,
    letterSpacing: 1,
    color: '#31db0f'
  },
  emittedCo2: {
    fontSize: 18,
    letterSpacing: 1,
    color: '#e01702'
  },
  columnInfo: {
    marginTop: 10
  },
  activity: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  whiteText: {
    color: color.white
  },
  largeHeaderText: {
    fontSize: 16,
    zIndex: 3,
    fontWeight: '600'
  },
  smallHeaderText: {
    fontSize: 13,
    zIndex: 3,
    fontWeight: '700',
    color: color.grey
  },
  shareStyle: {
    alignSelf: 'flex-end',
    marginTop: -35,
    marginRight: 10
  }
});

/**
 * Mapping state to props so that state variables can be used through props in children components
 * @param state current state
 * @return state as props
 */
function mapStateToProps(state) {
  return {
    auth: state.auth,
    storage: state.storage
  };
}
/**
 * Mapping dispatchable actions to props so that actions can be used through props in children components
 * @param  dispatch Dispatches an action. This is the only way to trigger a state change.
 * @return Turns an object whose values are action creators, into an object with the same keys,
 */
function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign({}, ProfileAction), dispatch);
}

Stats.propTypes = {
  storage: PropTypes.object,
  getProfile: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Stats);
