declare type TMeta = {
  detail: string;
  errorCode: string;
  status: number;
  title: string;
};

declare type TResponse = {
  value: {
    code: string;
    message: string;
  };
  isSuccess: boolean;
  isFailure: boolean;
  error: {
    code: string;
    message: string;
  };
};

declare type TResponseData<T = object> = {
  value: {
    code: string;
    message: string;
    data: T;
  };
  isSuccess: boolean;
  isFailure: boolean;
  error: {
    code: string;
    message: string;
  };
};

declare type TResponseDataHub<T = object> = {
  Value: {
    Code: string;
    Message: string;
    Data: T;
  };
  IsSuccess: boolean;
  IsFailure: boolean;
  Error: {
    Code: string;
    Message: string;
  };
};
