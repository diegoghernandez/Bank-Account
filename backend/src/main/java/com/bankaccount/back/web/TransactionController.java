package com.bankaccount.back.web;

import com.bankaccount.back.constants.TransactionType;
import com.bankaccount.back.domain.service.TransactionService;
import com.bankaccount.back.domain.service.TransactionTypeService;
import com.bankaccount.back.helpers.Messages;
import com.bankaccount.back.persistence.entity.TransactionEntity;
import com.bankaccount.back.web.dto.DateDto;
import com.bankaccount.back.web.dto.TransactionDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.enums.ParameterIn;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
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
@Tag(name = "Transaction", description = "The transaction API")
public class TransactionController {

   @Autowired
   private TransactionService transactionService;

   @Autowired
   private TransactionTypeService transactionTypeService;

   @Operation(
           summary = "Get by id",
           description = "Get the transaction with the specific id",
           responses = {
                   @ApiResponse(
                           responseCode = "200",
                           description = "Success",
                           content = @Content(
                                   mediaType = "application/json",
                                   schema = @Schema(implementation = TransactionEntity.class)
                           )
                   ),
                   @ApiResponse(
                           responseCode = "404",
                           description = "Transaction not found",
                           content = @Content
                   ),
                   @ApiResponse(
                           responseCode = "403",
                           description = "Unauthorized | Invalid Token",
                           content = @Content
                   )
           }
   )
   @GetMapping("/{id}")
   public ResponseEntity<TransactionEntity> getTransactionById(
           @Parameter(description = "id of transaction to be searched") @PathVariable long id) {
      return transactionService.getTransactionById(id)
              .map(transaction -> new ResponseEntity<>(transaction, HttpStatus.OK))
              .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
   }

   @Operation(
           summary = "Get transactions by account id",
           description = "Get transactions with the specific account id",
           responses = {
                   @ApiResponse(
                           responseCode = "200",
                           description = "Success"
                   ),
                   @ApiResponse(
                           responseCode = "404",
                           description = "Transactions not found",
                           content = @Content
                   ),
                   @ApiResponse(
                           responseCode = "403",
                           description = "Unauthorized | Invalid Token",
                           content = @Content
                   )
           }
   )
   @GetMapping(value = "/account", produces = {"application/json"})
   public ResponseEntity<Page<TransactionEntity>> getByIdAccount(
           @Parameter(description = "account id of transactions to be searched") @RequestParam(name = "id") int idAccount,
           @Parameter(description = "page to access") @RequestParam int page) {
      Page<TransactionEntity> pageable = transactionService.getByIdAccount(idAccount, page).get();

      if (!pageable.isEmpty()) {
         return new ResponseEntity<>(pageable, HttpStatus.OK);
      }

      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
   }

   @Operation(
           summary = "Get transactions by account id and with other optional parameters",
           description = "Get transactions with the specific account id and with certain parameters according to the needs",
           responses = {
                   @ApiResponse(
                           responseCode = "200",
                           description = "Success"
                   ),
                   @ApiResponse(
                           responseCode = "404",
                           description = "Transactions not found",
                           content = @Content
                   ),
                   @ApiResponse(
                           responseCode = "403",
                           description = "Unauthorized | Invalid Token",
                           content = @Content
                   )
           }
   )
   @PostMapping("/filter")
   public ResponseEntity<Page<TransactionEntity>> getByFilter(
           @Parameter(description = "account id of transactions to be searched") @RequestParam(name = "id") int idAccount,
           @Parameter(description = "type of transactions to be searched")
               @RequestParam(name = "type", required = false) TransactionType transactionType,
           @Parameter(description = "name of transactions to be searched") @RequestParam(required = false) String name,
           @io.swagger.v3.oas.annotations.parameters.RequestBody(description = "Object so select the date of transactions " +
                   "to be searched")
               @RequestBody @Valid DateDto dateDto,
           @Parameter(description = "page to access") @RequestParam int page
   ) {

      Page<TransactionEntity> transactionDomainList = transactionService.getByFilter(
              idAccount, transactionType, name, dateDto, page).get();

      if (!transactionDomainList.isEmpty()) {
         return new ResponseEntity<>(transactionDomainList, HttpStatus.OK);
      }

      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
   }

   @Operation(
           summary = "Save a transaction",
           description = "Save all data from TransactionDto and return a success message",
           parameters = @Parameter(
                   name = HttpHeaders.ACCEPT_LANGUAGE,
                   in = ParameterIn.HEADER,
                   required = true,
                   description = "header for get the message according to the language",
                   content = @Content(
                           schema = @Schema(type = "string"),
                           examples = @ExampleObject( value = "en")
                   )
           ),
           responses = {
                   @ApiResponse(
                           responseCode = "201",
                           description = "Success",
                           content = @Content(
                                   schema = @Schema(type = "string"),
                                   examples = @ExampleObject( value = "Transaction made successfully")
                           )
                   ),
                   @ApiResponse(
                           responseCode = "400",
                           description = "Bad format",
                           content = @Content
                   ),
                   @ApiResponse(
                           responseCode = "403",
                           description = "Unauthorized | Invalid Token",
                           content = @Content
                   )
           }
   )
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
