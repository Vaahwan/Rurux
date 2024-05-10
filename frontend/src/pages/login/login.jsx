import React from "react";
import './login.css'
import { useState } from "react";
import axios from 'axios'
import {json, useNavigate} from 'react-router-dom'
import { Heading } from '@chakra-ui/react'
import { Input, InputGroup, InputRightElement, Button } from '@chakra-ui/react'

const Login = () => {
    const [show, setShow] = useState(false);
    const [name, setName] = useState("")
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [nameErr, setNameErr] = useState(false);
    const [emailErr, setEmailErr] = useState(false);
    const [passErr, setPassErr] = useState(false);
    const [userNotExist,setUserNotExist] = useState(false);
    const [wrongPass,setWrongPass] = useState(false);
    const validEmail = new RegExp('^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$');
    const validPassword = new RegExp('^(?=.*?[A-Za-z])(?=.*?[0-9]).{8,}$');
   
    const navigate = useNavigate();
    const api = "https://rurux.vercel.app/student/login";

    const handleClick = () => setShow(!show)

    const handleSubmit = async () => {
        if (name === "") {
            setNameErr(true)
        }
        else if (email==="") {
            setEmailErr(true);
        }
        else if (password==="") {
            setPassErr(true);
        }
        else {
            try {
                console.log({
                    "name": name,
                    "email": email,
                    "password": password
                })
                if(name=="admin" && email=="admin@university.com" && password=="Admin123"){
                    localStorage.setItem('adminLoggedIn',true)
                    console.log("hello admin");
                }
                else{
                    await axios.post(api,{
                        email : email,
                        password : password
                    }).then((res)=>{
                        console.log(res);
                        localStorage.setItem('studentEmail',(email))
                        navigate('/studentprogress')
                    })
                }
            }
            catch (error) {
                console.log(error)
            }
        }
    }

    return (
        <div className="container">
            <div className="form-container">
                <Heading mb={4} >Login</Heading>
                <Input className="input" placeholder='Enter Your Name' size='lg' onChange={(e) => { setName(e.target.value); setNameErr(false) }} />
                {nameErr && <p style={{ color: 'red' }}>Your name is invalid</p>}
                <Input className="input" type='email' placeholder='Enter Your Email' size='lg' onChange={(e) => { setEmail(e.target.value); setEmailErr(false) }} />
                {emailErr && <p style={{ color: 'red' }}>Your email is invalid</p>}
                <InputGroup className="input" size='lg'>
                    <Input
                        pr='4.5rem'
                        type={show ? 'text' : 'password'}
                        placeholder='Enter password'
                        onChange={(e) => { setPassword(e.target.value); setPassErr(false) }}
                    />
                    <InputRightElement width='4.5rem'>
                        <Button h='1.75rem' size='sm' onClick={handleClick}>
                            {show ? 'Hide' : 'Show'}
                        </Button>
                    </InputRightElement>
                </InputGroup>
                {passErr && <p style={{ color: 'red' }}>Password should be atleast 8 letter and one capital letter and one digit</p>}
                {userNotExist && <p style={{ color: 'red' }}>Sorry! User does not exist</p>}
                {wrongPass && <p style={{ color: 'red' }}>Incorrect Password</p>}
                <Button bg='var(--primary-color)' color='white' size='lg' mt='4' mb='4' pr='14' pl='14' _hover={{
                    background: "white",
                    color: "var(--primary-color)",
                    border: '1px',
                    borderColor: 'var(--primary-color)'
                }}
                    onClick={handleSubmit}
                >Submit</Button>
            </div>
        </div>
    )
}

export default Login