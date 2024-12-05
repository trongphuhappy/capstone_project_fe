export enum OrderStatusType {
  Pending = 0, // Payment completed for deposit but process is still awaiting further actions
  UserApproved = 1, // Approved by the user
  CompletedRented = 2, // Approved by the lessor
  UserRejected = -1, // Rejected by the user
  RejectionValidated = -2, // User's rejection reason validated and accepted by the lessor
  RejectionInvalidated = -3, // User's rejection reason invalidated by the lessor, treated as self-rejection
}

export enum OrderReportStatusType {
  NotConflict = 0,
  PendingConflict = 1,
  ApprovedReport = 2,
  RejectedReport = -1,
}

export enum CheckOrderStatus {
  Approved = 0,
  Rejected = 1,
  Report = 2,
  Feedback = 3
}
