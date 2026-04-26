package com.example.backend.web.dto;

import java.util.List;

public record UpdatePostTagsRequest(
        List<String> tags
) {
}