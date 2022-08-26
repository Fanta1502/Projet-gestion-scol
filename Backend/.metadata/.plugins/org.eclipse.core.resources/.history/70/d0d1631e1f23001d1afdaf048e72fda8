package com.backend.persistence.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.backend.persistence.entities.Utilisateur;

@Repository
public interface UtilisateurDAO extends JpaRepository<Utilisateur, Long> {

    Optional<Utilisateur> findByEmailAndIsDeletedIsFalse(String email);
    Optional<Utilisateur> findByIdAndIsDeletedIsFalse(Long id);
    Utilisateur findOneByIdAndIsDeletedIsFalse(Long id);
    Utilisateur findOneByEmailAndIsDeletedIsFalse(String email);
    List<Utilisateur> findByRolesNameInAndIsDeletedIsFalse(List<String> roles);
    List<Utilisateur> findByIsDeletedIsFalse();
}
