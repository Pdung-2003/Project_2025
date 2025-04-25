package com.devteria.identityservice.entity;

import jakarta.persistence.Entity;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import jakarta.persistence.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Interest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;  // Khóa chính

    private String interestName;  // Tên sở thích

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;  // Liên kết tới User
}
