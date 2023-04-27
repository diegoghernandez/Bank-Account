package com.bankaccount.security.persistence;

import com.bankaccount.security.domain.repository.VerificationTokenRepository;
import com.bankaccount.security.persistence.crud.VerificationTokenCrudRepository;
import com.bankaccount.security.persistence.entity.VerificationToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class VerificationTokenRepositoryImpl implements VerificationTokenRepository {

    @Autowired
    private VerificationTokenCrudRepository verificationTokenCrud;


    @Override
    public VerificationToken getByToken(String token) {
        return verificationTokenCrud.findByToken(token);
    }

    @Override
    public void delete(VerificationToken verificationToken) {
        verificationTokenCrud.delete(verificationToken);
    }

    @Override
    public VerificationToken updateToken(String newToken, String oldToken) {
        verificationTokenCrud.updateTokenById(newToken, oldToken);

        return verificationTokenCrud.findByToken(newToken);
    }
}
