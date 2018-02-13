package com.hisd3.dtr.web.rest.dto;

public class DeviceDto {
    private Long id;
    private String device_name;
    private String ip_address;
    private String port;
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
