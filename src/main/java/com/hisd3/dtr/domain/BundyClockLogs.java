package com.hisd3.dtr.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.hibernate.annotations.Type;
import org.joda.time.DateTime;
import org.joda.time.LocalDateTime;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

/**
 * Created by jpaying on 9/15/16.
 */
@Entity
@Table(name = "bundyclocklogs")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class BundyClockLogs {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NotNull
    @Size(max = 99)
    @Column(name = "dw_enrollno", length = 99)
    private String dwEnrollNumber;

    @NotNull
    @Type(type = "org.jadira.usertype.dateandtime.joda.PersistentDateTime")
    @Column(name = "dw_datetime", nullable = false)
    private DateTime dateTime;




    @Column(name = "dw_verifymode", length = 99)
    private Integer dwVerifyMode;


    @Column(name = "dw_inoutmode", length = 99)
    private Integer dwInoutMode;


    @Column(name = "dw_workcode", length =  99)
    private Integer dwWorkCode;

    public DateTime getDateTime() {
        return dateTime;
    }

    public void setDateTime(DateTime dateTime) {
        this.dateTime = dateTime;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDwEnrollNumber() {
        return dwEnrollNumber;
    }

    public void setDwEnrollNumber(String dwEnrollNumber) {
        this.dwEnrollNumber = dwEnrollNumber;
    }


    public Integer getDwVerifyMode() {
        return dwVerifyMode;
    }

    public void setDwVerifyMode(Integer dwVerifyMode) {
        this.dwVerifyMode = dwVerifyMode;
    }

    public Integer getDwInoutMode() {
        return dwInoutMode;
    }

    public void setDwInoutMode(Integer dwInoutMode) {
        this.dwInoutMode = dwInoutMode;
    }

    public Integer getDwWorkCode() {
        return dwWorkCode;
    }

    public void setDwWorkCode(Integer dwWorkCode) {
        this.dwWorkCode = dwWorkCode;
    }
}
