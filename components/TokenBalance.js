import React, { useEffect, useRef, useState } from "react";
import { ethers } from "ethers";
import toast, { Toaster } from "react-hot-toast";
import { ClipboardCheckIcon, ClipboardIcon } from "@heroicons/react/outline";

import TransactionStatus from "./TransactionStatus";
import { getTokenBalance, getTokenAddress } from "../utils/context";

const TokenBalance = ({ name, walletAddress }) => {
    const [balance, setBalance] = useState(0);
    const [tokenAddress, setTokenAddress] = useState("");
    const [copyIcon, setCopyIcon] = useState({ icon: ClipboardIcon });
    const [txPending, setTxPending] = useState(false);

    const notifyError = (message) => toast.error(message, { duration: 6000 });
    const notifySuccess = (message) => toast.success("Transaction completed!", { duration: 6000 });

    useEffect(() => {
        if (name && walletAddress) {
            fetchTokenBalance();
            fetchTokenAddress();
        } else setBalance(0);
    }, [name, walletAddress]);

    async function fetchTokenBalance() {
        const bal = await getTokenBalance(name, walletAddress);
        const fBal = ethers.utils.formatUnits(bal.toString(), 18);
        setBalance(fBal.toString());
    }

    async function fetchTokenAddress() {
        const address = await getTokenAddress(name);
        setTokenAddress(address);
    }

    return (
        <div className="flex mx-2 border-[1px] rounded-l rounded-r-lg border-[#7765F3]">
            <div className="flex item-center bg-zinc-900 text-zinc-300 w-fit p-2 px-3 rounded-l-lg">
                <p className="text-sm">{name}</p>
                <p className="bg-zinc-800 p-0.5 px-3 ml-3 rounded-lg text-zinc-100">{balance}</p>
            </div>

            <div className="flex item-center p-2 px-2 bg-[#7765F3] rounded-r-lg">
                <copyIcon.icon
                    className="h-6 cursor-pointer"
                    onClick={() => {
                        navigator.clipboard.writeText(tokenAddress);
                        setCopyIcon({ icon: ClipboardCheckIcon });
                    }}
                />
            </div>

            {txPending && <TransactionStatus />}

            <Toaster />
        </div>
    );
};

export default TokenBalance;
