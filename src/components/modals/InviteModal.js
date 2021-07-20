import React from 'react';
import {Modal} from 'reactstrap';

const InviteModal = (props) => {
    const {toggle} = props;

    const handleclick = () => {
        /* invite members */
        toggle();
    }

    return (
       <Modal isOpen={true} backdrop={'static'} toggle={toggle} size={'lg'}>
            <div className="p-2 ml-2">
            <h5 className="modal-title">Invite Teammates to LadyBUG</h5>
            </div>
            <div className='modal-body'>
                <label className='text-sm-left text-muted font-weight-bold'>Add with Email</label>
                <input type="text" className="form-control"  placeholder="Add..." />
                <span className='text-sm-left text-muted' style={{fontSize:"11px"}}>Add email id seperated by commas to invite them to the platform</span>
            </div>
            <div className='modal-footer'>
                <button onClick={toggle} className='mr-2 btn btn-light'> Cancel </button>
                <button onClick={toggle} className='mr-2 btn btn-primary'> Invite teammates </button>
            </div>
        </Modal>
    );

}

export default InviteModal;