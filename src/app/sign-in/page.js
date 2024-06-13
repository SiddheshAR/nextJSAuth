"use client"
import { loginUserAction } from '@/actions'
import CommonFormElement from '@/components/form-element/page'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { initialLoginForm, LoginformController } from '@/utils'
import { useRouter } from 'next/navigation'
import React,{useState} from 'react'

const SignIn = () => {
  const [signInFormData,setsignInFormData]=useState(initialLoginForm);
  let router = useRouter();
  const handleLogin=async()=>{
    let FormResult = await loginUserAction(signInFormData);
    // console.log(signInFormData);
    console.log(FormResult);
    if(FormResult?.success){
      router.push('/');
    }
    
  }
  const handleFormSubmit = ()=>{
    let ab = (Object.keys(signInFormData).every((e)=>signInFormData[e].trim() !==""));
    return ab;
  }
  
  return (
    <div>
      <h1>Login</h1>
      <form action={handleLogin}>
        <div>
        {
          LoginformController.map((controlItem)=>
            <div key={controlItem.name}>
                <Label>{controlItem.label}</Label>
                <CommonFormElement
                  currentItem={controlItem}
                  value={signInFormData[controlItem.name]}
                  onChange={(event)=>
                    setsignInFormData(
                      {
                        ...signInFormData,
                       [controlItem.name]:event.target.value 
                      }
                    )
                  }

                />
            </div>
          )
        }
        </div>
        <Button className="disabled:opacity-65" disabled={!handleFormSubmit()} type='submit'>Submit</Button>
      </form>
    </div>
  )
}

export default SignIn