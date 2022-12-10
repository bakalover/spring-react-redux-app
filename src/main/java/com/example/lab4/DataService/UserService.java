package com.example.lab4.DataService;


import com.example.lab4.Entities.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class UserService { //Класс отвечающий за действия, производимые с таблицей пользователей в бд
    @Autowired
    private UserRepository userRepository;
    public void add(User user){ //Добавление пользователя в бд
        userRepository.save(user);
    }
    //В зависимости от надобности - добавить другие методы
    //...
}
