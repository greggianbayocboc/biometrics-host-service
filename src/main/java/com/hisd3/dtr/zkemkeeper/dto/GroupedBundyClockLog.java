package com.hisd3.dtr.zkemkeeper.dto;

import org.joda.time.DateTime;
import org.joda.time.LocalDateTime;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by albertoclarit on 9/2/16.
 */
public class GroupedBundyClockLog {



    String date;
    DateTime dateTime;
    List<BundyClockLogItem> logs = new ArrayList<>();

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public List<BundyClockLogItem> getLogs() {
        return logs;
    }

    public void setLogs(List<BundyClockLogItem> logs) {
        this.logs = logs;
    }

    public DateTime getDateTime() {
        return dateTime;
    }

    public void setDateTime(DateTime dateTime) {
        this.dateTime = dateTime;
    }
}
