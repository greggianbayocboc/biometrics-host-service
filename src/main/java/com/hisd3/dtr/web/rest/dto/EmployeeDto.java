package com.hisd3.dtr.web.rest.dto;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

/**
 * Created by jpaying on 9/11/16.
 */
public class EmployeeDto {

    public static final int PASSWORD_MAX_LENGTH = 100 ;
    private static final int PASSWORD_MIN_LENGTH = 5;

    @NotNull
    @Size(max=100)
    private String enrollno;

    @NotNull
    @Size(min = 10, max=255)
    private String name;

    @Size(min = PASSWORD_MIN_LENGTH, max = PASSWORD_MAX_LENGTH)
    private String password;

    @Size(max=50)
    private Integer privilege;

    private Boolean enabled;


    public EmployeeDto(String enrollno, String name, String password, Integer privilege, Boolean enabled) {
        this.enrollno = enrollno;
        this.name = name;
        this.password = password;
        this.privilege = privilege;
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

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Integer getPrivilege() {
        return privilege;
    }

    public void setPrivilege(Integer privilege) {
        this.privilege = privilege;
    }

    public Boolean getEnabled() {
        return enabled;
    }

    public void setEnabled(Boolean enabled) {
        this.enabled = enabled;
    }
}
