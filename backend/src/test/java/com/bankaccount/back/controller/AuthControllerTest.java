package com.bankaccount.back.controller;

import com.bankaccount.back.constants.AccountRoles;
import com.bankaccount.back.domain.service.AccountService;
import com.bankaccount.back.domain.service.TokenService;
import com.bankaccount.back.exception.NotAllowedException;
import com.bankaccount.back.exception.NotFoundException;
import com.bankaccount.back.persistence.entity.AccountEntity;
import com.bankaccount.back.persistence.entity.VerificationToken;
import com.bankaccount.back.web.AuthController;
import com.bankaccount.back.web.config.JwtUtil;
import com.bankaccount.back.web.dto.LoginDto;
import com.bankaccount.back.web.dto.PasswordDto;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import java.math.BigDecimal;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertAll;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.user;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@ActiveProfiles("dev")
@WebMvcTest(AuthController.class)
public class AuthControllerTest {

    private static final String USER = AccountRoles.USER.toString();

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private AuthenticationManager authenticationManager;

    @MockBean
    private AccountService accountService;

    @MockBean
    private TokenService tokenService;

    @MockBean
    private ApplicationEventPublisher publisher;

    @MockBean
    private JwtUtil jwtUtil;

    @Test
    @DisplayName("Should return a response with an authorization header with the value of a jwt if the credentials are correct")
    void login() {
        Mockito.when(jwtUtil.create("user@user.com"))
                .thenReturn("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkhvbGEiLCJpYXQiOjE1MTYyMzkwMjJ9.UIk97TCf753QX9TqT2XXh9KOykFM9bLhmccWKuMAQzs");

        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.registerModule(new JavaTimeModule());
        objectMapper.disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);

        assertAll(
                () -> mockMvc.perform(post("/auth/login")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(new LoginDto("user@user.com", "1234")))
                                .with(user("user").roles(USER))
                                .with(csrf()))
                        .andExpect(status().isOk())
                        .andExpect(content()
                                .string("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkhvbGEiLCJpYXQiOjE1MTYyMzkwMjJ9.UIk97TCf753QX9TqT2XXh9KOykFM9bLhmccWKuMAQzs"))
        );
    }

    @Test
    @DisplayName("Should register an account correctly")
    void registerAccount() {
//        Mockito.when(transactionTypeService.saveTransaction(transactionDtoList.get(1)))
//                .thenReturn(ArgumentMatchers.any());
//
//        ObjectMapper objectMapper = new ObjectMapper();
//        objectMapper.registerModule(new JavaTimeModule());
//        objectMapper.disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);
//
//        assertAll(
//                () -> mockMvc.perform(MockMvcRequestBuilders.post("/transactions/register")
//                                .contentType(MediaType.APPLICATION_JSON)
//                                .content(objectMapper.writeValueAsString(transactionDtoList.get(1)))
//                                .with(user("user").roles(USER))
//                                .with(csrf()))
//                        .andExpect(status().isCreated()),
//
//                () -> mockMvc.perform(MockMvcRequestBuilders.post("/transactions/save")
//                                .contentType(MediaType.APPLICATION_JSON)
//                                .content(objectMapper.writeValueAsString(transactionDtoList.get(1)))
//                                .with(csrf()))
//                        .andExpect(status().isUnauthorized())
//        );
    }

    @Test
    @DisplayName("Should verify if the token is valid")
    void verifyRegistration() {
        Mockito.when(tokenService.validateVerificationToken("er143ge8-9b58-41ae-8723-29d7ff675a30"))
                        .thenReturn("valid");

        Mockito.when(tokenService.validateVerificationToken("hello"))
                .thenReturn("hello");

        assertAll(
                () -> mockMvc.perform(get("/auth/verify-registration")
                                .param("token", "er143ge8-9b58-41ae-8723-29d7ff675a30")
                                .contentType(MediaType.APPLICATION_JSON)
                                .with(user("user").roles(USER)))
                        .andExpect(status().isOk())
                        .andExpect(content().string("Account verifies successfully")),

                () -> mockMvc.perform(get("/auth/verify-registration")
                                .param("token", "hello")
                                .contentType(MediaType.APPLICATION_JSON)
                                .with(user("user").roles(USER)))
                        .andExpect(status().isOk())
                        .andExpect(content().string("Bad account"))
        );
    }

    @Test
    @DisplayName("Should return a new verification token when an old token is given")
    void resendVerificationToken() {
        VerificationToken newVerificationToken = VerificationToken.builder()
                .idToken(2L)
                .token("po43do45-34gr-41ae-8723-237a3f675a30")
                .accountEntity(AccountEntity.builder()
                        .idAccount(765355)
                        .accountName("RandomSave")
                        .email("saveaccount@names.com")
                        .password("452353425")
                        .currentBalance(new BigDecimal("4376.00"))
                        .build())
                .build();

        Mockito.when(tokenService.generateNewVerificationToken("er143ge8-9b58-41ae-8723-29d7ff675a30"))
                        .thenReturn(newVerificationToken);

        assertAll(
                () -> mockMvc.perform(get("/auth/resend-token")
                                .param("token", "er143ge8-9b58-41ae-8723-29d7ff675a30")
                                .contentType(MediaType.APPLICATION_JSON)
                                .with(user("user").roles(USER)))
                        .andExpect(status().isOk())
                        .andExpect(content().string("Verification Link Sent"))
        );
    }

    @Test
    @DisplayName("Should send a url for reset the password")
    void resetPassword() {
        PasswordDto passwordDto = new PasswordDto(
                1,
                "user@user.com",
                "1234",
                "4321"
        );

        AccountEntity account = AccountEntity.builder()
                .idAccount(687452786)
                .accountName("Random634675")
                .email("random@names.com")
                .password("1234567")
                .currentBalance(new BigDecimal("654316.76"))
                .build();

        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.registerModule(new JavaTimeModule());
        objectMapper.disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);

        Mockito.when(accountService.getAccountByEmail("user@user.com"))
                        .thenReturn(Optional.of(account));

        assertAll(
                () -> mockMvc.perform(post("/auth/reset-password")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(passwordDto))
                                .with(user("user").roles(USER))
                                .with(csrf()))
                        .andExpect(status().isOk())
        );
    }

    @Test
    @DisplayName("Should save a new password")
    void savePassword() {
        PasswordDto passwordDto = new PasswordDto(
                1,
                "user@user.com",
                "1234",
                "4321"
        );

        AccountEntity account = AccountEntity.builder()
                .idAccount(687452786)
                .accountName("Random634675")
                .email("random@names.com")
                .password("1234567")
                .currentBalance(new BigDecimal("654316.76"))
                .build();

        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.registerModule(new JavaTimeModule());
        objectMapper.disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);

        Mockito.when(accountService.getAccountByEmail("user@user.com"))
                .thenReturn(Optional.of(account));

        assertAll(
                () -> mockMvc.perform(post("/auth/reset-password")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(passwordDto))
                                .with(user("user").roles(USER))
                                .with(csrf()))
                        .andExpect(status().isOk())
        );
    }

    @Test
    @DisplayName("Should save a new name")
    void changeName() throws NotFoundException {
        PasswordDto passwordError = new PasswordDto(
                1,
                "user@user.com",
                "1234",
                "4321"
        );

        PasswordDto password = new PasswordDto(
                1,
                "user@user.com",
                "123456",
                "1234"
        );

        AccountEntity account = AccountEntity.builder()
                .idAccount(687452786)
                .accountName("Random634675")
                .email("random@names.com")
                .password("1234567")
                .currentBalance(new BigDecimal("654316.76"))
                .build();

        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.registerModule(new JavaTimeModule());
        objectMapper.disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);

        Mockito.when(accountService.changeName("newName", password))
                .thenReturn("Change name successfully");

        Mockito.when(accountService.changeName("newError", passwordError))
                .thenReturn("Invalid password");

        assertAll(
                () -> mockMvc.perform(post("/auth/secure/change-name")
                                .param("name", "newName")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(password))
                                .with(user("user").roles(USER))
                                .with(csrf()))
                        .andExpect(status().isOk())
                        .andExpect(jsonPath("$.result").value("Change name successfully")),

                () -> mockMvc.perform(post("/auth/secure/change-name")
                                .param("name", "newError")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(passwordError))
                                .with(user("user").roles(USER))
                                .with(csrf()))
                        .andExpect(status().isBadRequest())
                        .andExpect(jsonPath("$.newPassword").value("Invalid password"))
        );
    }

    @Test
    @DisplayName("Should save a new password")
    void changePassword() throws NotFoundException {
        PasswordDto passwordError = new PasswordDto(
                1,
                "user@user.com",
                "1234",
                "4321"
        );

        PasswordDto password = new PasswordDto(
                1,
                "user@user.com",
                "123456",
                "1234"
        );

        AccountEntity account = AccountEntity.builder()
                .idAccount(687452786)
                .accountName("Random634675")
                .email("random@names.com")
                .password("1234567")
                .currentBalance(new BigDecimal("654316.76"))
                .build();

        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.registerModule(new JavaTimeModule());
        objectMapper.disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);

        Mockito.when(accountService.changePassword(password))
                .thenReturn("Password changed successfully");

        Mockito.when(accountService.changePassword(passwordError))
                .thenReturn("Invalid old password");

        assertAll(
                () -> mockMvc.perform(post("/auth/secure/change-password")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(password))
                                .with(user("user").roles(USER))
                                .with(csrf()))
                        .andExpect(status().isOk())
                        .andExpect(jsonPath("$.result").value("Password changed successfully")),

                () -> mockMvc.perform(post("/auth/secure/change-password")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(passwordError))
                                .with(user("user").roles(USER))
                                .with(csrf()))
                        .andExpect(status().isBadRequest())
                        .andExpect(jsonPath("$.oldPassword").value("Invalid old password"))
        );
    }

    @Test
    @DisplayName("Should save a new email")
    void changeEmail() throws NotFoundException, NotAllowedException {
        PasswordDto passwordError = new PasswordDto(
                1,
                "user@user.com",
                "1234",
                "4321"
        );

        PasswordDto password = new PasswordDto(
                1,
                "user@user.com",
                "123456",
                "1234"
        );

        AccountEntity account = AccountEntity.builder()
                .idAccount(687452786)
                .accountName("Random634675")
                .email("random@names.com")
                .password("1234567")
                .currentBalance(new BigDecimal("654316.76"))
                .build();

        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.registerModule(new JavaTimeModule());
        objectMapper.disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);

        Mockito.when(accountService.changeEmail(password))
                .thenReturn("Change email successfully");

        Mockito.when(accountService.changeEmail(passwordError))
                .thenReturn("Invalid password");

        assertAll(
                () -> mockMvc.perform(post("/auth/secure/change-email")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(password))
                                .with(user("user").roles(USER))
                                .with(csrf()))
                        .andExpect(status().isOk())
                        .andExpect(jsonPath("$.result").value("Change email successfully")),

                () -> mockMvc.perform(post("/auth/secure/change-email")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(passwordError))
                                .with(user("user").roles(USER))
                                .with(csrf()))
                        .andExpect(status().isBadRequest())
                        .andExpect(jsonPath("$.newPassword").value("Invalid password"))
        );
    }
}
