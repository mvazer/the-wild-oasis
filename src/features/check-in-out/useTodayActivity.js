import { useQuery } from "@tanstack/react-query";
import { getStaysTodayActivity } from "../../services/apiBookings";

export function useTodayActivity() {
  const { data: activities, isLoading: isLoadingActivities } = useQuery({
    queryFn: getStaysTodayActivity,
    queryKey: ["today-activities"],
  });

  return { activities, isLoadingActivities };
}
