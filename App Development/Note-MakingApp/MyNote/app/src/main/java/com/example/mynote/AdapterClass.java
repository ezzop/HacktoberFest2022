package com.example.mynote;

import android.content.Context;
import android.content.Intent;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;
import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;
import java.util.ArrayList;

public class AdapterClass extends RecyclerView.Adapter<AdapterClass.Viewholder>{
    private Context context;
    private ArrayList<ModalClass> ModalArrayList;

    public AdapterClass(Context context, ArrayList<ModalClass> ModelArrayList) {
        this.context = context;
        this.ModalArrayList=ModelArrayList;
    }

    @NonNull
    @Override
    public AdapterClass.Viewholder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext()).inflate(R.layout.card_layout, parent, false);
        return new Viewholder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull AdapterClass.Viewholder holder, int position) {
        ModalClass model= ModalArrayList.get(position);
        holder.title.setText(model.getTitle());
        holder.date.setText(model.getDate());

        holder.itemView.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent intent=new Intent(context,edit_notes.class);
                intent.putExtra("title",model.getTitle());
                intent.putExtra("description",model.getContent());
                context.startActivity(intent);
            }
        });

    }

    @Override
    public int getItemCount() {
        return ModalArrayList.size();
    }

    public class Viewholder extends RecyclerView.ViewHolder {
        private TextView title;
        private TextView date;
        public Viewholder(@NonNull View itemView) {
            super(itemView);
            title=itemView.findViewById(R.id.Title);
            date=itemView.findViewById(R.id.date);
        }
    }

}
