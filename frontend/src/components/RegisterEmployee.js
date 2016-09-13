import React from 'react'
import {Button,Col,Panel,PanelContainer,PanelHeader,PanelBody,Form,FormGroup,ControlLabel,FormControl,Alert} from '@sketchpixy/rubix';
import * as registerEmployeeAction from '../actions/registerEmployeeBundyAction';
import {bindActionCreators} from 'redux';

import {connect} from 'react-redux';
class RegisterEmployee extends React.Component{

    constructor(props){
        super(props)
    }

    state = {
        "enrollno": null,
        "name": "",
        "password": "",
        "privilege": null,
        "enabled": null,
        "confirm_password": ""
    };

    componentWillMount(){
        this.props.registerEmployeeAction.beforRegister();
    }

    updateField = (name, value)=> {
        var data = {};
        data[name] = value;

        this.setState(data);
    };

    onFormSubmit = (event)=> {
        event.preventDefault();
        if (this.state.password.length >= 6){
            if (this.state.password == this.state.confirm_password) {
                this.props.registerActions.register(this.state, "/success");
            }
        }
    };

    goBack=()=>{
        this.props.routerActions.goBack();
    }




    render(){
        return (

                <Form horizontal onSubmit={this.onFormSubmit}>

                    <FormGroup>
                            <Col componentClass={ControlLabel} xs={2}>Enroll No.</Col>
                            <Col xs={10}>
                                <FormControl type="text" required="required"
                                    onChange={(e)=> {
                                        this.updateField('enrollno', e.target.value)
                                    }}
                                />
                            </Col>

                        <Col componentClass={ControlLabel} xs={2}>Enroll No.</Col>
                        <Col xs={10}>
                            <FormControl type="text" required="required"
                                onChange={(e)=> {
                                    this.updateField('name', e.target.value)
                                }}
                            />
                        </Col>
                        <Col componentClass={ControlLabel} xs={2}>Enroll No.</Col>
                        <Col xs={10}>
                            <FormControl type="text" required="required"
                                onChange={(e)=> {
                                    this.updateField('enrollno', e.target.value)
                                }}
                            />
                        </Col>
                        <Col componentClass={ControlLabel} xs={2}>Enroll No.</Col>
                        <Col xs={10}>
                            <FormControl type="text" required="required"
                                onChange={(e)=> {
                                    this.updateField('password', e.target.value)
                                }}
                            />
                        </Col>
                        <Col componentClass={ControlLabel} xs={2}>Enroll No.</Col>
                        <Col xs={10}>
                            <FormControl type="text" required="required"
                                onChange={(e)=> {
                                    this.updateField('confirm_password', e.target.value)
                                }}
                            />
                        </Col>
                        <Col componentClass={ControlLabel} xs={2}>Enroll No.</Col>
                        <Col xs={10}>
                            <FormControl type="text" required="required"
                                onChange={(e)=> {
                                    this.updateField('privilege', e.target.value)
                                }}
                            />
                            <Col componentClass={ControlLabel} xs={2}>Enroll No.</Col>
                            <FormControl componentClass="select" placeholder="select">
                                <option value="select">select</option>
                                <option value="other">...</option>
                            </FormControl>
                        </Col>

                    </FormGroup>
                    <Col xsOffset={2} xs={10}>
                        <Button type="submit">Submit</Button>
                    </Col>
                </Form>

        )
    }


}

function masStateToProps(state){
    return{
        auth: state.auth,
        register: state.register
    }
}

function mapDispatchToProps(dispatch){
    return {
        registerEmployeeAction: bindActionCreators(registerEmployeeAction, dispatch)
    }
}

export default connect(masStateToProps, mapDispatchToProps)(RegisterEmployee);
