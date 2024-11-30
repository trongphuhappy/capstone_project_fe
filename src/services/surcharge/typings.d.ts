declare namespace REQUEST {}

declare namespace API {
  type TSurcharge = {
    id: string;
    name: string;
    description: string;
  };

  type TGetSurcharges = {
    items: TSurcharge[];
    pageIndex: number;
    pageSize: number;
    totalCount: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}
