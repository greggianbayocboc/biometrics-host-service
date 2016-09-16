package com.hisd3.dtr.repository;

import com.hisd3.dtr.domain.BundyClockLogs;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.querydsl.QueryDslPredicateExecutor;

/**
 * Created by jpaying on 9/15/16.
 */
public interface BundyClockRepository extends JpaRepository<BundyClockLogs, Long>, QueryDslPredicateExecutor {
}
