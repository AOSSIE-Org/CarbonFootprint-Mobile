/*
 * To invite friends (send friend requests)
 */

import React, { useEffect, useState, useContext } from 'react';
import { View, TextInput, StyleSheet, Dimensions, FlatList, ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import firebase from 'react-native-firebase';
import { color, newColors } from '../config/helper';
import Icon from 'react-native-vector-icons/FontAwesome';
import { sendFriendRequest } from '../actions/firebase/Friends';
import FriendRow from '../components/FriendRow';
import WarningTextAndIcon from '../components/WarningTextAndIcon';
import { STRING_EMPTY } from '../config/constants';
import { loaderToggle } from '../config/actionDispatcher';

const InviteTab = props => {
    const [search, setSearch] = useState('');
    const [users, setUsers] = useState([]);
    const [userFetched, setUserFetched] = useState(false);
    const auth = useSelector(state => state.auth);
    const loader = useSelector(state => state.loader);
    const dispatch = useDispatch();
    const context = useContext(InviteTab);

    useEffect(() => {
        const searchFriends = async () => {
            try {
                await filterUsersDebounced(search);
            } catch (err) {
                setUsers([]);
                setUserFetched(true);
            }
        };
        searchFriends();
        if (search === '') {
            setUsers([]);
        }
    }, [search]);

    const debounce = (func, wait, immediate) => {
        let timeout;

        return function() {
            let args = arguments;
            let later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            let callNow = immediate && !timeout;

            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            //Don't wait. Just call now.
            if (callNow) func.apply(context, args);
        };
    };

    const filterUsers = searchText => {
        return new Promise((res, rej) => {
            if (search != STRING_EMPTY) {
                searchText = searchText.toLowerCase();
                firebase
                    .database()
                    .ref('users/')
                    .once('value')
                    .then(snapshot => {
                        let users = [];
                        snapshot.forEach(val => {
                            // this will have all the users.
                            let data = val.val();
                            if (
                                data.name &&
                                data.email &&
                                (data.name.toLowerCase().includes(searchText) ||
                                    data.email.toLowerCase().includes(searchText))
                            )
                                users.push({
                                    name: data.name,
                                    picture: data.picture,
                                    email: data.email
                                });
                        });
                        setUsers(users);
                        setUserFetched(true);
                        res(users);
                    })
                    .catch(err => rej(err));
            } else {
                setUserFetched(false);
            }
        });
    };

    const handleInputChange = async text => {
        setSearch(text);
    };

    const handleClear = () => {
        setUserFetched(false);
        setSearch('');
    };

    let filterUsersDebounced = debounce(filterUsers, 500, false);

    return (
        <View style={styles.view}>
            <View style={styles.searchWrapper}>
                <View style={styles.searchContainer}>
                    <View style={styles.searchBox}>
                        <Icon name="search" size={16} style={styles.searchIcon} />
                        <TextInput
                            value={search}
                            onChangeText={handleInputChange}
                            placeholder="Search friends by Email or Username"
                            style={styles.inputBox}
                            autoCapitalize="none"
                        />
                        <Icon
                            name="times-circle"
                            size={16}
                            style={styles.clearIcon}
                            onPress={handleClear}
                        />
                    </View>
                </View>
            </View>
            {users.length > 0 ? (
                <ScrollView style={styles.container}>
                    <View style={styles.view}>
                        <FlatList
                            contentContainerStyle={styles.flatlist}
                            data={users}
                            renderItem={({ item }) => (
                                <FriendRow
                                    iconName={['plus-circle']}
                                    link={() => {
                                        dispatch(loaderToggle());
                                        sendFriendRequest(auth.user.email, item.email)
                                            .then(() => {
                                                dispatch(loaderToggle());
                                            })
                                            .catch(() => {
                                                dispatch(loaderToggle());
                                            });
                                    }}
                                    data={item}
                                    text={item.email}
                                />
                            )}
                        />
                    </View>
                </ScrollView>
            ) : userFetched ? (
                <View style={styles.warningWrapper}>
                    <WarningTextAndIcon iconName="sad" text="No User Found." />
                </View>
            ) : (
                <View style={styles.warningWrapper}>
                    <WarningTextAndIcon
                        iconName="leaf"
                        text="Find your friends and save the environment."
                    />
                </View>
            )}
        </View>
    );
};

/*StyleSheet*/
const styles = StyleSheet.create({
    container: {},
    view: {
        flex: 1
    },
    flatlist: {
        alignItems: 'center'
    },
    searchBtn: {
        height: 35,
        width: 75,
        justifyContent: 'center',
        alignSelf: 'center',
        alignItems: 'center',
        backgroundColor: color.primary,
        marginBottom: 10
    },
    warningWrapper: {
        position: 'relative',
        flex: 1,
        alignItems: 'center'
    },
    whiteText: {
        fontSize: 15,
        color: 'white'
    },
    searchWrapper: {
        backgroundColor: 'white',
        alignItems: 'center',
        paddingBottom: 10,
        paddingTop: 10,
        height: 70
    },
    searchBox: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 30,
        // width: '98%',
        borderColor: 'transparent',
        borderWidth: 1,
        backgroundColor: newColors.secondary
    },
    inputBox: {
        // backgroundColor: 'red',
        flex: 1,
        alignItems: 'center'
    },
    searchIcon: {
        marginHorizontal: 5
    },
    clearIcon: {
        marginHorizontal: 5
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 30,
        backgroundColor: 'rgba(0,0,0,0.12)',
        width: Dimensions.get('window').width * 0.9,
        marginBottom: 10
    }
});

export default InviteTab;
