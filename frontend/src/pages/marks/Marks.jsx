import React, { useEffect } from "react";
import './marks.css'
import { useState } from "react";
import axios from 'axios'
import { json, useNavigate } from 'react-router-dom'
import { Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption, TableContainer, Heading, Button } from '@chakra-ui/react'
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Input } from '@chakra-ui/react'
import { DeleteIcon, EditIcon, ArrowLeftIcon, ArrowRightIcon, ArrowUpIcon, ArrowDownIcon } from '@chakra-ui/icons'
import Loader from "react-js-loader";

const Marks = () => {
    const [studentEmail,setStudentEmail] = useState("");
    const [streamName, setStreamName] = useState("")
    const [subjectName,setSubjectName] = useState("");
    const [marks,setMarks] = useState(0);
    const [nameErr, setNameErr] = useState(false);
    const [marksData, setMarksData] = useState([]);
    const [update,setUpdate] = useState(true);
    const [modalOpen,setModalOpen] = useState(false)
    const [toupdate,setToUpdate] = useState({});
    const [editStudentEmail,setEditStudetEmail] = useState("");
    const [editStream,setEditStream] = useState("");
    const [editSubject,setEditSubject] = useState("");
    const [editMarks,setEditMarks] = useState("");

    const api = "https://rurux.vercel.app/admin/marks";

    useEffect(() => {
        getMarks();
    }, [update])

    const getMarks = async () => {
        const response = await axios.get(api);
        setMarksData(response.data)
    }

    const handleSubmit = async () => {
        if (studentEmail === "" || streamName === "" || subjectName==="" || marks=="") {
            setNameErr(true)
        }
        else {
            try {
                axios.post(api,{
                    studentEmail : studentEmail,
                    streamName : streamName,
                    subjectName : subjectName,
                    marks : marks
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
            await axios.delete(api,{
                data:{
                    marksId : elem._id
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
        setEditStudetEmail(elem.studentEmail)
        setEditStream(elem.streamName)
        setEditSubject(elem.subjectName)
        setEditMarks(elem.marks)
        setToUpdate(elem)
        setModalOpen(true)
    }

    const handleEdit = async()=>{
        if (studentEmail === "" || streamName === "" || subjectName==="" || marks=="") {
            setNameErr(true)
        }
        else {
            try {
                await axios.put(api,{
                    _id : toupdate._id,
                    studentEmail : studentEmail,
                    streamName : streamName,
                    subjectName : subjectName,
                    marks : marks
                }).then(()=>{
                    setUpdate(!update)
                    setModalOpen(false);
                })
            }
            catch (error) {
                console.log(error)
            }
        }
    }

    return (
        <div className="container">
            <div className="form-container">
                <Heading mb={4} >Marks</Heading>
                <Input className="input" placeholder='Enter Student email' size='lg' onChange={(e) => { setStudentEmail(e.target.value); setNameErr(false) }} />
                {nameErr && <p style={{ color: 'red' }}>Your email is invalid</p>}
                <Input className="input" placeholder='Enter Stream name' size='lg' onChange={(e) => { setStreamName(e.target.value); setNameErr(false) }} />
                {nameErr && <p style={{ color: 'red' }}>Your stream name is invalid</p>}
                <Input className="input" placeholder='Enter Subject name' size='lg' onChange={(e) => { setSubjectName(e.target.value); setNameErr(false) }} />
                {nameErr && <p style={{ color: 'red' }}>Your subject name is invalid</p>}
                <Input className="input" placeholder='Enter number' size='lg' onChange={(e) => { setMarks(e.target.value); setNameErr(false) }} />
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
                <Heading mb='10' >All the marks available</Heading>
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
                                marksData.map((elem, id, array) => {
                                    return <Tr key={id}>
                                        <Td>{elem.studentEmail}</Td>
                                        <Td>{elem.streamName}</Td>
                                        <Td>{elem.subjectName}</Td>
                                        <Td>{elem.marks}</Td>
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
                                    <Heading mb={4} >Edit Your Marks</Heading>
                                    <Input className="input" placeholder='Enter Student email' size='lg' onChange={(e) => { setStudentEmail(e.target.value); setNameErr(false) }} />
                                    {nameErr && <p style={{ color: 'red' }}>Your email is invalid</p>}
                                    <Input className="input" placeholder='Enter Stream name' size='lg' onChange={(e) => { setStreamName(e.target.value); setNameErr(false) }} />
                                    {nameErr && <p style={{ color: 'red' }}>Your name is invalid</p>}
                                    <Input className="input" placeholder='Enter subject name' size='lg' onChange={(e) => { setSubjectName(e.target.value); setNameErr(false) }} />
                                    {nameErr && <p style={{ color: 'red' }}>Your name is invalid</p>}
                                    <Input className="input" placeholder='Enter marks' size='lg' onChange={(e) => { setMarks(e.target.value); setNameErr(false) }} />
                                    {nameErr && <p style={{ color: 'red' }}>Your marks is invalid</p>}
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

export default Marks