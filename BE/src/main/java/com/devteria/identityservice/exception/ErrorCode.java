package com.devteria.identityservice.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;

import lombok.Getter;

@Getter
public enum ErrorCode {
    UNCATEGORIZED_EXCEPTION(9999, "Uncategorized error", HttpStatus.INTERNAL_SERVER_ERROR),
    INVALID_KEY(1001, "Uncategorized error", HttpStatus.BAD_REQUEST),
    USER_EXISTED(1002, "User existed", HttpStatus.BAD_REQUEST),
    USERNAME_INVALID(1003, "Username must be at least {min} characters", HttpStatus.BAD_REQUEST),
    EMAIL_EXISTED(1002, "Email existed", HttpStatus.BAD_REQUEST),
    INVALID_PASSWORD(1004, "Password must be at least {min} characters", HttpStatus.BAD_REQUEST),
    INCORRECT_PASSWORD(1004, "Password incorrect", HttpStatus.BAD_REQUEST),
    DUPLICATE_PASSWORD(1004, "The new password must not be the same as the old password", HttpStatus.BAD_REQUEST),
    USER_NOT_EXISTED(1005, "User not existed", HttpStatus.NOT_FOUND),
    UNAUTHENTICATED(1006, "Unauthenticated", HttpStatus.UNAUTHORIZED),
    UNAUTHORIZED(1007, "You do not have permission", HttpStatus.FORBIDDEN),
    INVALID_DOB(1008, "Your age must be at least {min}", HttpStatus.BAD_REQUEST),
    ROLE_NOT_EXISTED(1009, "Role not existed", HttpStatus.NOT_FOUND),
    PERMISSION_NOT_EXISTED(1010, "Permission not existed", HttpStatus.NOT_FOUND),
    TOUR_NOT_EXISTED(1011, "Tour not found", HttpStatus.NOT_FOUND),
    BOOKING_NOT_EXISTED(1011, "Booking not existed", HttpStatus.NOT_FOUND),
    UPLOAD_FILE_FAILED(1012, "Upload file failed", HttpStatus.BAD_REQUEST),
    DAY_NUMBER_ITINERARY_EXISTED(1013, "Day number of tour existed", HttpStatus.BAD_REQUEST),
    DAY_NUMBER_INVALID(1014, "Invalid day number of tour", HttpStatus.BAD_REQUEST)
    ;

    ErrorCode(int code, String message, HttpStatusCode statusCode) {
        this.code = code;
        this.message = message;
        this.statusCode = statusCode;
    }

    private final int code;
    private final String message;
    private final HttpStatusCode statusCode;
}
