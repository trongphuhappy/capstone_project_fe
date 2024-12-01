declare namespace REQUEST {
  type TCreateOder = {
    productId: string;
    rentTime: string;
    returnTime: string;
  };
}

declare namespace API {
  type TCreateOrder = {
    success: boolean;
    paymentUrl: string;
    message: string;
  };
}
