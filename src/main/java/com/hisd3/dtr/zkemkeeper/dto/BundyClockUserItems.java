package com.hisd3.dtr.zkemkeeper.dto;

/**
 * Created by AyingzkiE on 9/3/2016.
 */
public class BundyClockUserItems {
    String dwEnrollNumber;
    String Name,Password;
    int Privilege;
    boolean dwEnable;

    public String getDwEnrollNumber() {
        return dwEnrollNumber;
    }

    public void setDwEnrollNumber(String dwEnrollNumber) {
        this.dwEnrollNumber = dwEnrollNumber;
    }

    public String getName() {
        return Name;
    }

    public void setName(String name) {
        Name = name;
    }

    public String getPassword() {
        return Password;
    }

    public void setPassword(String password) {
        Password = password;
    }

    public int getPrivilege() {
        return Privilege;
    }

    public void setPrivilege(int privilege) {
        Privilege = privilege;
    }

    public boolean isDwEnable() {
        return dwEnable;
    }

    public void setDwEnable(boolean dwEnable) {
        this.dwEnable = dwEnable;
    }
}
