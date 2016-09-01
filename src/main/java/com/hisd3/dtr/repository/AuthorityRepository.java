package com.hisd3.dtr.repository;



import com.hisd3.dtr.domain.Authority;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;


/**
 * Spring Data JPA repository for the Authority entity.
 */
@RepositoryRestResource(exported = false)
public interface AuthorityRepository extends JpaRepository<Authority, String> {
}
