package com.plantapp.controller;

import com.plantapp.model.ChatRequest;
import com.plantapp.model.ChatResponse;
import com.plantapp.service.GeminiService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class ChatController {

    private final GeminiService geminiService;

    public ChatController(GeminiService geminiService) {
        this.geminiService = geminiService;
    }

    @PostMapping("/chat")
    public ResponseEntity<ChatResponse> chat(@RequestBody ChatRequest chatRequest) {
        ChatResponse response = geminiService.askGemini(chatRequest.getMessage());
        return ResponseEntity.ok(response);
    }
}


