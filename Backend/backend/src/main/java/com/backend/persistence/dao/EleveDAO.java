package com.backend.persistence.dao;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.backend.persistence.entities.Eleve;

@Repository
public interface EleveDAO extends JpaRepository<Eleve, Long>{
    Page<Eleve> findAll(Pageable pageable);
}
