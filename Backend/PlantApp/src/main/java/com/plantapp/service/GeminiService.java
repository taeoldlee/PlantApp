package com.plantapp.service;

import com.plantapp.model.ChatResponse;
import com.plantapp.model.ChatResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.logging.Logger;

@Service
public class GeminiService {

    @Value("${GEMINI_API_KEY}")
    private String apiKey;

    private static final Logger logger = Logger.getLogger(GeminiService.class.getName());

    public ChatResponse askGemini(String message, List<String> context) {
        RestTemplate restTemplate = new RestTemplate();
        String[] contextArray = {"Tomato Plant", "Sunlower", "Rose", "Cactus", "Lily"};
        String system_prompt = "You are a Tomato Plant within an app made to teach children about the importance " +
                "of reducing plastic waste and lessening the impacts of global warming through plant education. When " +
                "prompted, please respond as if you are a Tomato plant.";

        String url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=" + apiKey;

        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("contents", new Object[]{
                Map.of("parts", new Object[] {Map.of("text", message + system_prompt)})
        });
        if (context != null && !context.isEmpty()) {
            requestBody.put("context", system_prompt);
        }

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);
        ResponseEntity<Map> response = restTemplate.postForEntity(url, entity, Map.class);
        Map<String, Object> responseBody = response.getBody();
        if (responseBody != null) {
            if (responseBody.containsKey("candidates")) {
                List<Map<String, Object>> candidates = (List<Map<String, Object>>) responseBody.get("candidates");
                if (!candidates.isEmpty()) {
                    Map<String, Object> content = (Map<String, Object>) candidates.get(0).get("content");
                    List<Map<String, String>> parts = (List<Map<String, String>>) content.get("parts");
                    if (!parts.isEmpty()) {
                        String textResponse = parts.get(0).get("text");
                        return new ChatResponse(textResponse);
                    }
                }
            }
            logger.severe("Invalid response from API: 'candidates' key is missing or empty. Response: " + responseBody);
            throw new RuntimeException("Invalid response from API: 'candidates' key is missing or empty");
        } else {
            logger.severe("Invalid response from API: Response body is null");
            throw new RuntimeException("Invalid response from API: Response body is null");
        }
    }
}












//package com.plantapp.service;
//
//import com.plantapp.model.ChatResponse;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.http.HttpEntity;
//import org.springframework.http.HttpHeaders;
//import org.springframework.http.MediaType;
//import org.springframework.http.ResponseEntity;
//import org.springframework.stereotype.Service;
//import org.springframework.web.client.RestTemplate;
//
//import java.util.HashMap;
//import java.util.List;
//import java.util.Map;
//import java.util.logging.Logger;
//
//@Service
//public class GeminiService {
//
//    @Value("${GEMINI_API_KEY}")
//    private String apiKey;
//
//    private static final Logger logger = Logger.getLogger(GeminiService.class.getName());
//
//    public ChatResponse askGemini(String message) {
//        RestTemplate restTemplate = new RestTemplate();
//
//        String url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=" + apiKey;
//
//        Map<String, Object> requestBody = new HashMap<>();
//        requestBody.put("contents", new Object[]{
//                Map.of("parts", new Object[] {Map.of("text", message)})
//        });
//
//        HttpHeaders headers = new HttpHeaders();
//        headers.setContentType(MediaType.APPLICATION_JSON);
//
//        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);
//        ResponseEntity<Map> response = restTemplate.postForEntity(url, entity, Map.class);
//
//        Map<String, Object> responseBody = response.getBody();
//        if (responseBody != null) {
//            if (responseBody.containsKey("candidates")) {
//                List<Map<String, Object>> candidates = (List<Map<String, Object>>) responseBody.get("candidates");
//                if (!candidates.isEmpty()) {
//                    Map<String, Object> content = (Map<String, Object>) candidates.get(0).get("content");
//                    List<Map<String, String>> parts = (List<Map<String, String>>) content.get("parts");
//                    if (!parts.isEmpty()) {
//                        String textResponse = parts.get(0).get("text");
//                        return new ChatResponse(textResponse);
//                    }
//                }
//            }
//            logger.severe("Invalid response from API: 'candidates' key is missing or empty. Response: " + responseBody);
//            throw new RuntimeException("Invalid response from API: 'candidates' key is missing or empty");
//        } else {
//            logger.severe("Invalid response from API: Response body is null");
//            throw new RuntimeException("Invalid response from API: Response body is null");
//        }
//    }
//}