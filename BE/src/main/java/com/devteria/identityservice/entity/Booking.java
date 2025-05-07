package com.devteria.identityservice.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

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

    @Column(name = "booking_code", nullable = false)
    private String bookingCode;

    @Column(nullable = false)
    private Integer numberOfPeople;

//    @Column(nullable = false)
//    private LocalDate bookingDate; // Ngày tạo đơn đặt tour

    @Column(nullable = false)
    private BigDecimal priceBooking;

    @Column(nullable = false)
    private LocalDate tourDate; // Ngày người dùng muốn đi tour (rất quan trọng)

    @Enumerated(EnumType.STRING)
    private Status status;

    private Boolean isTicketSent = false; // Đã gửi vé qua email chưa

    private String ticketUrl; // Link vé PDF (nếu có)

    @OneToOne(mappedBy = "booking", cascade = CascadeType.ALL)
    private Payment payments;

    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;

    @Column(length = 4096)
    private String requireFromCustomer;

    public enum Status {
        PENDING,       // Chưa xác nhận
        CONFIRMED,     // Đã xác nhận tour
        PAID,          // Đã thanh toán
        CANCELLED      // Bị hủy
    }
}
