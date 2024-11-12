declare namespace REQUEST {
  interface IFilterProducts {
    isVehicle?: boolean;
    location?: "common.location.HCM" | "common.location.HN";
    sortField?: "createdAt" | "price" | "accessCount";
    order?: "ASC" | "DESC";
    page: number;
    take: number;
  }
}

declare namespace API {
  interface ICategoriesParams {
    isVehicle?: string | number | null | boolean;
  }

  interface ICategoryDescriptions {
    id: number;
    name: string;
  }

  interface ICategoryDetails extends ICategoryDescriptions {
    isVehicle: boolean;
    characteristics: string[];
  }
}
