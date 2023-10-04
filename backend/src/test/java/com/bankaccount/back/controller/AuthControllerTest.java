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
import com.bankaccount.back.web.dto.AccountDto;
import com.bankaccount.back.web.dto.LoginDto;
import com.bankaccount.back.web.dto.PasswordDto;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import org.hamcrest.text.MatchesPattern;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import java.math.BigDecimal;
import java.util.Locale;
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
    void registerAccount() throws NotAllowedException {
        AccountDto accountError = new AccountDto(
                "Test",
                "1234",
                "4321",
                "test@names.com"
        );

        AccountDto accountSuccess = new AccountDto(
                "Test",
                "1234",
                "1234",
                "test@names.com"
        );

        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.registerModule(new JavaTimeModule());
        objectMapper.disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);

        Mockito.when(accountService.saveAccount(Mockito.any(AccountDto.class), Mockito.any(Locale.class)))
                        .thenReturn(AccountEntity.builder().build());

        assertAll(
                () -> mockMvc.perform(post("/auth/register")
                                .header(HttpHeaders.ACCEPT_LANGUAGE, "en")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(accountError))
                                .with(user("user").roles(USER))
                                .with(csrf()))
                        .andExpect(status().isBadRequest())
                        .andExpect(content().string("Passwords don't match")),

                () -> mockMvc.perform(post("/auth/register")
                                .header(HttpHeaders.ACCEPT_LANGUAGE, "en")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(accountSuccess))
                                .with(user("user").roles(USER))
                                .with(csrf()))
                        .andExpect(status().isCreated())
                        .andExpect(content().string("Success"))
        );
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
                                .header(HttpHeaders.ACCEPT_LANGUAGE, "en")
                                .param("token", "er143ge8-9b58-41ae-8723-29d7ff675a30")
                                .contentType(MediaType.APPLICATION_JSON)
                                .with(user("user").roles(USER)))
                        .andExpect(status().isOk())
                        .andExpect(content().string("Account verifies successfully")),

                () -> mockMvc.perform(get("/auth/verify-registration")
                                .header(HttpHeaders.ACCEPT_LANGUAGE, "en")
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
                                .header(HttpHeaders.ACCEPT_LANGUAGE, "en")
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
                        .andExpect(content().string(MatchesPattern.matchesPattern("http://.*")))

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

        Mockito.when(tokenService.validatePasswordResetToken("er143ge8-9b58-41ae-8723-29d7ff675a30"))
                .thenReturn("valid");

        Mockito.when(tokenService.validatePasswordResetToken("53535"))
                .thenReturn("invalid");

        Mockito.when(tokenService.validatePasswordResetToken("nu3v3-9b58-41ae-8723-29d7ff675a30"))
                .thenReturn("valid");

        Mockito.when(tokenService.getAccountByPasswordResetToken("er143ge8-9b58-41ae-8723-29d7ff675a30"))
                .thenReturn(Optional.of(account));

        assertAll(
                () -> mockMvc.perform(post("/auth/save-password")
                                .header(HttpHeaders.ACCEPT_LANGUAGE, "en")
                                .param("token", "er143ge8-9b58-41ae-8723-29d7ff675a30")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(passwordDto))
                                .with(user("user").roles(USER))
                                .with(csrf()))
                        .andExpect(status().isOk())
                        .andExpect(content().string("Password Reset Successfully")),

                () -> mockMvc.perform(post("/auth/save-password")
                                .header(HttpHeaders.ACCEPT_LANGUAGE, "en")
                                .param("token", "53535")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(passwordDto))
                                .with(user("user").roles(USER))
                                .with(csrf()))
                        .andExpect(status().isOk())
                        .andExpect(content().string("Invalid token")),

                () -> mockMvc.perform(post("/auth/save-password")
                                .header(HttpHeaders.ACCEPT_LANGUAGE, "en")
                                .param("token", "nu3v3-9b58-41ae-8723-29d7ff675a30")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(passwordDto))
                                .with(user("user").roles(USER))
                                .with(csrf()))
                        .andExpect(status().isOk())
                        .andExpect(content().string("Invalid token"))
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

        Mockito.when(accountService.changeName("newName", password, Locale.getDefault()))
                .thenReturn("Name changed successfully");

        Mockito.when(accountService.changeName("newError", passwordError, Locale.getDefault()))
                .thenReturn("Invalid password");

        assertAll(
                () -> mockMvc.perform(post("/auth/secure/change-name")
                                .header(HttpHeaders.ACCEPT_LANGUAGE, "en")
                                .param("name", "")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(password))
                                .with(user("user").roles(USER))
                                .with(csrf()))
                        .andExpect(status().isBadRequest())
                        .andExpect(jsonPath("$.name").value("Name must not be empty")),

                () -> mockMvc.perform(post("/auth/secure/change-name")
                                .header(HttpHeaders.ACCEPT_LANGUAGE, "en")
                                .param("name", "newName")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(password))
                                .with(user("user").roles(USER))
                                .with(csrf()))
                        .andExpect(status().isOk())
                        .andExpect(jsonPath("$.result").value("Name changed successfully")),

                () -> mockMvc.perform(post("/auth/secure/change-name")
                                .header(HttpHeaders.ACCEPT_LANGUAGE, "en")
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

        Mockito.when(accountService.changePassword(password, Locale.getDefault()))
                .thenReturn("Password changed successfully");

        Mockito.when(accountService.changePassword(passwordError, Locale.getDefault()))
                .thenReturn("Invalid old password");

        assertAll(
                () -> mockMvc.perform(post("/auth/secure/change-password")
                                .header(HttpHeaders.ACCEPT_LANGUAGE, "en")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(password))
                                .with(user("user").roles(USER))
                                .with(csrf()))
                        .andExpect(status().isOk())
                        .andExpect(jsonPath("$.result").value("Password changed successfully")),

                () -> mockMvc.perform(post("/auth/secure/change-password")
                                .header(HttpHeaders.ACCEPT_LANGUAGE, "en")
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

        Mockito.when(accountService.changeEmail(password, Locale.getDefault()))
                .thenReturn("Email changed successfully");

        Mockito.when(accountService.changeEmail(passwordError, Locale.getDefault()))
                .thenReturn("Invalid password");

        assertAll(
                () -> mockMvc.perform(post("/auth/secure/change-email")
                                .header(HttpHeaders.ACCEPT_LANGUAGE, "en")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(password))
                                .with(user("user").roles(USER))
                                .with(csrf()))
                        .andExpect(status().isOk())
                        .andExpect(jsonPath("$.result").value("Email changed successfully")),

                () -> mockMvc.perform(post("/auth/secure/change-email")
                                .header(HttpHeaders.ACCEPT_LANGUAGE, "en")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(passwordError))
                                .with(user("user").roles(USER))
                                .with(csrf()))
                        .andExpect(status().isBadRequest())
                        .andExpect(jsonPath("$.newPassword").value("Invalid password"))
        );
    }
}
