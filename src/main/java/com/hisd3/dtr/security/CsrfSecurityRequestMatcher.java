package com.hisd3.dtr.security;

import org.apache.commons.lang.StringUtils;
import org.springframework.security.web.util.matcher.RequestMatcher;

import javax.annotation.Nullable;
import javax.servlet.http.HttpServletRequest;
import javax.validation.constraints.NotNull;
import java.util.regex.Pattern;
public final class CsrfSecurityRequestMatcher implements RequestMatcher {
    private final Pattern allowedMethods = Pattern.compile("^(GET|HEAD|TRACE|OPTIONS|POST|PATCH|DELETE)$");

    public final boolean isBasicRequest$production_sources_for_module_clination_main(@NotNull HttpServletRequest request) {
        if(request != null){
            return StringUtils.isNotEmpty(request.getHeader("Authorization"));
        }else{
            return false;
        }
    }

    public boolean matches(@Nullable HttpServletRequest request) {
        if (request != null) {
            if (this.isBasicRequest$production_sources_for_module_clination_main(request)) {
                return false;
            }

            if (this.allowedMethods.matcher(request.getMethod()).matches()) {
                return false;
            }
        }

        return true;
    }
}