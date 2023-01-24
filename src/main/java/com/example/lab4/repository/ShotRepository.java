package com.example.lab4.repository;

import com.example.lab4.Entities.Shot;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.rest.core.annotation.RestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;

public interface ShotRepository extends JpaRepository<Shot,Integer> {
    List<Shot> findAllByOwner(String owner);
}
