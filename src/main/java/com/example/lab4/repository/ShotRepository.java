package com.example.lab4.repository;

import com.example.lab4.Entities.Shot;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ShotRepository extends JpaRepository<Shot,Integer> { // Интерфейс, работающий с таблицей попаданий в бд
}
