declare namespace REQUEST {
  type TSurcharge = {
    surchargeId: string;
    price: number;
  };

  type TCreateProduct = {
    name?: string | null;
    description?: string | null;
    value?: number | null;
    price?: number | null;
    maximumRentDays?: number | null;
    policies?: string | null;
    categoryId?: number | null;
    productImages?: File[] | null;
    insuranceName?: string | null;
    issueDate?: string | null;
    expirationDate?: string | null;
    insuranceImages?: File[] | null;
    listSurcharges?: TSurcharge[] | null;
  };
}

declare namespace API {}
