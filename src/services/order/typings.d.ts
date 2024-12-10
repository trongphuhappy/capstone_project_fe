declare namespace REQUEST {
  type TCreateOder = {
    productId: string;
    rentTime: string;
    returnTime: string;
  };

  type TGetAllOrders = {
    pageIndex?: number | null;
    pageSize?: number | null;
    accountLessorId?: string | null;
    accountUserId?: string | null;
    isConflict?: boolean | null;
    orderStatus?: number | null;
    orderReportStatus?: number | null;
  };
}

declare namespace API {
  enum OrderStatusType {
    Pending = 0, // Payment completed for deposit but process is still awaiting further actions
    UserApproved = 1, // Approved by the user
    CompletedRented = 2, // Approved by the lessor
    UserRejected = -1, // Rejected by the user
    RejectionValidated = -2, // User's rejection reason validated and accepted by the lessor
    RejectionInvalidated = -3, // User's rejection reason invalidated by the lessor, treated as self-rejection
  }

  enum OrderReportStatusType {
    NotConflict = 0,
    PendingConflict = 1,
    ApprovedReport = 2,
    RejectedReport = -1,
  }

  type TCreateOrder = {
    success: boolean;
    paymentUrl: string;
    message: string;
  };

  type TOrders = {
    id: string;
    rentTime: string;
    returnTime: string;
    deliveryAddress: string;
    orderValue: number;
    orderStatus: OrderStatusType;
    orderReportStatus: OrderReportStatusType;
    userReasonReject?: string;
    lessorReasonReject?: string;
    userReport?: string;
    adminReasonReject?: string;
    createdDate: string;
    product: API.TProduct;
    user: API.TProfile;
    lessor: API.TLessor;
  };

  type TGetAllOrders = {
    items: TOrders[];
    pageIndex: number;
    pageSize: number;
    totalCount: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}
