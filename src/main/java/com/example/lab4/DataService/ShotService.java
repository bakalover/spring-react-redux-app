package com.example.lab4.DataService;

import com.example.lab4.Entities.Shot;
import com.example.lab4.repository.ShotRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class ShotService {
    @Autowired
    private ShotRepository shotRepository;
    public void add(Shot shot){ //Добавление попадания в бд
        shotRepository.save(shot);
    }
    //В зависимости от надобности - добавить другие методы
    //...
}
