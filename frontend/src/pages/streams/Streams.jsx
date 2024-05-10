import React, { useEffect } from "react";
import './streams.css'
import { useState } from "react";
import axios from 'axios'
import { json, useNavigate } from 'react-router-dom'
import { Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption, TableContainer, Heading, Button } from '@chakra-ui/react'
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Input } from '@chakra-ui/react'
import { DeleteIcon, EditIcon, ArrowLeftIcon, ArrowRightIcon, ArrowUpIcon, ArrowDownIcon } from '@chakra-ui/icons'
import Loader from "react-js-loader";

const Streams = () => {
    const [name, setName] = useState("")
    const [nameErr, setNameErr] = useState(false);
    const [streamData, setStreamData] = useState([]);
    const [update,setUpdate] = useState(true);
    const [modalOpen,setModalOpen] = useState(false)

    const api = "http://localhost:8000/admin/stream";

    useEffect(() => {
        getStreams();
    }, [update])

    const getStreams = async () => {
        const response = await axios.get(api);
        console.log(response.data);
        setStreamData(response.data)
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
            <div className="form-container">
                <Heading mb={4} >Streams</Heading>
                <Input className="input" placeholder='Enter Stream name' size='lg' onChange={(e) => { setName(e.target.value); setNameErr(false) }} />
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
                <Heading mb='10' >All the streams available</Heading>
                <TableContainer>
                    <Table variant='simple'>
                        <Thead>
                            <Tr>
                                <Th>Stream Name</Th>
                                <Th></Th>
                                {/* <Th>Edit/Delete</Th> */}
                            </Tr>

                        </Thead>
                        <Tbody>
                            {
                                streamData.map((elem, id, array) => {
                                    return <Tr key={id}>
                                        <Td>{elem.streamName}</Td>
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
                                    <Heading mb={4} >Edit Your Stream</Heading>
                                    <Input className="input" placeholder='Enter Stream name' size='lg' onChange={(e) => { setName(e.target.value); setNameErr(false) }} />
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

export default Streams