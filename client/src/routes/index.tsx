import { HarvestChart } from '#/components/HarvestChart'
import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { config } from "#/config"
import HarvestToday from '#/components/HarvestToday'
import WeatherInfo from '#/components/WeatherInfo'

export const Route = createFileRoute('/')({ component: App })

export interface Harvest {
  id: number
  createdAt: string
  quantity: number | null
  loggedBy: number
}

function App() {
  const { data: harvestData } = useQuery<Harvest[]>({
    queryKey: ["harvests"],
    queryFn: async () => {
      const response = await fetch(`${config.API_URL}/harvests`)
      if (!response.ok) {
        throw new Error("Network response was not ok")
      }
      return response.json()
    }
  })

  return (
    <div className='grid gap-4'>
      <div className='flex gap-4'>
        <HarvestToday data={harvestData || []} />
        <WeatherInfo />
      </div>
      <HarvestChart data={harvestData || []} />
    </div>
  )
}
