package com.example.backend.web.dto;

import com.example.backend.domain.MemberStatus;

public record ChangeStatusRequest(
        MemberStatus status
) {
}
