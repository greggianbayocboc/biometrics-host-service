package com.hisd3.dtr.web.rest;

import com.hisd3.dtr.zkemkeeper.dto.BundyClockLogItem;
import com.hisd3.dtr.zkemkeeper.ZKemKeeperService;
import com.hisd3.dtr.zkemkeeper.dto.BundyClockUserItems;
import org.apache.commons.lang.SystemUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * Created by albertoclarit on 9/2/16.
 */
@RestController
@RequestMapping("/api/bundyclock")
public class BundyClockResource {


 @Autowired
    ZKemKeeperService zKemKeeperService;


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
    public ResponseEntity<List<BundyClockLogItem>>getLogs(){

        if(!SystemUtils.IS_OS_WINDOWS){

            HttpHeaders responseHeaders = new HttpHeaders();
            responseHeaders.set("message", "This resource is only for Windows");

            return new  ResponseEntity<List<BundyClockLogItem>>(responseHeaders,HttpStatus.CONFLICT);
        }


       return new ResponseEntity<List<BundyClockLogItem>>(zKemKeeperService.getBundyClockLogItems(),
               HttpStatus.OK);

    }

    @RequestMapping("/getusers")
    public ResponseEntity<List<BundyClockUserItems>>getusers(){

        if(!SystemUtils.IS_OS_WINDOWS){
            HttpHeaders httpHeaders = new HttpHeaders();
            httpHeaders.set("message", "This resource is only for Windows");

            return  new ResponseEntity<List<BundyClockUserItems>>(httpHeaders, HttpStatus.CONFLICT);
        }

        return new ResponseEntity<List<BundyClockUserItems>>(zKemKeeperService.getUserAllUser(),HttpStatus.OK);
    }



}
