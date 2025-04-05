package com.plantapp.model;

import java.util.List;

public class ChatRequest {

    public String message;
    private List<String> context;

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public List<String> getContext() {
        return context;
    }

    public void setContext(List<String> context) {
        this.context = context;
    }




}
