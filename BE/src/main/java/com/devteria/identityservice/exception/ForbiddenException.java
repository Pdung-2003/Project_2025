package com.devteria.identityservice.exception;

public class ForbiddenException extends RuntimeException{
    public ForbiddenException(String mess){
        super(mess);
    }
}
