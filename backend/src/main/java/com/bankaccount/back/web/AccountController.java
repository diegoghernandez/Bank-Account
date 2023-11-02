package com.bankaccount.back.web;

import com.bankaccount.back.domain.AccountDomain;
import com.bankaccount.back.domain.service.AccountService;
import com.bankaccount.back.persistence.entity.AccountEntity;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/accounts")
@Tag(name = "Account", description = "The account API")
public class AccountController {

   @Autowired
   private AccountService accountService;

   @Operation(
           summary = "Get by id",
           description = "Get the account with the specific id",
           responses = {
                   @ApiResponse(
                           responseCode = "200",
                           description = "Success",
                           content = @Content(
                                   mediaType = "application/json",
                                   schema = @Schema(implementation = AccountDomain.class)
                           )
                   ),
                   @ApiResponse(
                           responseCode = "404",
                           description = "Account not found",
                           content = @Content
                   ),
                   @ApiResponse(
                           responseCode = "403",
                           description = "Unauthorized | Invalid Token",
                           content = @Content
                   )
           }
   )
   @GetMapping("/id/{id}")
   public ResponseEntity<AccountDomain> getAccountById(
           @Parameter(description = "id of account to be searched") @PathVariable int id) {
      return accountService.getAccountById(id)
              .map(account -> new ResponseEntity<>(mapper(account), HttpStatus.OK))
              .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
   }

   @Operation(
           summary = "Get by email",
           description = "Get the account with the specific email",
           responses = {
                   @ApiResponse(
                           responseCode = "200",
                           description = "Success",
                           content = @Content(
                                   mediaType = "application/json",
                                   schema = @Schema(implementation = AccountDomain.class)
                           )
                   ),
                   @ApiResponse(
                           responseCode = "404",
                           description = "Account not found",
                           content = @Content
                   ),
                   @ApiResponse(
                           responseCode = "403",
                           description = "Unauthorized | Invalid Token",
                           content = @Content
                   )
           }
   )
   @GetMapping("/email/{email}")
   public ResponseEntity<AccountDomain> getAccountByEmail(
           @Parameter(description = "email of account to be searched") @PathVariable String email) {
      return accountService.getAccountByEmail(email)
              .map(account -> new ResponseEntity<>(mapper(account), HttpStatus.OK))
              .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
   }

   /**
    * Extract the necessary data to create an {@link AccountDomain} from an {@link AccountEntity}
    * @param accountEntity the value to extract the data
    * @return an {@link AccountDomain}
    */
   private AccountDomain mapper(AccountEntity accountEntity) {
      return new AccountDomain(
              accountEntity.getIdAccount(),
              accountEntity.getAccountName(),
              accountEntity.getEmail(),
              accountEntity.getCurrentBalance()
      );
   }
}
