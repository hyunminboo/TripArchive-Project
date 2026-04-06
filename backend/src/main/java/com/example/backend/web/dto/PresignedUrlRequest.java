package com.example.backend.web.dto;

public record PresignedUrlRequest(
        String fileName,
        String contentType
) {
}
