package com.bankaccount.back.web.config;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.info.License;

@OpenAPIDefinition(
        info = @Info(
                contact = @Contact(
                        name = "Diego",
                        email = "guadarramahernandezdiego@gmail.com",
                        url = "https://diego-g-hernandez.pages.dev/"
                ),
                title = "OpenApi specification - Bank",
                description = "OpenApi documentation for the bank system",
                license = @License(
                        name = "MIT License",
                        url = "https://github.com/diegoghernandez/Bank-Account/blob/main/LICENSE"
                )
        )
)
public class OpenApiConfig {
}
