"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/app/components/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select"

export const description = "An interactive area chart"

const chartData = [
  // 90 days of revenue data
  { date: "2024-04-01", regular: 1200, smart: 1450 },
  { date: "2024-04-02", regular: 1350, smart: 1620 },
  { date: "2024-04-03", regular: 1100, smart: 1380 },
  { date: "2024-04-04", regular: 1250, smart: 1520 },
  { date: "2024-04-05", regular: 1400, smart: 1680 },
  { date: "2024-04-06", regular: 1600, smart: 1920 },
  { date: "2024-04-07", regular: 1300, smart: 1580 },
  { date: "2024-04-08", regular: 1450, smart: 1720 },
  { date: "2024-04-09", regular: 1150, smart: 1420 },
  { date: "2024-04-10", regular: 1380, smart: 1650 },
  { date: "2024-04-11", regular: 1520, smart: 1820 },
  { date: "2024-04-12", regular: 1280, smart: 1550 },
  { date: "2024-04-13", regular: 1420, smart: 1700 },
  { date: "2024-04-14", regular: 1180, smart: 1480 },
  { date: "2024-04-15", regular: 1350, smart: 1620 },
  { date: "2024-04-16", regular: 1480, smart: 1780 },
  { date: "2024-04-17", regular: 1220, smart: 1520 },
  { date: "2024-04-18", regular: 1380, smart: 1680 },
  { date: "2024-04-19", regular: 1550, smart: 1850 },
  { date: "2024-04-20", regular: 1320, smart: 1620 },
  { date: "2024-04-21", regular: 1450, smart: 1750 },
  { date: "2024-04-22", regular: 1280, smart: 1580 },
  { date: "2024-04-23", regular: 1420, smart: 1720 },
  { date: "2024-04-24", regular: 1580, smart: 1920 },
  { date: "2024-04-25", regular: 1350, smart: 1680 },
  { date: "2024-04-26", regular: 1480, smart: 1820 },
  { date: "2024-04-27", regular: 1620, smart: 1980 },
  { date: "2024-04-28", regular: 1380, smart: 1720 },
  { date: "2024-04-29", regular: 1520, smart: 1880 },
  { date: "2024-04-30", regular: 1680, smart: 2020 },
  { date: "2024-05-01", regular: 1450, smart: 1780 },
  { date: "2024-05-02", regular: 1580, smart: 1920 },
  { date: "2024-05-03", regular: 1320, smart: 1680 },
  { date: "2024-05-04", regular: 1480, smart: 1820 },
  { date: "2024-05-05", regular: 1620, smart: 1980 },
  { date: "2024-05-06", regular: 1380, smart: 1720 },
  { date: "2024-05-07", regular: 1520, smart: 1880 },
  { date: "2024-05-08", regular: 1680, smart: 2020 },
  { date: "2024-05-09", regular: 1450, smart: 1780 },
  { date: "2024-05-10", regular: 1580, smart: 1920 },
  { date: "2024-05-11", regular: 1720, smart: 2080 },
  { date: "2024-05-12", regular: 1480, smart: 1820 },
  { date: "2024-05-13", regular: 1620, smart: 1980 },
  { date: "2024-05-14", regular: 1780, smart: 2120 },
  { date: "2024-05-15", regular: 1520, smart: 1880 },
  { date: "2024-05-16", regular: 1680, smart: 2020 },
  { date: "2024-05-17", regular: 1820, smart: 2180 },
  { date: "2024-05-18", regular: 1580, smart: 1920 },
  { date: "2024-05-19", regular: 1720, smart: 2080 },
  { date: "2024-05-20", regular: 1880, smart: 2220 },
  { date: "2024-05-21", regular: 1620, smart: 1980 },
  { date: "2024-05-22", regular: 1780, smart: 2120 },
  { date: "2024-05-23", regular: 1920, smart: 2280 },
  { date: "2024-05-24", regular: 1680, smart: 2020 },
  { date: "2024-05-25", regular: 1820, smart: 2180 },
  { date: "2024-05-26", regular: 1980, smart: 2320 },
  { date: "2024-05-27", regular: 1720, smart: 2080 },
  { date: "2024-05-28", regular: 1880, smart: 2220 },
  { date: "2024-05-29", regular: 2020, smart: 2380 },
  { date: "2024-05-30", regular: 1780, smart: 2120 },
  { date: "2024-05-31", regular: 1920, smart: 2280 },
  { date: "2024-06-01", regular: 2080, smart: 2420 },
  { date: "2024-06-02", regular: 1820, smart: 2180 },
  { date: "2024-06-03", regular: 1980, smart: 2320 },
  { date: "2024-06-04", regular: 2120, smart: 2480 },
  { date: "2024-06-05", regular: 1880, smart: 2220 },
  { date: "2024-06-06", regular: 2020, smart: 2380 },
  { date: "2024-06-07", regular: 2180, smart: 2520 },
  { date: "2024-06-08", regular: 1920, smart: 2280 },
  { date: "2024-06-09", regular: 2080, smart: 2420 },
  { date: "2024-06-10", regular: 2220, smart: 2580 },
  { date: "2024-06-11", regular: 1980, smart: 2320 },
  { date: "2024-06-12", regular: 2120, smart: 2480 },
  { date: "2024-06-13", regular: 2280, smart: 2620 },
  { date: "2024-06-14", regular: 2020, smart: 2380 },
  { date: "2024-06-15", regular: 2180, smart: 2520 },
  { date: "2024-06-16", regular: 2320, smart: 2680 },
  { date: "2024-06-17", regular: 2080, smart: 2420 },
  { date: "2024-06-18", regular: 2220, smart: 2580 },
  { date: "2024-06-19", regular: 2380, smart: 2720 },
  { date: "2024-06-20", regular: 2120, smart: 2480 },
  { date: "2024-06-21", regular: 2280, smart: 2620 },
  { date: "2024-06-22", regular: 2420, smart: 2780 },
  { date: "2024-06-23", regular: 2180, smart: 2520 },
  { date: "2024-06-24", regular: 2320, smart: 2680 },
  { date: "2024-06-25", regular: 2480, smart: 2820 },
  { date: "2024-06-26", regular: 2220, smart: 2580 },
  { date: "2024-06-27", regular: 2380, smart: 2720 },
  { date: "2024-06-28", regular: 2520, smart: 2880 },
  { date: "2024-06-29", regular: 2280, smart: 2620 },
  { date: "2024-06-30", regular: 2420, smart: 2780 },
]

const chartConfig = {
  regular: {
    label: "Regular Pricing",
    color: "#2c4170", // Napoleon Blue
  },
  smart: {
    label: "Smart Pricing", 
    color: "#e6eaf7", // Light Napoleon Blue (matches webpage secondary color)
  },
} satisfies ChartConfig

export function ChartAreaInteractive() {
  const [timeRange, setTimeRange] = React.useState("90d")

  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date)
    const referenceDate = new Date("2024-06-30")
    let daysToSubtract = 90
    if (timeRange === "30d") {
      daysToSubtract = 30
    } else if (timeRange === "7d") {
      daysToSubtract = 7
    }
    const startDate = new Date(referenceDate)
    startDate.setDate(startDate.getDate() - daysToSubtract)
    return date >= startDate
  })

  return (
    <Card className="pt-0">
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1">
          <CardTitle>Revenue Comparison</CardTitle>
          <CardDescription>
            Regular vs Smart Pricing revenue over the last {timeRange === "90d" ? "3 months" : timeRange === "30d" ? "30 days" : "7 days"}
          </CardDescription>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger
            className="hidden w-[160px] rounded-lg sm:ml-auto sm:flex"
            aria-label="Select a value"
          >
            <SelectValue placeholder="Last 3 months" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="90d" className="rounded-lg">
              Last 3 months
            </SelectItem>
            <SelectItem value="30d" className="rounded-lg">
              Last 30 days
            </SelectItem>
            <SelectItem value="7d" className="rounded-lg">
              Last 7 days
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillRegular" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="#2c4170"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="#2c4170"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillSmart" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="#e6eaf7"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="#e6eaf7"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })
                  }}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="regular"
              type="natural"
              fill="url(#fillRegular)"
              stroke="#2c4170"
              stackId="a"
            />
            <Area
              dataKey="smart"
              type="natural"
              fill="url(#fillSmart)"
              stroke="#e6eaf7"
              stackId="a"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
