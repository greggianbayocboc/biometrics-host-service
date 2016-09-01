package com.hisd3.dtr.repository;


import com.hisd3.dtr.domain.User;
import org.joda.time.DateTime;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.querydsl.QueryDslPredicateExecutor;

import java.util.List;

/**
 * Spring Data JPA repository for the User entity.
 */
//@RepositoryRestResource(exported = false)
//@RepositoryRestResource(collectionResourceRel = "users", path = "users")
public interface UserRepository extends JpaRepository<User, Long>,QueryDslPredicateExecutor {

    User findOneByActivationKey(String activationKey);

    List<User> findAllByActivatedIsFalseAndCreatedDateBefore(DateTime dateTime);

    User findOneByResetKey(String resetKey);

    User findOneByLogin(String login);

    User findOneByEmail(String email);

    @Query(value = "Select  a from User a where  a.login not in ('system','admin@vizdacore.com')",
    countQuery = "Select  count(a)  from User a where  a.login not in ('system','admin@vizdacore.com')")
    Page<User> getOrdinaryUser(Pageable pageable);
}
