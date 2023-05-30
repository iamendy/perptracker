// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Moralis from "moralis";
import { EvmChain } from "@moralisweb3/evm-utils";

export default async function handler(req, res) {
  Moralis.start({
    apiKey:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6ImRmODBiOWIxLTlkNGItNDFmMi04MjFlLTM1YmZhNTY0NWQ0MiIsIm9yZ0lkIjoiMTY1NzE0IiwidXNlcklkIjoiMTY1MzgyIiwidHlwZUlkIjoiMjFlNWRhNjQtZGMwYS00NmE4LTk4ZDMtYTMxNDUzODE2NWRhIiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE2ODQ4MTAzNDYsImV4cCI6NDg0MDU3MDM0Nn0.oLU-A-nZlZ4hv0AgVI9w1grnDbaJaaE8Hd0ZkPeL7_c",
  });

  const stream = {
    chains: [EvmChain.SEPOLIA], // list of blockchains to monitor
    description: "Monitor Piggy Tokens", // Your description
    tag: "Piggy", // Give it a tag
    webhookUrl: "https://c69b-197-210-226-138.ngrok-free.app/api/listen", //webhook url to receive events,
    //includeNativeTxs: true,
  };

  const newStream = await Moralis.Streams.add(stream);
  const { id } = newStream.toJSON(); // { id: 'YOUR_STREAM_ID', ...newStream }

  // Now we attach Piggy Token to the stream
  const address = "0x3EbD74B4605b2e77034C10A5d8D157Cb9BdEa225";

  await Moralis.Streams.addAddress({ address, id });

  res.status(200).json({ message: "Stream started" });
}
