import React, {useState, useEffect, useRef} from 'react';
import {Link, useLocation} from 'react-router-dom';
import Axios from 'axios';
import "./css/work.css";
import { CheckIcon, XIcon } from '@primer/octicons-react';

const Issue = () => {
    const location = useLocation();
    const {issue, project} = location.state;
    const [sum, setSum] = useState(false);
    const [desc, setDesc] = useState(false);
    const [assignee, setass] = useState(false);
    const [reporter, setrep] = useState(false);
    const [pri, setPri] = useState({
        val_1: '',
        state_1: false,
    });
    const [sta, setSta] = useState({
        val:'',
        state:false,
    });
    const [floater, setfloater] = useState('');

    const [data, setData] = useState({
        iss: []
    })

    const [comments, setComments] = useState({
        dd: []
    })

    const [comm, setComm] = useState('');

    useEffect(() =>{
        const net = [{
            comment: '',
        }]
        Axios.post('http://localhost:3001/api/issue_det', {
            summary: issue,
        }).then((res)=>{
            setData({iss:res.data[0]});
        }).then(
        Axios.post('http://localhost:3001/api/get_comments', {
            issue_id: data.iss.issue_id,
        }).then((res)=>{
            if(res.data === false){
                setComments({dd:net});
            }
            else {
                setComments({dd:res.data});
            }
        }))

    },[]);

    const handleupdate = (element) => {
        Axios.put('http://localhost:3001/api/update_issue', {
            id:data.iss.issue_id,
            element_type:element,
            data: floater,
        }).then((res)=>{
            console.log(res.data);
        })
    }

    const handleupdate_down = (element) => {
        Axios.put('http://localhost:3001/api/update_issue', {
            id:data.iss.issue_id,
            element_type:element,
            data: pri.val_1,
        }).then((res)=>{
            console.log(res.data);
        })
    }

    const handleupdate_up = (element) => {
        Axios.put('http://localhost:3001/api/update_issue', {
            id:data.iss.issue_id,
            element_type:element,
            data: sta.val,
        }).then((res)=>{
            console.log(res.data);
        })
    }

    const handlepost = () => {
        const user = localStorage.getItem('user');
        Axios.put('http://localhost:3001/api/add_comment', {
            id:data.iss.issue_id,
            sender:user,
            data_item: comm,
        }).then((res)=>{
            console.log(res.data);
        })
    }

  

    return (
        <div className='max-width-container'>
            <div>
                <span className='text-sm-left text-muted'> --{`>`} </span>
                <span><Link to="/your_work" className='text-sm-left text-muted' >Project </Link></span>
                <span className='text-sm-left text-muted'> -{`>`} </span>
                <span className='text-sm-left text-muted'><Link to={{pathname:"/project", state: { id: project, data_filter: null }}} className='text-sm-left text-muted'>{project}</Link></span>
                <span className='text-sm-left text-muted'> -{`>`} </span>
                <span className='text-sm-left text-muted'><Link to={{pathname:"/issue", state: { issue: issue, project: project }}} className='text-sm-left text-muted'>{issue}</Link></span>
            </div>
            <div>
                <div className='mt-2 mb-3 h2 d-flex flex-row'>
                <div className='mr-2'>
                    <input type='text' onClick={() => setSum((e) => e=!e)} onChange={(e) => setfloater(e.target.value)} className='spec_inp' placeholder={data.iss.issue_summary}/>
                </div>
                <div>
                    {sum && (<div>
                            <button onClick={handleupdate('issue_summary')} className='ml-2 mr-2 h-30 btn btn-light'><CheckIcon size={24} /></button> 
                            <button onClick={() => setSum((e) => e=!e)} className= 'h-30 btn btn-light'><XIcon size={24} /></button>
                            </div>
                            )
                    }
                </div>
                </div>
                <div className='mt-3'>
                    <div className='h4'>Description</div>
                    <div className='mt-2 mb-3 h2 d-flex flex-row'>
                    <div className='mr-2'>
                        <textarea onChange={(e) => setfloater(e.target.value)} rows='5' cols='80' onClick={() => setDesc((e) => e=!e)} className='desc_input' placeholder={data.iss.issue_description}></textarea>
                    </div>
                    <div>
                        {desc && (<div>
                                <button onClick={handleupdate('issue_description')} className='ml-2 mr-2 h-30 btn btn-light'><CheckIcon size={24} /></button> 
                                <button onClick={() => setDesc((e) => e=!e)} className= 'h-30 btn btn-light'><XIcon size={24} /></button>
                                </div>
                                )
                        }
                    </div>
                    </div>
                </div>
                <div className='mt-3 d-flex flex-row'>
                    <div className='mt-2 mb-3 mr-4 h2 d-flex flex-row'>
                    <div className='mr-2'>
                        <div className='h4'>Assignee</div>
                        <input type='text' onChange={(e) => setfloater(e.target.value)}  onClick={() => setass((e) => e=!e)} className='desc_input' placeholder={data.iss.assigned_to} />
                    </div>
                    <div>
                        {assignee && (<div>
                                <button onClick={handleupdate('assigned_to')} className='ml-2 mr-2 h-30 btn btn-light'><CheckIcon size={24} /></button> 
                                <button onClick={() => setass((e) => e=!e)} className= 'h-30 btn btn-light'><XIcon size={24} /></button>
                                </div>
                                )
                        }
                    </div>
                    </div>
                    <div className='mt-2 mb-3 h2 d-flex flex-row'>
                    <div className='mr-2'>
                        <div className='h4'>Reporter</div>
                        <input type='text' onChange={(e) => setfloater(e.target.value)} onClick={() => setrep((e) => e=!e)} className='desc_input' placeholder={data.iss.identified_by}/>
                    </div>
                    <div>
                        {reporter && (<div>
                                <button onClick={handleupdate('identified_by')} className='ml-2 mr-2 h-30 btn btn-light'><CheckIcon size={24} /></button> 
                                <button onClick={() => setrep((e) => e=!e)} className= 'h-30 btn btn-light'><XIcon size={24} /></button>
                                </div>
                                )
                        }
                    </div>
                    </div>
                </div>
                <div className='mt-3 d-flex flex-row'>
                    <div className='mt-2 mb-3 mr-4 h2 d-flex flex-row'>
                    <div className='mr-2'>
                        <div className='h4'>Priority</div>
                        <select onChange={(e) => setPri({val_1:e.target.value, state_1:true})} className="desc_input custom-select">
                        <option  value="" disabled selected hidden>{data.iss.priority} </option>
                        <option>Highest</option>
                        <option>High</option>
                        <option>Medium</option>
                        <option>Low</option>
                        <option>Lowest</option>
                    </select>
                    <div>
                        {pri.state_1  && (<div>
                                <button onClick={handleupdate_down('priority')} className='ml-2 mr-2 h-30 btn btn-light'><CheckIcon size={24} /></button> 
                                <button onClick={() => setPri({...pri, state_1:false})} className= 'h-30 btn btn-light'><XIcon size={24} /></button>
                                </div>
                                )
                        }
                    </div>
                    </div>
                    </div>
                    <div className='mt-2 mb-3 h2 d-flex flex-row'>
                    <div className='mr-2'>
                        <div className='h4'>Status</div>
                        <select onChange={(e) => setSta({val:e.target.value, state:true})} className="desc_input custom-select">
                        <option  value="" disabled selected hidden>{data.iss.status} </option>
                        <option>To-Do</option>
                        <option>In Progress</option>
                        <option>In Review</option>
                        <option>Done</option>
                        </select>
                        <div>
                        {sta.state  && (<div>
                                <button onClick={handleupdate_up('status')} className='ml-2 mr-2 h-30 btn btn-light'><CheckIcon size={24} /></button> 
                                <button onClick={() => setSta({...pri, state:false})} className= 'h-30 btn btn-light'><XIcon size={24} /></button>
                                </div>
                                )
                        }
                    </div>
                    </div>
                    </div> 
                </div>
                <div className='mt-3 nav d-flex flex-column'>
                        <div className='h4 nav-item'> Comments </div>
                        <div className='d-flex flex-column' style={{width:'500px'}}>
                            <textarea rows='3' cols='80'  onChange={(e) => setComm(e.target.value)}></textarea>
                            <button className='mt-2 btn btn-primary' style={{width:'100px'}} onClick={handlepost}>Post</button>
                        </div>
                        <div>
                            {comments.dd.map((item) => (
                                <div className='card'>
                                    <div>{item.sender}</div>
                                    <div>{item.comment}</div>
                                </div>
                            ))}
                        </div>
                </div>
            </div>
        </div>
    );
}

export default Issue;