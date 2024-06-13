"use client"
import React from 'react'
import { Button } from '../ui/button'
import { logOutUser } from '@/actions'

const Logout = () => {

    const handleLogout =async()=>{
        await logOutUser()
    }

  return (
    <div>
        <Button onClick={handleLogout}>Log Out</Button>
    </div>
  )
}

export default Logout