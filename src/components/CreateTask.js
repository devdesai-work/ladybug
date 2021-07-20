import React from 'react';
import {Modal} from 'reactstrap';
import { ChecklistIcon } from '@primer/octicons-react';

const CreateTask = (props) => {
    const {toggle} = props;
    
    const handleClick = ()=> {
        console.log("success").then(toggle);
    }
    
    return (
        <Modal isOpen={true} backdrop={'static'} toggle={toggle} scrollable={true}>
            <div className="p-2">
            <h5 className="modal-title" style={{textAlign:'center'}} id="exampleModalLabel"><ChecklistIcon size={24} /> Create Task Board</h5>
            </div>
            <form className="m-4">
            <div className="form-group">
                <label className='text-sm-left text-muted font-weight-bold'>Task Name</label>
                <input type="text" className="form-control"  placeholder="Enter Task name" />
            </div>
            <div className="form-group">
                <label className='text-sm-left text-muted font-weight-bold'>Task Key</label>
                <input type="text" className="form-control"  placeholder="Key" />
            </div>
             <div className="form-group">
                <label className='text-sm-left text-muted font-weight-bold'>Target end date</label>
                <input type="date" className="form-control" />
            </div>
            <button type="submit" onClick={handleClick} className="mr-2 btn btn-primary">Create</button>
            <button type='close' onClick={toggle} className='btn btn-secondary'>Close</button>
            </form>
        </Modal>
    );
}

export default CreateTask;