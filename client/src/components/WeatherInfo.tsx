import { useQuery } from "@tanstack/react-query";
import { Card, CardHeader, CardTitle } from "./ui/card";
import { useMemo } from "react";

export default function WeatherInfo() {

    const { data: weatherData } = useQuery({
        queryKey: ["weather"],
        queryFn: async () => {
            const response = await fetch("https://api.open-meteo.com/v1/forecast?latitude=13.442875314996764&longitude=121.01256149868549&hourly=temperature_2m,relative_humidity_2m")

            if (!response.ok) throw new Error(`Failed to fetch weather data (${response.status})`)

            return response.json()
        }
    });

    const currectWeather = useMemo(() => {
        if (!weatherData) return { temperature: 0, humidity: 0 };

        const { temperature_2m, relative_humidity_2m } = weatherData.hourly;
        const latestTemperature = temperature_2m[0];
        const latestHumidity = relative_humidity_2m[0];

        return { temperature: latestTemperature, humidity: latestHumidity };
    }, [weatherData])

    console.log("Current Weather:", currectWeather)

    return (
        <>
            <div className="flex flex-col gap-4">
                <Card className="py-0 w-3xs gap-0 rounded-full">
                    <CardHeader className="flex flex-col items-stretch p-0! sm:flex-row">
                        <div className="flex flex-1 justify-between items-center gap-1 px-6 pt-4 pb-3">
                            <CardTitle>
                                Temperature
                            </CardTitle>
                            <div className="text-3xl font-bold whitespace-nowrap">
                                {currectWeather.temperature}
                                <sup>°C</sup>
                            </div>
                        </div>
                    </CardHeader>
                </Card>
                <Card className="py-0 w-3xs gap-0 rounded-full">
                    <CardHeader className="flex flex-col items-stretch p-0! sm:flex-row">
                        <div className="flex flex-1 justify-between items-center gap-1 px-6 pt-4 pb-3">
                            <CardTitle>
                                Humidity
                            </CardTitle>
                            <div className="text-3xl font-bold whitespace-nowrap">
                                {currectWeather.humidity}%
                            </div>
                        </div>
                    </CardHeader>
                </Card>
            </div>
        </>
    );
}