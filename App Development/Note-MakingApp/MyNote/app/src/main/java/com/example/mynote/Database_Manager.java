package com.example.mynote;

import android.content.ContentValues;
import android.content.Context;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteOpenHelper;

import androidx.annotation.Nullable;

import java.util.ArrayList;

public class Database_Manager extends SQLiteOpenHelper {
    private static final String dbname="MyNotes";
    private static final String dbtable="Notes";
    private static final String colId="ID";
    private static final String colTitle="Title";
    private static final String coldate="Date";
    private static final String coldesc="Description";
    private static final int dbVersion=1;
    String create_query="CREATE TABLE IF NOT EXISTS "+dbtable+"("+colId+" INTEGER PRIMARY KEY AUTOINCREMENT,"+colTitle+" TEXT, "+coldate+" DATE,"+coldesc+" TEXT);";

    public Database_Manager(@Nullable Context context) {
        super(context, dbname, null, dbVersion);
    }

    @Override
    public void onCreate(SQLiteDatabase sqLiteDatabase) {
        sqLiteDatabase.execSQL(create_query);
    }

    public void addNewNote(String Title, String date, String description ){
        SQLiteDatabase db = this.getWritableDatabase();
        ContentValues values = new ContentValues();

        values.put(colTitle, Title);
        values.put(coldate, date);
        values.put(coldesc, description);

        db.insert(dbtable,null,values);
        db.close();
    }


    @Override
    public void onUpgrade(SQLiteDatabase sqLiteDatabase, int i, int i1) {
        sqLiteDatabase.execSQL("DROP TABLE IF EXISTS " + dbtable);
        onCreate(sqLiteDatabase);
    }

    public ArrayList<ModalClass> listnotes(){
        SQLiteDatabase db=this.getReadableDatabase();
        Cursor cursor=db.rawQuery("SELECT * FROM "+dbtable,null);

        ArrayList<ModalClass> notes_list=new ArrayList<>();

        //Make some changes here https://www.geeksforgeeks.org/how-to-read-data-from-sqlite-database-in-android/
        if (cursor.moveToFirst()){
            do {
                notes_list.add(new ModalClass(cursor.getString(1), cursor.getString(2),cursor.getString(3) ));
            } while(cursor.moveToNext());
        }
        cursor.close();
        return notes_list;
    }
    public void updateNote(String originalTitle, String title, String description){
        SQLiteDatabase db = this.getWritableDatabase();
        ContentValues values = new ContentValues();

        values.put(colTitle,title);
        values.put(coldesc,description);

        db.update(dbtable,values,"Title=?",new String[] {originalTitle});
        db.close();
    }
    public void deleteNote(String title){
        SQLiteDatabase db = this.getWritableDatabase();
        db.delete(dbtable, "Title=?", new String[]{title});
        db.close();
    }

}
