declare namespace REQUEST {}

declare namespace API {
  type TBoxLessor = {
    valueThisMonth: number;
    valueLastMonth: number;
  };
  type TOrderStatistic = {
    orderMonth: number;
    orderCount: number;
  };
  type TOrderPercent = {
    totalOrders: number;
    percentOrderSuccess: number;
    percentOrderFail: number;
  };
}
