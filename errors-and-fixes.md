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

## Error 5

Could not find play-services-ads.aar (com.google.android.gms:play-services-ads:12.0.1).

### Fix for the error

1.open android/app/build.gradle and add this:

```
def _ext = rootProject.ext
def _googlePlayServicesVersion = _ext.has('googlePlayServicesVersion') ? _ext.googlePlayServicesVersion : '+'
```

2.open android/build.gradle 

```
buildscript { 
 repositories { 
    maven { url "https://maven.google.com" }
    jcenter()
    ...
 ...
 allprojects { 
   repositories { 
     mavenLocal() 
     maven { url "https://maven.google.com" } 
     jcenter()
     ...
 ...
```

## Error 6

Incase you get an error in mac for command 'adb' not found

### Fix for the error

Type the following in terminal and hit enter

```
export PATH=~/Library/Android/sdk/platform-tools:$PATH
```

## Error 7

A problem occurred evaluating project ':react-native-maps'.
> Could not find method compileOnly() for arguments

### Fix for the error

Type the following command
```
cd ./node_modules/react-native-maps/lib/android/
```

Now, open the `build.gradle` file
Scroll down to find 'compileOnly()' written

Now replace `compileOnly()` with `provided` make sure you don't write the parenthesis '()' after provided
and below that you'll find `implementation` written in 2-3 places
replace that word with `compile` and save the file.

## Error 8

Execution failed for task ':react-native-activity-recognition:compileReleaseJavaWithJavac'

### Fix for the error

Type the following

```
cd ./node_modules/react-native-activity-recognition/android/src/main/java/com/xebia/activityrecognition/
```

Open `RNActivityRecognitionPackage.java` file and remove the `@Override` which is above the 
`createJSModules` function

- This same fix can be applied in case some other packages fail. Just need to remove the 
@Override which sits on top of the `createJSModule` function


## Error 9

Build error while compiling react-native-image-picker , react-native-vector-icons and realm

### Fix for the error 

1.Open android/build.gradle 

```
 repositories {
        google()  // ADD THIS
        maven { url "https://maven.google.com" }
        jcenter()
    }
```

2.Open node_modules/react-native-image-picker/android/build.gradle

```
buildscript {
    repositories {
        jcenter()
        google()   // ADD THIS
    }

    dependencies {
        classpath 'com.android.tools.build:gradle:3.1.0' //  UPDATE THIS
    }
}
```

3.Open node_modules/react-native-vector-icons/android/build.gradle

```
buildscript {
  repositories {
    google()  // ADD THIS
    jcenter()
  }

  dependencies {
    classpath 'com.android.tools.build:gradle:3.1.0'  // UPDATE THIS
  }
}
```

4.Open node_modules/realm/android/build.gradle

```
buildscript {
    repositories {
        jcenter()
        google()  // ADD THIS
    }
    dependencies {
        classpath 'com.android.tools.build:gradle:3.1.0'  // UPDATE THIS
    }
}
```




## Error 10

Possible Error messages:

 1. ```Couldn't follow symbolic link``` 

 2. ```unable to resolve class javax.xml.bind.DatatypeConverter.```

 3. Any reference to node_modules/.bin folder

 Fix:

 delete ```node_modules/.bin``` folder. 

