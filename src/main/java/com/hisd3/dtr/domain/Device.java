package com.hisd3.dtr.domain;

import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.util.UUID;

@Entity
@Table(name = "devices")
@org.hibernate.annotations.Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Device extends AbstractAuditingEntity implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "device_name",columnDefinition = "varchar")
    private String device_name;

    @Column(name = "ip_address",columnDefinition = "varchar")
    private String ip_address;

    @Column(name = "port", columnDefinition = "varchar")
    private String port;

    @Column(name = "default_device", columnDefinition = "bool")
    private Boolean default_device;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDevice_name() {
        return device_name;
    }

    public void setDevice_name(String device_name) {
        this.device_name = device_name;
    }

    public String getIp_address() {
        return ip_address;
    }

    public void setIp_address(String ip_address) {
        this.ip_address = ip_address;
    }

    public String getPort() {
        return port;
    }

    public void setPort(String port) {
        this.port = port;
    }

    public Boolean getDefault_device() {
        return default_device;
    }

    public void setDefault_device(Boolean default_device) {
        this.default_device = default_device;
    }
}

