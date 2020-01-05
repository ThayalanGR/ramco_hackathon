package com.example.smsservice;

import android.app.job.JobInfo;
import android.app.job.JobScheduler;
import android.content.ComponentName;
import android.content.Intent;
import android.os.Build;
import android.telephony.SmsManager;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.annotation.RequiresApi;
import androidx.core.content.ContextCompat;

import io.flutter.Log;
import io.flutter.embedding.android.FlutterActivity;
import io.flutter.embedding.engine.FlutterEngine;
import io.flutter.plugin.common.MethodChannel;
import io.flutter.plugins.GeneratedPluginRegistrant;

public class MainActivity extends FlutterActivity {

    String CHANNEL = "com.example.smsservice";
    private static final String TAG = "MainActivity";

    @RequiresApi(api = Build.VERSION_CODES.LOLLIPOP)
    @Override
    public void configureFlutterEngine(@NonNull FlutterEngine flutterEngine) {
        GeneratedPluginRegistrant.registerWith(flutterEngine);

        new MethodChannel(flutterEngine.getDartExecutor().getBinaryMessenger(), CHANNEL)
                .setMethodCallHandler(
                        (call, result) -> {
                            if (call.method.equals("startService")) {
                                startBGTask();
                            } else if (call.method.equals("stopService")){
                                cancelBGTask();
                            }
                        }
                );
    }

    @RequiresApi(api = Build.VERSION_CODES.LOLLIPOP)
    public void startBGTask(){
        Intent serviceIntent = new Intent(this, ForgroundService.class);
        ContextCompat.startForegroundService(this, serviceIntent);
    }

    @RequiresApi(api = Build.VERSION_CODES.LOLLIPOP)
    public void cancelBGTask(){
        Intent serviceIntent = new Intent(this, ForgroundService.class);
        stopService(serviceIntent);
    }
}

