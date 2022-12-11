package com.example.lab4.repository;

import com.example.lab4.Entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User,Integer> { //Интерфейс, работающий с таблицей пользователе в бд
    User findByUsername(String username);
}
