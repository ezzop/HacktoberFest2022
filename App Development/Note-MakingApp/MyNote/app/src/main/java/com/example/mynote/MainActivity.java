package com.example.mynote;

import androidx.appcompat.app.AppCompatActivity;
import androidx.cardview.widget.CardView;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;

import java.util.ArrayList;

public class MainActivity extends AppCompatActivity {
    private RecyclerView notesRV;
    private ArrayList<ModalClass> notesArrayList;
    private Database_Manager dbhandler;
    Button add_bu;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        notesRV=findViewById(R.id.notesRV);
        notesArrayList= new ArrayList<>();
        dbhandler=new Database_Manager(MainActivity.this);

        notesArrayList=dbhandler.listnotes();


        AdapterClass Adapter= new AdapterClass(this, notesArrayList);
        LinearLayoutManager linearLayoutManager = new LinearLayoutManager(this, LinearLayoutManager.VERTICAL, false);

        add_bu=findViewById(R.id.plus_button);
        notesRV.setLayoutManager(linearLayoutManager);
        notesRV.setAdapter(Adapter);


        add_bu.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent intent= new Intent(getApplicationContext(),add_notes.class);
                startActivity(intent);
                finish();
            }
        });

    }
}