package com.example.smsservice;

import android.app.job.JobParameters;
import android.app.job.JobService;
import android.os.Build;
import android.telephony.SmsManager;
import android.widget.Toast;

import androidx.annotation.RequiresApi;

import java.io.IOException;

import io.flutter.Log;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;

@RequiresApi(api = Build.VERSION_CODES.LOLLIPOP)
public class JobServiceClass extends JobService {

    private static final String TAG = "smsService";
    private boolean jobCancelled = false;

    public void getHttpResponse() throws IOException {

        String url = "https://rrjprojects.000webhostapp.com/api/smsservice/index.php";



        OkHttpClient client = new OkHttpClient();

        Request request = new Request.Builder()
                .url(url)
                .build();

        Response response = client.newCall(request).execute();

        Toast.makeText(this, response.body().string(), Toast.LENGTH_SHORT).show();

        if(response.body().string() == "Hello there"){
            try {
                SmsManager smsManager = SmsManager.getDefault();
                smsManager.sendTextMessage("7339013999", null, "Hiii Dumboooo!", null, null);
            } catch (Exception e){

            }
        }

    }

    private void doBackgroundWork(JobParameters params){
        new Thread(
                new Runnable() {
                    @Override
                    public void run() {
                        for(int i = 0;i<10;i++){
                            Toast.makeText(JobServiceClass.this, i, Toast.LENGTH_SHORT).show();

//                            try {
//                                getHttpResponse();
//                            } catch (IOException e) {
//                                e.printStackTrace();
//                                return;
//                            }
//                            if(jobCancelled){
//                                return;
//                            }
                            try {
                                Thread.sleep(60000);
                            } catch (InterruptedException e) {
                                e.printStackTrace();
                            }

                        }
                        Log.d(TAG,"Job Finished");
                        jobFinished(params,false);
                    }
                }
        ).start();
    }


    @Override
    public boolean onStartJob(JobParameters jobParameters) {

        Log.d(TAG, "Job Started");
        Toast.makeText(this, "Am here", Toast.LENGTH_SHORT).show();
        doBackgroundWork(jobParameters);
        return true;
    }

    @Override
    public boolean onStopJob(JobParameters jobParameters) {

        Log.d(TAG,"Job cancelled before completion");
        jobCancelled = true;
        return false;
    }
}
