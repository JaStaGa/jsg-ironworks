"use client"
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer } from "recharts"

export default function ResultTile({ title, delta, data }: {
    title: string; delta: string; data: { w: string; v: number }[]
}) {
    return (
        <div className="card p-3">
            <div className="flex items-baseline justify-between">
                <div className="text-sm font-medium">{title}</div>
                <div className="num text-safety text-sm">{delta}</div>
            </div>
            <div className="h-24 mt-2">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data}>
                        <defs>
                            <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#ff7a00" stopOpacity={0.8} />
                                <stop offset="100%" stopColor="#ff7a00" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <XAxis dataKey="w" hide />
                        <YAxis hide />
                        <Area type="monotone" dataKey="v" stroke="#ff7a00" fill="url(#g)" strokeWidth={2} />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}
