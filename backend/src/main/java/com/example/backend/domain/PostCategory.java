package com.example.backend.domain;

public enum PostCategory {

    Europe("유럽"),
    Asia("아시아"),
    Africa("아프리카"),
    NorthAmerica("북아메리카"),
    SouthAmerica("남아메리카"),
    Antarctica("남극");

    private final String label;

    PostCategory(String label) {
        this.label = label;
    }

}