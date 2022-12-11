package com.example.lab4.DataService;

import com.example.lab4.Entities.Shot;
import com.example.lab4.Entities.User;
import com.example.lab4.repository.ShotRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class ShotService {
    @Autowired
    private ShotRepository shotRepository;

    public void registerUser(Shot shot){ //Добавление попадания в бд
        shotRepository.save(shot);
    }

    public List<Shot> getByUser(User user){ // Вынимать из бд только точки принадлежащие определённому пользователю
        return shotRepository.findAllByOwner(user.getUsername());
    }

    public List<Shot> getAll(){ //Вся таблица
        return shotRepository.findAll();
    }

    //В зависимости от надобности - добавить другие методы
    //...
}
