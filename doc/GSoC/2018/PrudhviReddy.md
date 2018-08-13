# Carbon Footprint Mobile Application

CarbonFootprint-Mobile is a Hybrid mobile application which is developed using React-Native framework. Main function of this application is to calculate amount of emitted co2 based on user's activity and traveled distance.

### Link to project’s repository

https://gitlab.com/aossie/CarbonFootprint-Mobile

### Link to mobile app

https://drive.google.com/open?id=11G5g7PMDi0VBx0ckBkzD8iVsO9Xffc6n

## Goals Achieved

**1. Documentation comments** - adding documentation comments to all classes and functions in the project and arranged code with good indentations

**2. Updated project** - updating project to latest react native and react version , updating all dependencies to latest version . adding file changes and dependencies changes and fixed some bugs

**3. Added intro screen** - Added app tour to first time users so that users will know all app features

**4. Added search Friends by username** - Added searching friends through username so that user can add his friends even when he dont know thier email ids and showing all the users with that name in a listview

**5. Added Multidex in android** - as it is heavy project the project is not compiling for kitkat android so added multidex inside project to make that work

**6. making placeholders in map editable and adjusted zoom levels** : for source and destination to be at exact position that user wants i added draggable markers and zoom levels for good UX and synchronized with previous maps working

**7. State segregation** - state segregation in each class so that data flows in only required classes thus improve performance

## Bug Fixes :

**1. Fixed Orientation** - fixing the rotation to portrait for ios and android due to no rerender after rotating device in react native . this needs to be updated

**2. Fixed routing Issue** - fixed routing issue in the app thanks to developer david pinda for custom code in react native router flux

**3. Fixed Registration issue** - fixed registration system which changed after recent firebase updates

**4. Fixed Login Issue** - fixed login errors showing up for multiple social accounts logging in

**5. Fixed Logout Issue** - sometimes after pressing logout it again login user on refresh comes back to logout . this is due to clearing the store is taking time fixed it with a line of code

**6. Fixed calculate screen ui** - for normal screens and small screens the present implementation is working fine but for larger devices there is a ui glitch fixed it with line of code

## Merge Requests :

-   MR !32 - [adding documentation comments to all functions and classes and arranged code with good indentation](https://gitlab.com/aossie/CarbonFootprint-Mobile/merge_requests/32) (MERGED)

-   MR !33 - [updated Readme.md](https://gitlab.com/aossie/CarbonFootprint-Mobile/merge_requests/33) (MERGED)

-   MR !34 - [updated project to latest version](https://gitlab.com/aossie/CarbonFootprint-Mobile/merge_requests/34) (MERGED)

-   MR !37 - [Added intro screen](https://gitlab.com/aossie/CarbonFootprint-Mobile/merge_requests/37) (MERGED)

-   MR !40 - [State segregation](https://gitlab.com/aossie/CarbonFootprint-Mobile/merge_requests/40) (MERGED)

-   MR !43 - [Fixed routing Issue](https://gitlab.com/aossie/CarbonFootprint-Mobile/merge_requests/43) (MERGED)

-   MR !44 - [ added search friends by username](https://gitlab.com/aossie/CarbonFootprint-Mobile/merge_requests/44) (MERGED)

-   MR !46 - [ Fixed Registration Error](https://gitlab.com/aossie/CarbonFootprint-Mobile/merge_requests/46) (MERGED)

-   MR !50 - [ Making placeholders in map editable and adjusted zoom levels](https://gitlab.com/aossie/CarbonFootprint-Mobile/merge_requests/50) (NOT MERGED YET)

-   MR !52 - [ Fixed Registration System](https://gitlab.com/aossie/CarbonFootprint-Mobile/merge_requests/52) (MERGED)

-   MR !53 - [ Fixed Calculate Screen UI ](https://gitlab.com/aossie/CarbonFootprint-Mobile/merge_requests/53) (MERGED)

-   MR !55 - [ Login issues resolved ](https://gitlab.com/aossie/CarbonFootprint-Mobile/merge_requests/55) (MERGED)

-   MR !56 - [ Added Multidex ](https://gitlab.com/aossie/CarbonFootprint-Mobile/merge_requests/56) (MERGED)

-   MR !58 - [ Fixed Logout ](https://gitlab.com/aossie/CarbonFootprint-Mobile/merge_requests/58) (MERGED)

## Future Scope

1.  Gamification improvement
2.  suggesting user friends after signing in with social accounts
3.  Showing suggestion to user with notification based on how much co2 released
