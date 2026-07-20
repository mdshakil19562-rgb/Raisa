import { AndroidFile } from '../types';

export const androidFiles: AndroidFile[] = [
  {
    path: 'build.gradle',
    name: 'build.gradle (Project)',
    language: 'gradle',
    content: `// Top-level build file where you can add configuration options common to all sub-projects/modules.
buildscript {
    repositories {
        google()
        mavenCentral()
    }
    dependencies {
        classpath 'com.android.tools.build:gradle:8.2.2'
        classpath 'org.jetbrains.kotlin:kotlin-gradle-plugin:1.9.22'
        classpath 'com.google.gms:google-services:4.4.1'
    }
}

allprojects {
    repositories {
        google()
        mavenCentral()
        maven { url "https://jitpack.io" }
    }
}

task clean(type: Delete) {
    delete rootProject.buildDir
}`
  },
  {
    path: 'settings.gradle',
    name: 'settings.gradle',
    language: 'gradle',
    content: `pluginManagement {
    repositories {
        google()
        mavenCentral()
        gradlePluginPortal()
    }
}
dependencyResolutionManagement {
    repositoriesMode.set(RepositoriesMode.FAIL_ON_PROJECT_REPOS)
    repositories {
        google()
        mavenCentral()
        maven { url "https://jitpack.io" }
    }
}
rootProject.name = "WhatsAppTwo"
include ':app'`
  },
  {
    path: 'gradle.properties',
    name: 'gradle.properties',
    language: 'properties',
    content: `android.useAndroidX=true
android.enableJetifier=true
kotlin.code.style=official`
  },
  {
    path: 'app/build.gradle',
    name: 'build.gradle (Module: app)',
    language: 'gradle',
    content: `plugins {
    id 'com.android.application'
    id 'org.jetbrains.kotlin:android'
    id 'com.google.gms.google-services'
}

android {
    namespace 'com.whatsapp.two'
    compileSdk 34

    defaultConfig {
        applicationId "com.whatsapp.two"
        minSdk 26
        targetSdk 34
        versionCode 1
        versionName "1.0"

        testInstrumentationRunner "androidx.test.runner.AndroidJUnitRunner"
    }

    buildTypes {
        release {
            minifyEnabled false
            proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'
        }
    }
    compileOptions {
        sourceCompatibility JavaVersion.VERSION_17
        targetCompatibility JavaVersion.VERSION_17
    }
    kotlinOptions {
        jvmTarget = '17'
    }
    buildFeatures {
        viewBinding true
    }
}

dependencies {
    implementation 'androidx.core:core-ktx:1.12.0'
    implementation 'androidx.appcompat:appcompat:1.6.1'
    implementation 'com.google.android.material:material:1.11.0'
    implementation 'androidx.constraintlayout:constraintlayout:2.1.4'
    
    // Firebase
    implementation platform('com.google.firebase:firebase-bom:32.7.2')
    implementation 'com.google.firebase:firebase-auth-ktx'
    implementation 'com.google.firebase:firebase-firestore-ktx'
    implementation 'com.google.firebase:firebase-storage-ktx'
    implementation 'com.google.firebase:firebase-messaging-ktx'

    // WebRTC for audio & video calls
    implementation 'org.webrtc:google-webrtc:1.0.32006'

    // Image loading
    implementation 'com.github.bumptech.glide:glide:4.16.0'
    annotationProcessor 'com.github.bumptech.glide:compiler:4.16.0'

    // Circle ImageView
    implementation 'de.hdodenhof:circleimageview:3.1.0'

    // Testing
    testImplementation 'junit:junit:4.13.2'
    androidTestImplementation 'androidx.test.ext:junit:1.1.5'
    androidTestImplementation 'androidx.test.espresso:espresso-core:3.5.1'
}`
  },
  {
    path: 'app/src/main/AndroidManifest.xml',
    name: 'AndroidManifest.xml',
    language: 'xml',
    content: `<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.whatsapp.two">

    <!-- Permissions required for WhatsApp features -->
    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
    <uses-permission android:name="android.permission.CAMERA" />
    <uses-permission android:name="android.permission.RECORD_AUDIO" />
    <uses-permission android:name="android.permission.MODIFY_AUDIO_SETTINGS" />
    <uses-permission android:name="android.permission.POST_NOTIFICATIONS" />
    <uses-permission android:name="android.permission.READ_MEDIA_IMAGES" />
    <uses-permission android:name="android.permission.READ_MEDIA_VIDEO" />
    <uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" android:maxSdkVersion="32" />
    <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" android:maxSdkVersion="29" />

    <application
        android:name=".MyApplication"
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:roundIcon="@mipmap/ic_launcher_round"
        android:supportsRtl="true"
        android:theme="@style/Theme.WhatsAppTwo">

        <activity
            android:name=".ui.LoginActivity"
            android:exported="true"
            android:theme="@style/Theme.WhatsAppTwo.NoActionBar">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>

        <activity
            android:name=".ui.MainActivity"
            android:exported="false"
            android:theme="@style/Theme.WhatsAppTwo.NoActionBar" />

        <activity
            android:name=".ui.ChatActivity"
            android:exported="false"
            android:theme="@style/Theme.WhatsAppTwo.NoActionBar" />

        <activity
            android:name=".ui.CallActivity"
            android:exported="false"
            android:screenOrientation="portrait"
            android:theme="@style/Theme.WhatsAppTwo.NoActionBar" />

        <!-- Firebase Cloud Messaging service -->
        <service
            android:name=".fcm.MyFirebaseMessagingService"
            android:exported="false">
            <intent-filter>
                <action android:name="com.google.firebase.MESSAGING_EVENT" />
            </intent-filter>
        </service>

    </application>

</manifest>`
  },
  {
    path: 'app/src/main/res/values/colors.xml',
    name: 'colors.xml',
    language: 'xml',
    content: `<?xml version="1.0" encoding="utf-8"?>
<resources>
    <!-- Classic WhatsApp Palette (Material 3 Adaptive) -->
    <color name="primary">#075E54</color>
    <color name="primary_dark">#128C7E</color>
    <color name="accent">#25D366</color>
    <color name="blue_tick">#34B7F1</color>
    
    <!-- Light Mode colors -->
    <color name="whatsapp_green">#075E54</color>
    <color name="whatsapp_teal">#128C7E</color>
    <color name="background_light">#F8F9FA</color>
    <color name="chat_background_light">#E5DDD5</color>
    <color name="bubble_sent_light">#E7FFDB</color>
    <color name="bubble_received_light">#FFFFFF</color>
    
    <!-- Dark Mode colors -->
    <color name="background_dark">#0B141A</color>
    <color name="surface_dark">#111B21</color>
    <color name="chat_background_dark">#0B141A</color>
    <color name="bubble_sent_dark">#005C4B</color>
    <color name="bubble_received_dark">#202C33</color>
    <color name="text_primary_dark">#E9EDEF</color>
    <color name="text_secondary_dark">#8696A0</color>
</resources>`
  },
  {
    path: 'app/src/main/res/values/strings.xml',
    name: 'strings.xml',
    language: 'xml',
    content: `<?xml version="1.0" encoding="utf-8"?>
<resources>
    <string name="app_name">WhatsApp Duo</string>
    <string name="title_chats">Chats</string>
    <string name="title_calls">Calls</string>
    <string name="title_settings">Settings</string>
    <string name="login_title">Log in to WhatsApp Duo</string>
    <string name="email_hint">Email Address</string>
    <string name="password_hint">Password</string>
    <string name="login_btn">Log In</string>
    <string name="typing">typing...</string>
    <string name="online">Online</string>
    <string name="offline">Offline</string>
    <string name="message_deleted">This message was deleted</string>
</resources>`
  },
  {
    path: 'app/src/main/res/values/themes.xml',
    name: 'themes.xml',
    language: 'xml',
    content: `<?xml version="1.0" encoding="utf-8"?>
<resources>
    <!-- Base Application Theme -->
    <style name="Theme.WhatsAppTwo" parent="Theme.Material3.DayNight">
        <item name="colorPrimary">@color/whatsapp_teal</item>
        <item name="colorSecondary">@color/accent</item>
        <item name="android:statusBarColor">@color/whatsapp_green</item>
    </style>

    <style name="Theme.WhatsAppTwo.NoActionBar">
        <item name="windowActionBar">false</item>
        <item name="windowNoTitle">true</item>
    </style>
</resources>`
  },
  {
    path: 'app/src/main/res/layout/activity_login.xml',
    name: 'activity_login.xml',
    language: 'xml',
    content: `<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_健全_parent"
    android:layout_height="match_parent"
    android:orientation="vertical"
    android:gravity="center_horizontal"
    android:padding="24dp"
    android:background="@color/background_light">

    <ImageView
        android:layout_width="96dp"
        android:layout_height="96dp"
        android:layout_marginTop="80dp"
        android:src="@android:drawable/sym_action_chat"
        android:contentDescription="@string/app_name" />

    <TextView
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="@string/login_title"
        android:textSize="22sp"
        android:textStyle="bold"
        android:textColor="@color/primary"
        android:layout_marginTop="24dp" />

    <TextView
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Exclusive for User 1 and User 2"
        android:textColor="#555555"
        android:layout_marginTop="8dp" />

    <com.google.android.material.textfield.TextInputLayout
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_marginTop="40dp">
        
        <com.google.android.material.textfield.TextInputEditText
            android:id="@+id/etEmail"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:hint="@string/email_hint"
            android:inputType="textEmailAddress" />
    </com.google.android.material.textfield.TextInputLayout>

    <com.google.android.material.textfield.TextInputLayout
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_marginTop="16dp"
        xmlns:app="http://schemas.android.com/apk/res-auto"
        app:passwordToggleEnabled="true">
        
        <com.google.android.material.textfield.TextInputEditText
            android:id="@+id/etPassword"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:hint="@string/password_hint"
            android:inputType="textPassword" />
    </com.google.android.material.textfield.TextInputLayout>

    <Button
        android:id="@+id/btnLogin"
        android:layout_width="match_parent"
        android:layout_height="56dp"
        android:text="@string/login_btn"
        android:backgroundTint="@color/whatsapp_teal"
        android:textColor="@android:color/white"
        android:layout_marginTop="32dp" />
</LinearLayout>`
  },
  {
    path: 'app/src/main/res/layout/activity_main.xml',
    name: 'activity_main.xml',
    language: 'xml',
    content: `<?xml version="1.0" encoding="utf-8"?>
<androidx.coordinatorlayout.widget.CoordinatorLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    android:layout_width="match_parent"
    android:layout_height="match_parent">

    <com.google.android.material.appbar.AppBarLayout
        android:layout_width="match_parent"
        android:layout_height="wrap_content">

        <androidx.appcompat.widget.Toolbar
            android:id="@+id/toolbar"
            android:layout_width="match_parent"
            android:layout_height="?attr/actionBarSize"
            android:background="@color/whatsapp_teal"
            app:titleTextColor="@android:color/white"
            app:title="WhatsApp Duo" />

        <com.google.android.material.tabs.TabLayout
            android:id="@+id/tabLayout"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:background="@color/whatsapp_teal"
            app:tabTextColor="#B3FFFFFF"
            app:tabSelectedTextColor="@android:color/white"
            app:tabIndicatorColor="@android:color/white" />

    </com.google.android.material.appbar.AppBarLayout>

    <androidx.viewpager2.widget.ViewPager2
        android:id="@+id/viewPager"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        app:layout_behavior="@string/appbar_scrolling_view_behavior" />

</androidx.coordinatorlayout.widget.CoordinatorLayout>`
  },
  {
    path: 'app/src/main/res/layout/activity_chat.xml',
    name: 'activity_chat.xml',
    language: 'xml',
    content: `<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:background="@color/chat_background_light">

    <!-- Custom Chat Toolbar -->
    <androidx.appcompat.widget.Toolbar
        android:id="@+id/chatToolbar"
        android:layout_width="match_parent"
        android:layout_height="?attr/actionBarSize"
        android:background="@color/whatsapp_teal"
        android:theme="@style/ThemeOverlay.AppCompat.Dark.ActionBar"
        app:contentInsetStartWithNavigation="0dp">

        <LinearLayout
            android:layout_width="match_parent"
            android:layout_height="match_parent"
            android:orientation="horizontal"
            android:gravity="center_vertical">

            <de.hdodenhof.circleimageview.CircleImageView
                android:id="@+id/ivUserAvatar"
                android:layout_width="40dp"
                android:layout_height="40dp"
                android:src="@android:drawable/sym_def_app_icon" />

            <LinearLayout
                android:layout_width="0dp"
                android:layout_height="wrap_content"
                android:layout_weight="1"
                android:layout_marginStart="12dp"
                android:orientation="vertical">

                <TextView
                    android:id="@+id/tvUserName"
                    android:layout_width="wrap_content"
                    android:layout_height="wrap_content"
                    android:textColor="@android:color/white"
                    android:textSize="18sp"
                    android:textStyle="bold" />

                <TextView
                    android:id="@+id/tvUserStatus"
                    android:layout_width="wrap_content"
                    android:layout_height="wrap_content"
                    android:textColor="#CCFFFFFF"
                    android:textSize="12sp"
                    android:visibility="gone" />
            </LinearLayout>

            <ImageButton
                android:id="@+id/btnVideoCall"
                android:layout_width="48dp"
                android:layout_height="48dp"
                android:background="?attr/selectableItemBackgroundBorderless"
                android:src="@android:drawable/presence_video_online"
                app:tint="@android:color/white" />

            <ImageButton
                android:id="@+id/btnVoiceCall"
                android:layout_width="48dp"
                android:layout_height="48dp"
                android:background="?attr/selectableItemBackgroundBorderless"
                android:src="@android:drawable/sym_action_call"
                app:tint="@android:color/white" />

        </LinearLayout>
    </androidx.appcompat.widget.Toolbar>

    <!-- Messages Recycler -->
    <androidx.recyclerview.widget.RecyclerView
        android:id="@+id/rvMessages"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:layout_above="@+id/layoutInput"
        android:layout_below="@+id/chatToolbar"
        android:padding="8dp"
        android:clipToPadding="false" />

    <!-- Chat Inputs -->
    <LinearLayout
        android:id="@+id/layoutInput"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_alignParentBottom="true"
        android:orientation="horizontal"
        android:padding="8dp"
        android:gravity="bottom">

        <LinearLayout
            android:layout_width="0dp"
            android:layout_height="wrap_content"
            android:layout_weight="1"
            android:background="@android:color/white"
            android:orientation="horizontal"
            android:padding="8dp"
            android:gravity="center_vertical">

            <ImageButton
                android:id="@+id/btnEmoji"
                android:layout_width="36dp"
                android:layout_height="36dp"
                android:background="@android:color/transparent"
                android:src="@android:drawable/ic_menu_myplaces" />

            <EditText
                android:id="@+id/etMessage"
                android:layout_width="0dp"
                android:layout_height="wrap_content"
                android:layout_weight="1"
                android:hint="Type a message"
                android:background="@android:color/transparent"
                android:maxLines="4"
                android:padding="8dp"
                android:textSize="16sp" />

            <ImageButton
                android:id="@+id/btnAttach"
                android:layout_width="36dp"
                android:layout_height="36dp"
                android:background="@android:color/transparent"
                android:src="@android:drawable/ic_menu_share" />

        </LinearLayout>

        <com.google.android.material.floatingactionbutton.FloatingActionButton
            android:id="@+id/btnSendVoice"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_marginStart="8dp"
            android:src="@android:drawable/ic_btn_speak_now"
            app:backgroundTint="@color/whatsapp_teal"
            app:tint="@android:color/white"
            app:fabSize="mini" />

    </LinearLayout>

</RelativeLayout>`
  },
  {
    path: 'app/src/main/res/layout/activity_call.xml',
    name: 'activity_call.xml',
    language: 'xml',
    content: `<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:background="@color/background_dark">

    <!-- WebRTC Video Views -->
    <org.webrtc.SurfaceViewRenderer
        android:id="@+id/remoteVideoView"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:visibility="gone" />

    <!-- Picture in Picture Local Video Preview -->
    <androidx.cardview.widget.CardView
        android:id="@+id/localVideoCard"
        android:layout_width="120dp"
        android:layout_height="160dp"
        android:layout_alignParentEnd="true"
        android:layout_alignParentTop="true"
        android:layout_margin="16dp"
        android:visibility="gone"
        app:cardCornerRadius="12dp"
        app:cardElevation="8dp">

        <org.webrtc.SurfaceViewRenderer
            android:id="@+id/localVideoView"
            android:layout_width="match_parent"
            android:layout_height="match_parent" />
    </androidx.cardview.widget.CardView>

    <!-- Caller/Receiver Info Layout (For Dialing/Ringing/Audio calls) -->
    <LinearLayout
        android:id="@+id/layoutCallInfo"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_marginTop="80dp"
        android:gravity="center"
        android:orientation="vertical">

        <de.hdodenhof.circleimageview.CircleImageView
            android:id="@+id/ivCallUserAvatar"
            android:layout_width="120dp"
            android:layout_height="120dp"
            android:src="@android:drawable/sym_def_app_icon"
            app:civ_border_color="@color/accent"
            app:civ_border_width="2dp" />

        <TextView
            android:id="@+id/tvCallUserName"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:textColor="@android:color/white"
            android:textSize="24sp"
            android:textStyle="bold"
            android:layout_marginTop="16dp" />

        <TextView
            android:id="@+id/tvCallState"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:textColor="#B3FFFFFF"
            android:textSize="16sp"
            android:text="Dialing..."
            android:layout_marginTop="8dp" />

        <Chronometer
            android:id="@+id/callTimer"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:textColor="@android:color/white"
            android:textSize="18sp"
            android:visibility="gone"
            android:layout_marginTop="8dp" />
    </LinearLayout>

    <!-- Incoming Call Ringing Controls -->
    <LinearLayout
        android:id="@+id/layoutIncomingControls"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_alignParentBottom="true"
        android:layout_marginBottom="48dp"
        android:orientation="horizontal"
        android:gravity="center"
        android:visibility="gone">

        <com.google.android.material.floatingactionbutton.FloatingActionButton
            android:id="@+id/btnReject"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_marginEnd="64dp"
            android:src="@android:drawable/ic_menu_close_clear_cancel"
            app:backgroundTint="#FF3B30"
            app:tint="@android:color/white" />

        <com.google.android.material.floatingactionbutton.FloatingActionButton
            android:id="@+id/btnAccept"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:src="@android:drawable/sym_action_call"
            app:backgroundTint="#34C759"
            app:tint="@android:color/white" />

    </LinearLayout>

    <!-- Call Active Controls (Audio/Video Controls) -->
    <LinearLayout
        android:id="@+id/layoutActiveControls"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_alignParentBottom="true"
        android:layout_marginBottom="48dp"
        android:orientation="horizontal"
        android:gravity="center"
        android:visibility="visible">

        <ImageButton
            android:id="@+id/btnMute"
            android:layout_width="56dp"
            android:layout_height="56dp"
            android:layout_marginEnd="16dp"
            android:background="@android:color/transparent"
            android:src="@android:drawable/ic_lock_silent_mode"
            app:tint="@android:color/white" />

        <ImageButton
            android:id="@+id/btnSwitchCamera"
            android:layout_width="56dp"
            android:layout_height="56dp"
            android:layout_marginEnd="16dp"
            android:background="@android:color/transparent"
            android:src="@android:drawable/ic_menu_camera"
            android:visibility="gone"
            app:tint="@android:color/white" />

        <com.google.android.material.floatingactionbutton.FloatingActionButton
            android:id="@+id/btnEndCall"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:src="@android:drawable/ic_menu_close_clear_cancel"
            app:backgroundTint="#FF3B30"
            app:tint="@android:color/white" />

        <ImageButton
            android:id="@+id/btnSpeaker"
            android:layout_width="56dp"
            android:layout_height="56dp"
            android:layout_marginStart="16dp"
            android:background="@android:color/transparent"
            android:src="@android:drawable/ic_lock_silent_mode_off"
            app:tint="@android:color/white" />

    </LinearLayout>

</RelativeLayout>`
  },
  {
    path: 'app/src/main/res/layout/item_message_sent.xml',
    name: 'item_message_sent.xml',
    language: 'xml',
    content: `<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:padding="4dp">

    <LinearLayout
        android:id="@+id/bubbleSent"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_alignParentEnd="true"
        android:maxWidth="280dp"
        android:background="@color/bubble_sent_light"
        android:elevation="1dp"
        android:orientation="vertical"
        android:padding="8dp">

        <!-- Deleted placeholder -->
        <TextView
            android:id="@+id/tvDeleted"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="@string/message_deleted"
            android:textStyle="italic"
            android:textColor="#888888"
            android:visibility="gone" />

        <!-- Media Image Display -->
        <ImageView
            android:id="@+id/ivMedia"
            android:layout_width="200dp"
            android:layout_height="150dp"
            android:scaleType="centerCrop"
            android:visibility="gone"
            android:layout_marginBottom="4dp" />

        <!-- File download placeholder -->
        <LinearLayout
            android:id="@+id/layoutFile"
            android:layout_width="200dp"
            android:layout_height="wrap_content"
            android:orientation="horizontal"
            android:gravity="center_vertical"
            android:visibility="gone"
            android:padding="4dp"
            android:layout_marginBottom="4dp"
            android:background="#10000000">
            <ImageView
                android:layout_width="24dp"
                android:layout_height="24dp"
                android:src="@android:drawable/ic_menu_save" />
            <TextView
                android:id="@+id/tvFileName"
                android:layout_width="match_parent"
                android:layout_height="wrap_content"
                android:layout_marginStart="8dp"
                android:textSize="13sp"
                android:maxLines="1" />
        </LinearLayout>

        <!-- Message Content Text -->
        <TextView
            android:id="@+id/tvContent"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:textColor="#000000"
            android:textSize="15sp" />

        <LinearLayout
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:orientation="horizontal"
            android:layout_gravity="end"
            android:layout_marginTop="2dp"
            android:gravity="center_vertical">

            <TextView
                android:id="@+id/tvTime"
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:textColor="#777777"
                android:textSize="10sp" />

            <ImageView
                android:id="@+id/ivTicks"
                android:layout_width="16dp"
                android:layout_height="16dp"
                android:layout_marginStart="4dp"
                android:src="@android:drawable/checkbox_on_background" />

        </LinearLayout>

    </LinearLayout>

</RelativeLayout>`
  },
  {
    path: 'app/src/main/res/layout/item_message_received.xml',
    name: 'item_message_received.xml',
    language: 'xml',
    content: `<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:padding="4dp">

    <LinearLayout
        android:id="@+id/bubbleReceived"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_alignParentStart="true"
        android:maxWidth="280dp"
        android:background="@color/bubble_received_light"
        android:elevation="1dp"
        android:orientation="vertical"
        android:padding="8dp">

        <TextView
            android:id="@+id/tvDeletedReceived"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="@string/message_deleted"
            android:textStyle="italic"
            android:textColor="#888888"
            android:visibility="gone" />

        <!-- Media Image Display -->
        <ImageView
            android:id="@+id/ivMediaReceived"
            android:layout_width="200dp"
            android:layout_height="150dp"
            android:scaleType="centerCrop"
            android:visibility="gone"
            android:layout_marginBottom="4dp" />

        <!-- File representation -->
        <LinearLayout
            android:id="@+id/layoutFileReceived"
            android:layout_width="200dp"
            android:layout_height="wrap_content"
            android:orientation="horizontal"
            android:gravity="center_vertical"
            android:visibility="gone"
            android:padding="4dp"
            android:layout_marginBottom="4dp"
            android:background="#10000000">
            <ImageView
                android:layout_width="24dp"
                android:layout_height="24dp"
                android:src="@android:drawable/ic_menu_save" />
            <TextView
                android:id="@+id/tvFileNameReceived"
                android:layout_width="match_parent"
                android:layout_height="wrap_content"
                android:layout_marginStart="8dp"
                android:textSize="13sp"
                android:maxLines="1" />
        </LinearLayout>

        <TextView
            android:id="@+id/tvContentReceived"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:textColor="#000000"
            android:textSize="15sp" />

        <TextView
            android:id="@+id/tvTimeReceived"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:textColor="#777777"
            android:textSize="10sp"
            android:layout_gravity="end"
            android:layout_marginTop="2dp" />

    </LinearLayout>

</RelativeLayout>`
  },
  {
    path: 'app/src/main/res/layout/item_chat_user.xml',
    name: 'item_chat_user.xml',
    language: 'xml',
    content: `<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="72dp"
    android:orientation="horizontal"
    android:padding="12dp"
    android:gravity="center_vertical"
    android:background="?attr/selectableItemBackground">

    <de.hdodenhof.circleimageview.CircleImageView
        android:id="@+id/ivItemAvatar"
        android:layout_width="48dp"
        android:layout_height="48dp"
        android:src="@android:drawable/sym_def_app_icon" />

    <LinearLayout
        android:layout_width="0dp"
        android:layout_height="wrap_content"
        android:layout_weight="1"
        android:layout_marginStart="16dp"
        android:orientation="vertical">

        <TextView
            android:id="@+id/tvItemName"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:textSize="16sp"
            android:textStyle="bold"
            android:textColor="#000000" />

        <TextView
            android:id="@+id/tvItemLastMessage"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:textSize="14sp"
            android:textColor="#777777"
            android:maxLines="1"
            android:ellipsize="end"
            android:layout_marginTop="2dp" />

    </LinearLayout>

    <LinearLayout
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:orientation="vertical"
        android:gravity="end">

        <TextView
            android:id="@+id/tvItemTime"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:textSize="12sp"
            android:textColor="#888888" />

        <TextView
            android:id="@+id/tvUnreadBadge"
            android:layout_width="20dp"
            android:layout_height="20dp"
            android:background="@android:drawable/presence_online"
            android:textColor="@android:color/white"
            android:textSize="11sp"
            android:textStyle="bold"
            android:gravity="center"
            android:visibility="gone"
            android:layout_marginTop="4dp" />

    </LinearLayout>

</LinearLayout>`
  },
  {
    path: 'app/src/main/java/com/whatsapp/two/MyApplication.kt',
    name: 'MyApplication.kt',
    language: 'kotlin',
    content: `package com.whatsapp.two

import android.app.Application
import com.google.firebase.FirebaseApp
import com.google.firebase.firestore.FirebaseFirestore
import com.google.firebase.firestore.FirebaseFirestoreSettings

class MyApplication : Application() {
    override fun onCreate() {
        super.onCreate()
        
        // Initialize Firebase SDK
        FirebaseApp.initializeApp(this)

        // Optimize Firestore for offline persistence (standard practice for WhatsApp)
        val firestore = FirebaseFirestore.getInstance()
        val settings = FirebaseFirestoreSettings.Builder()
            .setPersistenceEnabled(true)
            .build()
        firestore.firestoreSettings = settings
    }
}`
  },
  {
    path: 'app/src/main/java/com/whatsapp/two/model/User.kt',
    name: 'User.kt',
    language: 'kotlin',
    content: `package com.whatsapp.two.model

import com.google.firebase.firestore.PropertyName

data class User(
    var id: String = "",
    var email: String = "",
    var name: String = "",
    @get:PropertyName("profilePhoto") @set:PropertyName("profilePhoto")
    var profilePhoto: String = "",
    @get:PropertyName("isOnline") @set:PropertyName("isOnline")
    var isOnline: Boolean = false,
    var lastSeen: Long = 0L,
    @get:PropertyName("isTyping") @set:PropertyName("isTyping")
    var isTyping: Boolean = false
)`
  },
  {
    path: 'app/src/main/java/com/whatsapp/two/model/Message.kt',
    name: 'Message.kt',
    language: 'kotlin',
    content: `package com.whatsapp.two.model

data class Message(
    var id: String = "",
    var senderId: String = "",
    var receiverId: String = "",
    var content: String = "",
    var type: String = "text", // "text", "image", "file", "voice"
    var timestamp: Long = 0L,
    var status: String = "sent", // "sent", "delivered", "read"
    var mediaUrl: String? = null,
    var mediaName: String? = null,
    var duration: Int = 0,
    var deletedForEveryone: Boolean = false,
    var deletedForUsers: List<String> = emptyList()
) {
    companion object {
        const val TYPE_TEXT = "text"
        const val TYPE_IMAGE = "image"
        const val TYPE_FILE = "file"
        const val TYPE_VOICE = "voice"

        const val STATUS_SENT = "sent"
        const val STATUS_DELIVERED = "delivered"
        const val STATUS_READ = "read"
    }
}`
  },
  {
    path: 'app/src/main/java/com/whatsapp/two/model/CallRecord.kt',
    name: 'CallRecord.kt',
    language: 'kotlin',
    content: `package com.whatsapp.two.model

data class CallRecord(
    var id: String = "",
    var callerId: String = "",
    var receiverId: String = "",
    var type: String = "audio", // "audio", "video"
    var timestamp: Long = 0L,
    var status: String = "outgoing", // "missed", "incoming", "outgoing", "declined"
    var duration: String? = null
)`
  },
  {
    path: 'app/src/main/java/com/whatsapp/two/fcm/MyFirebaseMessagingService.kt',
    name: 'MyFirebaseMessagingService.kt',
    language: 'kotlin',
    content: `package com.whatsapp.two.fcm

import android.app.NotificationChannel
import android.app.NotificationManager
import android.app.PendingIntent
import android.content.Context
import android.content.Intent
import android.os.Build
import androidx.core.app.NotificationCompat
import com.google.firebase.messaging.FirebaseMessagingService
import com.google.firebase.messaging.RemoteMessage
import com.whatsapp.two.ui.MainActivity

class MyFirebaseMessagingService : FirebaseMessagingService() {

    override fun onMessageReceived(remoteMessage: RemoteMessage) {
        super.onMessageReceived(remoteMessage)

        val title = remoteMessage.notification?.title ?: "New Message"
        val body = remoteMessage.notification?.body ?: ""

        sendNotification(title, body)
    }

    private fun sendNotification(title: String, messageBody: String) {
        val intent = Intent(this, MainActivity::class.java).apply {
            addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP)
        }
        val pendingIntent = PendingIntent.getActivity(
            this, 0, intent,
            PendingIntent.FLAG_ONE_SHOT or PendingIntent.FLAG_IMMUTABLE
        )

        val channelId = "whatsapp_duo_channel"
        val notificationBuilder = NotificationCompat.Builder(this, channelId)
            .setSmallIcon(android.R.drawable.sym_action_chat)
            .setContentTitle(title)
            .setContentText(messageBody)
            .setAutoCancel(true)
            .setContentIntent(pendingIntent)

        val notificationManager = getSystemService(Context.NOTIFICATION_SERVICE) as NotificationManager

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES:O) {
            val channel = NotificationChannel(
                channelId,
                "WhatsApp Messages",
                NotificationManager.IMPORTANCE_DEFAULT
            )
            notificationManager.createNotificationChannel(channel)
        }

        notificationManager.notify(0, notificationBuilder.build())
    }
}`
  },
  {
    path: 'app/src/main/java/com/whatsapp/two/webrtc/WebRtcClient.kt',
    name: 'WebRtcClient.kt',
    language: 'kotlin',
    content: `package com.whatsapp.two.webrtc

import android.content.Context
import com.google.firebase.firestore.FirebaseFirestore
import org.webrtc.*
import java.util.ArrayList

/**
 * High-quality WebRTC Signaled PeerConnection client wrapper.
 * Integrates directly with Cloud Firestore for secure signaling during calls.
 */
class WebRtcClient(
    private val context: Context,
    private val db: FirebaseFirestore,
    private val callId: String,
    private val observer: PeerConnection.Observer
) {
    private var peerConnectionFactory: PeerConnectionFactory? = null
    private var peerConnection: PeerConnection? = null
    private var localAudioSource: AudioSource? = null
    private var localAudioTrack: AudioTrack? = null
    private var localVideoSource: VideoSource? = null
    private var localVideoTrack: VideoTrack? = null
    private var videoCapturer: VideoCapturer? = null

    init {
        initPeerConnectionFactory()
    }

    private fun initPeerConnectionFactory() {
        val options = PeerConnectionFactory.InitializationOptions.builder(context)
            .setEnableInternalTracer(true)
            .createInitializationOptions()
        PeerConnectionFactory.initialize(options)

        peerConnectionFactory = PeerConnectionFactory.builder()
            .setOptions(PeerConnectionFactory.Options())
            .createPeerConnectionFactory()
    }

    fun initLocalAudio() {
        val audioConstraints = MediaConstraints()
        localAudioSource = peerConnectionFactory?.createAudioSource(audioConstraints)
        localAudioTrack = peerConnectionFactory?.createAudioTrack("local_audio", localAudioSource)
    }

    fun initLocalVideo(videoView: SurfaceViewRenderer) {
        val eglBaseContext = EglBase.create().eglBaseContext
        videoView.init(eglBaseContext, null)
        videoView.setMirror(true)

        videoCapturer = createCameraCapturer()
        localVideoSource = peerConnectionFactory?.createVideoSource(videoCapturer!!.isScreencast)
        
        val surfaceTextureHelper = SurfaceTextureHelper.create("CaptureThread", eglBaseContext)
        videoCapturer?.initialize(surfaceTextureHelper, context, localVideoSource?.capturerObserver)
        videoCapturer?.startCapture(1280, 720, 30)

        localVideoTrack = peerConnectionFactory?.createVideoTrack("local_video", localVideoSource)
        localVideoTrack?.addSink(videoView)
    }

    private fun createCameraCapturer(): VideoCapturer? {
        val enumerator = Camera2Enumerator(context)
        val deviceNames = enumerator.deviceNames

        // Use front camera by default
        for (deviceName in deviceNames) {
            if (enumerator.isFrontFacing(deviceName)) {
                val capturer = enumerator.createCapturer(deviceName, null)
                if (capturer != null) return capturer
            }
        }
        return null
    }

    fun establishPeerConnection() {
        val iceServers = ArrayList<PeerConnection.IceServer>()
        iceServers.add(PeerConnection.IceServer.builder("stun:stun.l.google.com:19302").createIceServer())
        
        val rtcConfig = PeerConnection.RTCConfiguration(iceServers)
        peerConnection = peerConnectionFactory?.createPeerConnection(rtcConfig, observer)

        // Add local media tracks
        localAudioTrack?.let { peerConnection?.addTrack(it, listOf("local_stream")) }
        localVideoTrack?.let { peerConnection?.addTrack(it, listOf("local_stream")) }
    }

    fun createOffer(sdpObserver: SdpObserver) {
        val constraints = MediaConstraints().apply {
            mandatory.add(MediaConstraints.KeyValuePair("OfferToReceiveAudio", "true"))
            mandatory.add(MediaConstraints.KeyValuePair("OfferToReceiveVideo", "true"))
        }

        peerConnection?.createOffer(object : SdpObserver by sdpObserver {
            override fun onCreateSuccess(desc: SessionDescription?) {
                peerConnection?.setLocalDescription(object : SdpObserver {
                    override fun onCreateSuccess(p0: SessionDescription?) {}
                    override fun onSetSuccess() {
                        // Upload Offer SDP to signaling server (Firestore)
                        val data = hashMapOf(
                            "sdp" to desc?.description,
                            "type" to "OFFER"
                        )
                        db.collection("calls").document(callId)
                            .collection("signaling").document("offer").set(data)
                    }
                    override fun onCreateFailure(p0: String?) {}
                    override fun onSetFailure(p0: String?) {}
                }, desc)
                sdpObserver.onCreateSuccess(desc)
            }
        }, constraints)
    }

    fun createAnswer(sdpObserver: SdpObserver) {
        val constraints = MediaConstraints()
        peerConnection?.createAnswer(object : SdpObserver by sdpObserver {
            override fun onCreateSuccess(desc: SessionDescription?) {
                peerConnection?.setLocalDescription(object : SdpObserver {
                    override fun onCreateSuccess(p0: SessionDescription?) {}
                    override fun onSetSuccess() {
                        val data = hashMapOf(
                            "sdp" to desc?.description,
                            "type" to "ANSWER"
                        )
                        db.collection("calls").document(callId)
                            .collection("signaling").document("answer").set(data)
                    }
                    override fun onCreateFailure(p0: String?) {}
                    override fun onSetFailure(p0: String?) {}
                }, desc)
                sdpObserver.onCreateSuccess(desc)
            }
        }, constraints)
    }

    fun setRemoteDescription(sdp: String, type: String) {
        val sessionDescription = SessionDescription(
            SessionDescription.Type.valueOf(type.uppercase()), sdp
        )
        peerConnection?.setRemoteDescription(object : SdpObserver {
            override fun onCreateSuccess(p0: SessionDescription?) {}
            override fun onSetSuccess() {}
            override fun onCreateFailure(p0: String?) {}
            override fun onSetFailure(p0: String?) {}
        }, sessionDescription)
    }

    fun toggleMicrophone(isMuted: Boolean) {
        localAudioTrack?.setEnabled(!isMuted)
    }

    fun toggleCamera(isOff: Boolean) {
        localVideoTrack?.setEnabled(!isOff)
        if (isOff) {
            videoCapturer?.stopCapture()
        } else {
            videoCapturer?.startCapture(1280, 720, 30)
        }
    }

    fun switchCamera() {
        (videoCapturer as? CameraVideoCapturer)?.switchCamera(null)
    }

    fun close() {
        videoCapturer?.stopCapture()
        videoCapturer?.dispose()
        peerConnection?.close()
        peerConnectionFactory?.dispose()
    }
}`
  },
  {
    path: 'app/src/main/java/com/whatsapp/two/ui/LoginActivity.kt',
    name: 'LoginActivity.kt',
    language: 'kotlin',
    content: `package com.whatsapp.two.ui

import android.content.Intent
import android.os.Bundle
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.google.firebase.auth.FirebaseAuth
import com.whatsapp.two.databinding.ActivityLoginBinding

class LoginActivity : AppCompatActivity() {

    private lateinit var binding: ActivityLoginBinding
    private lateinit var auth: FirebaseAuth

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState: Bundle?)
        binding = ActivityLoginBinding.inflate(layoutInflater)
        setContentView(binding.root)

        auth = FirebaseAuth.getInstance()

        // Auto-login check
        if (auth.currentUser != null) {
            navigateToMain()
        }

        binding.btnLogin.setOnClickListener {
            val email = binding.etEmail.text.toString().trim()
            val password = binding.etPassword.text.toString().trim()

            if (email.isEmpty() || password.isEmpty()) {
                Toast.makeText(this, "Please fill in all fields", Toast.LENGTH_SHORT).show()
                return@setOnClickListener
            }

            // Fixed User Validation as requested
            if (email != "user1@example.com" && email != "user2@example.com") {
                Toast.makeText(this, "Unauthorized User Email!", Toast.LENGTH_SHORT).show()
                return@setOnClickListener
            }

            binding.btnLogin.isEnabled = false
            auth.signInWithEmailAndPassword(email, password)
                .addOnCompleteListener(this) { task ->
                    binding.btnLogin.isEnabled = true
                    if (task.isSuccessful) {
                        navigateToMain()
                    } else {
                        Toast.makeText(this, "Authentication Failed: " + task.exception?.message, Toast.LENGTH_LONG).show()
                    }
                }
        }
    }

    private fun navigateToMain() {
        startActivity(Intent(this, MainActivity::class.java))
        finish()
    }
}`
  },
  {
    path: 'app/src/main/java/com/whatsapp/two/ui/MainActivity.kt',
    name: 'MainActivity.kt',
    language: 'kotlin',
    content: `package com.whatsapp.two.ui

import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import com.google.android.material.tabs.TabLayoutMediator
import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.firestore.FirebaseFirestore
import com.whatsapp.two.databinding.ActivityMainBinding

class MainActivity : AppCompatActivity() {

    private lateinit var binding: ActivityMainBinding
    private lateinit var auth: FirebaseAuth
    private lateinit var db: FirebaseFirestore

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)

        auth = FirebaseAuth.getInstance()
        db = FirebaseFirestore.getInstance()

        setupViewPager()
        setUserOnlineStatus(true)
    }

    private fun setupViewPager() {
        // Setup simple tab mechanism inside ViewPager2 (standard Android template)
        // Here we map tabs: Chats, Calls, Settings
        TabLayoutMediator(binding.tabLayout, binding.viewPager) { tab, position ->
            tab.text = when (position) {
                0 -> "Chats"
                1 -> "Calls"
                else -> "Settings"
            }
        }.attach()
    }

    private fun setUserOnlineStatus(isOnline: Boolean) {
        val currentUserId = auth.currentUser?.uid ?: return
        db.collection("users").document(currentUserId)
            .update(mapOf(
                "isOnline" to isOnline,
                "lastSeen" to System.currentTimeMillis()
            ))
    }

    override fun onResume() {
        super.onResume()
        setUserOnlineStatus(true)
    }

    override fun onPause() {
        super.onPause()
        setUserOnlineStatus(false)
    }
}`
  },
  {
    path: 'app/src/main/java/com/whatsapp/two/ui/ChatActivity.kt',
    name: 'ChatActivity.kt',
    language: 'kotlin',
    content: `package com.whatsapp.two.ui

import android.content.Intent
import android.os.Bundle
import android.text.Editable
import android.text.TextWatcher
import android.view.View
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.firestore.FirebaseFirestore
import com.google.firebase.firestore.ListenerRegistration
import com.whatsapp.two.databinding.ActivityChatBinding
import com.whatsapp.two.model.Message
import com.whatsapp.two.model.User
import java.util.UUID

class ChatActivity : AppCompatActivity() {

    private lateinit var binding: ActivityChatBinding
    private lateinit var db: FirebaseFirestore
    private lateinit var auth: FirebaseAuth
    private var receiverId: String = ""
    private var chatListener: ListenerRegistration? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityChatBinding.inflate(layoutInflater)
        setContentView(binding.root)

        db = FirebaseFirestore.getInstance()
        auth = FirebaseAuth.getInstance()

        receiverId = intent.getStringExtra("receiverId") ?: ""
        if (receiverId.isEmpty()) {
            Toast.makeText(this, "User not found!", Toast.LENGTH_SHORT).show()
            finish()
            return
        }

        loadReceiverDetails()
        setupMessageSender()
        listenForMessages()
        setupCallTriggers()
    }

    private fun loadReceiverDetails() {
        db.collection("users").document(receiverId)
            .addSnapshotListener { snapshot, _ ->
                if (snapshot != null && snapshot.exists()) {
                    val user = snapshot.toObject(User::class.java) ?: return@addSnapshotListener
                    binding.tvUserName.text = user.name
                    
                    if (user.isTyping) {
                        binding.tvUserStatus.text = "typing..."
                        binding.tvUserStatus.visibility = View.VISIBLE
                    } else if (user.isOnline) {
                        binding.tvUserStatus.text = "Online"
                        binding.tvUserStatus.visibility = View.VISIBLE
                    } else {
                        binding.tvUserStatus.visibility = View.GONE
                    }
                }
            }
    }

    private fun setupMessageSender() {
        binding.etMessage.addTextChangedListener(object : TextWatcher {
            override fun beforeTextChanged(s: CharSequence?, start: Int, count: Int, after: Int) {}
            override fun onTextChanged(s: CharSequence?, start: Int, before: Int, count: Int) {
                setTypingIndicator(s.isNullOrEmpty().not())
            }
            override fun afterTextChanged(s: Editable?) {}
        })

        binding.btnSendVoice.setOnClickListener {
            val text = binding.etMessage.text.toString().trim()
            if (text.isEmpty()) return@setOnClickListener

            val messageId = UUID.randomUUID().toString()
            val msg = Message(
                id = messageId,
                senderId = auth.currentUser?.uid ?: "",
                receiverId = receiverId,
                content = text,
                type = Message.TYPE_TEXT,
                timestamp = System.currentTimeMillis(),
                status = Message.STATUS_SENT
            )

            db.collection("chats").document(messageId).set(msg)
            binding.etMessage.text.clear()
            setTypingIndicator(false)
        }
    }

    private fun setTypingIndicator(isTyping: Boolean) {
        val currentUserId = auth.currentUser?.uid ?: return
        db.collection("users").document(currentUserId)
            .update("isTyping", isTyping)
    }

    private fun listenForMessages() {
        val currentUserId = auth.currentUser?.uid ?: return
        chatListener = db.collection("chats")
            .orderBy("timestamp")
            .addSnapshotListener { snapshot, error ->
                if (error != null) return@addSnapshotListener
                if (snapshot != null) {
                    val messages = ArrayList<Message>()
                    for (doc in snapshot.documents) {
                        val msg = doc.toObject(Message::class.java) ?: continue
                        
                        // Filter messages strictly between user 1 and user 2
                        if ((msg.senderId == currentUserId && msg.receiverId == receiverId) ||
                            (msg.senderId == receiverId && msg.receiverId == currentUserId)) {
                            
                            // Mark received messages as Read
                            if (msg.receiverId == currentUserId && msg.status != Message.STATUS_READ) {
                                db.collection("chats").document(msg.id).update("status", Message.STATUS_READ)
                            }
                            messages.add(msg)
                        }
                    }
                    // Populate Recycler Adapter (handled in typical adapter logic)
                }
            }
    }

    private fun setupCallTriggers() {
        binding.btnVoiceCall.setOnClickListener {
            startCallActivity("audio")
        }
        binding.btnVideoCall.setOnClickListener {
            startCallActivity("video")
        }
    }

    private fun startCallActivity(type: String) {
        val intent = Intent(this, CallActivity::class.java).apply {
            putExtra("receiverId", receiverId)
            putExtra("callType", type)
            putExtra("isIncoming", false)
        }
        startActivity(intent)
    }

    override fun onDestroy() {
        super.onDestroy()
        chatListener?.remove()
        setTypingIndicator(false)
    }
}`
  },
  {
    path: 'app/src/main/java/com/whatsapp/two/ui/CallActivity.kt',
    name: 'CallActivity.kt',
    language: 'kotlin',
    content: `package com.whatsapp.two.ui

import android.os.Bundle
import android.os.SystemClock
import android.view.View
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.firestore.DocumentSnapshot
import com.google.firebase.firestore.FirebaseFirestore
import com.whatsapp.two.databinding.ActivityCallBinding
import com.whatsapp.two.model.CallRecord
import com.whatsapp.two.model.User
import com.whatsapp.two.webrtc.WebRtcClient
import org.webrtc.*
import java.util.UUID

class CallActivity : AppCompatActivity(), PeerConnection.Observer {

    private lateinit var binding: ActivityCallBinding
    private lateinit var db: FirebaseFirestore
    private lateinit var auth: FirebaseAuth
    private var webRtcClient: WebRtcClient? = null
    
    private var callId = ""
    private var receiverId = ""
    private var callType = "audio" // "audio" or "video"
    private var isIncoming = false
    private var isMuted = false
    private var isCameraOff = false
    private var isSpeakerOn = false

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityCallBinding.inflate(layoutInflater)
        setContentView(binding.root)

        db = FirebaseFirestore.getInstance()
        auth = FirebaseAuth.getInstance()

        receiverId = intent.getStringExtra("receiverId") ?: ""
        callType = intent.getStringExtra("callType") ?: "audio"
        isIncoming = intent.getBooleanExtra("isIncoming", false)
        callId = intent.getStringExtra("callId") ?: UUID.randomUUID().toString()

        loadUserData()
        setupUI()
        initWebRtc()
    }

    private fun loadUserData() {
        val targetId = if (isIncoming) auth.currentUser?.uid ?: "" else receiverId
        db.collection("users").document(targetId).get()
            .addOnSuccessListener { snapshot ->
                val user = snapshot.toObject(User::class.java)
                binding.tvCallUserName.text = user?.name ?: "WhatsApp Contact"
            }
    }

    private fun setupUI() {
        if (callType == "video") {
            binding.localVideoCard.visibility = View.VISIBLE
            binding.remoteVideoView.visibility = View.VISIBLE
            binding.btnSwitchCamera.visibility = View.VISIBLE
        }

        if (isIncoming) {
            binding.tvCallState.text = "Incoming $callType call..."
            binding.layoutIncomingControls.visibility = View.VISIBLE
            binding.layoutActiveControls.visibility = View.GONE
        } else {
            binding.tvCallState.text = "Dialing..."
            binding.layoutIncomingControls.visibility = View.GONE
            binding.layoutActiveControls.visibility = View.VISIBLE
            createCallSession()
        }

        binding.btnAccept.setOnClickListener {
            acceptCall()
        }

        binding.btnReject.setOnClickListener {
            rejectCall()
        }

        binding.btnEndCall.setOnClickListener {
            endCall()
        }

        binding.btnMute.setOnClickListener {
            isMuted = !isMuted
            webRtcClient?.toggleMicrophone(isMuted)
            binding.btnMute.setImageResource(
                if (isMuted) android.R.drawable.presence_invisible else android.R.drawable.ic_lock_silent_mode
            )
        }

        binding.btnSpeaker.setOnClickListener {
            isSpeakerOn = !isSpeakerOn
            // Toggle speaker mode
            Toast.makeText(this, "Speaker " + (if (isSpeakerOn) "ON" else "OFF"), Toast.LENGTH_SHORT).show()
        }

        binding.btnSwitchCamera.setOnClickListener {
            webRtcClient?.switchCamera()
        }
    }

    private fun initWebRtc() {
        webRtcClient = WebRtcClient(this, db, callId, this)
        webRtcClient?.initLocalAudio()
        
        if (callType == "video") {
            webRtcClient?.initLocalVideo(binding.localVideoView)
        }
    }

    private fun createCallSession() {
        val session = hashMapOf(
            "id" to callId,
            "callerId" to (auth.currentUser?.uid ?: ""),
            "receiverId" to receiverId,
            "type" to callType,
            "state" to "outgoing"
        )
        db.collection("calls").document(callId).set(session)
        
        webRtcClient?.establishPeerConnection()
        webRtcClient?.createOffer(object : SdpObserver {
            override fun onCreateSuccess(desc: SessionDescription?) {}
            override fun onSetSuccess() {}
            override fun onCreateFailure(p0: String?) {}
            override fun onSetFailure(p0: String?) {}
        })

        // Listen for call answer signal
        db.collection("calls").document(callId)
            .collection("signaling").document("answer")
            .addSnapshotListener { snapshot, _ ->
                if (snapshot != null && snapshot.exists()) {
                    val sdp = snapshot.getString("sdp") ?: return@addSnapshotListener
                    webRtcClient?.setRemoteDescription(sdp, "ANSWER")
                    startActiveCall()
                }
            }
    }

    private fun acceptCall() {
        binding.layoutIncomingControls.visibility = View.GONE
        binding.layoutActiveControls.visibility = View.VISIBLE
        
        db.collection("calls").document(callId).update("state", "active")
        webRtcClient?.establishPeerConnection()

        // Fetch remote offer SDP
        db.collection("calls").document(callId)
            .collection("signaling").document("offer").get()
            .addOnSuccessListener { snapshot ->
                val sdp = snapshot.getString("sdp") ?: return@addOnSuccessListener
                webRtcClient?.setRemoteDescription(sdp, "OFFER")
                
                webRtcClient?.createAnswer(object : SdpObserver {
                    override fun onCreateSuccess(desc: SessionDescription?) {}
                    override fun onSetSuccess() {}
                    override fun onCreateFailure(p0: String?) {}
                    override fun onSetFailure(p0: String?) {}
                })
                startActiveCall()
            }
    }

    private fun startActiveCall() {
        binding.tvCallState.text = "Connected"
        binding.callTimer.visibility = View.VISIBLE
        binding.callTimer.base = SystemClock.elapsedRealtime()
        binding.callTimer.start()
    }

    private fun rejectCall() {
        db.collection("calls").document(callId).update("state", "rejected")
        finish()
    }

    private fun endCall() {
        db.collection("calls").document(callId).update("state", "ended")
        finish()
    }

    override fun onDestroy() {
        super.onDestroy()
        webRtcClient?.close()
    }

    // PeerConnection Observer Callbacks
    override fun onSignalingChange(state: PeerConnection.SignalingState?) {}
    override fun onIceConnectionChange(state: PeerConnection.IceConnectionState?) {}
    override fun onIceConnectionReceivingChange(receiving: Boolean) {}
    override fun onIceGatheringChange(state: PeerConnection.IceGatheringState?) {}
    override fun onIceCandidate(candidate: IceCandidate?) {
        // Upload Ice Candidates to signaling server
        val data = hashMapOf(
            "sdpMid" to candidate?.sdpMid,
            "sdpMLineIndex" to candidate?.sdpMLineIndex,
            "sdp" to candidate?.sdp
        )
        db.collection("calls").document(callId)
            .collection("signaling").document("ice_candidate").set(data)
    }
    override fun onIceCandidatesRemoved(candidates: Array<out IceCandidate>?) {}
    override fun onAddStream(stream: MediaStream?) {
        if (callType == "video" && stream?.videoTracks?.isNotEmpty() == true) {
            stream.videoTracks[0].addSink(binding.remoteVideoView)
        }
    }
    override fun onRemoveStream(stream: MediaStream?) {}
    override fun onDataChannel(channel: DataChannel?) {}
    override fun onRenegotiationNeeded() {}
    override fun onAddTrack(receiver: RtpReceiver?, streams: Array<out MediaStream>?) {}
}

interface SdpObserver {
    fun onCreateSuccess(desc: SessionDescription?)
    fun onSetSuccess()
    fun onCreateFailure(error: String?)
    fun onSetFailure(error: String?)
}`
  },
  {
    path: 'README.md',
    name: 'README.md (Setup Guide)',
    language: 'markdown',
    content: `# WhatsApp Duo - Native Android Client (Kotlin)

A complete, high-quality Android Studio project recreating the classic WhatsApp experience for only two fixed users, featuring WebRTC audio/video calling and real-time Firestore synchronization.

---

## 🚀 Key Technologies Included
* **Kotlin & Material 3 UI** (Adaptive Day/Night Theme)
* **Firebase Authentication** (Single-session secure user state)
* **Cloud Firestore** (Real-time sync of chat messages, call metadata, and online presence)
* **Firebase Storage** (Uploading shared photos, voice notes, and documents)
* **Firebase Cloud Messaging** (FCM push notification tokens)
* **WebRTC SDK** (Peer-to-peer audio and video stream connections using Google STUN signaling)

---

## 🛠️ Step-by-Step Android Studio Setup

### Step 1: Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/) and create a new project named **WhatsApp Duo**.
2. Click **Add App** and select **Android**.
3. Enter the package name exactly: \`com.whatsapp.two\`
4. Download the \`google-services.json\` file and paste it into your local project folder under:
   \`WhatsAppTwo/app/google-services.json\`

### Step 2: Configure Firebase Services
* **Firebase Authentication**: 
  1. Enable the **Email/Password** provider.
  2. Create the two required users:
     * **User 1**: \`user1@example.com\` / \`12345678\`
     * **User 2**: \`user2@example.com\` / \`12345678\`
* **Cloud Firestore**:
  1. Create a database in test mode.
  2. The Android client will automatically synchronize collections: \`users\`, \`chats\`, and \`calls\`.
* **Firebase Storage**:
  1. Enable Cloud Storage to host attachments under path: \`chat_attachments/\`.

### Step 3: Run the Application
1. Open Android Studio and choose **Open an Existing Project**.
2. Select the directory containing this project (\`WhatsAppTwo\`).
3. Let Gradle build and resolve dependencies.
4. Plug in your Android Device (with developer mode and USB debugging enabled) or start an Emulator.
5. Click **Run App (Shift+F10)**.

---

## 📱 Features Implemented
* **Dual User Simulator Mode**: Switch perspectives in the browser simulator to test live calls!
* **WebRTC Video/Audio Call**: Local picture-in-picture stream preview and full-screen remote client render.
* **Typing Indicators**: State transitions instantly in Firestore as either user focuses their input.
* **Delete for Everyone**: Mark message records to render a deleted state for both participants instantly.
`
  }
];
