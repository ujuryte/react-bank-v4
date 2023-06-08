import { createContext, useEffect } from "react";
import useData from "./Hooks/useData";
import useMessage from "./Hooks/useMessage";
import useRoute from "./Hooks/useRoute";
import usePageLogin from "./Hooks/usePageLogin";
import useUser from "./Hooks/useUser";
import useApprove from "./Hooks/useApprove";

export const Store = createContext();

export const Data = ({children}) => {
    
    const [data, setCreateData, setEditData, setDeleteData, lastUpdate, file, readFile, removeFile, setFile] = useData();
    const [messages, msg, addServerMessage] = useMessage();
    const [displayPage, goToPage, pageSlug] = useRoute();
    const [loginResponse, setLoginRequest] = usePageLogin();
    const[user, setUser] = useUser();
    const [show, showApprove, balance, hideApprove, doApprove, setModalApproveId] = useApprove();

    useEffect(() => {
        if(null === loginResponse){
            return;
        }

        if(loginResponse?.status === 'login-ok'){
            console.log(loginResponse.message)
            setUser(loginResponse.user);
            addServerMessage(loginResponse.message);
            goToPage('home');
        }

        if(loginResponse?.status === 'error'){
            addServerMessage(loginResponse.message);
        }

        if(loginResponse?.status === 'logout-ok'){
            console.log(loginResponse.message)
            setUser(null)
            addServerMessage(loginResponse.message);
            goToPage('home')
        }

    },[loginResponse, goToPage, msg, setUser, addServerMessage])
    
    
    return(
        <Store.Provider value={{
            data, setCreateData, setEditData, setDeleteData, lastUpdate,
            file, readFile, removeFile, setFile,
            messages, msg, addServerMessage,
            displayPage, goToPage, pageSlug,
            setLoginRequest, user,
            show, showApprove, balance, hideApprove, doApprove, setModalApproveId
        }}>
            {children}
        </Store.Provider>
    )
}