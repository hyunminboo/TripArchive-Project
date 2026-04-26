package com.example.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.backend.domain.Post;

import java.util.List;

public interface PostRepository extends JpaRepository<Post,Long> {

    List<Post> findAllByOrderByCreatedAtDesc();

    List<Post> findByMember_IdOrderByCreatedAtDesc(Long memberId);

    List<Post> findByTags_Id(Long tagId);
}
