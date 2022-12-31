package com.example.lab4.security_jwt;

import com.example.lab4.DataService.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableWebSecurity
public class SecurityConfiguration extends WebSecurityConfigurerAdapter { // Класс настроек защиты -> пароли и авторизация
    /*@Autowired
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
                .antMatchers("/registration").not().authenticated() // Проблема  - пропускает зарегестрированных
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
    }*/
    @Autowired
    UserService userService;

    @Autowired
    private StartAuth unauthorized;

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Override
    public void configure(AuthenticationManagerBuilder authenticationManagerBuilder) throws Exception {
        authenticationManagerBuilder.userDetailsService(userService).passwordEncoder(passwordEncoder());
    }

    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    @Bean
    public TokenFilter filter() {
        return new TokenFilter();
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .cors()
                .and()
                .csrf().disable()
                .httpBasic().disable()
                .exceptionHandling()
                .authenticationEntryPoint(unauthorized) //
                .and()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS) // Не храним состояние
                .and()
                .addFilterBefore(filter(), UsernamePasswordAuthenticationFilter.class) //Фильтр токенов на основе переданного класса
                .authorizeRequests()
                .antMatchers("/auth/**").permitAll() //Доступ к котроллеру с регистрацией имеют все
                .anyRequest().authenticated(); // иначе нужна аутентификация
    }
}
