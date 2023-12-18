import { formatCurrency } from "../../utils/helpers";
import Stat from "./Stat";
import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from "react-icons/hi2";

function Stats({ bookings, confirmedStays, numDays, cabinsLength }) {
  const sales = bookings.reduce((acc, booking) => booking.totalPrice + acc, 0);

  const occupation =
    confirmedStays.reduce((acc, cur) => acc + cur.numNights, 0) /
    (cabinsLength * numDays);

  return (
    <>
      <Stat
        icon={<HiOutlineBriefcase />}
        color={"blue"}
        title={"Bookings"}
        value={bookings.length}
      />
      <Stat
        icon={<HiOutlineBanknotes />}
        color={"green"}
        title={"Sales"}
        value={formatCurrency(sales)}
      />
      <Stat
        icon={<HiOutlineCalendarDays />}
        color={"indigo"}
        title={"Check ins"}
        value={confirmedStays.length}
      />
      <Stat
        icon={<HiOutlineChartBar />}
        color={"yellow"}
        title={"Occupancy rate"}
        value={Math.floor(occupation * 100) + "%"}
      />
    </>
  );
}
export default Stats;
