package com.carbonfootprint;

import android.app.Application;

import com.facebook.CallbackManager;
import com.google.firebase.database.FirebaseDatabase;
import com.facebook.FacebookSdk;
import com.facebook.reactnative.androidsdk.FBSDKPackage;
import android.content.Context;
import android.support.multidex.MultiDex;
import com.facebook.react.ReactApplication;
import io.invertase.firebase.RNFirebasePackage;
import io.invertase.firebase.auth.RNFirebaseAuthPackage;
import io.invertase.firebase.instanceid.RNFirebaseInstanceIdPackage;
import io.invertase.firebase.database.RNFirebaseDatabasePackage;
import com.facebook.react.modules.email.EmailPackage;
import com.RNFetchBlob.RNFetchBlobPackage;
import me.listenzz.modal.TranslucentModalReactPackage;
import co.apptailor.googlesignin.RNGoogleSigninPackage;
import com.imagepicker.ImagePickerPackage;
import com.showlocationservicesdialogbox.LocationServicesDialogBoxPackage;
import com.ocetnik.timer.BackgroundTimerPackage;
import com.beefe.picker.PickerViewPackage;
import io.realm.react.RealmReactPackage;
import com.arttitude360.reactnative.rngoogleplaces.RNGooglePlacesPackage;
import com.airbnb.android.react.maps.MapsPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import org.devio.rn.splashscreen.SplashScreenReactPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.xebia.activityrecognition.RNActivityRecognitionPackage;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private static CallbackManager mCallbackManager = CallbackManager.Factory.create();

  protected static CallbackManager getCallbackManager() {
    return mCallbackManager;
  }

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
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
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new RNFirebasePackage(),
            new RNFirebaseAuthPackage(),
            new EmailPackage(),
            new RNFetchBlobPackage(),
            new TranslucentModalReactPackage(),
            new RNFirebaseInstanceIdPackage(),
            new RNFirebaseDatabasePackage(),
          new RNGoogleSigninPackage(),
          new ImagePickerPackage(),
          new LocationServicesDialogBoxPackage(),
          new BackgroundTimerPackage(),
          new PickerViewPackage(),
          new RealmReactPackage(),
          new RNGooglePlacesPackage(),
          new MapsPackage(),
          new RNActivityRecognitionPackage(),
          new VectorIconsPackage(),
          new SplashScreenReactPackage(),
          new FBSDKPackage(mCallbackManager)
      );
    }
  };
 @Override
    protected void attachBaseContext(Context base) {
       super.attachBaseContext(base);
       MultiDex.install(this);
    }
  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    FirebaseDatabase.getInstance().setPersistenceEnabled(true);
    SoLoader.init(this, /* native exopackage */ false);
    FacebookSdk.sdkInitialize(getApplicationContext());
  }
}
