package com.bankaccount.back.web;

import com.bankaccount.back.domain.event.RegistrationCompleteEvent;
import com.bankaccount.back.domain.service.AccountService;
import com.bankaccount.back.domain.service.EmailService;
import com.bankaccount.back.domain.service.TokenService;
import com.bankaccount.back.exception.NotAllowedException;
import com.bankaccount.back.exception.NotFoundException;
import com.bankaccount.back.helpers.Messages;
import com.bankaccount.back.persistence.entity.AccountEntity;
import com.bankaccount.back.persistence.entity.TokenEntity;
import com.bankaccount.back.web.config.EnvConfigProperties;
import com.bankaccount.back.web.config.JwtUtil;
import com.bankaccount.back.web.dto.AccountDto;
import com.bankaccount.back.web.dto.LoginDto;
import com.bankaccount.back.web.dto.PasswordDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.enums.ParameterIn;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.*;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.TimeUnit;

@Slf4j
@RestController
@RequestMapping("/auth")
@Tag(name = "Auth", description = "The auth API")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private AccountService accountService;

    @Autowired
    private TokenService tokenService;

    @Autowired
    private ApplicationEventPublisher publisher;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private EmailService emailService;

    @Autowired
    private EnvConfigProperties configProperties;

    @Operation(
            summary = "Login a user",
            description = "Login a user and return a jwt token",
            responses = {
                    @ApiResponse(
                            responseCode = "200",
                            description = "Success",
                            content = @Content(
                                    schema = @Schema(type = "string"),
                                    examples = @ExampleObject( value = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkhvbGEiLCJpYXQiOjE1MTYyMzkwMjJ9.UIk97TCf753QX9TqT2XXh9KOykFM9bLhmccWKuMAQzs")
                            )
                    ),
                    @ApiResponse(
                            responseCode = "400",
                            description = "Bad format",
                            content = @Content
                    )
            }
    )
    @PostMapping(value = "/login", consumes = {"application/json"})
    public ResponseEntity<String> login(@RequestBody @Valid LoginDto loginDto) {
        UsernamePasswordAuthenticationToken login = new UsernamePasswordAuthenticationToken(loginDto.email(), loginDto.password());
        Authentication authentication = authenticationManager.authenticate(login);
        String jwt = jwtUtil.create(loginDto.email());

        return new ResponseEntity<>(jwt, HttpStatus.OK);
    }

    @Operation(
            summary = "Register an user",
            description = "Register an user, send an email, and return a message",
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
                            responseCode = "200",
                            description = "Success",
                            content = @Content(
                                    schema = @Schema(type = "string"),
                                    examples = @ExampleObject( value = "Success")
                            )
                    ),
                    @ApiResponse(
                            responseCode = "400",
                            description = "Bad format",
                            content = @Content(
                                    schema = @Schema(type = "string"),
                                    examples = @ExampleObject( value = "Passwords don't match")
                            )
                    )
            }
    )
    @PostMapping(value = "/register", consumes = {"application/json"})
    public ResponseEntity<String> registerAccount(
            @RequestHeader(HttpHeaders.ACCEPT_LANGUAGE) final Locale locale,
            @RequestBody @Valid AccountDto accountDto) throws NotAllowedException {

        if (!accountDto.password().equals(accountDto.matchingPassword())) {
            return new ResponseEntity<>(
                    Messages.getMessageForLocale("controller.auth.register.error", locale),
                    HttpStatus.BAD_REQUEST);
        }

        AccountEntity account = accountService.saveAccount(accountDto, locale);

        publisher.publishEvent(new RegistrationCompleteEvent(account, locale));

        return new ResponseEntity<>(
                Messages.getMessageForLocale("controller.auth.register.success", locale),
                HttpStatus.CREATED);
    }

    @Operation(
            summary = "Resend a token",
            description = "With the old token return a message, and send email with new token",
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
                            responseCode = "200",
                            description = "Success",
                            content = @Content(
                                    schema = @Schema(type = "string"),
                                    examples = @ExampleObject( value = "Verification Link Sent")
                            )
                    )
            }
    )
    @GetMapping("/resend-token")
    public String resendToken(
            @RequestHeader(HttpHeaders.ACCEPT_LANGUAGE) final Locale locale,
            @Parameter(description = "type of email to send") @RequestParam String type,
            @Parameter(description = "old token to be updated") @RequestParam("token") String oldToken) {
        TokenEntity tokenEntity = tokenService.generateNewToken(oldToken);

        AccountEntity account = tokenEntity.getAccountEntity();

        if (type.equalsIgnoreCase("verification")) {
            resendVerificationTokenEmail(tokenEntity.getToken(), account, locale);
        } else if (type.equalsIgnoreCase("password")) {
            passwordResetTokenEmail(tokenEntity.getToken(), account, locale);
        } else if (type.equalsIgnoreCase("email")) {
            emailChangeTokenEmail(tokenEntity.getToken(), account, locale);
        }

        return Messages.getMessageForLocale("controller.auth.resend", locale);
    }

    @Operation(
            summary = "Verify the account with the token",
            description = "According to the token, return a message, and if is valid, verify the account",
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
                            responseCode = "200",
                            description = "Success",
                            content = @Content(
                                    schema = @Schema(type = "string"),
                                    examples = @ExampleObject( value = "valid")
                            )
                    ),
                    @ApiResponse(
                            responseCode = "400",
                            description = "Something bad happens with the token",
                            content = @Content(
                                    schema = @Schema(type = "string"),
                                    examples = @ExampleObject( value = "invalid")
                            )
                    )
            }
    )
    @GetMapping("/verify-registration")
    public ResponseEntity<String> verifyRegistration(
            @RequestHeader(HttpHeaders.ACCEPT_LANGUAGE) final Locale locale,
            @Parameter(description = "the token to check") @RequestParam String token) {
        String result = tokenService.validateVerification(token);
        if (result.equalsIgnoreCase("valid")) {
            tokenService.deleteToken(token);
            return new ResponseEntity<>(result, HttpStatus.OK);
        }

        return new ResponseEntity<>(result, HttpStatus.BAD_REQUEST);
    }

    @Operation(
            summary = "Send an email",
            description = "Send an email with the token to reset the password",
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
                            responseCode = "200",
                            description = "Send email"
                    )
            }
    )
    @GetMapping("/reset-password/{email}")
    public void resetPassword(
            @RequestHeader(HttpHeaders.ACCEPT_LANGUAGE) final Locale locale,
            @Parameter(description = "the email to send the token") @PathVariable String email) {
        Optional<AccountEntity> optionalAccount = accountService.getAccountByEmail(email);

        if (optionalAccount.isPresent()) {
            AccountEntity accountEntity = optionalAccount.get();
            String token = UUID.randomUUID().toString();
            accountService.saveToken(token, accountEntity);

            passwordResetTokenEmail(token, accountEntity, locale);
        }
    }

    @Operation(
            summary = "Update the password",
            description = "Update the password and return a message according to the token",
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
                            responseCode = "200",
                            description = "Success",
                            content = @Content(
                                    schema = @Schema(type = "string"),
                                    examples = @ExampleObject( value = "valid")
                            )
                    ),
                    @ApiResponse(
                            responseCode = "400",
                            description = "Something bad happens with the token",
                            content = @Content(
                                    schema = @Schema(type = "string"),
                                    examples = @ExampleObject( value = "invalid")
                            )
                    )
            }
    )
    @PutMapping("/save-password")
    private ResponseEntity<String> savePassword(
            @RequestHeader(HttpHeaders.ACCEPT_LANGUAGE) final Locale locale,
            @Parameter(description = "the token to check") @RequestParam String token,
            @RequestBody @Valid PasswordDto passwordDto) throws NotFoundException {
        String result = tokenService.validateToken(token);

        if (result.equalsIgnoreCase("valid")) {
            Optional<AccountEntity> accountEntity = tokenService.getAccountByToken(token);
            if (accountEntity.isPresent()) {
                tokenService.deleteToken(token);
                accountService.updatePassword(passwordDto.newPassword(), passwordDto.idAccount());

                return new ResponseEntity<>(result, HttpStatus.OK);
            }
        }

        return new ResponseEntity<>(result, HttpStatus.BAD_REQUEST);
    }

    @Operation(
            summary = "Verify the email with the token",
            description = "According to the token, return a message, and if is valid, verify the email",
            responses = {
                    @ApiResponse(
                            responseCode = "200",
                            description = "Success",
                            content = @Content(
                                    schema = @Schema(type = "string"),
                                    examples = @ExampleObject( value = "valid")
                            )
                    ),
                    @ApiResponse(
                            responseCode = "400",
                            description = "Something bad happens with the token",
                            content = @Content(
                                    schema = @Schema(type = "string"),
                                    examples = @ExampleObject( value = "invalid")
                            )
                    )
            }
    )
    @GetMapping("/verify-email")
    public ResponseEntity<String> verifyEmail(
            @RequestHeader(HttpHeaders.ACCEPT_LANGUAGE) final Locale locale,
            @Parameter(description = "the token to check") @RequestParam String token) {
        String result = tokenService.validateToken(token);

        if (result.equalsIgnoreCase("valid")) {
            Optional<AccountEntity> accountEntity = tokenService.getAccountByToken(token);
            if (accountEntity.isPresent()) {
                tokenService.deleteToken(token);
                accountService.updateStatus(true, accountEntity.get().getIdAccount());
                return new ResponseEntity<>(result, HttpStatus.OK);
            }
        }

        return new ResponseEntity<>(result, HttpStatus.BAD_REQUEST);
    }

    @Operation(
            summary = "Update the name of account",
            description = "According to the id of account, update the name if the password is correct",
            parameters = {
                    @Parameter(
                    name = HttpHeaders.ACCEPT_LANGUAGE,
                    in = ParameterIn.HEADER,
                    required = true,
                    description = "header for get the message according to the language",
                    content = @Content(
                            schema = @Schema(type = "string"),
                            examples = @ExampleObject(value = "en")
                    )),
                    @Parameter(
                            name = "ID",
                            in = ParameterIn.HEADER,
                            required = true,
                            description = "header for spring security for identify if is the user data",
                            content = @Content(
                                    schema = @Schema(type = "string"),
                                    examples = @ExampleObject( value = "543215432")
                            )
                    )
            },
            responses = {
                    @ApiResponse(
                            responseCode = "200",
                            description = "Success",
                            content = @Content(
                                    examples = @ExampleObject(value = "{\"result\": \"Name changed successfully\"}")
                            )
                    ),
                    @ApiResponse(
                            responseCode = "400",
                            description = "Something goes wrong",
                            content = @Content(
                                    examples = {
                                            @ExampleObject(name = "Error name",
                                                    value = "{\"name\": \"Name must not be empty\"}"),
                                            @ExampleObject(
                                                    name = "Error password",
                                                    value = "{\"newPassword\": \"Invalid password\"}",
                                                    description = "The password is incorrect")
                                    }
                            )
                    ),
                    @ApiResponse(
                            responseCode = "403",
                            description = "Unauthorized | Invalid Token",
                            content = @Content
                    )
            }
    )
    @PutMapping("/secure/change-name")
    public ResponseEntity<Map<String, String>> changeName(
            @RequestHeader(HttpHeaders.ACCEPT_LANGUAGE) final Locale locale,
            @Parameter(description = "the name to update") @RequestParam String name,
            @io.swagger.v3.oas.annotations.parameters.RequestBody(description =
                    "the object to get the id and the password")
                @RequestBody @Valid PasswordDto passwordDto) throws NotFoundException {
        Map<String, String> response = new HashMap<>();
        if (name.isEmpty()) {
            response.put("name", Messages.getMessageForLocale("controller.auth.change-name.error", locale));
            return ResponseEntity.badRequest().body(response);
        }

        String result = accountService.changeName(name, passwordDto, locale);

        if (result.contains(Messages.getMessageForLocale("service.account.change-name.success", locale))) {
            response.put("result", result);
            return ResponseEntity.ok().body(response);
        }

        response.put("newPassword", result);
        return ResponseEntity.badRequest().body(response);
    }

   @Operation(
           summary = "Update the password of account",
           description = "According to the id of account, update the password if the password is correct",
           parameters = {
                   @Parameter(
                   name = HttpHeaders.ACCEPT_LANGUAGE,
                   in = ParameterIn.HEADER,
                   required = true,
                   description = "header for get the message according to the language",
                   content = @Content(
                           schema = @Schema(type = "string"),
                           examples = @ExampleObject(value = "en")
                   )),
                   @Parameter(
                           name = "ID",
                           in = ParameterIn.HEADER,
                           required = true,
                           description = "header for spring security for identify if is the user data",
                           content = @Content(
                                   schema = @Schema(type = "string"),
                                   examples = @ExampleObject( value = "543215432")
                           )
                   )
           },
           responses = {
                   @ApiResponse(
                           responseCode = "200",
                           description = "Success",
                           content = @Content(
                                   examples = @ExampleObject(value = "{\"result\": \"Password changed successfully\"}")
                           )
                   ),
                   @ApiResponse(
                           responseCode = "400",
                           description = "Something goes wrong",
                           content = @Content(
                                   examples = {
                                           @ExampleObject(name = "Error email",
                                                   value = "{\"name\": \"Password changed successfully\"}"),
                                           @ExampleObject(
                                                   name = "Error password",
                                                   value = "{\"oldPassword\": \"Invalid old password\"}",
                                                   description = "The password is incorrect")
                                   }
                           )
                   ),
                   @ApiResponse(
                           responseCode = "403",
                           description = "Unauthorized | Invalid Token",
                           content = @Content
                   )
           }
   )
    @PutMapping("/secure/change-password")
    public ResponseEntity<Map<String, String>> changePassword(
            @RequestHeader(HttpHeaders.ACCEPT_LANGUAGE) final Locale locale,
            @io.swagger.v3.oas.annotations.parameters.RequestBody(description =
                    "the object to get the id,the old password, and the new password")
            @RequestBody @Valid PasswordDto passwordDto) throws NotFoundException {
        Map<String, String> response = new HashMap<>();
        String result = accountService.changePassword(passwordDto, locale);

        if (result.contains(Messages.getMessageForLocale("service.account.change-password.success", locale))) {
            response.put("result", result);
            return ResponseEntity.ok().body(response);
        }

        response.put("oldPassword", result);
        return ResponseEntity.badRequest().body(response);
    }

   @Operation(
           summary = "Update the email of account",
           description = "According to the id of account, update the email and send an email to verify it if the password is correct",
           parameters = {
                   @Parameter(
                   name = HttpHeaders.ACCEPT_LANGUAGE,
                   in = ParameterIn.HEADER,
                   required = true,
                   description = "header for get the message according to the language",
                   content = @Content(
                           schema = @Schema(type = "string"),
                           examples = @ExampleObject(value = "en")
                   )),
                   @Parameter(
                           name = "ID",
                           in = ParameterIn.HEADER,
                           required = true,
                           description = "header for spring security for identify if is the user data",
                           content = @Content(
                                   schema = @Schema(type = "string"),
                                   examples = @ExampleObject( value = "543215432")
                           )
                   )
           },
           responses = {
                   @ApiResponse(
                           responseCode = "200",
                           description = "Success",
                           content = @Content(
                                   examples = @ExampleObject(value = "{\"result\": \"Email changed successfully\"}")
                           )
                   ),
                   @ApiResponse(
                           responseCode = "400",
                           description = "Something goes wrong",
                           content = @Content(
                                   examples = {
                                           @ExampleObject(name = "Error email",
                                                   value = "{\"email\": \"There is an account with that email address\"}"),
                                           @ExampleObject(
                                                   name = "Error password",
                                                   value = "{\"newPassword\": \"Invalid password\"}",
                                                   description = "The password is incorrect")
                                   }
                           )
                   ),
                   @ApiResponse(
                           responseCode = "403",
                           description = "Unauthorized | Invalid Token",
                           content = @Content
                   )
           }
   )
    @PutMapping("/secure/change-email")
    public ResponseEntity<Map<String, String>> changeEmail(
            @RequestHeader(HttpHeaders.ACCEPT_LANGUAGE) final Locale locale,
            @io.swagger.v3.oas.annotations.parameters.RequestBody(description =
                    "the object to get the id, the email and the password")
                     @RequestBody @Valid PasswordDto passwordDto) throws NotFoundException, NotAllowedException {
        Map<String, String> response = new HashMap<>();
        String result = accountService.changeEmail(passwordDto, locale);

        if (result.contains(Messages.getMessageForLocale("service.account.change-email.success", locale))) {
            CompletableFuture.delayedExecutor(1, TimeUnit.SECONDS).execute(() -> {
                AccountEntity accountEntity = accountService.getAccountByEmail(passwordDto.email()).get();

                String token = UUID.randomUUID().toString();
                accountService.saveToken(token, accountEntity);
                emailChangeTokenEmail(token, accountEntity, locale);
            });
            response.put("result", result);
            return ResponseEntity.ok().body(response);
        }

        response.put("newPassword", result);
        return ResponseEntity.badRequest().body(response);
    }

   /**
    * Send email with the necessary values to verify the account
    * @param token the token to verify the account
    * @param account the value to extract the email
    */
    private void resendVerificationTokenEmail(String token, AccountEntity account, Locale locale) {
        String url = configProperties.client() + "/verify-registration?token=" + token +
                "&traduction=TOKEN_REGISTER&email=" + account.getEmail();

        emailService.sendEmail(
                account.getEmail(),
                Messages.getMessageForLocale("email.verify.account.subject.resend", locale),
                Messages.getMessageForLocale("email.verify.account.content", locale)
                        + " " + url);
    }

   /**
    * Send email with the necessary values to reset the password
    * @param token the token reset the password
    * @param accountEntity the value to extract the id and email
    */
    private void passwordResetTokenEmail(String token, AccountEntity accountEntity, Locale locale) {
        String url = configProperties.client() + "/save-password?token=" + token
                + "&id=" + accountEntity.getIdAccount();

        emailService.sendEmail(
                accountEntity.getEmail(),
                Messages.getMessageForLocale("email.reset.password.subject", locale),
                Messages.getMessageForLocale("email.reset.password.content", locale)
                        + " " + url);
    }

   /**
    * Send email with the necessary values to verify the email
    * @param token the token to verify the email
    * @param accountEntity the value to extract the id and email
    */
    private void emailChangeTokenEmail(String token, AccountEntity accountEntity, Locale locale) {
        String url = configProperties.client() + "/verify-email?token=" + token
                + "&traduction=TOKEN_EMAIL&id=" + accountEntity.getIdAccount();

        emailService.sendEmail(
                accountEntity.getEmail(),
                Messages.getMessageForLocale("email.change.email.subject", locale),
                Messages.getMessageForLocale("email.change.email.content", locale)
                        + " " + url);
    }
}
