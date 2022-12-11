package com.example.lab4.Entities;

import jakarta.persistence.*;
import org.springframework.security.core.GrantedAuthority;

import java.util.Set;

@Entity
@Table(name = "roles")
public class Role implements GrantedAuthority {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "name")
    private String name;
    @ManyToMany(mappedBy = "roles")
    private Set<User> roles;

    //--------------CONSTRUCTORS---------------
    public Role() {
    }

    public Role(Long id) {
        this.id = id;
    }

    public Role(Long id, String name) {
        this.id = id;
        this.name = name;
    }

    //--------------SETTERS---------------

    public void setId(Long id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setRoles(Set<User> roles) {
        this.roles = roles;
    }

    //--------------GETTERS---------------

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public Set<User> getRoles() {
        return roles;
    }

    @Override
    public String getAuthority() {
        return null;
    }
}
