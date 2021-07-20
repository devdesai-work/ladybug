import React, {useState, useEffect} from 'react';
import {Link, useLocation } from 'react-router-dom';
import Axios from 'axios';
import "./css/work.css";




const ProjectShow = () => {
    const location = useLocation();
    const { id } = location.state;
    const [issues, setIssues] = useState({
        data: []
    });

    useEffect(() => {
        const no_data = [{
            issues_id: '',
            issue_summary:'',
            issue_type: '',
            project_name: '',
            assigned_to: '',
            identified_by: '',
            priority: '',
            status: '',
            date_identified: ''
        }]
        Axios.post('http://localhost:3001/api/get_issues', {
            id: id,
        }).then((res)=>{ 
           
           if (res.data === false){
               setIssues({
                   data: no_data
               })
           }
           else {
               setIssues({data: res.data});
           }
        })
    },[])

    
    return (
        <div className='max-width-container'>
            <div>
                <span className='text-sm-left text-muted'> --{`>`} </span>
                <span><Link to="/your_work" className='text-sm-left text-muted' >Project </Link></span>
                <span className='text-sm-left text-muted'> -{`>`} </span>
                <span className='text-sm-left text-muted'><Link to={{pathname:"/project", state: { id: id, data_filter: null }}} className='text-sm-left text-muted'>{id}</Link></span>
            </div>
            <div className='h3 mt-3'>
                Issues
            </div>
            <div className='mt-3'>
                <table className='table table-hover'>
                    <thead>
                        <tr>
                            <th scope="col">Type</th>
                            <th scope="col">Project id</th>
                            <th scope='col'>Summary</th>
                            <th scope="col">Assignee</th>
                            <th scope="col">Reporter</th>
                            <th scope="col">Priority</th>
                            <th scope="col">Status</th>
                            <th scope="col">Created</th>
                        </tr>
                    </thead>
                    <tbody>
                        {issues.data.map((item) => (
                            <tr key={item.issues_id}>
                                <th scope='row'>{item.issue_type}</th>
                                <td>{item.project_name}</td>
                                <td><Link to={{pathname:"/issue", state: { issue: item.issue_summary, project: id } }} className='text-body'>{item.issue_summary}</Link></td>
                                <td>{item.assigned_to}</td>
                                <td>{item.identified_by}</td>
                                <td>{item.priority}</td>
                                <td>{item.status}</td>
                                <td>{item.date_identified}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            
        </div>
        );
}

export default ProjectShow;