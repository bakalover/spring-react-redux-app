package com.example.lab4.repository;

import com.example.lab4.Entities.Shot;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ShotRepository extends JpaRepository<Shot,Integer> { // Интерфейс, работающий с таблицей попаданий в бд
    List<Shot> findAllByOwner(String owner); //Spring производит автоматическую настроику метода исходя ТОЛЬКО из его имени (удобно)
}
