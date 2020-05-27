#!/bin/bash
sed -i '14d' ./node_modules/react-native-activity-recognition/android/src/main/java/com/xebia/activityrecognition/RNActivityRecognitionPackage.java

sed -i 's/com.google.android.gms:play-services:+/com.google.android.gms:play-services-gcm:15.0.1/' ./node_modules/react-native-activity-recognition/android/build.gradle
sed -i "40s/}/compile 'com.google.android.gms:play-services-location:15.0.1'}/" ./node_modules/react-native-activity-recognition/android/build.gradle
sed -i 's/DEFAULT_GOOGLE_PLAY_SERVICES_VERSION    = \"11.6.2\"/DEFAULT_GOOGLE_PLAY_SERVICES_VERSION    = \"15.0.1\"/' ./node_modules/react-native-google-places/android/build.gradle
sed -i 's/DEFAULT_GOOGLE_PLAY_SERVICES_VERSION    = \"10.2.4\"/DEFAULT_GOOGLE_PLAY_SERVICES_VERSION    = \"15.0.1\"/' ./node_modules/react-native-maps/lib/android/build.gradle

sed -i 's/...props,/...props/' ./node_modules/react-native-experimental-navigation/NavigationCard.js
sed -i 's/...props,/...props/' ./node_modules/react-native-scrollable-tab-view/SceneComponent.js

sed -i '53s/}/default: return "null"; }/' ./node_modules/realm/src/jsc/jsc_value.hpp

sed -i "s/tasks.register('forwardDebugPort', Exec) {/task forwardDebugPort(type: Exec) {/" ./node_modules/realm/android/build.gradle

sed -i '45s/}/implementation "androidx.appcompat:appcompat:1.0.2"/' ./node_modules/react-native-google-places/android/build.gradle
sed -i '$ a implementation "androidx.legacy:legacy-support-v4:1.0.0" }' ./node_modules/react-native-google-places/android/build.gradle
sed -i 's/compileOnly/implementation/' ./node_modules/react-native-maps/lib/android/build.gradle
