import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

class HomePage extends StatefulWidget {
  @override
  _HomePageState createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {

  static const platform = const MethodChannel('com.example.smsservice');

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          crossAxisAlignment: CrossAxisAlignment.center,
          children: <Widget>[
            RaisedButton(
              color: Colors.cyan,
              padding: EdgeInsets.all(20.0),
              textColor: Colors.white,
              onPressed: (){
                platform.invokeMethod("startService");
              },
              child: Text("Start Service"),
            ),
            SizedBox(
              height: 20.0,
            ),
            RaisedButton(
              color: Colors.red,
              padding: EdgeInsets.all(20.0),
              textColor: Colors.white,
              onPressed: (){
              },
              child: Text("Stop Service"),
            )
          ],
        ),
      ),
    );
  }
}
