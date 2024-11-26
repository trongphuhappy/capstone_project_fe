declare namespace REQUEST {}

declare namespace API {
  type Surcharge = {
    id: string;
    name: string;
    description: string;
  };

  type TGetSurcharges = {
    items: Surcharge[];
    pageIndex: number;
    pageSize: number;
    totalCount: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}
