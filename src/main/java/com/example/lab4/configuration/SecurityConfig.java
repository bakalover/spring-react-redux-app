package com.example.lab4.configuration;

import com.example.lab4.DataService.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.authorization.AuthenticatedAuthorizationManager;
import org.springframework.security.config.annotation.SecurityBuilder;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter { // Класс настроек защиты -> пароли и авторизация
    @Autowired
    UserService userService;
    @Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder() { //Хэшировчик паролей пользователей
        return new BCryptPasswordEncoder();
    }
    @Override
    protected void configure(HttpSecurity httpSecurity) throws Exception{
        // Исходя из архитектуры, контроль будет передаваться ПЕРВОЙ попавшейся цепи фильтров
        httpSecurity
                .csrf()
                .disable()
                .authorizeRequests()
                .antMatchers("/registration").not().fullyAuthenticated() //Только не зарегестрированным
                .antMatchers("/").permitAll()                            //Всем
                .antMatchers("/index").hasRole("USER")
                .antMatchers("/table").hasRole("USER")                   //Только пользователям
                .anyRequest().authenticated()
                .and().formLogin().loginPage("/login")            //Иной доступ блокируется -> нужна аутентификация
                .defaultSuccessUrl("/main").permitAll()           //В случае успешного входа перенаправляем на страницу с графиком
                .and().logout().permitAll().logoutSuccessUrl("/registration");
    }
    @Bean
    public DaoAuthenticationProvider daoAuthenticationProvider() {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setPasswordEncoder(bCryptPasswordEncoder());
        provider.setUserDetailsService(this.userService);
        return provider;
    }
}
