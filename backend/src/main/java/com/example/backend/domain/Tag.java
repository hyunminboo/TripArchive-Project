package com.example.backend.domain;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(
        name = "tags",
        uniqueConstraints = @UniqueConstraint(
                name = "uk_member_tag_label",
                columnNames = {"member_id","label"}
        )
)
public class Tag {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @ManyToOne(fetch = FetchType.LAZY,optional = false)
    @JoinColumn(name = "member_id",nullable = false)
    private Member member;

    @Column(nullable = false,length = 50)
    private String label;

    @ManyToMany(mappedBy = "tags")
    private Set<Post> posts = new HashSet<>();

    @Column(nullable = false)
    private LocalDateTime createdAt;

    @Column(nullable = false)
    private LocalDateTime updatedAt;

    @PrePersist
    public void onCreate(){
        this.createdAt = LocalDateTime.now();
        this.updatedAt=this.createdAt;
    }
    @PreUpdate
    public void onUpdate(){
        this.updatedAt=LocalDateTime.now();
    }

    public Tag(Member member,String label){
        this.member= member;
        this.label=label;
    }
}