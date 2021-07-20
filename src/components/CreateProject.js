import React, {useState} from 'react';
import {Modal} from 'reactstrap';
import Axios from 'axios';
import { BugIcon } from '@primer/octicons-react';

const CreateProject = (props) => {
    const {toggle, user} = props;
    const [projectdata, setdata] = useState({
        name: '',
        date: '',
        id: '',
        username: user,
    })
    
    const handleClick = ()=> {
        Axios.post('http://localhost:3001/api/create_project', {
            name: projectdata.name,
            id: projectdata.id,
            date: projectdata.date,
            username: projectdata.username,
        }).then((res)=>{
            if (res){
                toggle();
            }
        })
    }
    
    return (
        <Modal isOpen={true} backdrop={'static'} toggle={toggle} scrollable={true}>
        {console.log(user)}
            <div className="p-2">
            <h5 className="modal-title" style={{textAlign:'center'}} id="exampleModalLabel"><BugIcon size={24} /> Create Project</h5>
            </div>
            <form className="m-4">
            <div className="form-group">
                <label className='text-sm-left text-muted font-weight-bold'>Project Name</label>
                <input onChange={(e)=>{setdata({...projectdata, name:e.target.value})}} type="text" className="form-control"  placeholder="Enter Project name" />
            </div>
            <div className="form-group">
                <label className='text-sm-left text-muted font-weight-bold'>Project Key</label>
                <input onChange={(e)=>{setdata({...projectdata, id:e.target.value})}} type="text" className="form-control"  placeholder="Key" />
            </div>
             <div className="form-group">
                <label className='text-sm-left text-muted font-weight-bold'>Target end date</label>
                <input onChange={(e)=>{setdata({...projectdata, date:e.target.value})}} type="date" className="form-control" />
            </div>
            <button type="submit" onClick={handleClick} className="mr-2 btn btn-primary">Create</button>
            <button type='close' onClick={toggle} className='btn btn-secondary'>Close</button>

            </form>
        </Modal>
    );
}

export default CreateProject;