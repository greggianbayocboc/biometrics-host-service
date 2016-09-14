package com.hisd3.dtr.zkemkeeper.dto;

import org.joda.time.DateTime;

/**
 * Created by albertoclarit on 9/2/16.
 */
public class BundyClockLogItem {


    String dwEnrollNumber ;
    int dwVerifyMode;
    String dwInoutMode ;
    int dwYear;
    int dwMonth ;
    int dwDay ;
    int dwHour ;
    int dwMinute ;
    int dwSecindm ;
    int dwWorkCode;
    String date;
    String time;
    String timein;
    String timeout;

    public String getTimein() {
        return timein;
    }

    public void setTimein(String timein) {
        this.timein = timein;
    }

    public String getTimeout() {
        return timeout;
    }

    public void setTimeout(String timeout) {
        this.timeout = timeout;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public String getDwEnrollNumber() {
        return dwEnrollNumber;
    }

    public void setDwEnrollNumber(String dwEnrollNumber) {
        this.dwEnrollNumber = dwEnrollNumber;
    }

    public int getDwVerifyMode() {
        return dwVerifyMode;
    }

    public void setDwVerifyMode(int dwVerifyMode) {
        this.dwVerifyMode = dwVerifyMode;
    }

    public String getDwInoutMode() {
        return dwInoutMode;
    }

    public void setDwInoutMode(String dwInoutMode) {
        this.dwInoutMode = dwInoutMode;
    }

    public int getDwYear() {
        return dwYear;
    }

    public void setDwYear(int dwYear) {
        this.dwYear = dwYear;
    }

    public int getDwMonth() {
        return dwMonth;
    }

    public void setDwMonth(int dwMonth) {
        this.dwMonth = dwMonth;
    }

    public int getDwDay() {
        return dwDay;
    }

    public void setDwDay(int dwDay) {
        this.dwDay = dwDay;
    }

    public int getDwHour() {
        return dwHour;
    }

    public void setDwHour(int dwHour) {
        this.dwHour = dwHour;
    }

    public int getDwMinute() {
        return dwMinute;
    }

    public void setDwMinute(int dwMinute) {
        this.dwMinute = dwMinute;
    }

    public int getDwSecindm() {
        return dwSecindm;
    }

    public void setDwSecindm(int dwSecindm) {
        this.dwSecindm = dwSecindm;
    }

    public int getDwWorkCode() {
        return dwWorkCode;
    }

    public void setDwWorkCode(int dwWorkCode) {
        this.dwWorkCode = dwWorkCode;
    }
}
