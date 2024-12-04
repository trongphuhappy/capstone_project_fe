"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  CheckOrderStatus,
  OrderReportStatusType,
  OrderStatusType,
} from "@/const/order";
import useCheckOrderProductDialog from "@/hooks/use-check-order-product-dialog";
import useGetOrders from "@/hooks/use-get-orders";
import { useAppSelector } from "@/stores/store";
import { Fragment, useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { parseISO } from "date-fns";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import PaginatedComponent from "@/components/paginated";

export default function ManageOrderComponent() {
  const { onOpenCheckOrderProductDialog } = useCheckOrderProductDialog();
  const userState = useAppSelector((state) => state.userSlice);
  const { getAllOrdersApi, isPending } = useGetOrders();
  const [orders, setOrders] = useState<API.TGetAllOrders | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const [selectedStatus, setSelectedStatus] = useState<string>("all");

  const handleGetAllOrders = async (currentPage: number) => {
    const form: REQUEST.TGetAllOrders = {
      pageIndex: currentPage,
      pageSize: 10,
      orderReportStatus: selectedStatus === "all" ? null : +selectedStatus,
    };
    const res = await getAllOrdersApi(form);
    if (res) setOrders(res.value.data);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    handleGetAllOrders(page);
  };

  const handleOpenCheckOrder = async (
    order: API.TOrders,
    type: CheckOrderStatus
  ) => {
    onOpenCheckOrderProductDialog(order, false, true, type);
  };

  const orderReportStatus = Object.entries(OrderReportStatusType)
    .filter(([key, value]) => typeof value === "number")
    .map(([key, value]) => ({ key, value }));

  useEffect(() => {
    if (currentPage !== 1) {
      handleGetAllOrders(1);
      setCurrentPage(1);
    } else handleGetAllOrders(currentPage);
  }, [selectedStatus]);

  return (
    <div>
      <div>
        <div className="grid grid-cols-4 gap-x-10 gap-y-3">
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
                {orderReportStatus.map(({ key, value }) => (
                  <SelectItem key={value} value={value as string}>
                    {" "}
                    {key.replace(/([A-Z])/g, " $1").trim()}{" "}
                  </SelectItem>
                ))}
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
                          {order.orderReportStatus !==
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
                          {order.orderReportStatus &&
                            order.orderReportStatus === 1 && (
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
  );
}
