import React, { useEffect, useState } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import toast, { Toaster } from "react-hot-toast";

import { Logo, Menu, TokenBalance } from "./";
import { set } from "lodash";

const Header = () => {
    const [tokenBalComp, setTokenBalComp] = useState(null);
    const { address } = useAccount();

    const notifyConnectWallet = () =>
        toast.error("Please connect your wallet first!", { duration: 6000 });

    useEffect(() => {
        setTokenBalComp(
            <>
                <TokenBalance name="USD Coin" walletAddress={address} />
                <TokenBalance name="Wrapped Ether" walletAddress={address} />
                <TokenBalance name="SHIBA INU" walletAddress={address} />
            </>
        );
        if (!address) notifyConnectWallet();
    }, [address]);

    return (
        <div className="p-4 text-gray-100">
            <div className="container flex justify-between h-16 mx-auto">
                <div className="flex">
                    <a
                        rel="noopener noreferrer"
                        href="#"
                        aria-label="Back to Homepage"
                        className="flex items-center p-2"
                    >
                        <Logo />
                    </a>
                    <ul className="items-stretch hidden space-x-3 lg:flex">
                        <li className="flex">
                            <a
                                rel="noopener noreferrer"
                                href="/"
                                className="flex items-center px-4 -mb-1 dark:border-transparent"
                            >
                                Swap
                            </a>
                        </li>
                        <li className="flex">
                            <a
                                rel="noopener noreferrer"
                                href="/"
                                className="flex items-center px-4 -mb-1 dark:border-transparent"
                            >
                                NFTs
                            </a>
                        </li>
                        <li className="flex">
                            <a
                                rel="noopener noreferrer"
                                href="/"
                                className="flex items-center px-4 -mb-1 dark:border-transparent"
                            >
                                Pool
                            </a>
                        </li>
                    </ul>
                </div>

                <div className="items-center flex-shrink-0 hidden lg:flex">
                    <TokenBalance name="USD Coin" walletAddress={address} />
                    <TokenBalance name="SHIBA INU" walletAddress={address} />
                    <ConnectButton />
                </div>
                <button className="p-4 lg:hidden">
                    <Menu />
                </button>
            </div>
            <Toaster />
        </div>
    );
};

export default Header;
