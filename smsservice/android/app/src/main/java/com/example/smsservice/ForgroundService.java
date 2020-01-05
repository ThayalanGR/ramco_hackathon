package com.example.smsservice;

import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.app.Service;
import android.content.Intent;
import android.os.Build;
import android.os.IBinder;
import android.telephony.SmsManager;
import android.util.Log;
import android.widget.Toast;

import androidx.annotation.Nullable;
import androidx.core.app.NotificationCompat;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

import java.io.IOException;

import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;

public class ForgroundService extends Service {

    public static final String CHANNEL_ID = "com.example.smsservice";

    @Override
    public void onCreate() {
        super.onCreate();
    }

    private void createNotificationChannel() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            NotificationChannel serviceChannel = new NotificationChannel(
                    CHANNEL_ID,
                    "Foreground Service Channel",
                    NotificationManager.IMPORTANCE_DEFAULT
            );
            NotificationManager manager = getSystemService(NotificationManager.class);
            manager.createNotificationChannel(serviceChannel);
        }
    }

    public void getHttpResponse() throws IOException {

        String url = "https://rrjprojects.000webhostapp.com/api/smsservice/index.php";


        OkHttpClient client = new OkHttpClient();

        Request request = new Request.Builder()
                .url(url)
                .build();

        Response response = client.newCall(request).execute();

        Toast.makeText(this, response.body().string(), Toast.LENGTH_SHORT).show();

        if (response.body().string() == "Hello there") {
            try {
                SmsManager smsManager = SmsManager.getDefault();
                smsManager.sendTextMessage("7339013999", null, "Hiii Dumboooo!", null, null);
            } catch (Exception e) {

            }
        }

    }

    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        createNotificationChannel();
        Intent notificationIntent = new Intent(this, MainActivity.class);
        PendingIntent pendingIntent = PendingIntent.getActivity(this,
                0, notificationIntent, 0);
        Notification notification = new NotificationCompat.Builder(this, CHANNEL_ID)
                .setContentTitle("Mail Service")
                .setContentText("Waiting for mail")
                .setSmallIcon(R.drawable.ic_android_black_24dp)
                .setContentIntent(pendingIntent)
                .build();
        startForeground(1, notification);
        //do heavy work on a background thread
        //stopSelf();

        OkHttpClient client = new OkHttpClient();

        String url = "http://192.168.15.180:2000/sms/list";

        Request request = new Request.Builder()
                .url(url)
                .build();

        JSONParser parser = new JSONParser();

        JSONObject obj = new JSONObject();

        // starting thread to handle constant updation of notification values
        Thread t = new Thread() {

            @Override
            public void run() {
                // infinite loop

                while (true) {
                    Log.e("Sample", "Running");

                    try {
                        Response response = client.newCall(request).execute();
                        Log.e("Sample", "Sent request");

                        String jsonString = response.body().string();

                        try {

                            JSONArray array = new JSONArray(jsonString);

                            int noOfItems = array.length();

                            for (int i = 0; i < noOfItems; i++) {

                                JSONObject temp = array.getJSONObject(i);

                                String mobileNum = temp.getString("mobile");
                                String message = temp.getString("message");

                                Log.e("Sample", mobileNum);
                                Log.e("Sample", message);

                                try {
                                    Log.e("Sample", "Sending Message");
                                    SmsManager smsManager = SmsManager.getDefault();
                                    smsManager.sendTextMessage(mobileNum, null, message, null, null);
                                    Log.e("Sample", "Message Sent");
                                } catch (Exception e) {
                                    Log.e("Sample", e.getMessage());
                                }

                            }

                        } catch (JSONException e) {
                            e.printStackTrace();
                        }

                    } catch (IOException e) {
                        e.printStackTrace();
                    }


                    try {
                        Thread.sleep(5000);
                    } catch (InterruptedException e) {
                        e.printStackTrace();
                    }
                }
            }
        };

        t.start();

        return START_STICKY;
    }

    @Override
    public void onDestroy() {

        super.onDestroy();
    }

    @Nullable
    @Override
    public IBinder onBind(Intent intent) {
        return null;
    }
}
