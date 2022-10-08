import 'package:flutter/material.dart';

class bizcard extends StatefulWidget {
  @override
  _bizcardState createState() => _bizcardState();
}

class _bizcardState extends State<bizcard> {
  int index = 0;
  List quotes = [
    "Be yourself everyone else is already taken.",
    "You've gotta dance like there's nobody watching,Love like you'll never be hurt,Sing like there's nobody listening,And live like it's heaven on earth.",
    "Be the change that you wish to see in the world.",
    "No one can make you feel inferior without your consent.",
    "Live as if you were to die tomorrow. Learn as if you were to live forever.",
    "Stay Hungry. Stay Foolish."
  ];
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        alignment: Alignment.center,
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            Text(" Quote..\n "),
            Container(
                width: 300,
                height: 150,
                margin: EdgeInsets.all(10.0),
                decoration: BoxDecoration(
                  color: Colors.blue[300],
                  borderRadius: BorderRadius.circular(14.5),
                ),
                child: Center(child: Text(quotes[index % quotes.length],style: TextStyle(
                  color: Colors.white,
                  fontSize: 16,
                  fontStyle: FontStyle.italic,
                  

                ),)
                )),
            Divider(
              thickness: 1.8,
            ),
            Padding(
              padding: const EdgeInsets.only(top: 18.0),
              child: FlatButton.icon(
                  onPressed: qchange,
                  color: Colors.blue,
                  icon: Icon(Icons.wb_sunny),
                  label: Text(
                    "Inspire me!",
                    style: TextStyle(
                      fontSize: 18,
                      color: Colors.white,
                    ),
                  )),
            ),
          ],
        ),
      ),
    );
  }

  void qchange() {
    setState(() {
      index = index + 1;
    });
  }
}
