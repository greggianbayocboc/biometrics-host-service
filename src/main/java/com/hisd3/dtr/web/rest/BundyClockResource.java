package com.hisd3.dtr.web.rest;

import com.hisd3.dtr.domain.BundyClockLogs;
import com.hisd3.dtr.zkemkeeper.dto.BundyClockLogItem;
import com.hisd3.dtr.zkemkeeper.ZKemKeeperService;
import com.hisd3.dtr.zkemkeeper.dto.BundyClockUserItems;
import org.apache.catalina.servlet4preview.http.HttpServletRequest;
import org.apache.commons.lang.StringUtils;
import org.apache.commons.lang.SystemUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.stream.Collectors;

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


       return new ResponseEntity<List<BundyClockLogItem>>(zKemKeeperService.getBundyClockLogItemsAll(),
               HttpStatus.OK);

    }

    @RequestMapping("/getlogsbyenrollnov2")
    public Map<String, BundyClockLogItem> getLogsv2(@RequestParam String enrollno){

        if(!SystemUtils.IS_OS_WINDOWS){

            HttpHeaders responseHeaders = new HttpHeaders();
            responseHeaders.set("message", "This resource is only for Windows");

            //  return new  ResponseEntity<List<BundyClockLogItem>>(responseHeaders,HttpStatus.CONFLICT);
        }

        List<BundyClockLogItem> logs = zKemKeeperService.getBundyClockLogItems(enrollno);
        Map<String, List<BundyClockLogItem>> studlistGrouped =
                logs.stream().collect(Collectors.groupingBy(w -> w.getDate()));

        Map<String ,BundyClockLogItem> mapdto =  new HashMap<>();

        for(String key1: studlistGrouped.keySet()){
               for(BundyClockLogItem log: studlistGrouped.get(key1)){
                    if(!mapdto.isEmpty()){
                        if(mapdto.containsKey(key1)){
                            if(StringUtils.equalsIgnoreCase(log.getDate(),mapdto.get(log.getDate()).getDate())){
                                if(StringUtils.equalsIgnoreCase(log.getDwInoutMode(),"time in")){
                                    mapdto.get(log.getDate()).setTimein(log.getTime());
                                }else if(StringUtils.equalsIgnoreCase(log.getDwInoutMode(),"time out")){
                                    mapdto.get(log.getDate()).setTimeout(log.getTime());
                                }
                            }
                        }else{
                            if(StringUtils.equalsIgnoreCase(log.getDwInoutMode(),"time in")){
                              log.setTimein(log.getTime());
                            }else if(StringUtils.equalsIgnoreCase(log.getDwInoutMode(),"time out")){
                              log.setTimeout(log.getTime());
                            }
                            mapdto.put(log.getDate(),log);

                        }

                    }else{
                        mapdto.put(log.getDate(), log);
                    }



               }
        }


        return mapdto;

    }




    @RequestMapping("/getlogsbyenrollno")
    public ResponseEntity<List<BundyClockLogItem>> getLogs(@RequestParam String enrollno){

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

    @RequestMapping("/findbyname")
    public BundyClockUserItems findbyname(@RequestParam String fullname){
        HttpHeaders httpHeaders = new HttpHeaders();
        List<BundyClockUserItems> users = zKemKeeperService.getUserAllUser();

        BundyClockUserItems dto = new BundyClockUserItems();

        for(BundyClockUserItems u: users){
            if(StringUtils.equalsIgnoreCase(u.getName(), fullname)){
                dto = u;
            }

        }
        return dto;
    }

    @RequestMapping("addfingerprint")
    public ResponseEntity addfingerprint(@RequestParam Integer enrollno, @RequestParam Integer fingerIndex){
        HttpHeaders httpHeaders = new HttpHeaders();
        List<BundyClockUserItems> users = zKemKeeperService.getUserAllUser();

        for(BundyClockUserItems u: users){
            if(StringUtils.equals(u.getDwEnrollNumber(), enrollno.toString())){


               if( zKemKeeperService.addUserFingerPrint(enrollno, fingerIndex, 2)){
                   httpHeaders.set("message", "Success");
                   return new ResponseEntity(httpHeaders,HttpStatus.OK);
               }else{
                   httpHeaders.set("message", "Error");
                   return new ResponseEntity(httpHeaders,HttpStatus.OK);
               }


            }
        }

        httpHeaders.set("message","Success");
        return new ResponseEntity(httpHeaders, HttpStatus.OK);
    }


    @RequestMapping(value = "/addnewmeployeev2",
            produces = MediaType.TEXT_PLAIN_VALUE)
    public ResponseEntity addnewmeployeev2(
            @RequestParam(required = false) String enrollno,
            @RequestParam String name,
            @RequestParam Integer privilege,
            @RequestParam Integer workcode, HttpServletRequest request){
        HttpHeaders httpHeaders = new HttpHeaders();
        List<BundyClockUserItems> users = zKemKeeperService.getUserAllUser();
        ArrayList<Integer> max = new ArrayList<Integer>();
        for(BundyClockUserItems u:users){
            max.add(Integer.parseInt(u.getDwEnrollNumber()));
        }
        Integer largest = Collections.max(max);
        if(enrollno==null || enrollno.trim().equals("")){
            //
           for(BundyClockUserItems u: users){
               if(StringUtils.equals(u.getName(), name)){

                   return new ResponseEntity<>(u, HttpStatus.OK);

               }
           }



            if(largest!=null){
                Integer enrollnos = largest+1;
                zKemKeeperService.newUserService(
                        enrollnos.toString(),
                        name,
                        workcode,
                        privilege,
                        true);
                BundyClockUserItems u = new BundyClockUserItems();
                u.setName(name);
                u.setDwEnrollNumber(enrollnos.toString());
                u.setDwEnable(true);

                Integer returnEnrollno = largest+1;
                httpHeaders.set("enrollno", returnEnrollno.toString());
                return new ResponseEntity<>(u, HttpStatus.OK);

            }
        }else {

            for(BundyClockUserItems u: users){
                if(StringUtils.equals(u.getName(), name)){

                    httpHeaders.set("enrollno", "Employee Already Exist");
                    return new ResponseEntity(httpHeaders,HttpStatus.OK);
                }
            }

            zKemKeeperService.newUserService(
                    enrollno,
                    name,
                    workcode,
                    privilege,
                    true);
            BundyClockUserItems u = new BundyClockUserItems();
            u.setName(name);
            u.setDwEnrollNumber(enrollno);
            u.setDwEnable(true);

            return new ResponseEntity<>(u, HttpStatus.OK);
        }



        return null;

    }


    @RequestMapping("/getlogsbydate")
    public ResponseEntity<List<BundyClockLogItem>> getlogsbydate(@RequestParam String enrollno){

        if(!SystemUtils.IS_OS_WINDOWS){

            HttpHeaders responseHeaders = new HttpHeaders();
            responseHeaders.set("message", "This resource is only for Windows");

            return new  ResponseEntity<List<BundyClockLogItem>>(responseHeaders,HttpStatus.CONFLICT);
        }

        return new ResponseEntity<List<BundyClockLogItem>>(zKemKeeperService.getBundyClockLogItems(enrollno),HttpStatus.OK);
    }



}
