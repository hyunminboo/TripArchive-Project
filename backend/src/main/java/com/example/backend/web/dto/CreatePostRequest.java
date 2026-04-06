package com.example.backend.web.dto;

import com.example.backend.domain.PostCategory;

public record CreatePostRequest(
        PostCategory category,
        String title,
        String content,
        String imageUrl
) {
}
