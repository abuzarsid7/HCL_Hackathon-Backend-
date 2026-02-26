package com.generics.exception;

public class InvalidDetails extends RuntimeException
{
    public InvalidDetails(String message)
    {
        super(message);
    }
}
