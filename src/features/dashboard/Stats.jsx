import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendar,
} from "react-icons/hi2";
import Stat from "./Stat";
import { formatCurrency } from "../../utils/helpers";

function stats({ bookings, confirmedStays , numDays , numOfCabins }) {
  const numBookings = bookings.length;

  const sales = bookings.reduce((acc, curr) => acc + curr.totalPrice, 0);

  const checkIns = confirmedStays.length;

  const occupency = confirmedStays.reduce((acc,curr)=> acc + curr.numNights , 0) / (numDays * numOfCabins)
  return (
    <>
      <Stat
        title="bookings"
        color="blue"
        icon={<HiOutlineBriefcase />}
        value={numBookings}
      />
      <Stat
        title="Sales"
        color="green"
        icon={<HiOutlineBanknotes />}
        value={formatCurrency(sales)}
      />
      <Stat
        title="Check Ins"
        color="indigo"
        icon={<HiOutlineCalendar />}
        value={checkIns}
      />
      <Stat
        title="Occupency Rate"
        color="yellow"
        icon={<HiOutlineBriefcase />}
        value={Math.round(occupency*100) +'%'}
      />
    </>
  );
}

export default stats;
