package com.example.backend.web.dto;

import com.example.backend.domain.PostCategory;

public record UpdatePostRequest(
        PostCategory category,
        String title,
        String content,
        String imageUrl
) {
}
