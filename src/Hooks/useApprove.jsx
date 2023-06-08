import { useState } from "react";

export default function useApprove() {
    const [balance, setBalance] = useState(null);
    const [show, setShow] = useState(false);

    const showApprove = () => setShow(true);
    const hideApprove = () => setShow(false);
    const setModalApproveId = (id) => setBalance(id);

    const doApprove = () => {
        setBalance(null);
        setShow(false);
    }

    return [show, showApprove, balance, hideApprove, doApprove, setModalApproveId];
}