"use client"

import { registerUserAction } from '@/actions'
import CommonFormElement from '@/components/form-element/page'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { formController, initialSignUpForm } from '@/utils'
import { Label } from '@radix-ui/react-label'
import { useRouter } from 'next/navigation'
import { Router } from 'next/router'
import React,{useState} from 'react'

const SignUp = () => {
    const [signUpForm, setsignUpForm] = useState(initialSignUpForm);
    const router = useRouter()
    function InputValidater(){
        return Object.keys(signUpForm).every((e)=>signUpForm[e].trim() !== "");
    }
    async function  handleSignUp(){
        const result = await registerUserAction(signUpForm);
        if(result?.data) router.push("/sign-in");
    }
  return (
    <div className='p-10'>
        <h1>Registration</h1>
        <form action={handleSignUp}>
            {
                formController.map((controlItem,index)=>
                <div key={index}>
                    <Label>{controlItem.label}</Label>
                    <CommonFormElement

                    currentItem={controlItem}
                    value={signUpForm[controlItem.name]}
                    
                    onChange={(event)=>setsignUpForm({
                        ...signUpForm,
                       [event.target.name]:event.target.value}
                    )}
                    />
                    
                </div>
                )
            }
            <Button disabled={!InputValidater()} 
            className="disabled:opacity-65"
            type='submit'>Submit</Button>
        </form>
    </div>
  )
}

export default SignUp