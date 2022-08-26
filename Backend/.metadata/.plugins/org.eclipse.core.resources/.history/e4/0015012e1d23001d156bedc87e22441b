package com.backend.persistence.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.backend.persistence.entities.Role;


@Repository
public interface RoleDAO extends JpaRepository<Role,Long> {
    Role findByName(String name);
    Role findOneById(Long id);
	List<Role> findByIsDeletedIsFalse();
}