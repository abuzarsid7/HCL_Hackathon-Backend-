package com.generics.exception;

public class EmailAlreadyExits extends RuntimeException {
    public EmailAlreadyExits(String message)
    {
        super(message);
    }
}
