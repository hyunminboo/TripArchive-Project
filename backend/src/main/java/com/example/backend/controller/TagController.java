package com.example.backend.controller;


import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import com.example.backend.service.TagService;
import com.example.backend.web.dto.CreateTagRequest;
import com.example.backend.web.dto.TagResponse;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/tags")
public class TagController {
    private final TagService tagService;

    @GetMapping
    public List<TagResponse> myTags(HttpSession session){
        return tagService.findMyTags(session);
    }

    @PostMapping
    public  TagResponse createTag(@RequestBody CreateTagRequest request, HttpSession session){
        return tagService.createTag(session, request.label());
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id, HttpSession session){
        tagService.delete(session,id);
    }
}