# Errors while installing the application and fixes to those errors:

In case there is an error in installation of the react-native application, use the guide below to fix those errors.
Few of the errors are because of the keys, they will be provided by the mentors within few days and no such errors will be faced.

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

No resource found that matches the given name: attr 'android:keyboardNavigationCluster'.  :react-native-fbsdk:processReleaseResources FAILED

### Fix for the error
This error is related to facebook sdk, hence this is after installing node modules.

* Go to your node_modules/react-native-fbsdk/android/build.gradle. 
* open build.gradle file.
* Change compile('com.facebook.android:facebook-android-sdk:4++') to compile('com.facebook.android:facebook-android-sdk:4.22.1')

## Error 3

File google-services.json is missing. The Google Services Plugin cannot function without it.

## Fix for the error
As google-services.json file is put in .gitignore. 

Use [google developer console](https://developers.google.com/mobile/add) to get this file. Give the package name as com.carbonfootprint

## Error 4

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
## Error 5

API setup for facebook and google:@string/facebook_app_id and @string/google_maps_api_key

### Fix for the error
These keys will be provided by the mentors within few days.
