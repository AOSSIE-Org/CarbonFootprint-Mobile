# Carbon Footprint Mobile Application

This project is for Carbon Footprint Mobile Application

----

#### Screenshots

<table>
    <tr>
     <td><kbd><img src="./doc/Screenshots/tour1.png"></kbd></td>
     <td><kbd><img src="./doc/Screenshots/tour3.png"></kbd></td>
     <td><kbd><img src="./doc/Screenshots/login.png"></kbd></td>
     <td><kbd><img src="./doc/Screenshots/maps.png"></kbd></td>
     <tr> 
      <td><kbd><img src="./doc/Screenshots/activity.png"></kbd></td>
      <td><kbd><img src="./doc/Screenshots/friends.png"></kbd></td>
      <td><kbd><img src="./doc/Screenshots/stats.png"></kbd></td>
      <td><kbd><img src="./doc/Screenshots/more.png"></kbd></td>
    </tr>
  </table>

----

## Install Dependencies

This project is built using React Native. You will need the following dependencies.
You can also follow the [Setup guide for android](#setup-guide-for-android)

### Node and Watchman

Install Node and Watchman using Homebrew.

```
brew install node
brew install watchman
```

### React Native CLI

Install React Native CLI globally.

```
npm install -g react-native-cli
```

### NPM Dependencies

Install package-dependencies using NPM

```
npm install
```

### iOS

#### Xcode

Make sure you have Xcode 8 or higher and the correct command line tool is specified

#### Pods Dependencies

Install pods using cocoa-pods

```
cd <project-dir>/ios
pod install
```

#### Rename Info.plist

```
cd <project-dir>/ios
mv Info.plist.sample Info.plist
```

#### Facebook SDK

Follow Step 2, 3, 4 on https://developers.facebook.com/docs/ios/getting-started/.

#### Google Sign In + Firebase

1.  Follow the Step **Add Firebase to your app** on https://firebase.google.com/docs/ios/setup.
2.  Open your `Info.plist` file and change {reverse-google-client-id} with the value from `GoogleService-Info.plist`.

#### Editing Native Project

For editing native project, use only `CarbonFootprint.xcworkspace` not `CarbonFootprint.xcodeproj`

#### Running the App

```
cd <project-dir>
react-native run-ios
```

You can also run it directly from within Xcode or Nuclide.

### Android Studio

#### Download and install Android Studio

Download Android Studio, then follow the installation instructions. Choose Custom installation when prompted by the Setup Wizard, and proceed to the next step.

#### Install AVD and HAXM

Make sure the boxes next to all of the following are checked:

* Android SDK
* Android SDK Platform
* Performance (Intel ® HAXM)
* Android Virtual Device

Click 'Next' to install all of these components

#### Install the Android 6.0 (Marshmallow) SDK

React Native requires Android 6.0 (Marshmallow) SDK by default. Make sure the following items are all checked

* Google APIs
* Android SDK Platform 23
* Intel x86 Atom_64 System Image
* Google APIs Intel x86 Atom_64 System Image

#### Set up the ANDROID_HOME environment variable

Add the following lines to your `~/.profile` (or equivalent) config file:

```
export ANDROID_HOME=${HOME}/Library/Android/sdk
export PATH=${PATH}:${ANDROID_HOME}/tools
export PATH=${PATH}:${ANDROID_HOME}/platform-tools
```

Type `source ~/.profile` to load the config into your current shell.

#### Geocoding API key

Follow these steps to generate the key and add it to keys.js in app/config/keys.js https://developers.google.com/maps/documentation/geocoding/get-api-key

#### Firebase API key

Follow these steps to get your firebase API key

1.  Browse https://console.firebase.google.com
2.  Generate an empty project
3.  Navigate different icons in DEVELOP to get authDomain, databaseUrl, projectID, storageBucket, messagingSenderID and add them to keys.js in app/config/keys.js
4.  Go to settings/general in the firebase console and download the google-services.json file and add it to PROJECT_NAME/android/app

#### Google Maps API key

1.  Browse https://developers.google.com/maps/documentation/javascript/get-api-key
2.  Choose GET A KEY option on the top right
3.  Select an existing project or create a new one
4.  Copy the API key to android/app/src/main/res/values/strings.xml

#### Use AVD or a real device

Create your AVD using "AVD Manager" in Android Studio. Choose "Android 6.0 - API Level 23" under Device, and "Intel Atom (x86_64)" under CPU/ABI.

If using a physical Android device, plug in using USB cable and enable USB debugging.

#### Update your Android SDK location

edit android/local.properties file

```
sdk.dir=<your android sdk location>
```

#### Running the App

```
cd <project-dir>
react-native run-android
```

You can also run it directly from within Android Studio or Nuclide


**NOTE -** Please add the SHA-1 certificate fingerprints of your debug keystore in project settings in Firebase. To generate SHA-1 certificate fingerprints, see https://developers.google.com/android/guides/client-auth .

**NOTE -** In case of errors faced while installation of the application refer to this [errors-and-fixes](errors-and-fixes.md) file, to resolve the errors.

#### For Tester
For new tester's flexibility  [link](https://drive.google.com/file/d/1_LATGTOs50WxCygy7vlELYlKalnrfNvr/view?usp=sharing) to latest apk. Download and Install the latest apk in your mobile phone to test the working of app.
Here is the link to the app's instance running on a remote device [link](https://appetize.io/app/njfc2f37r21zyey2hbjbb7vn70?device=nexus5&scale=75&orientation=portrait&osVersion=7.1) 

#### Setup guide for android

You can follow the video tutorial to setup the Carbonfootprint-Mobile app for android.

[See Android setup guide](https://www.youtube.com/watch?v=NpKVA5hL3pM)

[![Android setup guide video](https://img.youtube.com/vi/NpKVA5hL3pM/0.jpg)](https://www.youtube.com/watch?v=NpKVA5hL3pM)

Pre-requisites:
- Android Studio
- Android AVD or a real device 
