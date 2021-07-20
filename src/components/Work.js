import React, {useState, useEffect, useRef} from 'react';
import {Link, useLocation} from 'react-router-dom';
import CreateProject from './CreateProject';
import CreateTask from './CreateTask';
import Axios from 'axios';
import "./css/work.css";





const task_data = [
    {
        id:3,
        name: "Reading list",
        in_progress: 10,
        done: 2,
    },
    {
        id:4,
        name: "Daily Tasks",
        in_progress: 3,
        done: 4,
    },
]

const Project = (props) => {
    if(props.project === []) {
        props.project = [{
            id: 1,
            project_name: 'Add project to Show up here',
        }]
    }

    return (
        <>
        <div className='d-flex row-flex pr-3'>
        {props.project.map((item) => (
            <div className='card_container' key={item.project_id}>               
            <div className="mr-3 w-300 hover-shadow card">
            <div className="card-body">
                <div>
                    <h5 className="card-title">{item.project_name}</h5>
                </div>
                <h6 className="card-subtitle mb-2 text-muted">Go to</h6>
                <Link to={{pathname:"/project", state: { id: item.project_id, data_filter: null }}} style={{textDecoration:"none"}}>
                    <button className='btn btn-light d-flex row-flex justify-content-between mb-2' style={{width:260}}>
                    <div>Open Issues</div> 
                    </button>
                </Link>
                <Link to={{pathname:"/project", state: { id: item.project_id, data_filter: 'time' }}} style={{textDecoration:"none"}}>
                    <button className='btn btn-light' style={{width:260, textAlign:'left'}}>Last Worked on</button>
                </Link>
            </div>
            </div>
            </div>
        ))}
        </div>
        </>
        );
}

const Task = () => {
    return (
        <>
        <div className='d-flex row-flex pr-3'>
        {task_data.map((item) => (
            <div className="mr-3 w-300 hover-shadow card" key={item.id}>
            <div className="card-body">
                <div>
                    <h5 className="card-title">{item.name}</h5>
                </div>
                <h6 className="card-subtitle mb-2 text-muted">Go to</h6>
                <button className='btn btn-light d-flex row-flex justify-content-between mb-2' style={{width:260}}>
                    <div>In Progress</div> 
                </button>
                <button className='btn btn-light' style={{width:260, textAlign:'left'}}>Last Worked on</button>
            </div>
            </div>
        ))}
        </div>
        </>
    );
}

const Workedon = (props) => {
    const {data} = props;
    return (
        <>
        <span className='text-sm-left text-muted font-weight-bold' style={{fontSize:"11px"}}>Recent</span>
        <table>
            {data.map((item)=> (
                <tr>
                    <td className='mb-2' key={item.id}>
                    <Link to={{pathname:"/issue", state: { issue: item.issue_summary, project: item.project_name} }} className='text-body'>
                    <td className='mb-2' key={item.id}><button className='btn btn-light' style={{width:260, textAlign:'left'}}>{item.issue_summary}</button></td>
                    </Link>
                    </td>
                </tr>
            ))}
        </table>
        </>
    )
}

const Assigned = (props) => {
    const {data} = props;
    return (
        <>
        <table>
            {data.map((item)=> (
                <tr>
                <Link to={{pathname:"/issue", state: { issue: item.issue_summary, project: item.project_name} }} className='text-body'>
                    <td className='mb-2' key={item.id}><button className='btn btn-light' style={{width:260, textAlign:'left'}}>{item.issue_summary}</button></td>
                </Link>
                </tr>
            ))}
        </table>
        </>
    )
}


const Work = () => {
    const [bug, setbug] = useState(false);
    const [task, settask] = useState(false);
    const [type, setType] = useState('project');
    const [dis, setDis] = useState(()=> true);
    const displayfunc = useRef();
    const [User, setUser] = useState('');
    const [projectData, setProjectData] =  useState({
        p_data: []
    })
    const [createdissues, setcreatedissues] = useState({
        data: []
    })
    const [issues, setIssues] = useState({
        data: []
    })
    

    
    useEffect(()=> {
        const da = [{
            project_name : 'Add projects to display them here'
        }]
        const user = localStorage.getItem('user');
        setUser(user);
        Axios.post('http://localhost:3001/api/get_projects', {
            username: user,
        }).then((res)=>{
           if(res.data === false){
                setProjectData({p_data: da});
           }
           else{
                setProjectData({p_data: res.data})
           }
           
        })
    }, [])
    
    useEffect(() => {
        const user = localStorage.getItem('user');
        setUser(user);
        
        const issue_ball = [{
            issue_summary: 'Create issues to add them here',
        }]
        

        Axios.post('http://localhost:3001/api/get_person_issues', {
            id: user,
        }).then((res)=>{
           if(res.data === false){
                setIssues({data:issue_ball});
           }
           else{
                setIssues({data:res.data});
           }
           
        })

        Axios.post('http://localhost:3001/api/get_pp_issues', {
            id: user,
        }).then((res)=>{
           if(res.data === false){
                setcreatedissues({data:issue_ball});
           }
           else{
                setcreatedissues({data:res.data});
           }
           
        })

    }, [])

    useEffect( () => {
        if (type === 'project'){
            displayfunc.current = false;
            return setType('project')   
        }
        else {
            displayfunc.current = true;
            return setType('task')
        }
    }, [type]);


    const bug_toggle = () => {
        setbug(e => !e);
    }

    const task_toggle = () => {
        settask(e => !e);
    }


    return (
        <>
        <div className="max-width-container">
          <div className='mb-5 d-flex row-flex justify-content-between'>
                <div className="h3">Your Work</div>
                <div>
                    <button className='mr-3 btn btn-primary' onClick={bug_toggle}>
                     New Project + 
                     </button>
                     <button className='btn btn-primary' onClick={task_toggle}>
                     New Task Board + 
                     </button>
                </div>
               
          </div>
          <div className='mb-5'>
              <ul className='nav nav-tabs'>
                <li className="nav-item">
                  <span onClick={() =>{setType(d => d='project')}} className={`nav-link ${displayfunc.current ? "active bg-light": ""}`}>Project</span>
                </li>
                <li className="nav-item">
                    <span onClick={() =>{setType(d => d='task')}} className={`nav-link ${displayfunc.current ? "": "active bg-light"}`}>Task Boards</span>
                </li>
              </ul>
              <div className='p-2 bg-light' style={{height:200}}>
                {displayfunc.current ? <Project project={projectData.p_data} /> : <Task />}
              </div>
          </div>
          <div>
            <ul className = "nav nav-tabs">
                <li className="mr-3 nav-item">
                    <span className={`${dis ? 'text-success': ''}`} onClick = {() => {setDis(d => d=true)}}> Worked On </span>
                </li>
                <li className="nav-item">
                    <span className={`${dis ? '' :'text-success'}`} onClick = {() => {setDis(d => d=false)}}> Assigned to me </span>
                </li>
            </ul>
            <div>
               {dis ?
                <Workedon data={createdissues.data} />
               : 
               <Assigned data={issues.data} />}
            </div>
        </div>
        </div>
        {
            bug ? (<CreateProject toggle={bug_toggle} user={User} />) : null
        }
        {
            task ? (<CreateTask toggle={task_toggle} />): null
        }
        </>
        );
}

export default Work;