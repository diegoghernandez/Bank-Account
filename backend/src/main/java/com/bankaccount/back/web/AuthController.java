package com.bankaccount.back.web;

import com.bankaccount.back.domain.event.RegistrationCompleteEvent;
import com.bankaccount.back.domain.service.AccountService;
import com.bankaccount.back.domain.service.TokenService;
import com.bankaccount.back.exception.NotAllowedException;
import com.bankaccount.back.exception.NotFoundException;
import com.bankaccount.back.helpers.Messages;
import com.bankaccount.back.persistence.entity.AccountEntity;
import com.bankaccount.back.persistence.entity.VerificationToken;
import com.bankaccount.back.web.config.JwtUtil;
import com.bankaccount.back.web.dto.AccountDto;
import com.bankaccount.back.web.dto.LoginDto;
import com.bankaccount.back.web.dto.PasswordDto;
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

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.util.*;

@Slf4j
@RestController
@RequestMapping("/auth")
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

    @PostMapping(value = "/login", consumes = {"application/json"})
    public ResponseEntity<String> login(@RequestBody @Valid LoginDto loginDto) {
        UsernamePasswordAuthenticationToken login = new UsernamePasswordAuthenticationToken(loginDto.email(), loginDto.password());
        Authentication authentication = authenticationManager.authenticate(login);
        String jwt = jwtUtil.create(loginDto.email());

        return new ResponseEntity<>(jwt, HttpStatus.OK);
    }

    @PostMapping(value = "/register", consumes = {"application/json"})
    public ResponseEntity<String> registerAccount(
            @RequestHeader(HttpHeaders.ACCEPT_LANGUAGE) final Locale locale,
            @RequestBody @Valid AccountDto accountDto,
            final HttpServletRequest request) throws NotAllowedException {
        if (!accountDto.password().equals(accountDto.matchingPassword())) {
            return new ResponseEntity<>(
                    Messages.getMessageForLocale("controller.auth.register.error", locale),
                    HttpStatus.BAD_REQUEST);
        }

        AccountEntity account = accountService.saveAccount(accountDto, locale);

        publisher.publishEvent(new RegistrationCompleteEvent(
                account,
                applicationUrl(request)
        ));

        return new ResponseEntity<>(
                Messages.getMessageForLocale("controller.auth.register.success", locale),
                HttpStatus.CREATED);
    }

    @GetMapping("/verify-registration")
    public String verifyRegistration(
            @RequestHeader(HttpHeaders.ACCEPT_LANGUAGE) final Locale locale,
            @RequestParam String token) {
        String result = tokenService.validateVerificationToken(token);
        if (result.equalsIgnoreCase("valid")) {
            tokenService.deleteVerificationToken(token);
            return Messages.getMessageForLocale("controller.auth.verify.success", locale);
        }

        return Messages.getMessageForLocale("controller.auth.verify.error", locale);
    }

    @GetMapping("/resend-token")
    public String resendVerificationToken(
            @RequestHeader(HttpHeaders.ACCEPT_LANGUAGE) final Locale locale,
            @RequestParam("token") String oldToken,
            HttpServletRequest request) {
        VerificationToken verificationToken = tokenService.generateNewVerificationToken(oldToken);

        AccountEntity account = verificationToken.getAccountEntity();
        resendVerificationTokenEmail(account, applicationUrl(request), verificationToken);

        return Messages.getMessageForLocale("controller.auth.resend", locale);
    }

    @PostMapping("/reset-password")
    public String resetPassword(@RequestBody @Valid PasswordDto passwordDto, HttpServletRequest request) {
        Optional<AccountEntity> optionalAccount = accountService.getAccountByEmail(passwordDto.email());

        String url = "";

        if (optionalAccount.isPresent()) {
            AccountEntity accountEntity = optionalAccount.get();
            String token = UUID.randomUUID().toString();
            tokenService.createPasswordResetTokenForAccount(accountEntity, token);

            url = passwordResetTokenEmail(accountEntity, applicationUrl(request), token);
        }

        return url;
    }

    @PostMapping("/save-password")
    private String savePassword(
            @RequestHeader(HttpHeaders.ACCEPT_LANGUAGE) final Locale locale,
            @RequestParam String token,
            @RequestBody @Valid PasswordDto passwordDto) throws NotFoundException {
        String result = tokenService.validatePasswordResetToken(token);
        if (!result.equalsIgnoreCase("valid")) {
            return Messages.getMessageForLocale("controller.auth.save-password.error", locale);
        }

        Optional<AccountEntity> accountEntity = tokenService.getAccountByPasswordResetToken(token);
        if (accountEntity.isPresent()) {
            accountService.changePassword(passwordDto, locale);
            return Messages.getMessageForLocale("controller.auth.save-password.success", locale);
        }

        return Messages.getMessageForLocale("controller.auth.save-password.error", locale);
    }

    @PostMapping("/secure/change-name")
    public ResponseEntity<Map<String, String>> changeName(
            @RequestHeader(HttpHeaders.ACCEPT_LANGUAGE) final Locale locale,
            @RequestParam String name,
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

    @PostMapping("/secure/change-password")
    public ResponseEntity<Map<String, String>> changePassword(
            @RequestHeader(HttpHeaders.ACCEPT_LANGUAGE) final Locale locale,
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

    @PostMapping("/secure/change-email")
    public ResponseEntity<Map<String, String>> changeEmail(
            @RequestHeader(HttpHeaders.ACCEPT_LANGUAGE) final Locale locale,
            @RequestBody @Valid PasswordDto passwordDto) throws NotFoundException, NotAllowedException {
        Map<String, String> response = new HashMap<>();
        String result = accountService.changeEmail(passwordDto, locale);

        if (result.contains(Messages.getMessageForLocale("service.account.change-email.success", locale))) {
            response.put("result", result);
            return ResponseEntity.ok().body(response);
        }

        response.put("newPassword", result);
        return ResponseEntity.badRequest().body(response);
    }

    private String passwordResetTokenEmail(AccountEntity accountEntity, String applicationUrl, String token) {
        String url = applicationUrl + "/savePassword?token=" + token;

        log.info("Click the link to reset your password: {}", url);

        return url;
    }

    private void resendVerificationTokenEmail(AccountEntity account, String applicationUrl, VerificationToken token) {
        String url = applicationUrl + "/verifyRegistration?token=" + token.getToken();

        log.info("Click the link to verify your account: {}", url);
    }

    private String applicationUrl(HttpServletRequest request) {
        return "http://" + request.getServerName() + ":"
                + request.getServerPort() + request.getContextPath();
    }
}
