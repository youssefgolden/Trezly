type AccountDataType = {
    name: string;
    balance: number;
    type: string;

}

export default function AccountCard({ name, balance, type }: AccountDataType) {
    return <div>
        <div className="mb-4">
            <h2 className="text-xl font-medium text-gray-900">Account Name: {name}</h2>
            <p className="text-sm text-gray-500">Balance: {balance}</p>
            <p className="text-sm text-gray-500">Type: {type}</p>
        </div>
    </div>
}