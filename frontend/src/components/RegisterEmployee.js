import React from 'react'
import {Button,Col,Panel,PanelContainer,PanelHeader,PanelBody,Form,FormGroup,ControlLabel,FormControl,Alert,InputGroup} from '@sketchpixy/rubix';
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
        "privilege": 0,
        "enabled": false,
        "workcode" : 0
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
                console.log(this.state);
                this.props.registerEmployeeAction.registerEmployee(this.state, "/success");


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
                    </FormGroup>

                    <FormGroup>

                        <Col componentClass={ControlLabel} xs={2}>Name</Col>
                        <Col xs={10}>
                            <FormControl type="text" required="required"
                                onChange={(e)=> {
                                    this.updateField('name', e.target.value)
                                }}
                            />
                        </Col>

                    </FormGroup>

                    <FormGroup>
                        <Col componentClass={ControlLabel} xs={2}>Work Code</Col>
                        <Col xs={10}>
                            <FormControl type="number" required="required"
                                onChange={(e)=> {
                                    this.updateField('workcode', e.target.value)
                                }}
                            />
                        </Col>

                    </FormGroup>

                    <FormGroup>
                        <Col componentClass={ControlLabel} xs={2}>Enabled</Col>
                        <Col xs={1}>
                            <InputGroup.Addon>

                            <input type="checkbox" required="required" value="true"
                                onChange={(e)=> {
                                    this.updateField('enabled', e.target.value)
                                }}
                            />

                            </InputGroup.Addon>
                        </Col>

                    </FormGroup>

                    <FormGroup>
                        <Col componentClass={ControlLabel} xs={2}>Privilege</Col>
                        <Col xs={10}>
                            <FormControl componentClass="select" placeholder="select"
                                onChange={(e)=> {
                                this.updateField('privilege', e.target.value)
                            }}>
                                <option value={1}>0 - USER</option>
                                <option value={1}>1 - ENROLLER</option>
                                <option value={2}>2 - ADMIN</option>
                                <option value={3}>3 - SUPER ADMIN</option>
                            </FormControl>
                        </Col>

                    </FormGroup>


                    <InputGroup style={{marginLeft: 'auto'}}>
                        <Col>
                            <Button bsStyle="success" type="submit">Submit</Button>
                        </Col>
                    </InputGroup>
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
