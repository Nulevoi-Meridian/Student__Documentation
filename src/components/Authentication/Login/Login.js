import React, {useState, useEffect, useContext} from 'react';
import axios from "axios";
import {addTopicContext} from "../../../contexts/AddTopicContext";
import { useHistory } from "react-router-dom";
import Register from "../Register/Register";

const Login = () => {
    let history = useHistory();

    let [users, setUsers] = useState([]);
    let [user, setUser] = useState({});
    let {API_REGISTRATION} = useContext(addTopicContext);

    useEffect(() => {
        axios.get(API_REGISTRATION).then(res => {
            setUsers(res.data);
        })
    },[]);

    function handleInps(e){
        let obj = {
            ...user,
            [e.target.name]: e.target.value
        };
        setUser(obj);
    }

    function login(){
        let check = false;
        let currentUser = {};
        users.forEach((p) => {
            if(p.account === user.account && p.password === user.password){
                check = true;
                currentUser.account = p.account;
                currentUser.password = p.password;
                localStorage.setItem('currentUser', JSON.stringify(currentUser));
            }
        });
        console.log(localStorage.getItem('currentUser'));
        check ? history.push('/') : alert('No such user');
    }

    return (
        <div>
            <div>
                Login<input onChange={handleInps} type={'text'} name={'account'} />
                Password<input onChange={handleInps} type={'text'} name={'password'} />
                <button onClick={login} >Login</button>
            </div>
            <div>
                Register!
                <Register/>
            </div>
        </div>
    );
};

export default Login;
