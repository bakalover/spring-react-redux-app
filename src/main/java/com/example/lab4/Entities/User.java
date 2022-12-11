package com.example.lab4.Entities;

import jakarta.persistence.*;


@Entity
@Table(name = "users")
public class User { //Модель, описывающая пользователя в базе данных
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
    @Column(name = "login", unique = true,nullable = false)
    private String login;
    @Column(name = "password",nullable = false)
    private String password;

    public User(){}
    public User(String login, String password){
        this.login = login;
        this.password = password;
    }


    //-------------------SETTERS----------------------

    public Integer getId() {
        return id;
    }

    public String getLogin() {
        return login;
    }

    public String getPassword() {
        return password;
    }

    //-------------------GETTERS----------------------

    public void setId(Integer id) {
        this.id = id;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
