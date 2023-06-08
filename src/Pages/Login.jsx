import { useContext, useState } from "react";
import { Store } from "../Store";

export default function Login() {

    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const { setLoginRequest } = useContext(Store);

    const doLogin = _ => {
        setLoginRequest({
            action: "login",
            email,
            pass
        });

        setEmail('');
        setPass('');

    }
    
    return (
        <div className="container">
            
                
                <div className="d-flex justify-content-center">
                    <div className="card">
                        <h5 className="card-header">Prisijungimas prie banko</h5>
                        <div className="card-body">
                            <div className="mb-3">
                                <label className="form-label">El. paštas:</label>
                                <input type="email" className="form-control" value={email} onChange={e => setEmail(e.target.value)} />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Slaptažodis:</label>
                                <input type="password" className="form-control" value={pass} onChange={e => setPass(e.target.value)} />
                            </div>
                            <button type="button" className="btn btn-dark" onClick={doLogin}>Prisijungti</button>
                        </div>
                    </div>
                </div>
            
        </div>
    )
    
}