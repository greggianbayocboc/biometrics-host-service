package com.hisd3.dtr.service.util;

import com.hisd3.dtr.web.WebsocketApiListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.stereotype.Component;

import javax.inject.Inject;
import java.util.logging.Logger;

@Component
public class StartupApplicationListenerExample implements
        ApplicationListener<ContextRefreshedEvent> {

    @Inject
    WebsocketApiListener websocketApiListener;

    @Override public void onApplicationEvent(ContextRefreshedEvent event) {
        websocketApiListener.ListenerCustomApi();
    }
}
