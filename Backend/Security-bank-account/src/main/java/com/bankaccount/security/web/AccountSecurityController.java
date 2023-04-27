package com.bankaccount.security.web;

import com.bankaccount.security.domain.event.RegistrationCompleteEvent;
import com.bankaccount.security.domain.service.AccountService;
import com.bankaccount.security.domain.service.TokenService;
import com.bankaccount.security.model.AccountModel;
import com.bankaccount.security.model.PasswordModel;
import com.bankaccount.security.persistence.entity.AccountEntity;
import com.bankaccount.security.persistence.entity.VerificationToken;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.Optional;
import java.util.UUID;

@Slf4j
@RestController
@RequestMapping("/account-security")
public class AccountSecurityController {

    @Autowired
    private AccountService accountService;

    @Autowired
    private TokenService tokenService;

    @Autowired
    private ApplicationEventPublisher publisher;

    @PostMapping(value = "/register", consumes = {"application/json"})
    public ResponseEntity<String> registerAccount(@RequestBody AccountModel accountModel, final HttpServletRequest request) throws Exception {
        if (!accountModel.getPassword().equals(accountModel.getMatchingPassword())) {
            return new ResponseEntity<>("Passwords don't match", HttpStatus.BAD_REQUEST);
        }

        AccountEntity account = accountService.saveAccount(accountModel);

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
    public String resetPassword(@RequestBody PasswordModel passwordModel, HttpServletRequest request) {
        Optional<AccountEntity> optionalAccount = accountService.getAccountByEmail(passwordModel.getEmail());

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
    private String savePassword(@RequestParam("token") String token, @RequestBody PasswordModel passwordModel) {
        String result = tokenService.validatePasswordResetToken(token);
        if (!result.equalsIgnoreCase("valid")) {
            return "Invalid token";
        }

        Optional<AccountEntity> accountEntity = tokenService.getAccountByPasswordResetToken(token);
        if (accountEntity.isPresent()) {
            accountService.changePassword(passwordModel.getNewPassword(), accountEntity.get().getIdAccount());
            return "Password Reset Successfully";
        }

        return "Invalid token";
    }

    @PostMapping("/change-password")
    public String changePassword(@RequestBody PasswordModel passwordModel) {
        Optional<AccountEntity> accountEntity = accountService.getAccountByEmail(passwordModel.getEmail());

        if (accountEntity.isPresent()) {
            if (!accountService.checkIfValidOldPassword(accountEntity.get(), passwordModel.getOldPassword())) {
                return "Invalid Old Password";
            } else {
                accountService.changePassword(passwordModel.getNewPassword(), accountEntity.get().getIdAccount());
                return "Password Changed Successfully";
            }
        }

        return "Email doesn't exist";
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
