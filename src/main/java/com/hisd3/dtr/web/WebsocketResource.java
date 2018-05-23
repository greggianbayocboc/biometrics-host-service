package com.hisd3.dtr.web;


import com.google.gson.Gson;
import com.hisd3.dtr.web.rest.BundyClockResource;
import com.hisd3.dtr.zkemkeeper.dto.BundyClockLogItem;
import javafx.collections.FXCollections;
import org.apache.commons.lang.StringUtils;
import org.apache.commons.lang.builder.ToStringBuilder;
import org.joda.time.DateTime;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.messaging.converter.MappingJackson2MessageConverter;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaders;
import org.springframework.messaging.simp.stomp.StompSession;
import org.springframework.messaging.simp.stomp.StompSessionHandler;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.socket.client.WebSocketClient;
import org.springframework.web.socket.client.standard.StandardWebSocketClient;
import org.springframework.web.socket.messaging.WebSocketStompClient;
import org.springframework.web.socket.sockjs.client.SockJsClient;
import org.springframework.web.socket.sockjs.client.Transport;
import org.springframework.web.socket.sockjs.client.WebSocketTransport;


import javax.inject.Inject;
import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.concurrent.CopyOnWriteArrayList;


enum HISD3MessageType {
    STRING,
    JSON
}

enum HISD3MessageCommandType{
    BIOMETRICS_NEW_EMPLOYEE,
    BIOMETRICS_UPDATE_EMPLOYEE_FINGERPRINT,
    BIOMETRICS_REMOVE_EMPLOYEE_LINK,
    BIOMETRICS_GET_ALL_LOGS,
    BIOMETRICS_CLEAR_LOGS,
    BIOMETRICS_PING,
    BIOMETRICS_GET_EMPLOYEE_LIST,
    CHAT_NEW_MESSAGE,
    WHOS_ONLINE,
    CHAT_LOAD_MESSAGES
}

class  HISD3Message {
    HISD3MessageType type;
    String payload;
    String command;
    String timestamp;

    public HISD3Message() {
    }

    public HISD3Message(HISD3MessageType type, String payload, String command) {
        this.type = type;
        this.payload = payload;
        this.command = command;
    }
}
class  HISD3MessageV2 {
    HISD3MessageType type;
    String payload;
    HISD3MessageCommandType command;
    String timestamp;

    public HISD3MessageV2() {
    }

    public HISD3MessageV2(HISD3MessageType type, HISD3MessageCommandType command, String payload) {
        this.type = type;
        this.payload = payload;
        this.command = command;
    }

    public HISD3MessageType getType() {
        return type;
    }

    public void setType(HISD3MessageType type) {
        this.type = type;
    }

    public String getPayload() {
        return payload;
    }

    public void setPayload(String payload) {
        this.payload = payload;
    }

    public HISD3MessageCommandType getCommand() {
        return command;
    }

    public void setCommand(HISD3MessageCommandType command) {
        this.command = command;
    }

    public String getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(String timestamp) {
        this.timestamp = timestamp;
    }
}



@Controller
public class WebsocketResource implements StompSessionHandler{

    @Inject
    BundyClockResource bundyClockResource;

    private CopyOnWriteArrayList<HISD3MessageV2> transports = new CopyOnWriteArrayList<HISD3MessageV2>();
    String url = "ws://admin:7yq7d&addL$4CAAD@localhost:8000/stompserver";
    StandardWebSocketClient client;
    WebSocketStompClient stompClient;
    StompSession session;
    public WebsocketResource() {
        client = new StandardWebSocketClient();
        stompClient = new WebSocketStompClient(client);
        stompClient.setMessageConverter(new MappingJackson2MessageConverter());
        stompClient.connect(url, this);
    }

    public void addMessageListener(HISD3MessageV2 listener){
        transports.add(listener);
    }

    private void sendMessage(String destination, String payload){
        this.session.send(destination,payload);
    }

    @Override
    public void afterConnected(StompSession session, StompHeaders connectedHeaders) {
        session.subscribe("/messages/generalthreadV2", this);
        this.session = session;
        System.out.println("Web Socket Connected.!!!!!");
    }

    @Override
    public void handleException(StompSession session, StompCommand command, StompHeaders headers, byte[] payload, Throwable exception) {
        exception.printStackTrace();
    }

    @Override
    public void handleTransportError(StompSession session, Throwable exception) {
        exception.printStackTrace();
    }

    @Override
    public Type getPayloadType(StompHeaders headers) {

        return HISD3MessageV2.class;
    }

    @Override
    public void handleFrame(StompHeaders headers, Object payload) {
        HISD3MessageV2 message = (HISD3MessageV2) payload;
        Gson gson = new Gson();
        JSONObject jsonformatmessage = new JSONObject();
        for(HISD3MessageV2 m: transports){
            if(message.command == HISD3MessageCommandType.BIOMETRICS_GET_ALL_LOGS) {
                m.command = message.command;
                if(bundyClockResource.getLogs()!=null){
                    try {
                        m.payload = gson.toJson(jsonformatmessage.put("logs", gson.toJson(bundyClockResource.getLogs())));
                    } catch (JSONException e) {
                        e.printStackTrace();
                    }
                }else{
                    m.payload = null;
                }
                this.sendMessage("/app/client.messagesV2", gson.toJson(m));
            }
        }


    }
}
