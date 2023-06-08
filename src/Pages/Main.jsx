import { useContext } from "react";
import Stat from "../Components/Stat";
import { Store } from "../Store";

export default function Main() {

    const { data } = useContext(Store);

    return (
        <div className="main-page">
            <h2>Sveiki atvykę į banką!</h2>
            <h3>Dabartinė mūsų statistika:</h3>
            <Stat data={data} />
        </div>

    )
}