export default function DashboardHome() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-8">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { title: 'Total Revenue', value: '$12,345', change: '+12%', color: 'from-blue-500 to-blue-600' },
          { title: 'Active Users', value: '1,234', change: '+5%', color: 'from-purple-500 to-purple-600' },
          { title: 'Products Sold', value: '567', change: '+8%', color: 'from-emerald-500 to-emerald-600' },
          { title: 'Active Coupons', value: '12', change: '-2%', color: 'from-orange-500 to-orange-600' },
        ].map((stat, i) => (
          <div key={i} className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
            <h3 className="text-zinc-400 text-sm font-medium mb-1">{stat.title}</h3>
            <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-white">{stat.value}</span>
                <span className={`text-xs font-medium ${stat.change.startsWith('+') ? 'text-emerald-400' : 'text-red-400'}`}>
                    {stat.change}
                </span>
            </div>
            <div className={`mt-4 h-1 w-full rounded-full bg-linear-to-r ${stat.color} opacity-80`}></div>
          </div>
        ))}
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
        <h2 className="text-lg font-bold text-white mb-4">Recent Activity</h2>
        <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-center justify-between py-3 border-b border-zinc-800 last:border-0">
                    <div className="flex items-center gap-4">
                        <div className="h-8 w-8 rounded-full bg-zinc-800 flex items-center justify-center text-xs font-medium text-zinc-400">
                           {String.fromCharCode(65 + i)}
                        </div>
                        <div>
                            <p className="text-sm font-medium text-white">New purchase by User #{1000 + i}</p>
                            <p className="text-xs text-zinc-500">2 minutes ago</p>
                        </div>
                    </div>
                    <span className="text-sm font-medium text-zinc-300">$49.00</span>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
}
