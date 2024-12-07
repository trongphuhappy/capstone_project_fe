"use client";

import PaginatedComponent from "@/components/paginated";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  CheckOrderStatus,
  OrderReportStatusType,
  OrderStatusType,
} from "@/const/order";
import { confirmStatus } from "@/const/products";
import useCheckOrderProductDialog from "@/hooks/use-check-order-product-dialog";
import useGetOrders from "@/hooks/use-get-orders";
import { useAppSelector } from "@/stores/store";
import { parseISO } from "date-fns";
import { Fragment, useEffect, useState } from "react";

export default function LeaseTracker() {
  const { onOpenCheckOrderProductDialog } = useCheckOrderProductDialog();
  const userState = useAppSelector((state) => state.userSlice);
  const { getAllOrdersApi } = useGetOrders();
  const [orders, setOrders] = useState<API.TGetAllOrders | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const [myLessor, setMyLessor] = useState<string>("me");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [conflict, setConflict] = useState<string>("all");

  const handleGetAllOrders = async (currentPage: number) => {
    const myLessorForm =
      myLessor === "me"
        ? { accountLessorId: userState.profile?.userId }
        : {
            accountUserId: userState.profile?.userId,
          };
    const form: REQUEST.TGetAllOrders = {
      ...myLessorForm,
      pageIndex: currentPage,
      pageSize: 10,
      orderStatus:
        selectedStatus === "all" ? null : Number.parseInt(selectedStatus),
      isConflict:
        conflict === "all" ? null : conflict === "true" ? true : false,
    };
    const res = await getAllOrdersApi(form);
    if (res) setOrders(res.value.data);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    handleGetAllOrders(page);
  };

  const orderStatuses = Object.entries(OrderStatusType)
    .filter(([key, value]) => typeof value === "number")
    .map(([key, value]) => ({ key, value }));

  useEffect(() => {
    if (currentPage !== 1) {
      handleGetAllOrders(1);
      setCurrentPage(1);
    } else handleGetAllOrders(currentPage);
  }, [selectedStatus, conflict, myLessor]);

  const handleOpenCheckOrder = async (
    order: API.TOrders,
    type: CheckOrderStatus
  ) => {
    const isLessor = myLessor === "me" ? true : false;
    onOpenCheckOrderProductDialog(order, isLessor, false, type);
  };

  return (
    <div className="w-full p-[15px] rounded-lg shadow-box-shadown break-words">
      <div className="flex flex-col gap-y-6 px-8">
        <header className="flex items-center justify-between">
          <h2 className="text-xl font-semibold"></h2>
        </header>
        <div>
          <div>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-x-10 gap-y-3">
              <div className="flex flex-col gap-y-2 w-full">
                <label className="text-base text-[#6f6f6f]">Lessor</label>
                <Select
                  value={myLessor}
                  onValueChange={(value) => setMyLessor(value)}
                >
                  <SelectTrigger className="w-full border-2 border-gray-500">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="me">Me</SelectItem>
                    <SelectItem value="other-person">Other person</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-y-2 w-full">
                <label className="text-base text-[#6f6f6f]">Status</label>
                <Select
                  value={selectedStatus}
                  onValueChange={(value) => setSelectedStatus(value)}
                >
                  <SelectTrigger className="w-full border-2 border-gray-500">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    {orderStatuses.map(({ key, value }) => (
                      <SelectItem key={value} value={value as string}>
                        {" "}
                        {key.replace(/([A-Z])/g, " $1").trim()}{" "}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-y-2 w-full">
                <label className="text-base text-[#6f6f6f]">Conflict</label>
                <Select
                  value={conflict}
                  onValueChange={(value) => setConflict(value)}
                >
                  <SelectTrigger className="w-full border-2 border-gray-500">
                    <SelectValue placeholder="Conflict" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="true">True</SelectItem>
                    <SelectItem value="false">False</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="mt-5">
              <div className="min-h-[250px]">
                {orders && orders?.items?.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-center">NO</TableHead>
                        <TableHead className="text-center">Product</TableHead>
                        <TableHead className="text-center w-[400px]">
                          Lessee
                        </TableHead>
                        <TableHead className="text-center">Rent date</TableHead>
                        <TableHead className="text-center">Status</TableHead>
                        <TableHead className="text-center"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {orders?.items?.map((order, index) => {
                        return (
                          <TableRow key={index}>
                            <TableCell className="font-medium text-center">
                              {index + 1}
                            </TableCell>
                            <TableCell className="text-center">
                              {order.product.name}
                            </TableCell>
                            <TableCell className="text-center">
                              {order.user.firstName + " " + order.user.lastName}
                            </TableCell>
                            <TableCell className="text-center">
                              {parseISO(order.rentTime).toLocaleDateString()} -{" "}
                              {parseISO(order.returnTime).toLocaleDateString()}
                            </TableCell>
                            <TableCell className="text-center">
                              <span>
                                {OrderStatusType[order.orderStatus]
                                  .replace(/([A-Z])/g, " $1")
                                  .trim()}
                              </span>
                              {order.orderStatus !==
                                OrderStatusType.CompletedRented &&
                                order.orderReportStatus !==
                                  OrderReportStatusType.NotConflict && (
                                  <Fragment>
                                    <TooltipProvider>
                                      <Tooltip delayDuration={100}>
                                        <TooltipTrigger>
                                          <div className="w-5 h-5 rounded-full flex items-center justify-center bg-red-500">
                                            <span className="text-white text-[12px]">
                                              !
                                            </span>
                                          </div>
                                        </TooltipTrigger>
                                        <TooltipContent className="bg-gray-50 shadow-tooltip px-2 py-3 select-none">
                                          <span className="text-[#00000d] text-xs font-montserrat font-normal">
                                            {OrderReportStatusType[
                                              order.orderReportStatus
                                            ]
                                              .replace(/([A-Z])/g, " $1")
                                              .trim()}
                                          </span>
                                        </TooltipContent>
                                      </Tooltip>
                                    </TooltipProvider>
                                  </Fragment>
                                )}
                            </TableCell>
                            <TableCell className="text-center">
                              {order.orderReportStatus ===
                                OrderReportStatusType.NotConflict && (
                                <Fragment>
                                  {myLessor !== "me" ? (
                                    <div className="flex items-center gap-x-3">
                                      {order.orderStatus ===
                                        OrderStatusType.Pending && (
                                        <Fragment>
                                          <div
                                            onClick={() =>
                                              handleOpenCheckOrder(
                                                order,
                                                CheckOrderStatus.Approved
                                              )
                                            }
                                            className="cursor-pointer w-full py-[6px] bg-[#00939f] rounded-sm hover:bg-[#029eab] group shadow-header-shadown"
                                          >
                                            <span className="text-center text-[15px] font-medium text-white">
                                              Approve
                                            </span>
                                          </div>
                                          <div
                                            onClick={() =>
                                              handleOpenCheckOrder(
                                                order,
                                                CheckOrderStatus.Rejected
                                              )
                                            }
                                            className="cursor-pointer w-full py-[6px] bg-red-500 rounded-sm hover:bg-red-600 group shadow-header-shadown"
                                          >
                                            <span className="text-center text-[15px] font-medium text-white">
                                              Reject
                                            </span>
                                          </div>
                                        </Fragment>
                                      )}
                                      {order.orderStatus ===
                                        OrderStatusType.RejectionInvalidated && (
                                        <Fragment>
                                          <div
                                            onClick={() =>
                                              handleOpenCheckOrder(
                                                order,
                                                CheckOrderStatus.Report
                                              )
                                            }
                                            className="cursor-pointer w-full py-[6px] bg-red-500 rounded-sm hover:bg-red-600 group shadow-header-shadown"
                                          >
                                            <span className="text-center text-[15px] font-medium text-white">
                                              Report
                                            </span>
                                          </div>
                                        </Fragment>
                                      )}
                                      {order.orderStatus ===
                                        OrderStatusType.CompletedRented && (
                                        <Fragment>
                                          <div
                                            onClick={() =>
                                              handleOpenCheckOrder(
                                                order,
                                                CheckOrderStatus.Feedback
                                              )
                                            }
                                            className="cursor-pointer w-full py-[6px] bg-teal-500 rounded-sm hover:bg-teal-600 group shadow-header-shadown"
                                          >
                                            <span className="text-center text-[15px] font-medium text-white">
                                              Feedback
                                            </span>
                                          </div>
                                        </Fragment>
                                      )}
                                    </div>
                                  ) : (
                                    <Fragment>
                                      {(order.orderStatus ===
                                        OrderStatusType.UserApproved ||
                                        order.orderStatus ===
                                          OrderStatusType.UserRejected) && (
                                        <div className="flex items-center gap-x-3">
                                          <div
                                            onClick={() =>
                                              handleOpenCheckOrder(
                                                order,
                                                CheckOrderStatus.Approved
                                              )
                                            }
                                            className="cursor-pointer w-full py-[6px] bg-[#00939f] rounded-sm hover:bg-[#029eab] group shadow-header-shadown"
                                          >
                                            <span className="text-center text-[15px] font-medium text-white">
                                              Approve
                                            </span>
                                          </div>
                                          <div
                                            onClick={() =>
                                              handleOpenCheckOrder(
                                                order,
                                                CheckOrderStatus.Rejected
                                              )
                                            }
                                            className="cursor-pointer w-full py-[6px] bg-red-500 rounded-sm hover:bg-red-600 group shadow-header-shadown"
                                          >
                                            <span className="text-center text-[15px] font-medium text-white">
                                              Reject
                                            </span>
                                          </div>
                                        </div>
                                      )}
                                    </Fragment>
                                  )}
                                </Fragment>
                              )}
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                ) : (
                  <h3>No products are rented yet.</h3>
                )}
              </div>
              <div className="mt-5">
                {orders && orders?.items?.length > 0 && (
                  <PaginatedComponent
                    totalPages={orders?.totalPages || 1}
                    currentPage={currentPage}
                    onPageChange={handlePageChange}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
