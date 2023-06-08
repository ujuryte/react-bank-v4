import { useContext, useState } from "react";
import { Store } from "../Store";
export default function Edit({ c, setEditData, setDeleteData, msg }) {
 
  const [diffBalance, setDiffBalance] = useState('');

  const {showApprove, setModalApproveId} = useContext(Store);
  
  const [isBlocked, setIsBlocked] = useState(false);

  const toggleAccountStatus = () => {
    if (isBlocked) {
      setIsBlocked(false);
      msg('Sąskaita atblokuota!', 'alert-success');
    } else {
      setIsBlocked(true);
      msg('Sąskaita užblokuota!', 'alert-warning');
    }
  };
  
  const onBalanceInputChange = (e) => {
    setDiffBalance(Number(e.target.value));
  };
  
  const addToBalance = () => {
    if(diffBalance >= 1000) {
      showApprove();
      setModalApproveId(c.id)
    }
    else if (diffBalance > 0) {
      setEditData({ ...c, balance: c.balance + diffBalance });
      msg('Vartotojui sėkmingai pridėtos lėšos!', 'alert-success');
    } 
      setDiffBalance('')
    
    
  };

  const deductBalance = () => {
    if (diffBalance <= c.balance) {
        setEditData({ ...c, balance: c.balance - diffBalance });
        msg('Vartotojui sėkmingai nuskaičiuotos lėšos!', 'alert-success');
    } else {
        msg('Vartotojui neužtenka lėšų.', 'alert-danger');
        return
    }
    setDiffBalance('')
  }

  const destroy = _ => {
    if(c.balance > 0){
        msg('Negalima ištrinti turtingo vartotojo.', 'alert-danger');
        return
    }
    
    setDeleteData(c)
    msg('Vartotojas sėkmingai ištrintas!', 'alert-success');
  }


  

  return (
    <>
      <td>
        <div className="input-group">
          <span className="input-group-text">$</span>
          
          <input type="number" value={diffBalance} onChange={onBalanceInputChange} required min={0} className="form-control arrows" disabled={isBlocked}/>
        </div>
      </td>
      <td>
        <button onClick={addToBalance} className="btn btn-success" disabled={isBlocked}>
          Pridėti lėšas
        </button>
      </td>
      <td>
        <button className="btn btn-warning" onClick={deductBalance} disabled={isBlocked}>Nuskaičiuoti lėšas</button>
      </td>
      <td>
        <button className="btn btn-danger" onClick={destroy} disabled={isBlocked}>Ištrinti sąskaitą</button>
      </td>
      <td>
      <button className={isBlocked ?"btn btn-primary" :"btn btn-dark"} onClick={toggleAccountStatus}>
  {isBlocked ? "Atblokuoti sąskaitą" : "Užblokuoti sąskaitą"}
</button>
      </td>
    </>
  );
}