import React, { useEffect } from "react";
import './allStudents.css'
import { useState } from "react";
import axios from 'axios'
import { json, useNavigate } from 'react-router-dom'
import { Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption, TableContainer, Heading, Button } from '@chakra-ui/react'
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Input } from '@chakra-ui/react'
import { DeleteIcon, EditIcon, ArrowLeftIcon, ArrowRightIcon, ArrowUpIcon, ArrowDownIcon } from '@chakra-ui/icons'
import Loader from "react-js-loader";

const AllStudents = () => {
    const [name, setName] = useState("")
    const [nameErr, setNameErr] = useState(false);
    const [studentData, setStudentData] = useState([]);
    const [update,setUpdate] = useState(true);
    const [modalOpen,setModalOpen] = useState(false)

    const api = "https://rurux.vercel.app/admin/showStudents";

    useEffect(() => {
        getAllStudents();
    }, [update])

    const getAllStudents = async () => {
        const response = await axios.get(api);
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
                <Heading mb='10' >All the students available</Heading>
                <TableContainer>
                    <Table variant='simple'>
                        <Thead>
                            <Tr>
                                <Th>Student Name</Th>
                                <Th>Student Email</Th>
                                {/* <Th>Edit/Delete</Th> */}
                            </Tr>

                        </Thead>
                        <Tbody>
                            {
                                studentData.map((elem, id, array) => {
                                    return <Tr key={id}>
                                        <Td>{elem.name}</Td>
                                        <Td>{elem.email}</Td>
                                        
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

export default AllStudents