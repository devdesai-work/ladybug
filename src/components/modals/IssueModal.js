import React, {useState} from 'react'
import {
    Modal,
} from 'reactstrap'
import Axios from 'axios';
import "../css/modal.css"



const IssueModal = (props) => {
    const {toggle} = props;
    const [issue, setIssue] = useState({
        project_name:'',
        issue_type:'',
        summary:'',
        description:'',
        target_end_date:'',
        reporter_name:'',
        priority:'',
        assignee:'',
        status:'',
    })
    
    const handleclick = () => {
        Axios.post('http://localhost:3001/api/issue', {
             project_name : issue.project_name, 
             issue_type : issue.issue_type,
             summary : issue.summary,
             description : issue.description,
             target_end_date : issue.target_end_date,
             reporter_name : issue.reporter_name,
             priority : issue.priority,
             assignee : issue.assignee,
             status : issue.status,
        }).then((res)=>{
             console.log(res.data);
        })
    }

    return (
        <Modal isOpen={true} toggle={toggle} backdrop= {'static'}  size={'lg'} contentClassName='container'>
            <nav className="d-flex justify-content-between pl-1">
                <div className='pl-3 pr-3 pt-3' style={{fontFamily:'sans-serif', fontSize:'25px'}}>
                    Create Issue
                </div>
            </nav>
            <div>
                <form className="m-4">
                <div className="form-group">
                    <label className='text-sm-left text-muted font-weight-bold' style={{fontSize:'12px'}}>Project id</label>
                    <input onChange={(e)=>setIssue({...issue, project_name: e.target.value})} type="text" className="form-control"  placeholder="Enter Project name" />
                </div>
                <div className="form-group">
                    <label className='text-sm-left text-muted font-weight-bold' style={{fontSize:'12px'}}>Issue Type</label>
                    <select onChange={(e)=>setIssue({...issue, issue_type: e.target.value})} class="custom-select">
                        <option>Improvement</option>
                        <option>New Task</option>
                        <option>Bug</option>
                        <option>Feature</option>
                    </select>
                </div>
                <div>
                    <label className='text-sm-left text-muted font-weight-bold' style={{fontSize:'12px'}}>Summary</label>
                     <input onChange={(e)=>setIssue({...issue, summary: e.target.value})} type="text" className="form-control"  placeholder="Enter Summary" />
                </div>
                <div>
                    <label className='text-sm-left text-muted font-weight-bold' style={{fontSize:'12px'}}>Description</label>
                    <textarea onChange={(e)=>setIssue({...issue, description: e.target.value})} className='form-control' cols='2' rows='8'></textarea>
                </div>
                <div className="form-group">
                    <label className='text-sm-left text-muted font-weight-bold' style={{fontSize:'12px'}}>Target end date</label>
                    <input onChange={(e)=>setIssue({...issue, target_end_date: e.target.value})} type="date" className="form-control" />
                </div>
                <div className="form-group">
                    <label className='text-sm-left text-muted font-weight-bold' style={{fontSize:'12px'}}>Status</label>
                    <select onChange={(e)=>setIssue({...issue, status: e.target.value})} class="custom-select">
                        <option>To-Do</option>
                        <option>In Progress</option>
                        <option>In Review</option>
                        <option>Done</option>
                    </select>
                </div>
                <div>
                    <label className='text-sm-left text-muted font-weight-bold' style={{fontSize:'12px'}}>Reporter Name</label>
                     <input onChange={(e)=>setIssue({...issue, reporter_name: e.target.value})} type="text" className="form-control" />
                </div>
                <div className="form-group">
                    <label className='text-sm-left text-muted font-weight-bold' style={{fontSize:'12px'}}>Priority</label>
                    <select onChange={(e)=>setIssue({...issue, priority: e.target.value})} class="custom-select">
                        <option>Highest</option>
                        <option>High</option>
                        <option>Medium</option>
                        <option>Low</option>
                        <option>Lowest</option>
                    </select>
                </div>
                <div>
                    <label className='text-sm-left text-muted font-weight-bold' style={{fontSize:'12px'}}>Assignee</label>
                     <input onChange={(e)=>setIssue({...issue, assignee: e.target.value})} type="text" className="form-control" />
                </div>
                <button type="submit" onClick={handleclick} className="mt-3 mr-3 btn btn-primary">Create</button>
                <button type='cancel' onClick={toggle} className='mt-3 btn btn-secondary'> Cancel</button>
                </form>  
            </div>
            
        </Modal>
    );
}

export default IssueModal;