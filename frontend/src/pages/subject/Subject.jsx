import React, { useEffect } from "react";
import './subject.css'
import { useState } from "react";
import axios from 'axios'
import { json, useNavigate } from 'react-router-dom'
import { Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption, TableContainer, Heading, Button } from '@chakra-ui/react'
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Input } from '@chakra-ui/react'
import { DeleteIcon, EditIcon, ArrowLeftIcon, ArrowRightIcon, ArrowUpIcon, ArrowDownIcon } from '@chakra-ui/icons'
import Loader from "react-js-loader";

const Subject = () => {
    const [streamName, setStreamName] = useState("")
    const [subjectName, setSubjectName] = useState("")
    const [nameErr, setNameErr] = useState(false);
    const [subjectData, setSubjectData] = useState([]);
    const [update,setUpdate] = useState(true);
    const [modalOpen,setModalOpen] = useState(false)
    const [toupdate,setToUpdate] = useState({});
    const [editStream,setEditStream] = useState("");
    const [editSubject,setEditSubject] = useState("");

    const api = "https://rurux.vercel.app/admin/subject";

    useEffect(() => {
        getSubject();
    }, [update])

    const getSubject = async () => {
        const response = await axios.get(api);
        setSubjectData(response.data)
    }

    const handleSubmit = async () => {
        if (streamName === "" || subjectName === "") {
            setNameErr(true)
        }
        else {
            try {
                axios.post(api,{
                    streamName : streamName,
                    subjectName : subjectName
                }).then(()=>{
                    setUpdate(!update)
                })
            }
            catch (error) {
                console.log(error)
            }
        }
    }

    const handleEdit = async (elem)=>{
        if (streamName === "" || subjectName === "") {
            setNameErr(true)
        }
        else{
            try{
                await axios.put(api,{
                    _id : toupdate._id,
                    streamName : streamName,
                    subjectName : subjectName,
                }).then(()=>{
                    setUpdate(!update)
                    setModalOpen(false);
                })
            }
            catch(error){
                console.log(error);
            }
        }
    }

    const handleDelete = async(elem)=>{
        try{
            await axios.delete(api,{
                data:{
                    subjectId : elem._id
                }
            }).then((res)=>{
                setUpdate(!update);
            })
        }
        catch(error){
            console.log(error)
        }
    }

    const handleModal = (elem)=>{
        setEditStream(elem.streamName);
        setEditSubject(elem.subjectName);
        setModalOpen(true)
        setToUpdate(elem)
    }

   

    return (
        <div className="container">
            <div className="form-container">
                <Heading mb={4} >Subject</Heading>
                <Input className="input" placeholder='Enter Stream name' size='lg' onChange={(e) => { setStreamName(e.target.value); setNameErr(false) }} />
                {nameErr && <p style={{ color: 'red' }}>Your name is invalid</p>}
                <Input className="input" placeholder='Enter Subjecnamet name' size='lg' onChange={(e) => { setSubjectName(e.target.value); setNameErr(false) }} />
                {nameErr && <p style={{ color: 'red' }}>Your name is invalid</p>}
                <Button bg='var(--primary-color)' color='white' size='lg' mt='4' mb='4' pr='14' pl='14' _hover={{
                    background: "white",
                    color: "var(--primary-color)",
                    border: '1px',
                    borderColor: 'var(--primary-color)'
                }}
                    onClick={handleSubmit}
                >Submit</Button>
            </div>

            <div className="table">
                <Heading mb='10' >All the subject available</Heading>
                <TableContainer>
                    <Table variant='simple'>
                        <Thead>
                            <Tr>
                                <Th>Stream Name</Th>
                                <Th>Subject Name</Th>
                                {/* <Th>Edit/Delete</Th> */}
                            </Tr>

                        </Thead>
                        <Tbody>
                            {
                                subjectData.map((elem, id, array) => {
                                    return <Tr key={id}>
                                        <Td>{elem.streamName}</Td>
                                        <Td>{elem.subjectName}</Td>
                                        <td onClick={() => { handleModal(elem) }} > <EditIcon /> </td>
                                        <td onClick={() => { handleDelete(elem) }} > <DeleteIcon /> </td>
                                    </Tr>
                                })
                            }
                        </Tbody>
                    </Table>
                </TableContainer>

                <Modal isOpen={modalOpen} onClose={() => { setModalOpen(false) }}>
                        <ModalOverlay />
                        <ModalContent>
                            <ModalHeader>Edit</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody>
                                <div className="form-container">
                                    <Heading mb={4} >Edit Your Subject</Heading>
                                    <Input value={editStream} className="input" placeholder='Enter Stream name' size='lg' onChange={(e) => { setStreamName(e.target.value); setNameErr(false) }} />
                                    {nameErr && <p style={{ color: 'red' }}>Your name is invalid</p>}
                                    <Input value={editSubject} className="input" placeholder='Enter Subject name' size='lg' onChange={(e) => { setSubjectName(e.target.value); setNameErr(false) }} />
                                    {nameErr && <p style={{ color: 'red' }}>Your name is invalid</p>}
                                </div>
                            </ModalBody>

                            <ModalFooter>
                                <Button bg='var(--primary-color)' color='white' size='lg' mt='4' mb='4' pr='14' pl='14' _hover={{
                                    background: "white",
                                    color: "var(--primary-color)",
                                    border: '1px',
                                    borderColor: 'var(--primary-color)'
                                }}
                                    mr={3}
                                    onClick={() => { setModalOpen(false) }}>
                                    Close
                                </Button>
                                <Button variant='ghost'
                                    bg='var(--primary-color)' color='white' size='lg' mt='4' mb='4' pr='14' pl='14' _hover={{
                                        background: "white",
                                        color: "var(--primary-color)",
                                        border: '1px',
                                        borderColor: 'var(--primary-color)'
                                    }}
                                    onClick={() => { handleEdit() }}
                                >Submit</Button>
                            </ModalFooter>
                        </ModalContent>
                    </Modal>
            </div>
        </div>
    )
}

export default Subject;