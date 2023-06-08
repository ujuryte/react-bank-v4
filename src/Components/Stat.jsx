export default function Stat({ data }) {

    if (null === data) {
        return (
            <h2>LOADING....</h2>
        )
    }

    return (
        <div className="stat mt-2">
            <div className="stats">
                
                <table className="table">
                    <thead>
                        <tr>
                            <th>Klientų skaičius:</th>
                            <th>Bendra pinigų suma:</th>
                        </tr>
                    </thead>
                    <tbody>

                        <tr className="cl-number">
                            <td>{data.length ? data.length : 0}</td>
                            <td>{data.reduce((acc, curr) => acc + curr.balance, 0).toFixed(2)}</td>
                        </tr>

                    </tbody>
                </table>
            </div>

        </div>
    )
}