export const productLocale: { [key: string]: string } = {
  "product.price.time.unit.day": " / day",
  "product.price.time.unit.week": " / week",
  "product.price.time.unit.month": " / month",
};

export const productCategories: { [key: string]: string } = {
  "furniture.category.couch": "Couch",
  "furniture.category.table": "Table",
  "furniture.category.electronic": "Electronics",
  "furniture.category.decorations": "Decorations",
  "furniture.category.bed": "Bed",
  "furniture.category.cabinet": "Cabinet",
  "furniture.category.kitchen-appliances": "Kitchen Appliances",
  "vehicle.category.motorbike": "Motorbike",
  "vehicle.category.bike": "Bicycle",
  "product.category.furnitures": "Furnitures",
  "product.category.vehicles": "Vehicles",
  "vehicle.category.car": "Car",
};

export const productCharacteristicsLabel = {
  "furniture-characteristics-quantity": "Quantity",
  "furniture-characteristics-function": "Function",
  "furniture-characteristics-brand": "Brand",
  "furniture-characteristics-origin": "Origin",
  "furniture-characteristics-warranty-type": "Warranty Type",
  "furniture-characteristics-warranty-date": "Warranty Date",
  "furniture-characteristics-size": "Size",
  "furniture-characteristics-height": "Height",
  "furniture-characteristics-material": "Material",
  "furniture-characteristics-shape": "Shape",
  "furniture-characteristics-weight": "Weight",
  "furniture-characteristics-energyType": "Energy Type",

  "vehicle-characteristics-seats": "Seats",
  "vehicle-characteristics-fuel": "Fuel",
  "vehicle-characteristics-fuelRate": "Fuel Rate",
  "vehicle-characteristics-utility-GPS": "GPS",
  "vehicle-characteristics-weight": "Weight",

  "vehicle-characteristics-utility-bluetooth": "Bluetooth",
  "vehicle-characteristics-utility-obstacleSensor": "Obstacle Sensor",
  "vehicle-characteristics-utility-usb": "USB",
  "vehicle-characteristics-utility-dashcam": "Dashcam",
  "vehicle-characteristics-utility-speedChart": "Speed Chart",
  "vehicle-characteristics-utility-sparewheel": "Spare Wheel",
  "vehicle-characteristics-utility-backCamera": "Back Camera",
  "vehicle-characteristics-utility-sunRoof": "Sun Roof",
  "vehicle-characteristics-utility-etc": "ETC",
  "vehicle-characteristics-utility-tyreSensor": "Tyre Sensor",
  "vehicle-characteristics-utility-airBag": "Air Bag",
};

export const productInsurance = {
  "product.insurance.exist.yes": "Yes",
  "product.insurance.exist.no": "No",
};

export const productMortgage = {
  "product.mortgage.none": "No mortgage required",
  "product.mortgage.motorbike.deposite": "Motorcycle mortgage",
};

export const productInsurace = {
  "product.insurance.exist.yes": "Yes",
  "product.insurance.exist.no": "Not have",
};

export const productPolicies = {
  "product.policies.correctPurpose": "Proper Use of Property",
  "product.policies.not.illegalPurpose": "No Illegal Use",
  "product.policies.not.pawnShop": "No Pawning of Property",
  "product.policies.carDirty": "No Gum Chewing or Littering in Car",
  "product.policies.not.deliver.prohibited":
    "No Transporting of Prohibited or Flammable Goods",
  "product.policies.carDirty.handOver":
    "Keep Car Clean, Additional Charges for Violation upon Return",
  "product.policies.furnDirty": "Keep Interior Clean and Undamaged",
  "product.policies.furnDirty.handOver":
    "Additional Charges for Violation upon Return",
};

export const productReqDocs = {
  "product.reqDocs.none": "No documents required",
  "product.reqDocs.need.citizenCard.with.driverLicense":
    "Compare citizen ID card and driver's license",
  "product.reqDocs.keep.passport": "Compare driver's license & keep passport",
};

export const productSurchage = {
  "products.surCharge.lateFees": "Late return fee",
  "products.surCharge.lateFees.description":
    "Additional fee incurred if the product is returned late, the penalty amount corresponds to the number of hours late",

  "products.surCharge.sanityFees": "Cleaning fee",
  "products.surCharge.sanityFees.description":
    "Additional fee incurred when the product is returned not clean (many stains, odors,...)",

  "products.surCharge.damageFees": "Product damage fee",
  "products.surCharge.damageFees.description":
    "Additional fee incurred when the product is returned damaged, the product cannot be rented anymore or the owner has to take it for repair, in this case the tenant will compensate the owner according to the agreement",
};

export const productPage = {
  "products.page.empty": "Không tìm thấy sản phẩm phù hợp!",
};

export const productStatus = {
  "product.status.available": "AVAILABLE",
  "product.status.not.available": "DISABLED",
};

export const productDetailPage = {
  "product.details.loading.description": "Loading Product #{productId}",
  "product.details.feedback.count": "Feedbacks",
  "product.details.completedOrders.count": "Completed Orders",
  "product.details.tab.detailsInfo": "Detailed Information",
  "product.details.tab.feedbacks": "Feedbacks",
  "product.details.description.label": "Description",
  "product.details.characteristics.label": "Details provided by Lessor",
  "product.details.characteristics.otherUtils.label": "Other Utilities",
  "product.details.mortgages.label": "Mortgage for renting this Product",
  "product.details.requiredDocuments.label":
    "Documents Requirement for this Product",
  "product.details.policies.label": "Policies",
  "product.details.surcharge.label": "Surcharges",
  "product.details.surcharge.noData": "No Extra fees for this product!",
};

export const product = {
  ...productLocale,
  ...productCategories,
  ...productCharacteristicsLabel,
  ...productDetailPage,
  ...productInsurace,
  ...productMortgage,
  ...productPage,
  ...productPolicies,
  ...productReqDocs,
  ...productStatus,
  ...productSurchage,
};
