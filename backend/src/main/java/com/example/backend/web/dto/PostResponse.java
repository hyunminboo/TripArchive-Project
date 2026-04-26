package com.example.backend.web.dto;

import com.example.backend.domain.Post;
import com.example.backend.domain.PostCategory;

import java.time.LocalDateTime;
import java.util.List;

public record PostResponse(
        Long id,
        PostCategory category,
        String title,
        String content,
        String imageUrl,
        List<String> tags,
        Long memberId,
        String memberName,
        LocalDateTime createdAt
) {

    public static PostResponse from(Post post) {
        return new PostResponse(
                post.getId(),
                post.getCategory(),
                post.getTitle(),
                post.getContent(),
                post.getImageUrl(),
                post.getTags().stream()
                        .map(tag -> tag.getLabel())
                        .toList(),
                post.getMember().getId(),
                post.getMember().getName(),
                post.getCreatedAt()
        );
    }
}