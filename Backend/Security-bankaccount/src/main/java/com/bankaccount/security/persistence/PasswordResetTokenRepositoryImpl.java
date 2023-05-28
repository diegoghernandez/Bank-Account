package com.bankaccount.security.persistence;

import com.bankaccount.security.domain.repository.PasswordResetTokenRepository;
import com.bankaccount.security.persistence.crud.PasswordResetTokenCrudRepository;
import com.bankaccount.security.persistence.entity.PasswordResetToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class PasswordResetTokenRepositoryImpl implements PasswordResetTokenRepository {

    @Autowired
    private PasswordResetTokenCrudRepository passwordResetTokenCrud;


    @Override
    public PasswordResetToken getByToken(String token) {
        return passwordResetTokenCrud.findByToken(token);
    }

    @Override
    public PasswordResetToken savePasswordResetToken(PasswordResetToken passwordResetToken) {
        return passwordResetTokenCrud.save(passwordResetToken);
    }

    @Override
    public void delete(PasswordResetToken passwordResetToken) {
        passwordResetTokenCrud.delete(passwordResetToken);
    }
}
