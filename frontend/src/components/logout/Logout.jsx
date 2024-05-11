import React from "react";
import { Button, ButtonGroup } from '@chakra-ui/react'


const Logout = ()=>{

    const handleLogout = ()=>{

    }

    return(
        <div>
            <Button bg='var(--primary-color)' color='white' size='sm' mt='4' mb='4' pr='14' pl='14' _hover={{
                    background: "white",
                    color: "var(--primary-color)",
                    border: '1px',
                    borderColor: 'var(--primary-color)'
                }}
                    onClick={handleLogout}
                >LOGOUT</Button>
        </div>
    )
}

export default Logout;