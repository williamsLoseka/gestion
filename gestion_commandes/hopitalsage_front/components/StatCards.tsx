import { Card, CardContent } from "@/components/ui/card"

export default function StatCards() {
  const stats = [
    { title: 'Patients registered', value: 2945, bg: 'bg-[#006B5D]', icon: '👤' },
    { title: 'Messages today', value: 31, bg: 'bg-[#D99B6C]', icon: '💬' },
    { title: 'This month', value: '7,27', bg: 'bg-[#006B5D]', icon: '📅' },
    { title: 'Total months', value: 1618, bg: 'bg-[#D99B6C]', icon: '📦' },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, idx) => (
        <Card key={idx} className="bg-white rounded-xl shadow-md">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className={`text-white rounded-full p-2 text-xl ${stat.bg}`}>
                {stat.icon}
              </div>
              <h3 className="text-md font-semibold text-gray-700">{stat.title}</h3>
            </div>
            <p className="text-3xl font-bold text-[#006B5D]">{stat.value}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
