import Stat from "./Stat";
import { HiOutlineBriefcase, HiOutlineChartBar} from "react-icons/hi";
import{HiOutlineBanknotes, HiOutlineCalendarDays} from "react-icons/hi2";
import { formatCurrency } from "../../utils/helpers";

function Stats({bookings, confirmedStays, stays, numDays, cabinsCount}){
    // 1) calculate num of bookings
    const numBookings = bookings?.length ;

    // 2) calculate sales(total price of confirmed stays)
    const sales = confirmedStays?.reduce((acc, cur)=> acc + cur.totalPrice, 0)

    // 3)calculate check ins
    const checkIns = stays?.length;

    // 4)calculate the occupancy rate
    const occupancy = confirmedStays?.reduce((acc, cur) => acc + cur.numNights, 0) / (numDays * cabinsCount) ;

    // num of check ins / num of available nights(num of days * num of cabins)



    return(
        <>
            <Stat title="Bookings" color="blue" icon={<HiOutlineBriefcase />} value={numBookings}/>
            <Stat title="Sales" color="green" icon={<HiOutlineBanknotes />} value={formatCurrency(sales)}/>
            <Stat title="Check ins" color="indigo" icon={<HiOutlineCalendarDays />} value={checkIns}/>
            <Stat title="Occupancy Rate" color="yellow" icon={<HiOutlineChartBar />} value={Math.round(occupancy * 100) + "%"}/>
        </>
    )

}

export default Stats;