package com.bankaccount.back.domain.service;

import com.bankaccount.back.constants.AccountRoles;
import com.bankaccount.back.domain.repository.AccountRepository;
import com.bankaccount.back.domain.repository.PasswordResetTokenRepository;
import com.bankaccount.back.domain.repository.VerificationTokenRepository;
import com.bankaccount.back.persistence.entity.AccountEntity;
import com.bankaccount.back.persistence.entity.AccountRoleEntity;
import com.bankaccount.back.persistence.entity.PasswordResetToken;
import com.bankaccount.back.persistence.entity.VerificationToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Calendar;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class TokenService {

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private VerificationTokenRepository verificationTokenRepository;

    @Autowired
    private PasswordResetTokenRepository passwordResetTokenRepository;

    public String validateVerificationToken(String token) {
        VerificationToken verificationToken = verificationTokenRepository.getByToken(token);

        if (verificationToken == null) {
            return "invalid";
        }

        AccountEntity accountEntity = verificationToken.getAccountEntity();
        Calendar cal = Calendar.getInstance();

        if ((verificationToken.getExpirationTime().getTime() - cal.getTime().getTime()) <= 0) {
            verificationTokenRepository.delete(verificationToken);
            return "expired";
        }

        accountRepository.saveAccount(AccountEntity.builder()
                        .idAccount(accountEntity.getIdAccount())
                        .accountName(accountEntity.getAccountName())
                        .email(accountEntity.getEmail())
                        .password(accountEntity.getPassword())
                        .currentBalance(accountEntity.getCurrentBalance())
                        .enabled(true)
                        .roles(List.of(AccountRoleEntity.builder()
                                .idAccount(accountEntity.getIdAccount())
                                .role(AccountRoles.USER)
                                .account(accountEntity)
                                .build()))
                .build());
        return "valid";
    }

    public VerificationToken generateNewVerificationToken(String oldToken) {
        return verificationTokenRepository.updateToken(
                UUID.randomUUID().toString(), oldToken);
    }

    public void deleteVerificationToken(String token) {
        verificationTokenRepository.deleteByToken(token);
    }


    public void createPasswordResetTokenForAccount(AccountEntity accountEntity, String token) {
        PasswordResetToken passwordResetToken = PasswordResetToken.builder()
                .token(token)
                .accountEntity(accountEntity)
                .build();

        passwordResetTokenRepository.savePasswordResetToken(passwordResetToken);
    }

    public String validatePasswordResetToken(String token) {
        PasswordResetToken passwordResetToken = passwordResetTokenRepository.getByToken(token);

        if (passwordResetToken == null) {
            return "invalid";
        }

        Calendar cal = Calendar.getInstance();

        if ((passwordResetToken.getExpirationTime().getTime() - cal.getTime().getTime()) <= 0) {
            passwordResetTokenRepository.delete(passwordResetToken);
            return "expired";
        }

        return "valid";
    }

    public Optional<AccountEntity> getAccountByPasswordResetToken(String token) {
        return Optional.ofNullable(passwordResetTokenRepository.getByToken(token).getAccountEntity());
    }
}
