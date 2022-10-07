package com.example.mynote;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;

public class edit_notes extends AppCompatActivity {
    private EditText edit_title;
    private EditText edit_description;
    private Button update_but,delete_but;
    private Database_Manager dbobject;
    String title,description;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_edit_notes);
        edit_title=findViewById(R.id.edit_title);
        edit_description=findViewById(R.id.edit_desc);
        update_but=findViewById(R.id.edit);
        delete_but=findViewById(R.id.delete);
        dbobject=new Database_Manager(edit_notes.this);

        title=getIntent().getStringExtra("title");
        description=getIntent().getStringExtra("description");

        edit_title.setText(title);
        edit_description.setText(description);

        update_but.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                dbobject.updateNote(title,edit_title.getText().toString(),edit_description.getText().toString());
                Intent i = new Intent(edit_notes.this, MainActivity.class);
                finish();
                startActivity(i);

            }
        });
        delete_but.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                dbobject.deleteNote(title);
                Intent i = new Intent(edit_notes.this, MainActivity.class);
                finish();
                startActivity(i);

            }
        });
    }
}