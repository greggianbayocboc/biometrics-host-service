package com.hisd3.dtr.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

/**
 * Created by albertoclarit on 9/2/16.
 */
//@EnableWebMvc
//@Configuration
public class WebMvcConfig  extends WebMvcConfigurerAdapter {


    @Bean
    BundyClockRestInterceptor getBundyClockRestInterceptor(){
        return  new BundyClockRestInterceptor();
    }

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        super.addInterceptors(registry);

        registry.addInterceptor(getBundyClockRestInterceptor());

    }
}
