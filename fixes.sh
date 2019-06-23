#!/bin/bash
sed -i '14d' ./node_modules/react-native-activity-recognition/android/src/main/java/com/xebia/activityrecognition/RNActivityRecognitionPackage.java
sed -i '25d' ./node_modules/tipsi-twitter/android/src/main/java/com/gettipsi/reactnativetwittersdk/TwitterReactPackage.java

sed -i 's/com.google.android.gms:play-services:+/com.google.android.gms:play-services-gcm:15.0.1/' ./node_modules/react-native-activity-recognition/android/build.gradle
sed -i "40s/}/compile 'com.google.android.gms:play-services-location:15.0.1'}/" ./node_modules/react-native-activity-recognition/android/build.gradle
sed -i 's/DEFAULT_GOOGLE_PLAY_SERVICES_VERSION    = \"11.6.2\"/DEFAULT_GOOGLE_PLAY_SERVICES_VERSION    = \"15.0.1\"/' ./node_modules/react-native-google-places/android/build.gradle
sed -i 's/DEFAULT_GOOGLE_PLAY_SERVICES_VERSION    = \"10.2.4\"/DEFAULT_GOOGLE_PLAY_SERVICES_VERSION    = \"15.0.1\"/' ./node_modules/react-native-maps/lib/android/build.gradle

sed -i 's/...props,/...props/' ./node_modules/react-native-experimental-navigation/NavigationCard.js
sed -i 's/...props,/...props/' ./node_modules/react-native-scrollable-tab-view/SceneComponent.js

sed -i '53s/}/default: return "null"; }/' ./node_modules/realm/src/jsc/jsc_value.hpp

