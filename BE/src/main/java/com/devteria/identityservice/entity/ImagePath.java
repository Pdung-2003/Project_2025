package com.devteria.identityservice.entity;

import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;
import java.time.LocalDateTime;

@Entity
@Table
@Getter
@Setter
@ToString
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ImagePath implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "file_name", nullable = false)
    private String fileName;

    private String title;

    @Column(name = "url", nullable = false, unique = true)
    private String url;

    @Column(name = "uploaded_at", nullable = false)
    private LocalDateTime uploadedAt;

    private Long referenceId;

    @Enumerated(EnumType.STRING)
    private ReferenceEntity referenceType;

    public enum ReferenceEntity{
        TOUR,
        FEEDBACK,
        ITINERARY
    }
}
