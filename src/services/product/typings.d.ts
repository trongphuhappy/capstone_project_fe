declare namespace REQUEST {
  type TSurcharge = {
    SurchargeId: string;
    Price: number;
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

  type TConfirmProduct = {
    productId: string;
    confirmStatus: confirmStatus;
    rejectReason?: string | null;
  };

  enum statusType {
    Available = 1,
    Not_Available = 2,
  }

  enum confirmStatus {
    Pending = 0,
    Approved = 1,
    Rejected = -1,
  }

  type TGetProductsFilter = {
    id?: string | null;
    name?: string | null;
    statusType?: statusType | null;
    policies?: string | null;
    description?: string | null;
    rating?: string | null;
    value?: string | null;
    maximumRentDays?: string | null;
    categoryId?: string | null;
    confirmStatus?: confirmStatus | null;
    accountUserId?: string | null;
    accountLessorId?: string | null;
    pageIndex?: number | null;
    pageSize?: number | null;
    isVehicle?: boolean | null;
  };

  type TGetProductById = {
    Id: string;
    AccountId?: string | null;
  };

  type TAddToWishlist = {
    productId: string;
  };

  type TConfirmOrder = {
    orderId: string;
    isApproved: boolean;
    rejectReason: string;
  };

  type TReportOrder = {
    orderId: string;
    userReport: string;
  };

  type TGetWishlist = {
    id?: string | null;
    name?: string | null;
    pageIndex?: number | null;
    pageSize?: number | null;
  }
}

declare namespace API {
  type TCategory = {
    categoryId: number;
    categoryName: string;
    isVehicle: boolean;
  };

  type TLessor = {
    lessorId: string;
    wareHouseAddress: string;
    shopName: string;
  };

  type TInsurance = {
    name: string;
    issueDate: string;
    expirationDate: string;
    insuranceImagesUrl: string;
  };

  type TProductSurcharge = {
    surchargeId: string;
    surchargeName: string;
    price: number;
  };

  type TProduct = {
    id: string;
    name: string;
    statusType: REQUEST.statusType;
    policies: string;
    description: string;
    rating: number;
    price: number;
    value: number;
    maximumRentDays: number;
    confirmStatus: REQUEST.confirmStatus;
    isAddedToWishlist?: boolean | null;
    isProductBelongsToUser?: boolean | null;
    category?: TCategory | null;
    productImagesUrl: string[];
    insurance?: API.TInsurance | null;
    surcharges?: API.TProductSurcharge[] | null;
    rejectReason?: string | null;
    lessor: TLessor;
  };

  type TGetProducts = {
    items: TProduct[];
    pageIndex: number;
    pageSize: number;
    totalCount: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}
