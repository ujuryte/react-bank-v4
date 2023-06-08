import User from "./User";
import { bank } from './Icon';
import Link from "./Link";
import { useContext } from "react";
import { Store } from "../Store";

export default function NavBar() {

    const { user } = useContext(Store);

    return (
        <>
            <div className='title'>
                <div>{bank}</div>
                <h2 >Bankas ver. 4</h2>
            </div>
            <div>
                <ul className="nav justify-content-center">
                    <li className="nav-item">
                        <Link className="nav-link" to="home">Pagrindinis</Link>
                    </li>
                    {
                        user && user.role === 'admin'
                            ? <li className="nav-item">
                                <Link className="nav-link" to="admin">Admin</Link>
                            </li>
                            : null
                    }

                    <li className="nav-item">
                        <User />
                    </li>

                </ul>
            </div>

        </>

    )
}