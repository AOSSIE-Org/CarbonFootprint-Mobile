## IOS setup (only for mac users)

1. Make sure you have Xcode 11 or higher. It is available for download from Apple app store. Also, install command line tools after installing Xcode by running:

```
xcode-select --install
```

2. Install pods using cocoa-pods

```
cd ios && pod install
```

3. Download **GoogleService-Info.plist** from google developer console. Download and paste it in ios folder. Now open **CarbonFootprint.xcworkspace** and link **GoogleService-Info.plist** in the ios project.

4. Rename Info.sample.plist.

```
cd ios && mv Info.plist.sample Info.plist
```

Here, replace _{YOUR_FB_APP_ID}_ with app id recieved from facebook. Also replace _{YOUR_REVERSED_GOOGLE_ID}_ with the reversed client id present in **GoogleService-Info.plist**.

### Editing Native Project

For editing native project, use only `CarbonFootprint.xcworkspace` not `CarbonFootprint.xcodeproj`

### Running the App

```
cd <project-dir>
react-native run-ios
```

You can also run it directly from within Xcode or Nuclide.