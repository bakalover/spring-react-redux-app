package com.example.lab4.Entities;

import jakarta.persistence.*;

@Entity
public class Shot { //Модель, представляющая одно конкретное попадание
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(name = "owner",nullable = false)
    private String owner;
    @Column(name = "x",nullable = false)
    private Integer x;
    @Column(name = "y",nullable = false)
    private Double y;
    @Column(name = "r",nullable = false)
    private Integer r;
    @Column(name = "status",nullable = false)
    private Boolean status;

    public Shot(){}
    public Shot(String owner, Integer x, Double y,Integer r, Boolean status){
        this.owner = owner;
        this.x = x;
        this.y = y;
        this.r = r;
        this.status = status;
    }


    //-------------------SETTERS----------------------

    public void setId(Integer id) {
        this.id = id;
    }

    public void setOwner(String owner) {
        this.owner = owner;
    }

    public void setX(Integer x) {
        this.x = x;
    }

    public void setY(Double y) {
        this.y = y;
    }

    public void setR(Integer r) {
        this.r = r;
    }

    public void setStatus(Boolean status) {
        this.status = status;
    }

    //-------------------GETTERS----------------------


    public Integer getId() {
        return this.id;
    }

    public String getOwner() {
        return owner;
    }

    public Integer getX() {
        return x;
    }

    public Double getY() {
        return y;
    }

    public Integer getR() {
        return r;
    }

    public Boolean getStatus() {
        return status;
    }
}
