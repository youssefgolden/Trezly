type StatCardType = {
    name: string;
    value: number;
}

export default function StatCard({ name, value }: StatCardType) {
    return (
            <div className="bg-white p-4 shadow rounded-lg text-center">
                <h4 className="text-sm text-gray-500">{name}</h4>
                <p className="text-2xl font-semibold text-green-600 flex items-baseline justify-center space-x-1">
                    <span>{value}</span>
                    <span className="text-sm">€</span>
                </p>
            </div>
    )
}