/**
 * Created by albertoclarit on 1/17/16.
 */

import * as types from '../constants/DialogsActionTypes';



export let openAlert= (message,title,typeDialog='info',onClosed=null)=>{

    return {
        type:types.DIALOG_OPEN_ALERT,
        message,
        title,
        isOpen:true,
        typeDialog,
        onClosed
    }

};

export let closeAlert = ()=>{

    return {
        type:types.DIALOG_CLOSE_ALERT
    }
};


export let openConfirm= (message,title,confirmLabel="OK",cancelLabel="CANCEL",onClosed=null)=>{

    return {
        type:types.DIALOG_OPEN_CONFIRM,
        message,
        title,
        isOpen:true,
        confirmLabel,
        cancelLabel,
        onClosed
    }

};

export let closeConfirm = ()=>{

    return {
        type:types.DIALOG_CLOSE_CONFIRM
    }
};
export let openPrompt= (message,title,onClosed=null)=>{

    return {
        type:types.DIALOG_OPEN_PROMPT,
        message,
        title,
        isOpen:true,
        onClosed
    }

};

export let closePrompt = ()=>{

    return {
        type:types.DIALOG_CLOSE_PROMPT
    }
};
//https://github.com/igorprado/react-notification-system
export let addNotification = (
    title,
    message,
    level='info',
    position='tr',
    autoDismiss=3,
    dismissible=true,
    action=null,
    onAdd=null,
    onRemove=null,
    uid=null
    )=>{
    return {
        type:types.DIALOG_ADDNOTIFICATION,
        title,
        message,
        level,
        position,
        autoDismiss,
        dismissible,
        action,
        onAdd,
        onRemove,
        uid
    }
};

export let clearNotificationStore = ()=>{
    return {
        type:types.DIALOG_CLEARNOTIFICATIONSTORE
    }
};