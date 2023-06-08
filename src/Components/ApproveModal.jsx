import { useContext, useEffect, useState } from 'react';
import { Store } from '../Store';

export default function ApproveModal() {
  const [opacity, setOpacity] = useState(0);
  const { show, hideApprove, doApprove } = useContext(Store);

  useEffect(() => {
    if (!show) {
      setOpacity(0);
      return;
    }

    setOpacity(1);
  }, [show]);

  const handleApprove = () => {
    doApprove();
  };

  const handleReject = () => {
    hideApprove();
  };

  if (!show) {
    return null;
  }

  return (
    <div className="approve-modal" style={{ opacity }}>
      <div className="approve-modal-body">
        <div className="approve-modal-title">Suma, kurią norite pridėti, viršija 1000$!</div>
        <div className="approve-modal-text">Prašome patvirtinti:</div>
        <div className="approve-modal-bottom">
          <button onClick={handleApprove}>Sutinku</button>
          <button onClick={handleReject}>Atmesti</button>
        </div>
      </div>
    </div>
  );
}
