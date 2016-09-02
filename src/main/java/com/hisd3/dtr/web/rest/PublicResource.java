package com.hisd3.dtr.web.rest;

import com.hisd3.dtr.repository.UserRepository;
import org.springframework.context.ApplicationContext;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.inject.Inject;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by albertoclarit on 9/15/15.
 */
@RestController
@RequestMapping("/api/public")
@Transactional
public class PublicResource {


   @Inject
   ApplicationContext applicationContext;

    @Inject
    UserRepository userRepository;




   @RequestMapping("/ping")
    public Map<String,Object> ping(){

       Map<String,Object> result= new HashMap<String,Object>();
       result.put("success",true);

       return result;
   }



}
