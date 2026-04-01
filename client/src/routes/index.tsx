import { HarvestsChart } from '#/components/HarvestsChart'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({ component: App })

function App() {
  return (
    <div>
      <HarvestsChart />
    </div>
  )
}
