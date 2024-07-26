import styled from "styled-components";
import Spinner from "../../ui/Spinner";
import Stats from "./Stats";
import { useRecentBookings } from "./useRecentBookings";
import { useRecentStays } from "./useRecentStays";
import {useCabins} from "../cabins/useCabins";
import SalesChart from "./SalesChart";


const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

function DashboardLayOut(){
  const{data: bookings, isLoading} = useRecentBookings();
  const{stays, isLoading2, confirmedStays, numDays} = useRecentStays();
  const {cabins, isLoading: isLoading3} = useCabins();

  if(isLoading || isLoading2 || isLoading3) return <Spinner/>


  return(
    <StyledDashboardLayout>
      <Stats bookings={bookings}
            confirmedStays={confirmedStays}
            stays={stays}
            numDays={numDays}
            cabinsCount= {cabins.length}

      />
      <div>Statistics</div>
      <div>Today's activity</div>
      <div>Chart stay durations</div>
      <SalesChart/>
    </StyledDashboardLayout>
  )
}

export default DashboardLayOut;