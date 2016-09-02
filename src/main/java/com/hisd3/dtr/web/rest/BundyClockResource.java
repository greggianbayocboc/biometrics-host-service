package com.hisd3.dtr.web.rest;

import com.hisd3.dtr.web.rest.dto.BundyClockLogItem;
import org.apache.commons.lang.SystemUtils;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.ServletException;

/**
 * Created by albertoclarit on 9/2/16.
 */
@RestController
@RequestMapping("/api/bundyclock")
public class BundyClockResource {



    @RequestMapping("/getlogstotal")
    public ResponseEntity<Integer> getLogsTotal(){

        if(!SystemUtils.IS_OS_WINDOWS){

            HttpHeaders responseHeaders = new HttpHeaders();
            responseHeaders.set("message", "This resource is only for Windows");

            return new  ResponseEntity<Integer>(responseHeaders,HttpStatus.CONFLICT);
        }

        return null;
    }

    @RequestMapping("/getlogs")
    public ResponseEntity<Integer> getLogs(){

        if(!SystemUtils.IS_OS_WINDOWS){

            HttpHeaders responseHeaders = new HttpHeaders();
            responseHeaders.set("message", "This resource is only for Windows");

            return new  ResponseEntity<Integer>(responseHeaders,HttpStatus.CONFLICT);
        }



        return  null;
    }



}
