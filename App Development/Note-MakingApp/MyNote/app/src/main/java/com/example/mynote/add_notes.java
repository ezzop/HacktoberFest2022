package com.example.mynote;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

public class add_notes extends AppCompatActivity {

    Button addnote_button;
    private EditText edit_title, edit_description,edit_date;
    private Database_Manager dbhandler;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_add_notes);
        addnote_button=findViewById(R.id.add_button);
        dbhandler=new Database_Manager(getApplicationContext());

        edit_title=findViewById(R.id.add_title);
        edit_description=findViewById(R.id.add_content);
        edit_date=findViewById(R.id.date);
        addnote_button.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                String title=edit_title.getText().toString();
                String description=edit_description.getText().toString();
                String date=edit_date.getText().toString();

                if (title.isEmpty() || description.isEmpty() || date.isEmpty()) {
                    Toast.makeText(getApplicationContext(), "Please enter all the data", Toast.LENGTH_SHORT).show();
                    return;
                }

                dbhandler.addNewNote(title, date, description);

                Toast.makeText(getApplicationContext(), "Note has been added.", Toast.LENGTH_SHORT).show();
                Intent i = new Intent(add_notes.this, MainActivity.class);
                finish();
                startActivity(i);
            }
        });
    }


}