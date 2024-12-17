// app/components/AccountList.js

import React from "react";
import axios from "axios";
import { useQuery, useMutation } from "react-query";

const fetchAccounts = async () => {
  const { data } = await axios.get("http://localhost:5000/api/accounts/list");
  console.log(data);
  return data;
};

const activateAccount = async (id) => {
  await axios.post(`/api/accounts/activate/${id}`);
};

const deactivateAccount = async (id) => {
  await axios.post(`/api/accounts/deactivate/${id}`);
};

const AccountList = () => {
  const { data: accounts, isLoading, error } = useQuery("accounts", fetchAccounts);
  const { mutate: activate } = useMutation(activateAccount);
  const { mutate: deactivate } = useMutation(deactivateAccount);

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
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {accounts.map((account) => (
            <tr key={account.id}>
              <td className="border px-4 py-2">{account.username}</td>
              <td className="border px-4 py-2">{account.status}</td>
              <td className="border px-4 py-2">
                {account.status === "active" ? (
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
