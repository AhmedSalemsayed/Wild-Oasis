import { useQuery } from "@tanstack/react-query";
import { getStaysTodayActivity } from "../../services/apiBookings";

export function useTodayActivity() {
  const { isLoading, data: todayActivityData } = useQuery({
    queryFn: getStaysTodayActivity,
    queryKey: ["today-stays-activity"],
  });

  return { isLoading, todayActivityData };
}
