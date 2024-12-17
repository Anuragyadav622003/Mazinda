import React from "react";
import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "react-query";

import baseUrl from "@/data/accounts";

// Fetch accounts
const fetchAccounts = async () => {
  const { data } = await axios.get(`${baseUrl}/user/accounts/list`);
  return data;
};

// API endpoints
const activateAccount = async (id) => {
  await axios.post(`${baseUrl}/user/accounts/activate/${id}`);
};

const deactivateAccount = async (id) => {
  await axios.post(`${baseUrl}/user/accounts/deactivate/${id}`);
};

const toggleWalletStatus = async (id, currentStatus) => {
  const endpoint = currentStatus === "UNFROZEN" ? "freeze" : "unfreeze";
  await axios.post(`${baseUrl}/user/wallet/${endpoint}/${id}`);
};

const AccountList = () => {
  const queryClient = useQueryClient();

  // Fetch accounts
  const { data: accounts, isLoading, error } = useQuery("accounts", fetchAccounts);

  // Activate mutation
  const { mutate: activate } = useMutation(activateAccount, {
    onSuccess: () => queryClient.invalidateQueries("accounts"),
  });

  // Deactivate mutation
  const { mutate: deactivate } = useMutation(deactivateAccount, {
    onSuccess: () => queryClient.invalidateQueries("accounts"),
  });

  // Toggle wallet mutation
  const { mutate: toggleWallet } = useMutation(({ id, walletStatus }) =>
    toggleWalletStatus(id, walletStatus), {
    onSuccess: () => queryClient.invalidateQueries("accounts"),
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading accounts: {error.message}</div>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Accounts</h2>
      <table className="min-w-full border">
        <thead>
          <tr>
            <th className="border px-4 py-2">Username</th>
            <th className="border px-4 py-2">Status</th>
            <th className="border px-4 py-2">Actions</th>
            <th className="border px-4 py-2">Wallet Status</th>
            <th className="border px-4 py-2">Wallet Action</th>
          </tr>
        </thead>
        <tbody>
          {accounts.map((account) => (
            <tr key={account.id}>
              <td className="border px-4 py-2 text-center">{account.username}</td>
              
              {/* Status */}
              <td className="border px-4 py-2 text-center">
                {account.status ? (
                  <span className="text-green-600">Active</span>
                ) : (
                  <span className="text-red-600">Inactive</span>
                )}
              </td>

              {/* Activate/Deactivate Button */}
              <td className="border px-4 py-2 text-center">
                {account.status ? (
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded"
                    onClick={() => deactivate(account.id)}
                  >
                    Deactivate
                  </button>
                ) : (
                  <button
                    className="bg-green-500 text-white px-4 py-2 rounded"
                    onClick={() => activate(account.id)}
                  >
                    Activate
                  </button>
                )}
              </td>

              {/* Wallet Status */}
              <td className="border px-4 py-2 text-center">
                {account.walletStatus === "UNFROZEN" ? (
                  <span className="text-green-600">UNFROZEN</span>
                ) : (
                  <span className="text-red-600">FROZEN</span>
                )}
              </td>

              {/* Wallet Toggle Button */}
              <td className="border px-4 py-2 text-center">
                {account.walletStatus === "UNFROZEN" ? (
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded"
                    onClick={() => toggleWallet({ id: account.id, walletStatus: account.walletStatus })}
                  >
                    Freeze
                  </button>
                ) : (
                  <button
                    className="bg-green-500 text-white px-4 py-2 rounded"
                    onClick={() => toggleWallet({ id: account.id, walletStatus: account.walletStatus })}
                  >
                    Unfreeze
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AccountList;
