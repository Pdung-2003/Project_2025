package com.devteria.identityservice.configuration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:3000")  // URL của frontend (React)
                .allowedMethods("GET", "POST", "PUT", "DELETE") // Các phương thức được phép
                .allowedHeaders("*")
                .allowCredentials(true);
    }
}

