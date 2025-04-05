package com.plantapp.model;

public class ChatResponse {
    private String responseMessage;

    public ChatResponse(String responseMessage) {
        this.responseMessage = responseMessage;
    }
    // Getters and setters
    public String getResponseMessage() {
        return responseMessage;
    }

    public void setResponseMessage(String responseMessage) {
        this.responseMessage = responseMessage;
    }
}