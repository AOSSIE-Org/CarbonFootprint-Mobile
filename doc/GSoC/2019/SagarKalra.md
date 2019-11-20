## [CarbonFootprint-Mobile](https://gitlab.com/aossie/CarbonFootprint-Mobile)

### [Sagar Kalra](https://gitlab.com/sagar-kalra)

#### Working APK:- https://drive.google.com/open?id=1Qn5KZEL1KS7ZMIh-0deS3xSaANoPdL4D

#### Proposed Goal
My proposed goal for the project:- https://summerofcode.withgoogle.com/projects/#4620997553029120

Link to the proposal:- https://docs.google.com/document/d/1oqe_D_k7NJDkzkPZxZ3rqkoOtitiiKxFUVCd57KWwgA/edit?usp=sharing

#### Journey

Primary goal for the GSoC was initially to integrate new features and to synchronise IOS part with the Android part. But, as we started upgrading packages to their highest versions there were various bugs in the application, which need to be sorted with highest priority. After we resolved most of the bugs, new features were implemented and UI of the app was refashioned from the scratch.

#### Detailed Technological Explanation

*_Phase 1_* :- 
* Friends Section Bug was fixed.
* Worked on the issue for reducing overall app size and necessary tweaks in current Proguard rules to further reduce app size and pass the build successfully.
* Worked on fixing app crash error after RN upgrade.
* Integrated new feature of removing already added friend.

*_Phase 2_* :-
* Refactored fetching of profile details from social logins.
* Made email a primary key of the database and changed overall database schema.
* Switched to react-native-firebase from Firebase SDK, which was necessary for push notifications and stability of the app.
* Implemented Push Notifications.

*_Phase 3_* :-
* Implemented Leaderboard.
* Improved UI and fixed minor bugs in the app.
* Fixed bugs related to synchronisation between firebase data fetching and loader in the app.

#### MRs
* [MR 140 - Friends Section Bug](https://gitlab.com/aossie/CarbonFootprint-Mobile/merge_requests/140) *_MERGED_*
* [MR 142 - Reduced App Size](https://gitlab.com/aossie/CarbonFootprint-Mobile/merge_requests/142) *_MERGED_*
* [MR 145 - Fixed App Crashing](https://gitlab.com/aossie/CarbonFootprint-Mobile/merge_requests/145) *_MERGED_*
* [MR 147 - Removed Friend Option](https://gitlab.com/aossie/CarbonFootprint-Mobile/merge_requests/147) *_MERGED_*
* [MR 148 - Refactored fetching of profile details](https://gitlab.com/aossie/CarbonFootprint-Mobile/merge_requests/148) *_MERGED_*
* [MR 149 - react-native-firebase](https://gitlab.com/aossie/CarbonFootprint-Mobile/merge_requests/149) *_MERGED_*
* [MR 150 - Made email as primary key](https://gitlab.com/aossie/CarbonFootprint-Mobile/merge_requests/150) *_MERGED_*
* [MR 152 - Implemented Push Notifications](https://gitlab.com/aossie/CarbonFootprint-Mobile/merge_requests/152) *_PENDING_*
* [MR 155 - Implemented Leaderboard](https://gitlab.com/aossie/CarbonFootprint-Mobile/merge_requests/155) *_PENDING_*
* [MR 162 - Improved UI and solved minor bugs](https://gitlab.com/aossie/CarbonFootprint-Mobile/merge_requests/162) *_MERGED_*
* [MR 165 - Fixed installation errors](https://gitlab.com/aossie/CarbonFootprint-Mobile/merge_requests/165) *_PENDING_*
* [MR 168 - Fixed loader issues](https://gitlab.com/aossie/CarbonFootprint-Mobile/merge_requests/168)