import { MoveRightIcon, TrendingDownIcon, TrendingUpIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import type { Harvest } from "#/routes";

export default function HarvestToday({ data }: { data: Harvest[] }) {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    const getDayTotal = (target: Date) => {
        const start = new Date(target);
        const end = new Date(target);
        end.setDate(end.getDate() + 1);

        return data.reduce((sum, harvest) => {
            const createdAt = new Date(harvest.createdAt);
            if (Number.isNaN(createdAt.getTime())) return sum;

            if (createdAt >= start && createdAt < end) {
                return sum + (harvest.quantity ?? 0);
            }
            return sum;
        }, 0);
    };

    const todayTotal = getDayTotal(today);
    const yesterdayTotal = getDayTotal(yesterday);

    const trend =
        todayTotal > yesterdayTotal ? "up" :
            todayTotal < yesterdayTotal ? "down" :
                "flat";

    const TrendIcon =
        trend === "up" ? TrendingUpIcon :
            trend === "down" ? TrendingDownIcon :
                MoveRightIcon;

    const trendColor =
        trend === "up" ? "text-emerald-500" :
            trend === "down" ? "text-rose-500" :
                "text-slate-500";

    return (
        <Card className="py-0 max-w-3xs gap-0">
            <CardHeader className="flex flex-col items-stretch border-b p-0! sm:flex-row">
                <div className="flex flex-1 justify-between items-center gap-1 px-6 pt-4 pb-3">
                    <CardTitle className="flex items-center gap-2">
                        Today's Harvest
                    </CardTitle>
                    <TrendIcon className={`${trendColor} h-4 w-4`} />
                </div>
            </CardHeader>

            <CardContent className="px-2 sm:p-6">
                <div className="text-5xl text-primary font-bold text-center">
                    {todayTotal}
                    <sub>g</sub>
                </div>
                {/* <p className="text-xs text-muted-foreground text-center mt-2">
                    {yesterdayTotal === 0 && todayTotal === 0
                        ? "No harvest data for today or yesterday"
                        : `Yesterday: ${yesterdayTotal}g • ${trend === "up" ? "Up" : trend === "down" ? "Down" : "Flat"}`}
                </p> */}
            </CardContent>
        </Card>
    );
}
