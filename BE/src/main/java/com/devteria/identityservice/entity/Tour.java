package com.devteria.identityservice.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Tour {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long tourId;

    private String tourCode;

    private String tourName;

    private String tourBanner;

    private String description;

    private BigDecimal price;

    // Liên kết đến User (quản lý tour)
    @ManyToOne
    @JoinColumn(name = "manager_id", referencedColumnName = "id")
    private User manager;  // Người quản lý tour (tham chiếu đến bảng users)

    private String companyName;  // Tên công ty quản lý tour (Vietravel, Tourexpress, v.v.)

    private String location; // Địa điểm (ví dụ: Đà Nẵng, Paris, Tokyo)

    private Integer totalTicket; // Tổng số lượng vé

    private Integer availableTicket; // Số vé còn lại

    private Integer soldTicket;

    private LocalDate startDate; // Ngày bắt đầu tour

    private LocalDate endDate; // Ngày kết thúc tour

    @CreationTimestamp
    private Timestamp createdAt;

    @UpdateTimestamp
    private Timestamp updatedAt;

}
