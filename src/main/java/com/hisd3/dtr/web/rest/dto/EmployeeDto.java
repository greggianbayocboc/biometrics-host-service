package com.hisd3.dtr.web.rest.dto;

import io.swagger.models.auth.In;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

/**
 * Created by jpaying on 9/11/16.
 */
public class EmployeeDto {


    private String enrollno;

    private String name;



    private Integer privilege;

    private Integer workcode;

    private Boolean enabled;

    public EmployeeDto(){

    }

    public EmployeeDto(String enrollno, String name, Integer privilege, Integer workcode, Boolean enabled) {
        this.enrollno = enrollno;
        this.name = name;
        this.privilege = privilege;
        this.workcode = workcode;
        this.enabled = enabled;
    }

    public String getEnrollno() {
        return enrollno;
    }

    public void setEnrollno(String enrollno) {
        this.enrollno = enrollno;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getPrivilege() {
        return privilege;
    }

    public void setPrivilege(Integer privilege) {
        this.privilege = privilege;
    }

    public Integer getWorkcode() {
        return workcode;
    }

    public void setWorkcode(Integer workcode) {
        this.workcode = workcode;
    }

    public Boolean getEnabled() {
        return enabled;
    }

    public void setEnabled(Boolean enabled) {
        this.enabled = enabled;
    }
}
