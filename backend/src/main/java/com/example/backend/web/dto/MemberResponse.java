package com.example.backend.web.dto;

import com.example.backend.domain.Member;
import com.example.backend.domain.MemberStatus;
import org.springframework.http.ResponseEntity;

import java.time.LocalDateTime;
import java.util.Optional;

public record MemberResponse (
        Long id,
        String name,
        String email,
        String phone,
        MemberStatus status,
        boolean emailVerified,
        LocalDateTime createdAt
) {
    public static MemberResponse from(Member m){
        return new MemberResponse(
                m.getId(),
                m.getName(),
                m.getEmail(),
                m.getPhone(),
                m.getStatus(),
                m.isEmailVerified(),
                m.getCreatedAt()
        );
    }


}
