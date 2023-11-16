package com.bankaccount.back.web.config;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.info.License;

@OpenAPIDefinition(
        info = @Info(
                contact = @Contact(
                        name = "Diego",
                        email = "diegoj4v@gmail.com",
                        url = "https://diegoj4v.github.io/My-website/public"
                ),
                title = "OpenApi specification - Bank",
                description = "OpenApi documentation for the bank system",
                license = @License(
                        name = "MIT License",
                        url = "https://github.com/DiegoJ4V/Bank-Account/blob/main/LICENSE"
                )
        )
)
public class OpenApiConfig {
}
