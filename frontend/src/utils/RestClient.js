/**
 * Created by albertoclarit on 9/2/16.
 */

import axios from 'axios'
import _ from 'lodash'

// see https://github.com/mzabriskie/axios


const defaultConfig = {
    headers: {'X-Requested-With': 'XMLHttpRequest'},
    xsrfCookieName: 'CSRF-TOKEN',
    xsrfHeaderName: 'X-Csrf-Token'
};

export let get  = (path,config)=>{

       if(!config)
       config = {};

     config = _.assign({},defaultConfig,config);

    return axios.get(path,config);
};

export let post  = (path,body,config)=>{

    if(!config)
        config = {};

    config = _.assign({},defaultConfig,config);


    return axios.post(path,body || {}, config);
};

export let put  = (path,body,config)=>{

    if(!config)
        config = {};

    config = _.assign({},defaultConfig,config);


    return axios.put(path,body || {}, config);
};

export let patch  = (path,body,config)=>{
    if(!config)
        config = {};

    config = _.assign({},defaultConfig,config);

    return axios.patch(path,body || {}, config);
};


export let _delete  = (path,config)=>{

    if(!config)
        config = {};

    config = _.assign({},defaultConfig,config);

    return axios.delete(path,config);

};
