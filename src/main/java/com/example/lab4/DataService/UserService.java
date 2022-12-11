package com.example.lab4.DataService;


import com.example.lab4.Entities.Role;
import com.example.lab4.Entities.User;
import com.example.lab4.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;
import  org.springframework.security.core.userdetails.User.UserBuilder;

import java.util.Collections;

@Service
@Transactional
public class UserService implements UserDetailsService { //Класс отвечающий за действия, производимые с таблицей пользователей в бд
    @Autowired
    private UserRepository userRepository;
    @Autowired
    BCryptPasswordEncoder bCryptPasswordEncoder; //Кодирование паролей

    public boolean add(User user){ //Добавление пользователя в бд
        if(userRepository.findByUsername(user.getUsername())!=null){
            return false;
        }
        user.setRoles(Collections.singleton(new Role(1L,"ROLE_USER"))); //Добавляем пользователю роль ROLE_USER
        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));      //Шифруем пароль
        userRepository.save(user);
        return true;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username);

        if (user == null) {
            throw new UsernameNotFoundException("User not found");
        }
        return user;
    }


    //В зависимости от надобности - добавить другие методы
    //...
}
