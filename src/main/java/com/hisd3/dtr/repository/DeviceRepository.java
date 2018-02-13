package com.hisd3.dtr.repository;

import com.hisd3.dtr.domain.Device;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.querydsl.QueryDslPredicateExecutor;

import java.util.List;
import java.util.UUID;

public interface DeviceRepository extends JpaRepository<Device, Long>, QueryDslPredicateExecutor {
    @Query(value = "Select d from Device d where d.default_device = true ")
    List<Device> getAllByDefault_device();
}
