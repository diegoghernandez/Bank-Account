package com.bankaccount.back.web;

import com.bankaccount.back.domain.event.RegistrationCompleteEvent;
import com.bankaccount.back.domain.service.AccountService;
import com.bankaccount.back.domain.service.TokenService;
import com.bankaccount.back.exception.NotAllowedException;
import com.bankaccount.back.exception.NotFoundException;
import com.bankaccount.back.persistence.entity.AccountEntity;
import com.bankaccount.back.persistence.entity.VerificationToken;
import com.bankaccount.back.web.config.JwtUtil;
import com.bankaccount.back.web.dto.AccountDto;
import com.bankaccount.back.web.dto.LoginDto;
import com.bankaccount.back.web.dto.PasswordDto;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import java.util.Optional;
import java.util.UUID;

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
    public ResponseEntity<String> registerAccount(@RequestBody @Valid AccountDto accountDto, final HttpServletRequest request) throws NotAllowedException {
        if (!accountDto.password().equals(accountDto.matchingPassword())) {
            return new ResponseEntity<>("Passwords don't match", HttpStatus.BAD_REQUEST);
        }

        AccountEntity account = accountService.saveAccount(accountDto);

        publisher.publishEvent(new RegistrationCompleteEvent(
                account,
                applicationUrl(request)
        ));

        return new ResponseEntity<>("Success", HttpStatus.CREATED);
    }
    @GetMapping("/verify-registration")
    public String verifyRegistration(@RequestParam String token) {
        String result = tokenService.validateVerificationToken(token);
        if (result.equalsIgnoreCase("valid")) {
            tokenService.deleteVerificationToken(token);
            return "Account verifies successfully";
        }

        return "Bad account";
    }

    @GetMapping("/resend-token")
    public String resendVerificationToken(@RequestParam("token") String oldToken, HttpServletRequest request) {
        VerificationToken verificationToken = tokenService.generateNewVerificationToken(oldToken);

        AccountEntity account = verificationToken.getAccountEntity();
        resendVerificationTokenEmail(account, applicationUrl(request), verificationToken);

        return "Verification Link Sent";
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
    private String savePassword(@RequestParam("token") String token, @RequestBody @Valid PasswordDto passwordDto) throws NotFoundException {
        String result = tokenService.validatePasswordResetToken(token);
        if (!result.equalsIgnoreCase("valid")) {
            return "Invalid token";
        }

        Optional<AccountEntity> accountEntity = tokenService.getAccountByPasswordResetToken(token);
        if (accountEntity.isPresent()) {
            accountService.changePassword(passwordDto);
            return "Password Reset Successfully";
        }

        return "Invalid token";
    }

    @PostMapping("/secure/change-name")
    public ResponseEntity<String> changeName(@RequestParam @NotBlank String name, @RequestBody @Valid PasswordDto passwordDto) throws NotFoundException {
        String result = accountService.changeName(name, passwordDto);

        if (result.contains("Change")) {
            return ResponseEntity.ok().body(result);
        }

        return ResponseEntity.badRequest().body(result);
    }

    @PostMapping("/secure/change-password")
    public ResponseEntity<String> changePassword(@RequestBody @Valid PasswordDto passwordDto) throws NotFoundException {
        String result = accountService.changePassword(passwordDto);

        if (result.contains("Change")) {
            return ResponseEntity.ok().body(result);
        }

        return ResponseEntity.badRequest().body(result);
    }

    @PostMapping("/secure/change-email")
    public ResponseEntity<String> changeEmail(@RequestBody @Valid PasswordDto passwordDto) throws NotFoundException, NotAllowedException {
        String result = accountService.changeEmail(passwordDto);

        if (result.contains("Change")) {
            return ResponseEntity.ok().body(result);
        }

        return ResponseEntity.badRequest().body(result);
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
