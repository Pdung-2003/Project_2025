package com.devteria.identityservice.service;

import com.devteria.identityservice.entity.Booking;
import com.devteria.identityservice.entity.Tour;
import com.devteria.identityservice.entity.User;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import java.util.HashMap;
import java.util.Locale;
import java.util.Map;

@Slf4j(topic = "Email-Service")
@Service
@RequiredArgsConstructor
public class EmailService {

    private final JavaMailSender emailSender;
    private final TemplateEngine templateEngine;

    public void sendEmail(String to, String subject, Map<String, Object> model, String templateName) {
        MimeMessage message = emailSender.createMimeMessage();
        try {
            MimeMessageHelper helper = new MimeMessageHelper(message, true);
            helper.setTo(to);
            helper.setSubject(subject);

            String content = templateEngine.process(templateName, new Context(Locale.getDefault(), model));
            helper.setText(content, true);

            emailSender.send(message);
        } catch (MessagingException e) {
            log.error("Can't send email: {}", e.getMessage());
        }
    }

    @Async("taskExecutor")
    public void sendEmailConfirmHoldTicket(User user, Tour tour, Booking booking) {
        String subject = String.format("Xác nhận giữ chỗ: %s", tour.getTourName());
        Map<String, Object> model = new HashMap<>();
        model.put("customerName", user.getFullName());
        model.put("email", user.getEmail());
        model.put("phone", user.getPhoneNumber());
        model.put("bookingCode", booking.getBookingCode());
        model.put("tourName", tour.getTourName());
        model.put("location", tour.getLocation());
        model.put("startDate", tour.getStartDate());
        model.put("endDate", tour.getEndDate());
        model.put("numAdults", booking.getNumberOfPeople());
        model.put("subtotal", booking.getPriceBooking());
        model.put("discount", 0);
        model.put("total", booking.getPriceBooking());
        this.sendEmail(user.getEmail(), subject, model, "booking-confirm-template");
    }
}
