import { useCallback, useState } from "react";
import Main from "../Pages/Main";
import Admin from "../Pages/Admin";
import Error from "../Pages/Error";
import Login from "../Pages/Login";


export default function useRoute() {

    const [displayPage, setDisplayPage] = useState(<Main />);
    const [pageSlug, setPageSlug] = useState('home');

    const goToPage = useCallback(page => {
        switch (page) {
            case 'home': setDisplayPage(<Main />);
                break;

            case 'admin': setDisplayPage(<Admin />);
                break;

            case 'login': setDisplayPage(<Login />);
                break;
           
            default: setDisplayPage(<Error />)
        }

        setPageSlug(page);


    }, [])

    return [displayPage, goToPage, pageSlug];
}