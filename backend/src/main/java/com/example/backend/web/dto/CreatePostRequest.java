package com.example.backend.web.dto;

import com.example.backend.domain.PostCategory;

import java.util.List;

public record CreatePostRequest(
        PostCategory category,
        String title,
        String content,
        String imageUrl,
        List<String> tags
) {
}
