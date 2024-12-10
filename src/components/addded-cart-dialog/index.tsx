// "use client";

// import { X } from "lucide-react";
// import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
// import { formatCurrencyVND } from "@/utils/format-currency";
// import { BsCheckCircleFill } from "react-icons/bs";
// import { useAppSelector } from "@/stores/store";
// import { productCategories } from "@/utils/locales/en-US/product";
// import useAddedCartDialog from "@/hooks/use-added-cart-dialog";
// import Link from "next/link";

// interface AddedCartDialogProps {
//   open: boolean;
//   onClose: () => void;
// }

// export default function AddedCartDialog({
//   open,
//   onClose,
// }: AddedCartDialogProps) {
//   const { products } = useAddedCartDialog();

//   return (
//     <Dialog open={open} onOpenChange={onClose}>
//       <DialogTitle></DialogTitle>
//       <DialogContent className="sm:max-w-[450px] p-0 overflow-hidden">
//         {products?.length > 0 && (
//           <div>
//             <div className="!py-3 !px-5 flex justify-between items-center bg-[#eff8f0]">
//               <div className="flex items-center">
//                 <BsCheckCircleFill className="text-[#2eb346] inline-block mr-1" />
//                 <span className="font-montserrat text-[#2eb346]">
//                   Added to cart successfully
//                 </span>
//               </div>
//               <div className="group cursor-pointer" onClick={onClose}>
//                 <X
//                   strokeWidth={2.75}
//                   className="w-5 h-5 text-slate-400 group-hover:text-black"
//                 />
//               </div>
//             </div>
//             <div className="!pt-4 !pb-2 !px-5">
//               <div className="flex items-start pb-5 border-b-[1px]">
//                 <div className="w-[70px] min-h-[70px] mr-5">
//                   <img
//                     loading="lazy"
//                     src={products[0]?.image}
//                     alt={products[0]?.name}
//                     className="vertical-align-middle w-full h-full object-cover"
//                   />
//                 </div>
//                 <div>
//                   <h3 className="font-montserrat font-light text-[#353535]">
//                     {products[0]?.name}
//                   </h3>
//                   <span className="text-[#979797] font-montserrat">
//                     {productCategories[products[0]?.category?.name]}
//                   </span>
//                 </div>
//               </div>
//               <div className="pt-3 pb-6 border-b-[1px]">
//                 <div className="flex items-start justify-between">
//                   <h4 className="font-montserrat font-light text-[#2F80ED]">
//                     Cart is available
//                   </h4>
//                   {/* <div className="">
//                     <span className="font-montserrat text-base text-black font-semibold">
//                       {formatCurrencyVND(
//                         products
//                           ?.map((item) => item.price)
//                           .reduce((a, b) => a + b, 0) || 0
//                       )}
//                     </span>
//                   </div> */}
//                   <p className="text-[#979797] text-base font-montserrat text-right">
//                     ({products?.length}) product
//                   </p>
//                 </div>
//                 {/* <p className="text-[#979797] text-base font-montserrat text-right">
//                   ({products?.length}) product
//                 </p> */}
//               </div>
//               <div className="pt-7 pb-4 flex items-center gap-x-3">
//                 <button className="basis-1/2 h-[42px] rounded-lg border border-black hover:bg-black group">
//                   <span className="text-black group-hover:text-white">Pay</span>
//                 </button>
//                 <button className="basis-1/2 h-[42px] rounded-lg border border-black bg-black group">
//                   <Link href="/cart" onClick={onClose}>
//                     <span className="text-gray-200 group-hover:text-white">
//                       View cart
//                     </span>
//                   </Link>
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </DialogContent>
//     </Dialog>
//   );
// }
