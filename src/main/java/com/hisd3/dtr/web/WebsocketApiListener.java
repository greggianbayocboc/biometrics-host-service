package com.hisd3.dtr.web;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;

import javax.annotation.PostConstruct;
import javax.inject.Inject;

@Controller
public class WebsocketApiListener {
    @Inject
    WebsocketResource websocketResource;

    public ResponseEntity ListenerCustomApi() {
        HISD3MessageV2 message = new HISD3MessageV2(HISD3MessageType.STRING, HISD3MessageCommandType.BIOMETRICS_GET_ALL_LOGS,"");

        websocketResource.addMessageListener(message);

        System.out.print("Executed Websocket !!!!!!!");

        return ResponseEntity.ok("success");
    }
}
