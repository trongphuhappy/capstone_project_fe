declare namespace REQUEST {
  type TCreateFeedback = {
    content: string;
    accountId: string;
    orderId: string;
    productId: string;
  };

  type TGetFeedbacks = {
    pageIndex?: number | null;
    pageSize?: number | null;
    accountId?: string | null;
    productId?: string | null;
  };
}

declare namespace API {
  type TFeedback = {
    id?: string | null;
    content?: string | null;
    accountId?: string | null;
    orderId?: string | null;
    productId?: string | null;
    createdDate?: string | null;
    modifiedDate?: string | null;
    account?: API.TProfile | null;
  };

  type TGetFeedbacks = {
    items: TFeedback[];
    pageIndex: number;
    pageSize: number;
    totalCount: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}
