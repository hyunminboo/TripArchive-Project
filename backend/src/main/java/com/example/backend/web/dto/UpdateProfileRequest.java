package com.example.backend.web.dto;

public record UpdateProfileRequest(
        String name,
        String phone
) {
}