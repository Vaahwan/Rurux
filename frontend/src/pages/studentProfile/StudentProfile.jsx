import React, { useEffect } from "react";
import './studentProfile.css'
import { useState } from "react";
import axios from 'axios'
import { json, useNavigate } from 'react-router-dom'
import { Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption, TableContainer, Heading, Button } from '@chakra-ui/react'
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Input } from '@chakra-ui/react'
import { DeleteIcon, EditIcon, ArrowLeftIcon, ArrowRightIcon, ArrowUpIcon, ArrowDownIcon } from '@chakra-ui/icons'
import Loader from "react-js-loader";

const StudentProfile = () => {
    const [name, setName] = useState("")
    const [nameErr, setNameErr] = useState(false);
    const [studentData, setStudentData] = useState([]);
    const [update,setUpdate] = useState(true);
    const [modalOpen,setModalOpen] = useState(false)

    const api = "https://rurux.vercel.app/admin/marks";
    const email = localStorage.getItem('studentEmail');

    useEffect(() => {
        getStudentProgress();
    }, [update])

    const getStudentProgress = async () => {
        const response = await axios.get(api,{
            email:email
        });
        console.log(response.data);
        setStudentData(response.data)
    }

    const handleSubmit = async () => {
        if (name === "") {
            setNameErr(true)
        }
        else {
            try {
                console.log("new streams", name)
                axios.post(api,{
                    streamName : name
                }).then(()=>{
                    setUpdate(!update)
                })
            }
            catch (error) {
                console.log(error)
            }
        }
    }

    const handleDelete = async(elem)=>{
        try{
            console.log(elem._id)
            await axios.delete(api,{
                data:{
                    streamId : elem._id
                }
            }).then((res)=>{
                console.log(res)
                setUpdate(!update);
            })
        }
        catch(error){
            console.log(error)
        }
    }

    const handleModal = (elem)=>{
        setModalOpen(true)
    }

    const handleEdit = (elem)=>{
        console.log("update function needs to be done")
    }

    return (
        <div className="container">
            <div className="table">
                <Heading mb='10' > Your Profile</Heading>
                <TableContainer>
                    <Table variant='simple'>
                        <Thead>
                            <Tr>
                                <Th>Student Email</Th>
                                <Th>Stream Name</Th>
                                <Th>Subject Name</Th>
                                <Th>Marks</Th>
                                {/* <Th>Edit/Delete</Th> */}
                            </Tr>

                        </Thead>
                        <Tbody>
                            {
                                studentData.map((elem, id, array) => {
                                    return <Tr key={id}>
                                        <Td>{elem.studentEmail}</Td>
                                        <Td>{elem.streamName}</Td>
                                        <Td>{elem.subjectName}</Td>
                                        <Td>{elem.marks}</Td>
                                        
                                    </Tr>
                                })
                            }
                        </Tbody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    )
}

export default StudentProfile