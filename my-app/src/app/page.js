// app/admin/page.js
"use client"
import AccountList from "./components/AccountList";

import AccountControl from "./components/AccountControl";

export default function AdminPanel() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold">Admin Panel</h1>
      <AccountList />
      {/* Example usage for Wallet and Account Controls */}
      {/* <AccountControl accountId="12345" />  */}
    </div>
  );
}
