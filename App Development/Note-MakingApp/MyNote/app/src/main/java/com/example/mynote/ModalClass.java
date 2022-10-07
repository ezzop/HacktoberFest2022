package com.example.mynote;

public class ModalClass {
    private String title;
    private String date;
    private String content;

    public ModalClass(String title, String date, String content) {
        this.title=title;
        this.date=date;
        this.content=content;
    }

    public String getTitle() {
        return title;
    }

    public String getContent() {
        return content;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getDate() {
        return date;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setContent(String content) {
        this.content = content;
    }
}
