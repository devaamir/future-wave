package com.tipspsc.academy

import android.os.Build
import android.os.Bundle
import androidx.core.view.WindowCompat
import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate

class MainActivity : ReactActivity() {

  override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
    // Disable edge-to-edge on Android 12+ so status bar is visible
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) {
      WindowCompat.setDecorFitsSystemWindows(window, true)
    }
  }

  override fun getMainComponentName(): String = "TipsPSC"

  override fun createReactActivityDelegate(): ReactActivityDelegate =
      DefaultReactActivityDelegate(this, mainComponentName, fabricEnabled)
}
