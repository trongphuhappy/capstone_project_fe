import ProductComponent from "@/app/(user)/product/components/ProductComponent";

export default function ProductPage({ params }: any) {
  return (
    <div>
      <ProductComponent productId={params?.productid} />
    </div>
  );
}
