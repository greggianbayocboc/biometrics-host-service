package com.hisd3.dtr.config;

import org.apache.commons.lang.StringUtils;
import org.apache.commons.lang.SystemUtils;
import org.apache.log4j.Logger;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Created by albertoclarit on 9/2/16.
 */
public class BundyClockRestInterceptor extends HandlerInterceptorAdapter {

    private static final Logger logger = Logger.getLogger(BundyClockRestInterceptor.class);

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {


        if(StringUtils.contains(request.getPathInfo(), "/api/bundyclock")){

            logger.info("Checking OS if Windows");
            if(SystemUtils.IS_OS_WINDOWS){
                throw  new ServletException("This Rest resource is applicable only to Windows Machines");

            }

        }
        return super.preHandle(request, response, handler);
    }
}
