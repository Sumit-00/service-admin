import { getAllTheBuildings } from '@/app/audit/actions';
import { Building } from '@/app/audit/audit.types';
import { toast } from '@/components/ui/use-toast';
import { GetAPIResponse } from '@/constants/types';
import { DefaultError, UseQueryResult, useQuery } from '@tanstack/react-query';

function getBuildingsMap(buildings: Building[]): {
  cities: string[];
  cityBuildingMap: Record<string, Building[]>;
} {
  const cities: Record<string, boolean> = {};
  const cityBuildingMap: Record<string, Building[]> = {};

  buildings.forEach((building) => {
    const city = building?.city as string;

    if (city) {
      if (!cities[city]) {
        cities[city] = true;
        cityBuildingMap[city] = [];
      }

      cityBuildingMap[city].push(building);
    }
  });

  return { cities: Object.keys(cities), cityBuildingMap };
}

function getTheSelectedBuilding(id: string, buildings: Building[]) {
  const currLocation = (buildings.filter((building) => building._id === id) || [])?.[0];
  const currCity = currLocation?.city;

  return currCity;
}

export function useGetAllBuildings({ value }: { value?: string } = {}) {
  const result: UseQueryResult<GetAPIResponse<Array<Building>>, DefaultError> = useQuery({
    queryKey: ['getAllTheBuildings'],
    queryFn: () => {
      return getAllTheBuildings();
    },
  });
  let selectedCity = null;

  const { isError } = result;
  const buildings = result?.data?.data || [];
  const { cityBuildingMap, cities } = getBuildingsMap(buildings);

  if (value) {
    selectedCity = getTheSelectedBuilding(value, buildings);
  }

  if (isError) {
    toast({
      title: 'Error',
      description: 'Failed to fetch buildings',
      variant: 'destructive',
    });
  }

  return { buildings, ...result, cityBuildingMap, cities, selectedCity };
}
