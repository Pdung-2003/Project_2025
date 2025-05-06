package com.devteria.identityservice.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.time.LocalDate;
import java.util.List;

@Entity
@Builder
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class Tour {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long tourId;

    private String tourCode;

    @Column(nullable = false)
    private String tourName;

    @Column(length = 4096)
    private String tourBanner;

    @Column(columnDefinition = "TEXT")
    private String description;

    private String duration;

    @Column(nullable = false, length = 4096)
    private String location; // Địa điểm (ví dụ: Đà Nẵng, Paris, Tokyo)

    @Column(nullable = false, length = 4096)
    private String destination;

    @Column(nullable = false)
    private BigDecimal price;

    @Column(nullable = false)
    private Integer maxCapacity;

    @Column(nullable = false)
    private Integer currentBooked = 0;

    private Double discount;

    private LocalDate startDate; // Ngày bắt đầu tour

    private LocalDate endDate; // Ngày kết thúc tour

    @Column(length = 2048)
    private String companyName;  // Tên công ty quản lý tour (Vietravel, Tourexpress, v.v.)

    // Liên kết đến User (quản lý tour)
    @ManyToOne
    @JoinColumn(name = "manager_id", referencedColumnName = "id")
    private User manager;  // Người quản lý tour (tham chiếu đến bảng users)

    @OneToMany(mappedBy = "tour", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    @ToString.Exclude
    private List<Itinerary> tourItineraries;

    @CreationTimestamp
    private Timestamp createdAt;

    @UpdateTimestamp
    private Timestamp updatedAt;

    @Enumerated(EnumType.STRING)
    private Status status;

    public enum Status {
        ACTIVE, INACTIVE, CANCELLED
    }
}
