package com.hisd3.dtr.zkemkeeper;

import com.jacob.activeX.ActiveXComponent;
import com.jacob.com.Dispatch;
import com.jacob.com.Variant;
import org.apache.commons.lang.BooleanUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.bind.RelaxedPropertyResolver;
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

    public List<BundyClockLogItem> getBundyClockLogItems(){
        List<BundyClockLogItem> items = new ArrayList<>();

        ActiveXComponent mf = new ActiveXComponent("zkemkeeper.ZKEM.1");
        Boolean connect_net = (Boolean)Dispatch.call(mf, "connect_Net", host, 4370).toJavaObject();
        Boolean enableDevice = (Boolean)Dispatch.call(mf, "enableDevice",1, false).toJavaObject();


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


                        BundyClockLogItem item = new BundyClockLogItem();
                        item.setDwEnrollNumber(dwEnrollNumber.getStringRef());
                        item.setDwVerifyMode(dwVerifyMode.getIntRef());
                        item.setDwInoutMode(dwInoutMode.getIntRef());
                        item.setDwYear(dwYear.getIntRef());
                        item.setDwMonth(dwMonth.getIntRef());
                        item.setDwDay(dwDay.getIntRef());
                        item.setDwHour(dwHour.getIntRef());
                        item.setDwMinute(dwMinute.getIntRef());
                        item.setDwSecindm(dwSecindm.getIntRef());
                        item.setDwWorkCode(dwWorkCode.getIntRef());


                        items.add(item);
                    }
                }
            }
        }

        return items;
    }




}
