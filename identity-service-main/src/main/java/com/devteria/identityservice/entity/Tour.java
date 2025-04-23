package com.devteria.identityservice.entity;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Tour {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long tourId;

    private String tourName;
    private String description;
    private BigDecimal price;

    // Liên kết đến User (quản lý tour)
    @ManyToOne
    @JoinColumn(name = "manager_id", referencedColumnName = "id")
    private User manager;  // Người quản lý tour (tham chiếu đến bảng users)

    private String companyName;  // Tên công ty quản lý tour (Vietravel, Tourexpress, v.v.)

    private LocalDateTime createdAt = LocalDateTime.now();
    private LocalDateTime updatedAt = LocalDateTime.now();
}
