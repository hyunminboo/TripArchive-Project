package com.example.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.backend.domain.Member;

import java.util.Optional;

public interface MemberRepository  extends JpaRepository<Member,Long> {

    boolean existsByEmail(String email);
    Optional<Member> findByEmail(String email);
    Optional<Member> findByKakaoId(Long kakaoId);
    boolean existsByPhoneAndIdNot(String phone, Long id);
}