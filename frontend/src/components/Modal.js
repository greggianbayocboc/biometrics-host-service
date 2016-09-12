import React from 'react';
import {bindActionCreators} from 'redux';

class Modal extends React.Component{

    constructor(props){
        super(props);
    }

    render(){
            let popover = <Popover title='popover' id='popover'>very popover. such engagement</Popover>;
            let tooltip = <Tooltip id='tooltip'>wow.</Tooltip>;

            return (
                <div>
                    <p>Click to get the full Modal experience!</p>



                    <Modal show={this.props.data} >
                        <Modal.Header closeButton>
                            <Modal.Title>Modal heading</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <h4>Text in a modal</h4>
                            <p><LoremIpsum query='1s' /></p>

                            <h4>Popover in a modal</h4>
                            <p>there is a <OverlayTrigger overlay={popover}><a href='#'>popover</a></OverlayTrigger> here</p>

                            <h4>Tooltips in a modal</h4>
                            <p>there is a <OverlayTrigger overlay={tooltip}><a href='#'>tooltip</a></OverlayTrigger> here</p>

                            <hr />

                            <h4>Overflowing text to show scroll behavior</h4>
                            <p><LoremIpsum query='3s' /></p>
                            <p><LoremIpsum query='3s' /></p>
                            <p><LoremIpsum query='3s' /></p>
                            <p><LoremIpsum query='3s' /></p>
                            <p><LoremIpsum query='3s' /></p>
                            <p><LoremIpsum query='3s' /></p>
                            <p><LoremIpsum query='3s' /></p>
                            <p><LoremIpsum query='3s' /></p>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={::this.close}>Close</Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            );
        }

}

function mapStateToProps(state) {
    return {
        modals: state.modals,
        bundyclock:state.bundyclock
    }
}




function mapDispatchToProps(dispatch){
    return {
        routerActions: bindActionCreators(routerActions, dispatch),
        employeeActions : bindActionCreators(employeeActions, dispatch),
        profileActions:bindActionCreators(profileActions, dispatch),
        modalAction: bindActionCreators(modalAction, dispatch)

    }
}

export default Modal;