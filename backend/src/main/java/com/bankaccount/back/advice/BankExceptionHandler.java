package com.bankaccount.back.advice;

import com.bankaccount.back.exception.NotAllowedException;
import com.bankaccount.back.exception.NotFoundException;
import io.swagger.v3.oas.annotations.Hidden;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;

/**
 * A class responsible for handle exceptions and return a json with the wanted parameters as response.
 */
@Hidden
@RestControllerAdvice
public class BankExceptionHandler {

   /**
    * @param exception the exception to handle {@link MethodArgumentNotValidException}
    * @return a new Map with the name of the wanted field and the message as 400 response
    */
   @ResponseStatus(HttpStatus.BAD_REQUEST)
   @ExceptionHandler(MethodArgumentNotValidException.class)
   public Map<String, String> handleInvalidArgument(MethodArgumentNotValidException exception) {
      Map<String, String> errorMap = new HashMap<>();
      exception.getBindingResult().getFieldErrors().forEach(error -> {
         errorMap.put(error.getField(), error.getDefaultMessage());
      });

      return errorMap;
   }

   /**
    * @param exception the exception to handle {@link NotFoundException}
    * @return a new Map with the field name <em>desc</em> and the wanted message as 404 response
    */
   @ResponseStatus(HttpStatus.NOT_FOUND)
   @ExceptionHandler(NotFoundException.class)
   public Map<String, String> handleInvalidArgument(NotFoundException exception) {
      Map<String, String> errorMap = new HashMap<>();
      errorMap.put("desc", exception.getMessage());

      return errorMap;
   }

   /**
    * @param exception the exception to handle {@link NotAllowedException}
    * @return a new Map with the name of the wanted field and the message as 400 response
    */
   @ResponseStatus(HttpStatus.BAD_REQUEST)
   @ExceptionHandler(NotAllowedException.class)
   public Map<String, String> handleInvalidArgument(NotAllowedException exception) {
      Map<String, String> errorMap = new HashMap<>();
      errorMap.put(exception.getField(), exception.getMessage());

      return errorMap;
   }

}
