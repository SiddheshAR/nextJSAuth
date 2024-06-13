import { fetchAuthUserAction } from "@/actions";
import Logout from "@/components/logout";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {redirect} from "next/navigation";



export default async function Home() {

  const currentUser = await fetchAuthUserAction();
  if(!currentUser.success){
    redirect('sign-in')
  }  
  const {userName,email} = currentUser.data;

  return (
    <div>
      <div className="max-w-xl m-auto border border-green-600 ">
      <h1>Name: {userName}</h1>
      <h2>Email: {email}</h2>
      
      </div>
      <Logout/>
    </div>
  );
}
