import React from "react";
import "../styles/globals.css";

import merge from "lodash/merge";
import "@rainbow-me/rainbowkit/styles.css";

import {
    getDefaultWallets,
    RainbowKitProvider,
    darkTheme,
    midnightTheme,
} from "@rainbow-me/rainbowkit";

import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { infuraProvider } from "wagmi/providers/infura";

const INFURA_API_KEY = process.env.NEXT_PUBLIC_INFURA_API_KEY;

const { chains, provider } = configureChains(
    [chain.polygonMumbai],
    [
        infuraProvider({
            apiKey: INFURA_API_KEY,
            priority: 1,
        }),
    ]
);

const { connectors } = getDefaultWallets({
    appName: "Dex",
    chains,
});

const wagmiClient = createClient({
    autoConnect: true,
    provider,
    connectors,
});

const myTheme = merge(midnightTheme(), {
    colors: {
        accentColor: "#18181b",
        accentColorForeground: "#fff",
    },
});

function MyApp({ Component, pageProps }) {
    return (
        <WagmiConfig client={wagmiClient}>
            <RainbowKitProvider chains={chains} theme={myTheme}>
                <Component {...pageProps} />
            </RainbowKitProvider>
        </WagmiConfig>
    );
}

export default MyApp;
