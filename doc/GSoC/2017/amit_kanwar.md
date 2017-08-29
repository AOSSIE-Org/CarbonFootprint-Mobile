# Carbon Footprint Mobile App
A mobile app for both Android and iOS to calculate Carbon Footprint between 2 locations, real-time
Activity Recognition and calculating Carbon Footprint, Social Gamification for sharing Carbon Footprint with your friends and storing the all-time stats of users.

[1]: https://github.com/Aminoid/react-native-activity-recognition
[2]: https://gitlab.com/aossie/CarbonFootprint-Mobile
[3]: https://gitlab.com/aossie/CarbonFootprint-Mobile/merge_requests/1
[4]: https://gitlab.com/aossie/CarbonFootprint-Mobile/merge_requests/2
[5]: https://gitlab.com/aossie/CarbonFootprint-Mobile/merge_requests/4
[6]: https://gitlab.com/aossie/CarbonFootprint-Mobile/merge_requests/5
[7]: https://gitlab.com/aossie/CarbonFootprint-Mobile/merge_requests/7
[8]: https://gitlab.com/aossie/CarbonFootprint-Mobile/merge_requests/10
[9]: https://gitlab.com/aossie/CarbonFootprint-Mobile/merge_requests/12
[10]: https://gitlab.com/aossie/CarbonFootprint-Mobile/merge_requests/13

## Links
The project is hosted at this [Gitlab Repo][2] while the app can be found [here][11].

## Merge Requests
* [Project init using React Native CLI][3]: This MR introduces the basic app init, setting up react-native cli, README.md, package.json and base directory structure for the app.
* [Introduction of (React + Redux) structure + Week 2 Coding][4]: This MR creates the Project structure in a way that max code reusage is possible. It also sets up Redux store with corresponding actions and reducers to handle component updates in React.
* [Splash Screen][5]: This MR introduces the splash screen for both iOS and Android. It uses the package `react-native-splash-screen`.
* [Login Screens + Social Logins (for iOS)][6]: This MR does a number of things. It introduces `react-native-router-flux` to create routing for the app. It also introduces Landing Page, Login Page, Register Page and implements Google, Facebook and Twitter Logins for iOS. A Master Page is added to handle conditional routing based on previous user login.
* [Search Places + Distance + Directions between them (Calculate Screen init)][7]: This MR makes the Calculate Screen. It has a Google Map (`react-native-google-maps`) in the background. It provides searchable fields for Source (default is User's current location) and Destination made using `react-native-google-places`. Whenever user enters both the source and destination, Google Directions API is called which provides us with the polyline that is displayed on the map along with a card showing time, distance and carbon footprint for various travel options like Car, Transit, Walking and Cycling. It also introduces Footer, the main navigation component of the app to move between various Screens.
* [Adding More Screen][8]: This MR introduces the More Screen. The more screen has number of options - User Settings, About Us, T&C and Logout. This MR implements Logout Option (resets the local redux store) and also introduces About Us and T&C screens.
* [Firebase Server + Social Gamification Init][9]: This MR is the server setup for the app. We are using Firebase for this. It has Server APIs to authenticate, add, get and logout user, and sendFriendRequest, addFriends and inviteUsers. It also introduces stats screen for users to show their Total Carbon Footprint and also its split up. This also introduces Friends Section which displays just all your friends with their Footprint values.
* [Settings Page + Map Fix for Android + Friends API Refactor + Footprint Firebase API][10]: This MR introduces a Settings Page which helps in storing the User preferences of vehicle, fuel type and Approximate Mileage to give a good estimate of the real-time carbon footprint calculation. It stores these values in AsyncStorage so it can be used in multiple reloads. It also fixes a couple of bugs. There was an unnecessary permission in the code which waas preventing the Maps from loading in Android < 6.0. This MR takes care of it. This MR also fixes some issues with Friends API and introduces Footprint API to add/update carbon footprint of users to share with their friends.

## Goals
### Achieved
1. Login via Email, Google, Facebook and Twitter.
2. Calculate Carbon Footprint between 2 locations.
3. Real Time Activity Recognition and calculating Carbon Footprint on basis of that.
4. Social Gamification, sharing Carbon Footprint with your friends and inviting new people from the app.
5. All-time Stats of Users.
6. Provision to select vehicles, mileage, and fuel type.

### Pending
* Unit Testing via Jest and Integration Testing (cavy)

## Contributions
### App Screens
* Screens for Login/Register via Email.
* Login via Facebook/Google/Twitter for iOS
* App Structure + Redux Setup
* Splash Screen
* Routing of the app
* Calculate screen for users to enter in source and destination and get Carbon Footprint data with options like Car, Transit, Cycling and Walking
* Friends Screen for Users to see their friends
* Stats Screen
* More Section for Settings, About Us, T&C and Logout
* Settings Screen to add User Preferences for Preferred Vehicle, its fuel type and its approximate mileage which is useful when we do Real-Time Activity Recognition
* About Us and T&C screens

### Contributions to Other Open Source Projects`
* [react-native-activity-recognition][1]: To provide support for Real Time Activity Recognition to calculate Carbon Footprint which can then be shared with friends, we needed Android Activity Manager and CMMotionManager (iOS). We came across a package called `react-native-activity-recognition` which provides support for Activity Recognition in React Native but only for Android. So I added support for iOS to the same package and now we can use those same APIs to support Real-Time Carbon Footprint calculation on both Android and iOS.

### Server APIs
* Firebase APIs to Login/Register, Create Profile, Add Friends, Update User Stats.
