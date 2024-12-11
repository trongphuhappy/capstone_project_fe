declare namespace REQUEST {
  type TYear = {
    year?: number | null;
  };
}

declare namespace API {
  type TDashboardData = {
    totalUsers: number;
    totalRevenue: number;
    listMonths: string[];
    listRevenueInYear: number[];
  };
}
