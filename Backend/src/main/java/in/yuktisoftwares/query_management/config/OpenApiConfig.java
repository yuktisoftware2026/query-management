package in.yuktisoftwares.query_management.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI customOpenAPI() {
        Contact contact = new Contact();
        contact.email("contact@yuktisoftware.com");
        contact.name("Yukti Software");
        contact.url("https://www.yuktisoftwares.com");
        return new OpenAPI()
                .info(new Info()
                        .title("Query Management API")
                        .version("1.0")
                        .description("API documentation for Query Management")
                        .contact(contact)
                );
    }
}