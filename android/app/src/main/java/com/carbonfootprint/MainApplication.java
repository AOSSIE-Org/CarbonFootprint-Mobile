package com.carbonfootprint;

import android.app.Application;
import com.facebook.react.PackageList;

import com.google.firebase.database.FirebaseDatabase;
import com.facebook.reactnative.androidsdk.FBSDKPackage;
import android.content.Context;
import androidx.multidex.MultiDexApplication;
import com.facebook.react.ReactApplication;
import com.oblador.vectoricons.VectorIconsPackage;
import io.invertase.firebase.auth.RNFirebaseAuthPackage;
import io.invertase.firebase.instanceid.RNFirebaseInstanceIdPackage;
import io.invertase.firebase.database.RNFirebaseDatabasePackage;
import com.reactnativecommunity.viewpager.RNCViewPagerPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.soloader.SoLoader;

import java.lang.reflect.InvocationTargetException;
import java.util.List;

public class MainApplication extends MultiDexApplication implements ReactApplication {

  private final ReactNativeHost mReactNativeHost =
      new ReactNativeHost(this) {
        @Override
        public boolean getUseDeveloperSupport() {
          return BuildConfig.DEBUG;
        }

    @Override
  protected String getJSMainModuleName() {
        return "index";
 }
    @Override
    protected List<ReactPackage> getPackages() {
      @SuppressWarnings("UnnecessaryLocalVariable")
      List<ReactPackage> packages = new PackageList(this).getPackages();
      packages.add(new RNFirebaseAuthPackage());
      packages.add(new RNFirebaseInstanceIdPackage());
      packages.add(new RNCViewPagerPackage());
      packages.add(new RNFirebaseDatabasePackage());
      return packages;
    }
  };
  
  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    FirebaseDatabase.getInstance().setPersistenceEnabled(true);
    SoLoader.init(this, /* native exopackage */ false);
    //initializeFlipper(this); // Remove this line if you don't want Flipper enabled
  }
  /**
   * Loads Flipper in React Native templates.
   *
   * @param context
   */
  private static void initializeFlipper(Context context) {
    if (BuildConfig.DEBUG) {
      try {
        /*
         We use reflection here to pick up the class that initializes Flipper,
        since Flipper library is not available in release mode
        */
        Class<?> aClass = Class.forName("com.facebook.flipper.ReactNativeFlipper");
        aClass.getMethod("initializeFlipper", Context.class).invoke(null, context);
      } catch (ClassNotFoundException e) {
        e.printStackTrace();
      } catch (NoSuchMethodException e) {
        e.printStackTrace();
      } catch (IllegalAccessException e) {
        e.printStackTrace();
      } catch (InvocationTargetException e) {
        e.printStackTrace();
      }
    }
  }
}
