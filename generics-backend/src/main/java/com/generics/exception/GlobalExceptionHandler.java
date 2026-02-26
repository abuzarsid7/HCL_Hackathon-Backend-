package com.generics.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
//import org.springframework.web.ErrorResponse;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import com.generics.dto.Response.ErrorResponse;
import java.time.LocalDateTime;

@ControllerAdvice
public class GlobalExceptionHandler
{
    @ExceptionHandler(EmailAlreadyExits.class)
    public ResponseEntity<ErrorResponse> handleEmailExists(
            EmailAlreadyExits ex) {

        ErrorResponse error = new ErrorResponse(
                ex.getMessage(),
                HttpStatus.BAD_REQUEST.value(),
                LocalDateTime.now()
        );

        return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
    }

}
