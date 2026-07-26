package org.jdc.portal.repository;

import org.jdc.portal.entity.Role;
import org.jdc.portal.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByNameOrEmail(String name, String email);

    Optional<User> findByEmail(String email);

    Optional<User> findByName(String name);

    Optional<User> findByRole(Role role);

    boolean existsByEmailAndIdNot(String email, Long id);

    boolean existsByNameAndIdNot(String name, Long id);

    @Query("""
        select u from User u where u.role = :role
    """)
    List<User> findAllByRole(Role role);
}
