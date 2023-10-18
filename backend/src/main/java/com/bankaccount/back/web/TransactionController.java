package com.bankaccount.back.web;

import com.bankaccount.back.constants.TransactionType;
import com.bankaccount.back.domain.service.TransactionService;
import com.bankaccount.back.domain.service.TransactionTypeService;
import com.bankaccount.back.helpers.Messages;
import com.bankaccount.back.persistence.entity.TransactionEntity;
import com.bankaccount.back.web.dto.DateDto;
import com.bankaccount.back.web.dto.TransactionDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Locale;

@RestController
@RequestMapping("/transactions")
public class TransactionController {

   @Autowired
   private TransactionService transactionService;

   @Autowired
   private TransactionTypeService transactionTypeService;

   @GetMapping("/{id}")
   public ResponseEntity<TransactionEntity> getTransactionById(@PathVariable long id) {
      return transactionService.getTransactionById(id)
              .map(transaction -> new ResponseEntity<>(transaction, HttpStatus.OK))
              .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
   }

   @GetMapping("/account")
   public ResponseEntity<Page<TransactionEntity>> getByIdAccount(@RequestParam(name = "id") int idAccount, @RequestParam int page) {
      Page<TransactionEntity> pageable = transactionService.getByIdAccount(idAccount, page).get();

      if (!pageable.isEmpty()) {
         return new ResponseEntity<>(pageable, HttpStatus.OK);
      }

      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
   }

   @PostMapping("/filter")
   public ResponseEntity<Page<TransactionEntity>> getByFilter(
           @RequestParam(name = "id") int idAccount,
           @RequestParam(name = "type", required = false) TransactionType transactionType,
           @RequestParam(required = false) String name,
           @RequestBody @Valid DateDto dateDto,
           @RequestParam int page) {

      Page<TransactionEntity> transactionDomainList = transactionService.getByFilter(
              idAccount, transactionType, name, dateDto, page).get();

      if (!transactionDomainList.isEmpty()) {
         return new ResponseEntity<>(transactionDomainList, HttpStatus.OK);
      }

      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
   }

   @PostMapping(value = "/save", consumes = {"application/json"})
   public ResponseEntity<String> saveDepositTransaction(
           @RequestHeader(HttpHeaders.ACCEPT_LANGUAGE) final Locale locale,
           @RequestBody @Valid TransactionDto transactionDto) throws Exception {
      transactionTypeService.saveTransaction(transactionDto, false, locale);
      return new ResponseEntity<>(
              Messages.getMessageForLocale("controller.transaction.success", locale),
              HttpStatus.CREATED);
   }
}
