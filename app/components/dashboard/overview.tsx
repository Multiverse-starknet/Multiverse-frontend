"use client"

import { Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const assetData = [
  { month: "Jan", "Real Estate": 1200000, "Carbon Credits": 350000, Invoices: 180000, "Luxury Goods": 90000 },
  { month: "Feb", "Real Estate": 1350000, "Carbon Credits": 420000, Invoices: 210000, "Luxury Goods": 110000 },
  { month: "Mar", "Real Estate": 1500000, "Carbon Credits": 380000, Invoices: 250000, "Luxury Goods": 130000 },
  { month: "Apr", "Real Estate": 1650000, "Carbon Credits": 450000, Invoices: 220000, "Luxury Goods": 150000 },
  { month: "May", "Real Estate": 1800000, "Carbon Credits": 500000, Invoices: 280000, "Luxury Goods": 170000 },
  { month: "Jun", "Real Estate": 2000000, "Carbon Credits": 550000, Invoices: 320000, "Luxury Goods": 200000 },
]

const activityData = [
  { date: "2024-01-01", verifications: 5, tokenizations: 3, listings: 2 },
  { date: "2024-01-15", verifications: 7, tokenizations: 4, listings: 3 },
  { date: "2024-02-01", verifications: 6, tokenizations: 5, listings: 4 },
  { date: "2024-02-15", verifications: 8, tokenizations: 6, listings: 5 },
  { date: "2024-03-01", verifications: 10, tokenizations: 7, listings: 6 },
  { date: "2024-03-15", verifications: 12, tokenizations: 9, listings: 8 },
]

export function Overview() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
      <Card className="col-span-4">
        <CardHeader>
          <CardTitle>Asset Value by Category</CardTitle>
          <CardDescription>Distribution of your tokenized assets by category over time.</CardDescription>
        </CardHeader>
        <CardContent className="pl-2">
          <ChartContainer
            config={{
              "Real Estate": {
                label: "Real Estate",
                color: "hsl(var(--chart-1))",
              },
              "Carbon Credits": {
                label: "Carbon Credits",
                color: "hsl(var(--chart-2))",
              },
              Invoices: {
                label: "Invoices",
                color: "hsl(var(--chart-3))",
              },
              "Luxury Goods": {
                label: "Luxury Goods",
                color: "hsl(var(--chart-4))",
              },
            }}
            className="aspect-[4/3]"
          >
            <BarChart
              data={assetData}
              margin={{
                top: 16,
                right: 16,
                bottom: 16,
                left: 24,
              }}
              stackOffset="expand"
              barSize={20}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="month" tickLine={false} axisLine={false} />
              <YAxis tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`} tickLine={false} axisLine={false} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="Real Estate" stackId="a" fill="var(--color-Real Estate)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Carbon Credits" stackId="a" fill="var(--color-Carbon Credits)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Invoices" stackId="a" fill="var(--color-Invoices)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Luxury Goods" stackId="a" fill="var(--color-Luxury Goods)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
      <Card className="col-span-3">
        <CardHeader>
          <CardTitle>Activity Trends</CardTitle>
          <CardDescription>Your platform activity over the last 6 months.</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              data={activityData}
              margin={{
                top: 5,
                right: 10,
                left: 10,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="date"
                tickFormatter={(value) => {
                  const date = new Date(value)
                  return `${date.toLocaleString("default", { month: "short" })} ${date.getDate()}`
                }}
                tickLine={false}
                axisLine={false}
              />
              <YAxis tickLine={false} axisLine={false} />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="rounded-lg border bg-background p-2 shadow-sm">
                        <div className="grid grid-cols-2 gap-2">
                          {payload.map((entry) => (
                            <div key={entry.name} className="flex items-center gap-1">
                              <div className="h-2 w-2 rounded-full" style={{ backgroundColor: entry.color }} />
                              <span className="text-xs font-medium capitalize">
                                {entry.name}: {entry.value}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )
                  }
                  return null
                }}
              />
              <Line
                type="monotone"
                dataKey="verifications"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
              <Line
                type="monotone"
                dataKey="tokenizations"
                stroke="hsl(var(--chart-2))"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
              <Line
                type="monotone"
                dataKey="listings"
                stroke="hsl(var(--chart-3))"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}
