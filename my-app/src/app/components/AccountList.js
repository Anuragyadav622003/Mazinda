import React from "react";
import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "react-query";

import baseUrl from "@/data/accounts";

const fetchAccounts = async () => {
  const { data } = await axios.get(`${baseUrl}/user/accounts/list`);
  return data;
};

const activateAccount = async (id) => {
  await axios.post(`${baseUrl}/user/accounts/activate/${id}`);
};

const deactivateAccount = async (id) => {
  await axios.post(`${baseUrl}/user/accounts/deactivate/${id}`);
};

const AccountList = () => {
  const queryClient = useQueryClient(); // To access the query cache

  // Fetch accounts
  const { data: accounts, isLoading, error } = useQuery("accounts", fetchAccounts);

  // Activate mutation with query invalidation
  const { mutate: activate } = useMutation(activateAccount, {
    onSuccess: () => {
      queryClient.invalidateQueries("accounts"); // Refetch accounts
    },
  });

  // Deactivate mutation with query invalidation
  const { mutate: deactivate } = useMutation(deactivateAccount, {
    onSuccess: () => {
      queryClient.invalidateQueries("accounts"); // Refetch accounts
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading accounts: {error.message}</div>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold">Accounts</h2>
      <table className="min-w-full mt-4">
        <thead>
          <tr>
            <th className="border px-4 py-2">Username</th>
            <th className="border px-4 py-2">Status</th>
            <th className="border px-4 py-2">Wallet Status</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {accounts.map((account) => (
            <tr key={account.id}>
              <td className="border px-4 py-2 text-center">{account.username}</td>
              {account.status ? (
                <td className="border px-4 py-2 text-green-600 text-center">Active</td>
              ) : (
                <td className="border px-4 py-2 text-red-600 text-center">Inactive</td>
              )}
              <td className="border px-4 py-2 text-center">{account.walletStatus}</td>
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AccountList;
