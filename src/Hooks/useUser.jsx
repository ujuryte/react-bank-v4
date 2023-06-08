import { useCallback, useEffect, useState } from "react";

export default function useUser(){

    const [user, setUser] = useState(null);

    useEffect(() => {
       
            const lsUser = localStorage.getItem('r6User');
            if(null === lsUser){
                return;
            }
            setUser(JSON.parse(lsUser));
            
        
    },[setUser])

    const _validateUser = data =>{
        return {
            email: data.email || '',
            role: data.role || '',
            id: data.id || ''
        }
    }

    

    const _setUser = useCallback(data => {  
        if(null === data){
            setUser(null);
            localStorage.removeItem("r6User");
        } else{
            setUser(_validateUser(data));
            localStorage.setItem('r6User', JSON.stringify(_validateUser(data)));
        }
        
    },[setUser])

   


    return[ user, _setUser];
}