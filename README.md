# Carbon Footprint Mobile Application

This project is for Carbon Footprint Mobile Application

## Install Dependencies

This project is built using React Native. You will need the following dependencies.

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

#### Facebook SDK
Download Facebook SDK from https://developers.facebook.com/docs/ios/.
Extract it specifically in `~/Documents/FacebookSDK`.

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

#### Use AVD or a real device
Create your AVD using "AVD Manager" in Android Studio. Choose "Android 6.0 - API Level 23" under Device, and "Intel Atom (x86_64)" under CPU/ABI.

If using a physical Android device, plug in using USB cable and enable USB debugging.

#### Running the App
```
cd <project-dir>
react-native run-android
```
You can also run it directly from within Android Studio or Nuclide
