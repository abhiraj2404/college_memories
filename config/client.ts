import { createThirdwebClient } from "thirdweb";
import { arbitrumSepolia } from "thirdweb/chains";
import { inAppWallet } from "thirdweb/wallets";

// Replace this with your client ID string
// refer to https://portal.thirdweb.com/typescript/v5/client on how to get a client ID
const clientId = "04b6b23f2438f7e65aa70f7d9cab282b";
const chain = arbitrumSepolia;
const client = createThirdwebClient({
  clientId: clientId,
});

const wallets = [
  inAppWallet({
    smartAccount: {
      chain: chain,
      sponsorGas: true,
    },
  }),
];
export { client, chain, wallets };