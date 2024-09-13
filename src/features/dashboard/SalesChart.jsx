/* eslint-disable react/prop-types */
import styled from "styled-components";
import DashboardBox from "./DashboardBox";
import Heading from "../../ui/Heading";
import {
  AreaChart,
  XAxis,
  YAxis,
  Tooltip,
  Area,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { useDarkMode } from "../../context/DarkModeContext";
import {
  eachDayOfInterval,
  formatDate,
  isSameDay,
  subDays,
} from "date-fns";

const StyledSalesChart = styled(DashboardBox)`
  grid-column: 1 / -1;

  /* Hack to change grid line colors */
  & .recharts-cartesian-grid-horizontal line,
  & .recharts-cartesian-grid-vertical line {
    stroke: var(--color-grey-300);
  }
`;

export default function SalesChart({ bookings, numDays }) {
  const { isDarkMode } = useDarkMode();

  const allDays = eachDayOfInterval({
    start: subDays(new Date(), numDays - 1),
    end: new Date(),
  });

  const data = allDays.map((day) => {
    return {
      label: formatDate(day, "MMM dd"),
      totalSales: bookings
        .filter((booking) => isSameDay(day, new Date(booking.created_at)))
        .reduce((acc, curr) => acc + curr.totalPrice, 0),
      extrasSales: bookings
        .filter((booking) => isSameDay(day, new Date(booking.created_at)))
        .reduce((acc, curr) => acc + curr.extrasPrice, 0),
    };
  });

  const colors = isDarkMode
    ? {
        totalSales: { stroke: "#4f46e5", fill: "#4f46e5" },
        extrasSales: { stroke: "#22c55e", fill: "#22c55e" },
        text: "#e5e7eb",
        background: "#18212f",
      }
    : {
        totalSales: { stroke: "#4f46e5", fill: "#c7d2fe" },
        extrasSales: { stroke: "#16a34a", fill: "#dcfce7" },
        text: "#374151",
        background: "#fff",
      };

  return (
    <StyledSalesChart>
      <Heading as="h2">
        Sales from {formatDate(allDays.at(0), "MMM dd yyyy")} &mdash;{" "}
        {formatDate(allDays.at(-1), "MMM dd yyyy")}
      </Heading>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="label"
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />
          <YAxis
            unit="$"
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />
          <Tooltip contentStyle={{ background: colors.background }} />
          <Area
            type="monotone"
            dataKey="totalSales"
            stroke={colors.totalSales.stroke}
            fill={colors.totalSales.fill}
            unit="$"
            name="Total Sales"
            strokeWidth={2}
          />
          <Area
            type="monotone"
            dataKey="extrasSales"
            stroke={colors.extrasSales.stroke}
            fill={colors.extrasSales.fill}
            unit="$"
            name="Extra Sales"
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </StyledSalesChart>
  );
}




