// app/components/AccountControl.js
import React from "react";
import axios from "axios";

const resetPassword = async (id) => {
  await axios.post(`/api/accounts/reset-password/${id}`);
};

const AccountControl = ({ accountId }) => {
  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold">Account Control</h2>
      <button
        className="bg-yellow-500 text-white px-4 py-2 rounded"
        onClick={() => resetPassword(accountId)}
      >
        Reset Password
      </button>
    </div>
  );
};

export default AccountControl;
