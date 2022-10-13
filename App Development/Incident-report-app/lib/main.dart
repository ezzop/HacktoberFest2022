import 'package:flutter/material.dart';
import 'package:trackerincident/call.dart';
import 'package:trackerincident/video.dart';
import 'package:url_launcher/url_launcher.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(
        // This is the theme of your application.
        //
        // Try running your application with "flutter run". You'll see the
        // application has a blue toolbar. Then, without quitting the app, try
        // changing the primarySwatch below to Colors.green and then invoke
        // "hot reload" (press "r" in the console where you ran "flutter run",
        // or simply save your changes to "hot reload" in a Flutter IDE).
        // Notice that the counter didn't reset back to zero; the application
        // is not restarted.
        primarySwatch: Colors.blue,
      ),
      home: MyHomePage(title: 'Incident Tracker'),
    );
  }
}

class MyHomePage extends StatefulWidget {
  MyHomePage({Key? key, required this.title}) : super(key: key);

  // This widget is the home page of your application. It is stateful, meaning
  // that it has a State object (defined below) that contains fields that affect
  // how it looks.

  // This class is the configuration for the state. It holds the values (in this
  // case the title) provided by the parent (in this case the App widget) and
  // used by the build method of the State. Fields in a Widget subclass are
  // always marked "final".

  final String title;

  @override
  _MyHomePageState createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  var recording= false;
  @override
  Widget build(BuildContext context) {
    return Scaffold(
        backgroundColor: Color(0x6f081349),
        appBar: AppBar(
          backgroundColor: Colors.transparent,
          shadowColor: Colors.transparent,
          title: Center(child: Text(widget.title)),
        ),
        body: Center(
            child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: <Widget>[
              Padding(
                padding: const EdgeInsets.only(left: 100.0, top: 200),
                child: Row(
                  children: [
                    FloatingActionButton(
                      backgroundColor:Colors.red,
                        onPressed: () {
                          showDialog(
                              context: context,
                              builder: (context) => AlertDialog(
                                    title: Text("Location Enable"),
                                    content: Text("are you Sure to enable"),
                                    actions: [
                                      TextButton(
                                          onPressed: () {
                                            Navigator.of(context).pop();
                                          },
                                          child: Text("cancel")),
                                      TextButton(
                                          onPressed: () {
                                            Navigator.of(context).pop();
                                          },
                                          child: Text("Ok")),
                                    ],
                                  ));
                        },
                        child: Icon(Icons.mic)
                        // style: ElevatedButton.styleFrom(  primary: Color(0xffee06cc),
                        //   shape: RoundedRectangleBorder(
                        //       borderRadius: BorderRadius.all(Radius.circular(20))),

                        ),
                    SizedBox(
                      width: 30,
                    ),
                    FloatingActionButton(
                        backgroundColor:Colors.green,
                      onPressed: () {
                        launch('9110');
                      },
                        child: Icon(Icons.call)
                    ),
                  ],
                ),
              )
            ])));
  }
}
