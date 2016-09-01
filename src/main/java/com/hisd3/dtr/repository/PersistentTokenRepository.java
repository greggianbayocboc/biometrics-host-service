package com.hisd3.dtr.repository;


import com.hisd3.dtr.domain.PersistentToken;
import com.hisd3.dtr.domain.User;
import org.joda.time.LocalDate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;

/**
 * Spring Data JPA repository for the PersistentToken entity.
 */
@RepositoryRestResource(exported = false)
public interface PersistentTokenRepository extends JpaRepository<PersistentToken, String> {

    List<PersistentToken> findByUser(User user);

    List<PersistentToken> findByTokenDateBefore(LocalDate localDate);

}
