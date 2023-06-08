import { useState } from "react"
import Edit from "./Edit"


export default function Clients({ data, setCreateData, setEditData, setDeleteData, msg, file }) {

    const [filter, setFilter] = useState("all");
    const [sortColumn, setSortColumn] = useState(null);
    const [sortOrder, setSortOrder] = useState("asc");

    if (null === data) {
        return (
            <h2>LOADING....</h2>
        )
    }

    const filteredData = data.filter((c) => {
        if (filter === "zero") {
            return c.balance === 0
        } else if (filter === "non-zero") {
            return c.balance !== 0
        } else {
            return true
        }
    })

    const sortedData = [...filteredData].sort((a, b) => {
        if (sortColumn === "Vardas") {
            return sortOrder === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
        } else if (sortColumn === "Pavardė") {
            return sortOrder === "asc" ? a.surname.localeCompare(b.surname) : b.surname.localeCompare(a.surname);
        } else if (sortColumn === "Sąskaitos likutis") {
            return sortOrder === "asc" ? a.balance - b.balance : b.balance - a.balance;
        } else {
            return 0;
        }
    });

    const handleSortColumn = (column) => {
        if (sortColumn === column) {
            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
        } else {
            setSortColumn(column);
            setSortOrder("asc");
        }
    };

    const decreaseAllBalances = () => {
        const updatedData = sortedData.map((item) => {
            return {
                ...item,
                balance: parseInt(item.balance) - 5,
            };
        });
        
        setEditData(updatedData);
        msg("Visoms sąskaitoms pritaikyti mokesčiai!", "alert-info");
    };


    return (
        <div className="container mt-5 list">
            <h2>Vartotojų sąskaitos</h2>
            <div className="filter">
                <h4 onClick={() => setFilter("zero")}>Tuščios sąskaitos</h4>
                <h4 onClick={() => setFilter("non-zero")}>Sąskaitos su likučiu</h4>
                <h4 onClick={() => setFilter("all")}>Visos sąskaitos</h4>
            </div>
            <table className="table">
                <thead>
                    <tr>
                        <th>Dokumento kopija</th>
                        <th className="sorting" onClick={() => handleSortColumn("Vardas")}>Vardas</th>
                        <th className="sorting" onClick={() => handleSortColumn("Pavardė")}>Pavardė</th>
                        <th className="sorting" onClick={() => handleSortColumn("Sąskaitos likutis")}>Sąskaitos likutis</th>
                        <th>Suma</th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {sortedData.map((c) => (
                        <tr key={c.id}>
                            <td>
                                <img src={c.photo} alt='pass'></img>
                                
                            </td>
                            <td>{c.name}</td>
                            <td>{c.surname}</td>
                            <td>{(c.balance).toFixed(2)}</td>

                            <Edit c={c} setEditData={setEditData} setDeleteData={setDeleteData} msg={msg} />
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="bottom">
                <button className="btn btn-danger" onClick={decreaseAllBalances}>Mokesčiai</button>
            </div>
        </div>
    )
}