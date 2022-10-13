import 'package:flutter/material.dart';
import 'package:url_launcher/url_launcher.dart';
class Call extends StatefulWidget {
  const Call({Key? key}) : super(key: key);

  @override
  _CallState createState() => _CallState();
}

class _CallState extends State<Call> {
  TextEditingController caller = new TextEditingController();

  @override
  void initState() {
    caller = new TextEditingController();
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold( backgroundColor: Color(0x6f1e2a79),
      body:
    Column(children: [
      Center(
        child: Padding(
          padding: const EdgeInsets.only(top: 100.0,left: 30,right: 30),
          child: TextField( controller: caller,
            decoration: InputDecoration(
                border: OutlineInputBorder(
                  borderRadius: const BorderRadius.all(
                    Radius.circular(15.0),
                  ),
                ),
                filled: true,
                hintStyle: new TextStyle(color: Colors.grey[600]),
                hintText: "+12345678",
                fillColor: Colors.white),
          ),
        ),
      ),SizedBox(height: 30,),
      ElevatedButton(
        onPressed: () {
          String phoneno = 'tel:' + caller.text;
          launch(phoneno);
        },
        style: ElevatedButton.styleFrom(primary: Color(0xffee06cc),
          shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.all(Radius.circular(20))),
        ),
        child: Text("Call"),
      )
    ],),);
  }




}