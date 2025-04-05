package com.plantapp.service;

import com.plantapp.model.ChatResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.HttpHeaders;

import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

@Service
public class GeminiService {
    @Value("${gemini.api-key}")
    private static String apiKey;

    public static ChatResponse askGemini(String message) {
        RestTemplate restTemplate = new RestTemplate();

        String url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=" + apiKey;

        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("contents", new Object[]{
                Map.of("parts", new Object[] {Map.of("text", message)})
        } );

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);
        ResponseEntity<Map> response = restTemplate.postForEntity(url, entity, Map.class);

        String textResponse = Objects.requireNonNull(response.getBody()).get("contents").toString();

        return new ChatResponse(textResponse);

    }

}
