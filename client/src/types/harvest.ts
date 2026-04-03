import type { paths, components } from "./api"

export type GetHarvestResponse = paths['/harvests']['get']['responses']['200']['content']['application/json']

export type Harvest = components['schemas']['Harvest']