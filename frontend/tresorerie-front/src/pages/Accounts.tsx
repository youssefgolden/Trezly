import AccountCard from './../components/AccountCard'

const accounts = [
  {
    id: 1,
    name: "Compte courant",
    type: "checking",
    balance: 1500.25
  },
  {
    id: 2,
    name: "Livret A",
    type: "savings",
    balance: 3000
  },
  {
    id: 3,
    name: "Compte professionnel",
    type: "business",
    balance: 12000.42
  }
];


export default function Accounts() {
  return <div>

    <div className="min-h-screen bg-white p-6">
      <h1 className="text-3xl font-semibold mb-8 text-gray-800">Current Accounts</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        <div className="bg-white rounded-2xl shadow p-6 hover:shadow-lg transition">

          {
            accounts.map(account => (
              <AccountCard
                key={account.id}
                name={account.name}
                balance={account.balance}
                type={account.type}
              />
            ))
          }

        </div>
      </div>
    </div>



  </div>
}