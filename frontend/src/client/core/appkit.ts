// /src/client/core/appkit.ts
import { createAppKit } from '@reown/appkit/react';
import { mainnet, arbitrum } from '@reown/appkit/networks';
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi';
import { QueryClient } from '@tanstack/react-query';

// Replace with your actual project ID from the Reown Cloud Dashboard
const projectId = '8afd56846ecf625fdeab0de184097fb7';

// Optional metadata for your app
const metadata = {
  name: 'Luxury Verse',
  description: 'Luxury Verse is a Web3 luxury lifestyle platform that connects users with exclusive luxury brands and experiences.',
  url: 'https://iconluxury.today',
  icons: ['https://myapp.com/icon.png']
};

// Initialize QueryClient for TanStack Query
const queryClient = new QueryClient();

// Create the Wagmi adapter
const wagmiAdapter = new WagmiAdapter({
  networks: [mainnet, arbitrum], // Specify your supported networks
  projectId
});

// Initialize AppKit
createAppKit({
  adapters: [wagmiAdapter],
  networks: [mainnet, arbitrum],
  metadata,
  projectId,
  features: {
    analytics: true // Enable analytics (optional)
  }
});

// Export for use in your app
export const wagmiConfig = wagmiAdapter.wagmiConfig;
export { queryClient };