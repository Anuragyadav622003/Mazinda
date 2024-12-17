// app/api/accounts/activate/[id].js
export async function POST(req, { params }) {
    const { id } = params;
    
    // Logic to activate or deactivate the account (replace with DB query)
    // Example: Updating account status in the DB
    
    return new Response(JSON.stringify({ message: `Account ${id} updated` }), {
      status: 200,
    });
  }
  