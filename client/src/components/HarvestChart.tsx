import * as React from "react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "#/components/ui/card"
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    type ChartConfig,
} from "#/components/ui/chart"
import { ButtonGroup } from "./ui/button-group"
import { Button } from "./ui/button"
import type { Harvest } from "#/types/harvest"



export const description = "An interactive bar chart"

const chartConfig = {
    harvest: {
        label: "Harvest",
        color: "var(--chart-1)",
    },
} satisfies ChartConfig

type GroupMode = 'daily' | 'weekly' | 'monthly'

const MAX_BARS = 60

export function HarvestChart({ data }: { data: Harvest[] }) {
    const [groupMode, setGroupMode] = React.useState<GroupMode>('daily')

    const processedData = React.useMemo(() => {
        if (!data) return []

        const now = new Date()
        const periods: { date: string; harvest: number }[] = []

        if (groupMode === 'daily') {
            for (let i = MAX_BARS - 1; i >= 0; i--) {
                const date = new Date(now)
                date.setDate(now.getDate() - i)
                const key = date.toISOString().split('T')[0]
                const total = data
                    .filter((h: Harvest) => new Date(h.createdAt).toISOString().split('T')[0] === key)
                    .reduce((sum: number, h: Harvest) => sum + (h.quantity || 0), 0)
                periods.push({ date: key, harvest: total })
            }
        } else if (groupMode === 'weekly') {
            for (let i = MAX_BARS - 1; i >= 0; i--) {
                const date = new Date(now)
                date.setDate(now.getDate() - i * 7)
                // Adjust to Monday of that week
                const dayOfWeek = date.getDay()
                const diff = dayOfWeek === 0 ? -6 : 1 - dayOfWeek // Monday
                date.setDate(date.getDate() + diff)
                const key = date.toISOString().split('T')[0]
                const weekEnd = new Date(date)
                weekEnd.setDate(date.getDate() + 6)
                const total = data
                    .filter((h: Harvest) => {
                        const hDate = new Date(h.createdAt)
                        return hDate >= date && hDate <= weekEnd
                    })
                    .reduce((sum: number, h: Harvest) => sum + (h.quantity || 0), 0)
                periods.push({ date: key, harvest: total })
            }
        } else { // monthly
            for (let i = MAX_BARS - 1; i >= 0; i--) {
                const date = new Date(now)
                date.setMonth(now.getMonth() - i)
                date.setDate(1) // First day of month
                const key = date.toISOString().split('T')[0]
                const monthEnd = new Date(date.getFullYear(), date.getMonth() + 1, 0)
                const total = data
                    .filter((h: Harvest) => {
                        const hDate = new Date(h.createdAt)
                        return hDate >= date && hDate <= monthEnd
                    })
                    .reduce((sum: number, h: Harvest) => sum + (h.quantity || 0), 0)
                periods.push({ date: key, harvest: total })
            }
        }

        return periods
    }, [data, groupMode])

    const getTickFormatter = (mode: GroupMode) => (value: string) => {
        const date = new Date(value)
        if (mode === 'daily') {
            return date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
        } else if (mode === 'weekly') {
            return `Week of ${date.toLocaleDateString("en-US", { month: "short", day: "numeric" })}`
        } else {
            return date.toLocaleDateString("en-US", { month: "long", year: "numeric" })
        }
    }

    const getLabelFormatter = (mode: GroupMode) => {
        return (value: any) => {
            const date = new Date(value)
            if (mode === 'daily') {
                return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
            } else if (mode === 'weekly') {
                return `Week of ${date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}`
            } else {
                return date.toLocaleDateString("en-US", { month: "long", year: "numeric" })
            }
        }
    }

    return (
        <Card className="py-0">
            <CardHeader className="flex flex-col items-stretch border-b p-0! sm:flex-row">
                <div className="flex flex-1 justify-between gap-1 px-6 pt-4 pb-3 ">
                    <CardTitle>Harvests</CardTitle>
                    <ButtonGroup>
                        <Button size="xs" variant={groupMode === 'daily' ? 'default' : 'outline'} onClick={() => setGroupMode('daily')}>Daily</Button>
                        <Button size="xs" variant={groupMode === 'weekly' ? 'default' : 'outline'} onClick={() => setGroupMode('weekly')}>Weekly</Button>
                        <Button size="xs" variant={groupMode === 'monthly' ? 'default' : 'outline'} onClick={() => setGroupMode('monthly')}>Monthly</Button>
                    </ButtonGroup>
                </div>
            </CardHeader>
            <CardContent className="px-2 sm:p-6">
                <ChartContainer
                    config={chartConfig}
                    className="aspect-auto h-[250px] w-full"
                >
                    <BarChart
                        accessibilityLayer
                        data={processedData}
                        margin={{
                            left: 12,
                            right: 12,
                        }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="date"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            minTickGap={32}
                            tickFormatter={getTickFormatter(groupMode)}
                        />
                        <ChartTooltip
                            content={
                                <ChartTooltipContent
                                    className="w-[150px]"
                                    nameKey="harvest"
                                    labelFormatter={getLabelFormatter(groupMode)}
                                />
                            }
                        />
                        <Bar dataKey="harvest" fill={`var(--color-harvest)`} />
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}
