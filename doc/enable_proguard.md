## Enabling ProGuard and Creating seperate APKs for both x86 and ARMv7a CPU architectures

**1.** ProGuard is an open source command-line tool that shrinks, optimizes and obfuscates Java code. It is able to optimize bytecode as well as detect and remove unused instructions.

**2.** Steps for implementing this process is briefly described [here](https://facebook.github.io/react-native/docs/signed-apk-android#publishing-to-other-stores).

**3.** Additionally, for enabling ProGuard in DEBUG mode, put the code below in android/app/build.gradle.

```
buildTypes {
  ...
  debug {
    minifyEnabled enableProguardInReleaseBuilds
    proguardFiles getDefaultProguardFile("proguard-android.txt"), "proguard-rules.pro"
  }
}

```