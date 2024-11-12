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
