// app/api/wallets/unfreeze/[id].js
export async function POST(req, { params }) {
    const { id } = params;
    
    // Logic to unfreeze the wallet (replace with actual DB query)
    
    return new Response(JSON.stringify({ message: `Wallet ${id} unfrozen` }), {
      status: 200,
    });
  }
  