import { useSearchParams } from "react-router-dom";

export function useUrlPosition() {
  //read to latitude and longitude data from the url
  const [searchParams] = useSearchParams();
  //get the lat and lng of the current city
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  return [lat, lng];
}
