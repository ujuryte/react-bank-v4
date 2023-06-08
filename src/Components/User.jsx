import { useContext } from "react";
import Link from "./Link";
import { Store } from "../Store";

export default function User() {

    const { user, setLoginRequest } = useContext(Store);

    const logout = _ => {
        setLoginRequest(
            { action: 'logout', id: user.id }
        )
    }

    return (
        <div className="user">
            {
                user
                    ? <div className="user-logged">
                        <button type="button" className="login" onClick={logout}>Atsijungti,</button>
                        <span>{user.email}</span>
                    </div>
                    : <div className="user-not-logged">
                        <Link className="login" to="login">Prisijungti</Link>
                    </div>
            }

        </div>
    )
}