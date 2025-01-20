import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { WagmiConfig } from "wagmi";
import { createWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi';
import { mainnet, sepolia } from 'viem/chains';
import Index from "./pages/Index";

const queryClient = new QueryClient();

// Initialize Web3Modal
const projectId = import.meta.env.VITE_WALLET_CONNECT;

if (!projectId) {
  throw new Error('VITE_WALLET_CONNECT environment variable is not set');
}

const metadata = {
  name: 'DeChat',
  description: 'Decentralized Messaging Application',
  url: window.location.host,
  icons: ['https://avatars.githubusercontent.com/u/37784886']
};

const chains = [mainnet, sepolia] as const;
const wagmiConfig = defaultWagmiConfig({ 
  chains, 
  projectId, 
  metadata 
});

createWeb3Modal({ wagmiConfig, projectId, defaultChain: mainnet });

const App = () => (
  <WagmiConfig config={wagmiConfig}>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </WagmiConfig>
);

export default App;