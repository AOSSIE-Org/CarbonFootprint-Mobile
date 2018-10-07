# Errors while installing the application and fixes to those errors:

In case there is an error in installation of the react-native application, use the guide below to fix those errors.

## Error 1

SDK Build Tools revision (23.0.1) is too low for project ':react-native-background-timer'. Minimum required is 25.0.0

### Fix for the error

Put the code below, inside android/build.gradle file.<br />
// android/build.gradle

```java
subprojects {
    afterEvaluate {project ->
        if (project.hasProperty("android")) {
            android {
                compileSdkVersion 26
                buildToolsVersion '26.0.1'
            }
        }
    }
}
```

## Error 2

No resource found that matches the given name: attr 'android:keyboardNavigationCluster'. :react-native-fbsdk:processReleaseResources FAILED

### Fix for the error

This error is related to facebook sdk, hence this is after installing node modules.

-   Go to your node_modules/react-native-fbsdk/android/build.gradle.
-   open build.gradle file.
-   Change compile('com.facebook.android:facebook-android-sdk:4++') to compile('com.facebook.android:facebook-android-sdk:4.22.1')

## Error 3

AAPT: No resource found that matches the given name: attr 'android:keyboardNavigationCluster'.

### Fix for the error

Go to android/app/build.gradle and change your complieSdkVersion and buildToolVersion.<br />
// android/app/build.gradle

```java
android {
    compileSdkVersion 26
    buildToolsVersion '26.0.1'
    .....


dependencies {
     compile 'com.android.support:appcompat-v7:26.0.1'
}
```

## Error 4

Application crashed as soon as you open after first time build

### Fix for the error

1.open node_modules/react-native-activity-recognition/android/build.gradle
and ensure google-play-services version is 12.0.1 if there is any other version
change to 12.0.1 and save the file

```
compile 'com.google.android.gms:play-services:12.0.1'
```

2.open node_modules/react-native-google-places/android/build.gradle
and ensure DEFAULT_GOOGLE_PLAY_SERVICES_VERSION = "12.0.1" if there is any other version change to 12.0.1 and save the file

```
def DEFAULT_GOOGLE_PLAY_SERVICES_VERSION    = "12.0.1"
```

3.open node_modules/react-native-google-sign-in/android/build.gradle
and ensure google-play-services-auth version is 12.0.1 if there is any other version
change to 12.0.1 and save the file

```
compile "com.google.android.gms:play-services-auth:12.0.1"
```

4.open node_modules/react-native-maps/lib/android/build.gradle
and ensure DEFAULT_GOOGLE_PLAY_SERVICES_VERSION = "12.0.1" if there is any other version change to 12.0.1 and save the file

```
def DEFAULT_GOOGLE_PLAY_SERVICES_VERSION    = "12.0.1"
```
