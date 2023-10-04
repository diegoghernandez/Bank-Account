package com.bankaccount.back.advice;

import com.bankaccount.back.exception.NotAllowedException;
import com.bankaccount.back.exception.NotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class BankExceptionHandler {

   @ResponseStatus(HttpStatus.BAD_REQUEST)
   @ExceptionHandler(MethodArgumentNotValidException.class)
   public Map<String, String> handleInvalidArgument(MethodArgumentNotValidException exception) {
      Map<String, String> errorMap = new HashMap<>();
      exception.getBindingResult().getFieldErrors().forEach(error -> {
         errorMap.put(error.getField(), error.getDefaultMessage());
      });

      return errorMap;
   }

   @ResponseStatus(HttpStatus.NOT_FOUND)
   @ExceptionHandler(NotFoundException.class)
   public Map<String, String> handleInvalidArgument(NotFoundException exception) {
      Map<String, String> errorMap = new HashMap<>();
      errorMap.put("desc", exception.getMessage());

      return errorMap;
   }

   @ResponseStatus(HttpStatus.BAD_REQUEST)
   @ExceptionHandler(NotAllowedException.class)
   public Map<String, String> handleInvalidArgument(NotAllowedException exception) {
      Map<String, String> errorMap = new HashMap<>();
      errorMap.put(exception.getField(), exception.getMessage());

      return errorMap;
   }

}
