// app/components/WalletControl.js

import React from "react";
import axios from "axios";
import baseUrl from "@/data/accounts";
import { useMutation } from "react-query";

const freezeWallet = async (id) => {
  await axios.post(`${baseUrl}/user/wallet/freeze/${id}`);
};

const unfreezeWallet = async (id) => {
  await axios.post(`${baseUrl}/user/wallet/unfreeze/${id}`);
};

const WalletControl = ({ walletId, status }) => {
  const { mutate: freeze } = useMutation(freezeWallet);
  const { mutate: unfreeze } = useMutation(unfreezeWallet);

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold">Wallet Control</h2>
      <p>Wallet ID: {walletId}</p>
      <p>Status: {status}</p>
      {status === "frozen" ? (
        <button
          className="bg-green-500 text-white px-4 py-2 rounded"
          onClick={() => unfreeze(walletId)}
        >
          Unfreeze Wallet
        </button>
      ) : (
        <button
          className="bg-red-500 text-white px-4 py-2 rounded"
          onClick={() => freeze(walletId)}
        >
          Freeze Wallet
        </button>
      )}
    </div>
  );
};

export default WalletControl;
