package com.hisd3.dtr.web.rest;

import com.google.common.collect.Lists;
import com.hisd3.dtr.web.rest.dto.EmployeeDto;
import com.hisd3.dtr.zkemkeeper.dto.BundyClockLogItem;
import com.hisd3.dtr.zkemkeeper.ZKemKeeperService;
import com.hisd3.dtr.zkemkeeper.dto.BundyClockUserItems;
import org.apache.catalina.servlet4preview.http.HttpServletRequest;
import org.apache.commons.codec.binary.StringUtils;
import org.apache.commons.lang.SystemUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

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

/*    @RequestMapping("/getlogs")
    public ResponseEntity<List<BundyClockLogItem>>getLogs(){

        if(!SystemUtils.IS_OS_WINDOWS){

            HttpHeaders responseHeaders = new HttpHeaders();
            responseHeaders.set("message", "This resource is only for Windows");

            return new  ResponseEntity<List<BundyClockLogItem>>(responseHeaders,HttpStatus.CONFLICT);
        }


       return new ResponseEntity<List<BundyClockLogItem>>(zKemKeeperService.getBundyClockLogItems(),
               HttpStatus.OK);

    }*/



    @RequestMapping("/getlogsbyenrollno")
    public ResponseEntity<List<BundyClockLogItem>>getLogs(@RequestParam String enrollno){

        if(!SystemUtils.IS_OS_WINDOWS){

            HttpHeaders responseHeaders = new HttpHeaders();
            responseHeaders.set("message", "This resource is only for Windows");

            return new  ResponseEntity<List<BundyClockLogItem>>(responseHeaders,HttpStatus.CONFLICT);
        }


        return new ResponseEntity<List<BundyClockLogItem>>(zKemKeeperService.getBundyClockLogItems(enrollno),
                HttpStatus.OK);

    }

    @RequestMapping("/clearlogs")
    public  ResponseEntity migratetodb(){
        HttpHeaders httpHeaders = new HttpHeaders();

        zKemKeeperService.ClearGeneralLogs();

        httpHeaders.set("message", "Cleared and Backup");

        return new ResponseEntity(httpHeaders, HttpStatus.OK);
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

    @RequestMapping("/deleteuser")
    public ResponseEntity deleteuser(@RequestParam String enrollno){
        HttpHeaders httpHeaders = new HttpHeaders();
        zKemKeeperService.deleteUserInfo(enrollno);
        httpHeaders.set("message", "Success");
        return new ResponseEntity(httpHeaders,HttpStatus.OK);
    }

    @RequestMapping(value = "/addnewmeployee",
            method = RequestMethod.POST,
            produces = MediaType.TEXT_PLAIN_VALUE)
    public ResponseEntity addnewmeployee(@Valid @RequestBody EmployeeDto employee, HttpServletRequest request){
        HttpHeaders httpHeaders = new HttpHeaders();
       List<BundyClockUserItems> users = zKemKeeperService.getUserAllUser();

        for(BundyClockUserItems u:users){
            if(StringUtils.equals(u.getDwEnrollNumber(), employee.getEnrollno())){
                httpHeaders.set("message", "Error! Employee exist");
                return new ResponseEntity(httpHeaders, HttpStatus.CONFLICT);
            }
        }
        zKemKeeperService.newUserService(
                employee.getEnrollno(),
                employee.getName(),
                employee.getWorkcode(),
                employee.getPrivilege(),
                employee.getEnabled());

        httpHeaders.set("message", "Success! Employee added");
        return new ResponseEntity(httpHeaders, HttpStatus.OK);

    }


    @RequestMapping("/getlogsbydate")
    public ResponseEntity<List<BundyClockLogItem>> getlogsbydate(){

        if(!SystemUtils.IS_OS_WINDOWS){

            HttpHeaders responseHeaders = new HttpHeaders();
            responseHeaders.set("message", "This resource is only for Windows");

            return new  ResponseEntity<List<BundyClockLogItem>>(responseHeaders,HttpStatus.CONFLICT);
        }

        return new ResponseEntity<List<BundyClockLogItem>>(zKemKeeperService.getAllEmployeeLogsByDate(),HttpStatus.OK);
    }



}
