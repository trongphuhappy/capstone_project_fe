declare namespace REQUEST {
  type ICategories = {
    id?: number;
    name?: string;
    isVehical?: boolean;
    pageIndex: number;
    pageSize?: number;
  };
}

declare namespace API {
  type Category = {
    id: number;
    name: string;
    image?: image | null;
    isVehicle: boolean;
  };

  type TGetCategories = {
    items: Category[];
    pageIndex: number;
    pageSize: number;
    totalCount: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}
