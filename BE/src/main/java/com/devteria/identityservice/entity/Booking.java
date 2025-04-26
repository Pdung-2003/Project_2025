package com.devteria.identityservice.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.sql.Timestamp;
import java.time.LocalDate;
import java.util.List;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer bookingId;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User customer;

    @ManyToOne
    @JoinColumn(name = "tour_id", nullable = false)
    private Tour tour;

    private Integer numberOfPeople;

    private LocalDate bookingDate; // Ngày tạo đơn đặt tour

    private LocalDate tourDate; // Ngày người dùng muốn đi tour (rất quan trọng)

    @Enumerated(EnumType.STRING)
    private Status status;

    private Boolean isTicketSent = false; // Đã gửi vé qua email chưa

    private String ticketUrl; // Link vé PDF (nếu có)

    @OneToMany(mappedBy = "booking", cascade = CascadeType.ALL)
    private List<Payment> payments;

    @CreationTimestamp
    private Timestamp createdAt;

    @UpdateTimestamp
    private Timestamp updatedAt;

    public enum Status {
        PENDING,       // Chưa xác nhận
        CONFIRMED,     // Đã xác nhận tour
        PAID,          // Đã thanh toán
        CANCELLED      // Bị hủy
    }
}
