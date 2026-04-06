package com.example.backend.web.dto;

public record LoginRequest(
        String email,
        String password
) {
}
