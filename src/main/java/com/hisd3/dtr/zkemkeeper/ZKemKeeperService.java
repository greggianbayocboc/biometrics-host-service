package com.hisd3.dtr.zkemkeeper;

import com.hisd3.dtr.web.rest.BundyClockResource;
import com.hisd3.dtr.zkemkeeper.dto.BundyClockLogItem;
import com.hisd3.dtr.zkemkeeper.dto.BundyClockUserItems;
import com.jacob.activeX.ActiveXComponent;
import com.jacob.com.Dispatch;
import com.jacob.com.Variant;
import org.apache.commons.codec.binary.StringUtils;
import org.apache.commons.lang.BooleanUtils;
import org.apache.log4j.Logger;
import org.joda.time.DateTime;
import org.joda.time.format.DateTimeFormat;
import org.joda.time.format.DateTimeFormatter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by albertoclarit on 9/2/16.
 */


@Service
public class ZKemKeeperService {


    @Value("${zkemkeeper.host}")
    String host;

    public List<BundyClockLogItem> getBundyClockLogItems(String enrollno){
        List<BundyClockLogItem> items = new ArrayList<>();

        ActiveXComponent mf = new ActiveXComponent("zkemkeeper.ZKEM.1");
        Boolean connect_net = (Boolean)Dispatch.call(mf, "connect_Net", host, 4370).toJavaObject();
        Boolean enableDevice = (Boolean)Dispatch.call(mf, "enableDevice",1, false).toJavaObject();
        Logger log = Logger.getLogger(BundyClockResource.class.getName());

       // Variant resultRef = new Variant((int)0, true);
        //Object getDeviceStatus = Dispatch.call(mf, "getDeviceStatus",1,6, resultRef).toJavaObject();
      //  System.out.println(getDeviceStatus.toString());
      //  System.out.println(resultRef.getIntRef());


        if(BooleanUtils.isTrue(connect_net)){

            if(BooleanUtils.isTrue(enableDevice)){

                Boolean readGeneralLogData = (Boolean)Dispatch.call(mf, "readGeneralLogData",1).toJavaObject();
                if(BooleanUtils.isTrue(readGeneralLogData)){


                    Variant dwEnrollNumber =new Variant("", true);
                    Variant dwVerifyMode = new Variant((int)0, true);
                    Variant dwInoutMode =  new Variant((int)0, true);
                    Variant dwYear =  new Variant((int)0, true);
                    Variant dwMonth =  new Variant((int)0, true);
                    Variant dwDay =  new Variant((int)0, true);
                    Variant dwHour =  new Variant((int)0, true);
                    Variant dwMinute =  new Variant((int)0, true);
                    Variant dwSecindm = new Variant((int)0, true);
                    Variant dwWorkCode=  new Variant((int)0, true);

                    DateTimeFormatter dateFormatter = DateTimeFormat.forPattern("MM/dd/yyyy");
                    DateTimeFormatter timeFormatter = DateTimeFormat.forPattern("HH:mm:ss");




                    while((boolean)Dispatch.call(mf, "ssR_GetGeneralLogData",1,
                            dwEnrollNumber,
                            dwVerifyMode,
                            dwInoutMode,
                            dwYear,
                            dwMonth,
                            dwDay,
                            dwHour,
                            dwMinute,
                            dwSecindm,
                            dwWorkCode).toJavaObject()){
                        DateTime date = dateFormatter.parseDateTime(Integer.toString(dwMonth.getIntRef())+"/"+Integer.toString(dwDay.getIntRef())+"/"+dwYear.getIntRef());
                        DateTime time = timeFormatter.parseDateTime(Integer.toString(dwHour.getIntRef())+":" + Integer.toString(dwMinute.getIntRef())+":" + Integer.toString(dwSecindm.getIntRef()));
                        if(StringUtils.equals(dwEnrollNumber.getStringRef(), enrollno)) {
                            BundyClockLogItem item = new BundyClockLogItem();
                            item.setDwEnrollNumber(dwEnrollNumber.getStringRef());
                            item.setDwVerifyMode(dwVerifyMode.getIntRef());
                            if(dwInoutMode.getIntRef() == 0){
                                item.setDwInoutMode("Time In");
                            }else if(dwInoutMode.getIntRef() == 1){
                                item.setDwInoutMode("Time Out");
                            }else if(dwInoutMode.getIntRef() == 2){
                                item.setDwInoutMode("Break In");
                            }else if(dwInoutMode.getIntRef() == 3){
                                item.setDwInoutMode("Break Out");
                            }else if(dwInoutMode.getIntRef() == 4){
                                item.setDwInoutMode("Overtime In");
                            }else{
                                item.setDwInoutMode("Overtime Out");
                            }
                            item.setDwYear(dwYear.getIntRef());
                            item.setDwMonth(dwMonth.getIntRef());
                            item.setDwDay(dwDay.getIntRef());
                            item.setDwHour(dwHour.getIntRef());
                            item.setDwMinute(dwMinute.getIntRef());
                            item.setDwSecindm(dwSecindm.getIntRef());
                            item.setDwWorkCode(dwWorkCode.getIntRef());
                            item.setDate(date.toString("MM/dd/yyyy"));
                            item.setTime(time.toString("hh:mm:ss aa"));


                            items.add(item);
                        }



                    }
                }
            }

            Object disconnect = Dispatch.call(mf, "disconnect").toJavaObject();

        }

        return items;
    }

    public List<BundyClockUserItems> getUserAllUser(){
        List<BundyClockUserItems> items = new ArrayList<>();

        ActiveXComponent mf = new ActiveXComponent("zkemkeeper.ZKEM.1");

        Boolean connect_net = (Boolean)Dispatch.call(mf, "connect_Net", host, 4370).toJavaObject();
        Boolean enableDevice = (Boolean)Dispatch.call(mf, "enableDevice",1, false).toJavaObject();

        if(BooleanUtils.isTrue(connect_net)){
            if(BooleanUtils.isTrue(enableDevice)){
                Boolean readAllUserId =(Boolean) Dispatch.call(mf, "ReadAllUserID", 1).toJavaObject();

                if(BooleanUtils.isTrue(readAllUserId)){

                    Variant dwEnrollNumber = new Variant("", true);
                    Variant Name = new Variant("", true);
                    Variant Password = new Variant("",true);
                    Variant Privilege = new Variant((int)0, true);
                    Variant dwEnable = new Variant((boolean)true, true);


                    while ((boolean)Dispatch.call(mf, "SSR_GetAllUserInfo",1,
                            dwEnrollNumber,
                            Name,
                            Password,
                            Privilege,
                            dwEnable).toJavaObject()){


                        BundyClockUserItems item = new BundyClockUserItems();

                        item.setDwEnrollNumber(dwEnrollNumber.getStringRef());
                        item.setName(Name.getStringRef());
                        item.setPassword(Password.getStringRef());
                        item.setPrivilege(Privilege.getIntRef());
                        item.setDwEnable(dwEnable.getBooleanRef());

                        items.add(item);


                    }


                }

            }

            Object disconnect = Dispatch.call(mf, "disconnect").toJavaObject();
        }

        return items;
    }




}
