package com.hisd3.dtr.web.rest;

import com.hisd3.dtr.domain.Device;
import com.hisd3.dtr.repository.DeviceRepository;
import com.hisd3.dtr.web.rest.dto.DeviceDto;
import com.hisd3.dtr.zkemkeeper.dto.BundyClockLogItem;
import com.hisd3.dtr.zkemkeeper.ZKemKeeperService;
import com.hisd3.dtr.zkemkeeper.dto.BundyClockUserItems;
import com.hisd3.dtr.zkemkeeper.dto.GroupedBundyClockLog;
import org.apache.commons.lang.BooleanUtils;
import org.apache.commons.lang.StringUtils;
import org.apache.commons.lang.SystemUtils;
import org.joda.time.format.DateTimeFormat;
import org.joda.time.format.DateTimeFormatter;
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

    @Autowired
    DeviceRepository deviceRepository;


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

        List<Device> devices = deviceRepository.findAll();
        List<BundyClockLogItem> list = new ArrayList<>();

        if(devices.size()==0){
            HttpHeaders httpHeaders = new HttpHeaders();
            httpHeaders.set("message", "No Default Device Selected");
            return  new ResponseEntity<List<BundyClockLogItem>>(httpHeaders, HttpStatus.CONFLICT);

        }

        if(!SystemUtils.IS_OS_WINDOWS){

            HttpHeaders responseHeaders = new HttpHeaders();
            responseHeaders.set("message", "This resource is only for Windows");

            return new  ResponseEntity<List<BundyClockLogItem>>(responseHeaders,HttpStatus.CONFLICT);
        }

        for (Device device:devices) {
            try{
                list.addAll(zKemKeeperService.getBundyClockLogItemsAll(device));
            }
            catch (Exception e)
            {
                e.printStackTrace();
            }

        }

        return new ResponseEntity<List<BundyClockLogItem>>(list,
                HttpStatus.OK);

    }

    @RequestMapping("/getAllDeviceLogs")
    public ResponseEntity<List<BundyClockLogItem>>getAllDeviceLogs(){

        List<Device> devices = deviceRepository.findAll();
        List<BundyClockLogItem> list = new ArrayList<>();

        if(devices.size()==0){
            HttpHeaders httpHeaders = new HttpHeaders();
            httpHeaders.set("message", "No Default Device Selected");
            return  new ResponseEntity<List<BundyClockLogItem>>(httpHeaders, HttpStatus.CONFLICT);

        }

        if(!SystemUtils.IS_OS_WINDOWS){

            HttpHeaders responseHeaders = new HttpHeaders();
            responseHeaders.set("message", "This resource is only for Windows");

            return new  ResponseEntity<List<BundyClockLogItem>>(responseHeaders,HttpStatus.CONFLICT);
        }

        for (Device device:devices) {
            try{
                list.addAll(zKemKeeperService.getBundyClockLogItemsAll(device));
            }
            catch (Exception e)
            {
                e.printStackTrace();
            }

        }

        return new ResponseEntity<List<BundyClockLogItem>>(list,
                HttpStatus.OK);

    }

    @RequestMapping("/getlogsbyenrollnov2")
    public Map<String, BundyClockLogItem> getLogsv2(@RequestParam String enrollno){

        List<Device> devices = deviceRepository.findAll();
        List<BundyClockLogItem> logs = new ArrayList<>();



        for (Device device:devices) {
            try{
                logs.addAll(zKemKeeperService.getBundyClockLogItems(device,enrollno));
            }
            catch (Exception e)
            {
                e.printStackTrace();
            }
        }

        if(devices.size()==0){
            HttpHeaders httpHeaders = new HttpHeaders();
            httpHeaders.set("message", "No Default Device Selected");
            //  return  new ResponseEntity<List<BundyClockLogItem>>(httpHeaders, HttpStatus.CONFLICT);

        }

        if(!SystemUtils.IS_OS_WINDOWS){

            HttpHeaders responseHeaders = new HttpHeaders();
            responseHeaders.set("message", "This resource is only for Windows");

            //  return new  ResponseEntity<List<BundyClockLogItem>>(responseHeaders,HttpStatus.CONFLICT);
        }

        Map<String, List<BundyClockLogItem>> studlistGrouped =
                logs.stream().collect(Collectors.groupingBy(w -> w.getDate()));

        Map<String ,BundyClockLogItem> mapdto =  new HashMap<>();

        for(String key1: studlistGrouped.keySet()){
            for(BundyClockLogItem log: studlistGrouped.get(key1)){
                    mapdto.put(log.getDate(), log);
            }
        }


        return mapdto;

    }

    @RequestMapping("/getlogsbyenrollnoForSirJohn")
    public List<GroupedBundyClockLog> getlogsbyenrollnoForSirJohn(@RequestParam String enrollno){

        List<Device> devices = deviceRepository.findAll();
        List<BundyClockLogItem> logs = new ArrayList<>();
        List<GroupedBundyClockLog> groupedBundyClockLogs = new ArrayList<>();


        for (Device device:devices) {
            try{
                logs.addAll(zKemKeeperService.getBundyClockLogItems(device,enrollno));
            }
            catch (Exception e)
            {
                e.printStackTrace();
            }
        }

        if(devices.size()==0){
            HttpHeaders httpHeaders = new HttpHeaders();
            httpHeaders.set("message", "No Default Device Selected");
            //  return  new ResponseEntity<List<BundyClockLogItem>>(httpHeaders, HttpStatus.CONFLICT);

        }

        if(!SystemUtils.IS_OS_WINDOWS){

            HttpHeaders responseHeaders = new HttpHeaders();
            responseHeaders.set("message", "This resource is only for Windows");

            //  return new  ResponseEntity<List<BundyClockLogItem>>(responseHeaders,HttpStatus.CONFLICT);
        }

        Map<String, List<BundyClockLogItem>> studlistGrouped =
                logs.stream().collect(Collectors.groupingBy(w -> w.getDate()));

        Map<String ,BundyClockLogItem> mapdto =  new HashMap<>();
        DateTimeFormatter formatter = DateTimeFormat.forPattern("MM/dd/yyyy");

        for(String key1: studlistGrouped.keySet()){
            GroupedBundyClockLog group = new GroupedBundyClockLog();

            List<BundyClockLogItem> currentLogs = new ArrayList<>();

            group.setDate(key1);
            group.setDateTime(formatter.parseDateTime(key1));
            for(BundyClockLogItem log: studlistGrouped.get(key1)){
                currentLogs.add(log);
            }
            group.setLogs(currentLogs);
            groupedBundyClockLogs.add(group);
        }
        Collections.sort(groupedBundyClockLogs,(o1, o2) -> o1.getDateTime().isBefore(o2.getDateTime())?1:-1);
        return groupedBundyClockLogs;

    }

    @RequestMapping("/getlogsbyenrollnov3")
    public Map<String, BundyClockLogItem> getLogsv3(@RequestParam String enrollno){


        List<Device> devices = deviceRepository.findAll();



        if(devices.size()==0){
            HttpHeaders httpHeaders = new HttpHeaders();
            httpHeaders.set("message", "No Default Device Selected");
            //  return  new ResponseEntity<List<BundyClockLogItem>>(httpHeaders, HttpStatus.CONFLICT);

        }

        if(!SystemUtils.IS_OS_WINDOWS){

            HttpHeaders responseHeaders = new HttpHeaders();
            responseHeaders.set("message", "This resource is only for Windows");

            //  return new  ResponseEntity<List<BundyClockLogItem>>(responseHeaders,HttpStatus.CONFLICT);
        }


        Map<String ,BundyClockLogItem> mapdto =  new HashMap<>();

        for (Device settings : devices) {
            List<BundyClockLogItem> logs = zKemKeeperService.getBundyClockLogItems(settings,enrollno);
            Map<String, List<BundyClockLogItem>> studlistGrouped =
                    logs.stream().collect(Collectors.groupingBy(w -> w.getDate()));
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

        }

        return mapdto;
    }




    @RequestMapping("/getlogsbyenrollno")
    public ResponseEntity<List<BundyClockLogItem>> getLogs(@RequestParam String enrollno){
        Device settings = deviceRepository.getAllByDefault_device().get(0);


        if(settings==null){
            HttpHeaders httpHeaders = new HttpHeaders();
            httpHeaders.set("message", "No Default Device Selected");
            return  new ResponseEntity<List<BundyClockLogItem>>(httpHeaders, HttpStatus.CONFLICT);

        }

        if(!SystemUtils.IS_OS_WINDOWS){

            HttpHeaders responseHeaders = new HttpHeaders();
            responseHeaders.set("message", "This resource is only for Windows");

            return new  ResponseEntity<List<BundyClockLogItem>>(responseHeaders,HttpStatus.CONFLICT);
        }



        return new ResponseEntity<List<BundyClockLogItem>>(zKemKeeperService.getBundyClockLogItems(settings,enrollno),
                HttpStatus.OK);

    }
    @RequestMapping("/getDeviceList")
    public ResponseEntity<List<Device>> getDeviceList(){
        List<Device> devices = deviceRepository.findAll();

        return new ResponseEntity<List<Device>>(devices,
                HttpStatus.OK);

    }

    @RequestMapping("/clearlogs")
    public  ResponseEntity migratetodb(){
        HttpHeaders httpHeaders = new HttpHeaders();

        Device settings = deviceRepository.getAllByDefault_device().get(0);


        if(settings==null){
            httpHeaders.set("message", "No Default Device Selected");
            return  new ResponseEntity<List<BundyClockLogItem>>(httpHeaders, HttpStatus.CONFLICT);

        }

        zKemKeeperService.ClearGeneralLogs(settings);

        httpHeaders.set("message", "Cleared and Backup");

        return new ResponseEntity(httpHeaders, HttpStatus.OK);
    }

    @RequestMapping("/getusers")
    public ResponseEntity<List<BundyClockUserItems>>getusers(){
        Device settings = deviceRepository.getAllByDefault_device().get(0);


        if(settings==null){
            HttpHeaders httpHeaders = new HttpHeaders();
            httpHeaders.set("message", "No Default Device Selected");
            return  new ResponseEntity<List<BundyClockUserItems>>(httpHeaders, HttpStatus.CONFLICT);

        }

        if(!SystemUtils.IS_OS_WINDOWS){
            HttpHeaders httpHeaders = new HttpHeaders();
            httpHeaders.set("message", "This resource is only for Windows");

            return  new ResponseEntity<List<BundyClockUserItems>>(httpHeaders, HttpStatus.CONFLICT);
        }


        return new ResponseEntity<List<BundyClockUserItems>>(zKemKeeperService.getUserAllUser(settings),HttpStatus.OK);
    }

    @RequestMapping("/deleteuser")
    public ResponseEntity deleteuser(@RequestParam String enrollno){
        Device settings = deviceRepository.getAllByDefault_device().get(0);


        if(settings==null){
            HttpHeaders httpHeaders = new HttpHeaders();
            httpHeaders.set("message", "No Default Device Selected");
            return  new ResponseEntity<List<BundyClockUserItems>>(httpHeaders, HttpStatus.CONFLICT);

        }
        HttpHeaders httpHeaders = new HttpHeaders();
        zKemKeeperService.deleteUserInfo(settings,enrollno);
        httpHeaders.set("message", "Success");
        return new ResponseEntity(httpHeaders,HttpStatus.OK);
    }

    @RequestMapping("/findbyname")
    public BundyClockUserItems findbyname(@RequestParam String fullname){

        HttpHeaders httpHeaders = new HttpHeaders();
        Device settings = deviceRepository.getAllByDefault_device().get(0);


        if(settings==null){
            httpHeaders.set("message", "No Default Device Selected");

        }
        List<BundyClockUserItems> users = zKemKeeperService.getUserAllUser(settings);

        BundyClockUserItems dto = new BundyClockUserItems();

        for(BundyClockUserItems u: users){
            if(StringUtils.equalsIgnoreCase(u.getName(), fullname)){
                dto = u;
            }

        }
        return dto;
    }


    @RequestMapping("/findbyid")
    public List<BundyClockUserItems> findbyid(@RequestParam String enrollno){
        List<BundyClockUserItems> dtos = new ArrayList<>();

        HttpHeaders httpHeaders = new HttpHeaders();
        List<Device> devices = deviceRepository.findAll();
        if(devices.size()==0){
            httpHeaders.set("message", "No Default Device Selected");

        }

        for (Device settings : devices) {

            List<BundyClockUserItems> users = zKemKeeperService.getUserAllUser(settings);

            BundyClockUserItems dto = new BundyClockUserItems();

            for(BundyClockUserItems u: users){
                if(StringUtils.equalsIgnoreCase(u.getDwEnrollNumber(), enrollno)){
                    dto = u;
                    dto.setDevicename(settings.getDevice_name());
                }

            }
            dtos.add(dto);
        }
        return dtos;
    }

    @RequestMapping("addfingerprint")
    public ResponseEntity addfingerprint(@RequestParam Integer enrollno, @RequestParam Integer fingerIndex){
        HttpHeaders httpHeaders = new HttpHeaders();
        Device settings = deviceRepository.getAllByDefault_device().get(0);


        if(settings==null){
            httpHeaders.set("message", "No Default Device Selected");
            return  new ResponseEntity(httpHeaders, HttpStatus.CONFLICT);

        }
        List<BundyClockUserItems> users = zKemKeeperService.getUserAllUser(settings);

        for(BundyClockUserItems u: users){
            if(StringUtils.equals(u.getDwEnrollNumber(), enrollno.toString())){


                if( zKemKeeperService.addUserFingerPrint(settings,enrollno, fingerIndex, 2)){
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
            method = RequestMethod.POST,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity addnewmeployeev2(
            @RequestParam(required = false) String enrollno,
            @RequestParam String name,
            @RequestParam Integer privilege,
            @RequestParam Integer workcode){
        HttpHeaders httpHeaders = new HttpHeaders();
        Device settings = deviceRepository.getAllByDefault_device().get(0);


        if(settings==null){
            httpHeaders.set("message", "No Default Device Selected");
            return  new ResponseEntity(httpHeaders, HttpStatus.CONFLICT);

        }
        List<BundyClockUserItems> users = zKemKeeperService.getUserAllUser(settings);
        ArrayList<Integer> max = new ArrayList<Integer>();
        for(BundyClockUserItems u:users){
            max.add(Integer.parseInt(u.getDwEnrollNumber()));
        }
        Integer largest = Collections.max(max);
        if(enrollno==null || enrollno.trim().equals("")){
            //
            for(BundyClockUserItems u: users){
                if(StringUtils.equals(u.getName(), name)){

                    return new ResponseEntity<>(u.getDwEnrollNumber(), HttpStatus.OK);

                }
            }



            if(largest!=null){
                Integer enrollnos = largest+1;
                zKemKeeperService.newUserService(
                        settings,
                        enrollnos.toString(),
                        name,
                        workcode,
                        privilege,
                        true);
                System.out.println("##########################IF - ADDED ENROLL NO"+enrollnos.toString());


                Integer returnEnrollno = largest+1;
                httpHeaders.set("enrollno", returnEnrollno.toString());
                return new ResponseEntity<>(returnEnrollno, HttpStatus.OK);

            }
        }else {

            for(BundyClockUserItems u: users){
                if(StringUtils.equals(u.getName(), name)){

                    httpHeaders.set("enrollno", "Employee Already Exist");
                    return new ResponseEntity(httpHeaders,HttpStatus.OK);
                }
            }

            zKemKeeperService.newUserService(
                    settings,
                    enrollno,
                    name,
                    workcode,
                    privilege,
                    true);

            System.out.println("########################## ELSE - ADDED");
            return new ResponseEntity<>(enrollno, HttpStatus.OK);
        }


        System.out.println("##################### RETURNING NULL");
        return null;

    }

    @RequestMapping(value = "/addnewmeployeev3",
            method = RequestMethod.POST,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity addnewmeployeev3(
            @RequestParam(required = false) String enrollno,
            @RequestParam String name,
            @RequestParam Integer privilege,
            @RequestParam Integer workcode,
            @RequestParam String devicename){
        HttpHeaders httpHeaders = new HttpHeaders();
        List<Device> list = deviceRepository.findAll();
        Device settings = null;
        for (Device d: list) {
            if(d.getDevice_name().equals(devicename))
            {
                settings = d;
            }
        }

        if(settings==null){
            httpHeaders.set("message", "No Device Selected");
            return  new ResponseEntity(httpHeaders, HttpStatus.CONFLICT);

        }
        List<BundyClockUserItems> users = zKemKeeperService.getUserAllUser(settings);
        ArrayList<Integer> max = new ArrayList<Integer>();
        for(BundyClockUserItems u:users){
            max.add(Integer.parseInt(u.getDwEnrollNumber()));
        }
        Integer largest = Collections.max(max);
        if(enrollno==null || enrollno.trim().equals("")){
            //
            for(BundyClockUserItems u: users){
                if(StringUtils.equals(u.getName(), name)){

                    return new ResponseEntity<>(u.getDwEnrollNumber(), HttpStatus.OK);

                }
            }



            if(largest!=null){
                Integer enrollnos = largest+1;
                zKemKeeperService.newUserService(
                        settings,
                        enrollnos.toString(),
                        name,
                        workcode,
                        privilege,
                        true);
                System.out.println("##########################IF - ADDED ENROLL NO"+enrollnos.toString());


                Integer returnEnrollno = largest+1;
                httpHeaders.set("enrollno", returnEnrollno.toString());
                return new ResponseEntity<>(returnEnrollno, HttpStatus.OK);

            }
        }else {

            for(BundyClockUserItems u: users){
                if(StringUtils.equals(u.getName(), name)){

                    httpHeaders.set("enrollno", "Employee Already Exist");
                    return new ResponseEntity(httpHeaders,HttpStatus.OK);
                }
            }

            zKemKeeperService.newUserService(
                    settings,
                    enrollno,
                    name,
                    workcode,
                    privilege,
                    true);

            System.out.println("########################## ELSE - ADDED");
            return new ResponseEntity<>(enrollno, HttpStatus.OK);
        }


        System.out.println("##################### RETURNING NULL");
        return null;

    }


    @RequestMapping("/getlogsbydate")
    public ResponseEntity<List<BundyClockLogItem>> getlogsbydate(@RequestParam String enrollno){
        Device settings = deviceRepository.getAllByDefault_device().get(0);


        if(settings==null){
            HttpHeaders httpHeaders = new HttpHeaders();
            httpHeaders.set("message", "No Default Device Selected");
            return  new ResponseEntity<List<BundyClockLogItem>>(httpHeaders, HttpStatus.CONFLICT);

        }

        if(!SystemUtils.IS_OS_WINDOWS){

            HttpHeaders responseHeaders = new HttpHeaders();
            responseHeaders.set("message", "This resource is only for Windows");

            return new  ResponseEntity<List<BundyClockLogItem>>(responseHeaders,HttpStatus.CONFLICT);
        }

        return new ResponseEntity<List<BundyClockLogItem>>(zKemKeeperService.getBundyClockLogItems(settings,enrollno),HttpStatus.OK);
    }

    @RequestMapping("/setasdefault")
    public ResponseEntity setasdefault(@RequestBody DeviceDto body){
        HttpHeaders httpHeaders = new HttpHeaders();


        List<Device> devices = deviceRepository.findAll();
        for(Device d:devices){
            if(d.getId().equals(body.getId())){
                d.setDefault_device(true);
                deviceRepository.save(d);

            }else{
                d.setDefault_device(false);
                deviceRepository.save(d);

            }
        }
        httpHeaders.set("message","Device successfully set as default");
        return new ResponseEntity(httpHeaders,HttpStatus.OK);

    }

    @RequestMapping("/checkdeviceconnection")
    public ResponseEntity<Integer> checkdeviceconnection(@RequestBody DeviceDto body,@RequestParam(required = false) Integer index){
        HttpHeaders httpHeaders = new HttpHeaders();

        Boolean connectionStatus = zKemKeeperService.checkDeviceConnection(body);

        if(BooleanUtils.isTrue(connectionStatus)){

            httpHeaders.set("message","success");
            return new ResponseEntity(index,httpHeaders, HttpStatus.OK);
        }else{
            httpHeaders.set("message","failed");
            return new ResponseEntity(index,httpHeaders,HttpStatus.OK);
        }



    }

}
