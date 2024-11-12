export type LocaleType = {
  [key: string]: string | LocaleType;
};

export declare type TBreadcrumb = {
  link: string;
  title: string;
  isActive: boolean;
};

declare type TComponentsProps = {
  children?: React.ReactNode;
};

declare type TMeta = {
  statusCode: number;
  message: string;
  error: string;
};

declare type TMetaWrapper<T> = {
  meta: TMeta;
  result: {
    data: T;
  };
};

declare interface ILinkPreviousRoute {
  from: string;
}

declare interface IProductsPagination {
  sortField?: "created_at" | "price";
  order?: "ASC" | "DESC";
  page?: number;
  take?: number;
  isConfirmedByAdmin: boolean;
  kw?: string;
  categoryId?: number;
  isVehicle: boolean;
  lessorId?: number;
  status?: "product.status.available" | "product.status.not.available";
  offset?: number;
  rating?: number;
  minRentalFrequency?: number;
  maxRentalFrequency?: number;
  minPrice?: number;
  maxPrice?: number;
}

declare interface IPaginationMeta {
  page: number;
  take: number;
  itemCount: number;
  pageCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  offset: number;
}

declare interface IPaginationResponse<T> {
  data: T[];
  meta: IPaginationMeta;
  extra?: any;
}

declare type TPropsFormInput = {
  control?: Control;
  name: string;
  type?: string;
  size?: SizeType;
  error?: MultipleFieldErrors;
  errors?: MultipleFieldErrors;
  placeholder?: string;
  className?: string;
  format?: string;
  values?: [];
  autoSize?: boolean | { minRows: number; maxRows: number };
  label?: string;
  children?: JSX.Element;
  required?: boolean;
  placement?: TooltipPlacement;
  disabled?: boolean;
  rows?: number;
  form?: FormInstance<any>;
  onSubmit?: any;
};

declare type TRadio = {
  size?: SizeType;
  control: Control<FieldValues>;
  name: string;
  values: { key: string | number; value: string | number }[];
  className?: string;
  disabled?: boolean;
  error?: FieldError;
  placeholder?: string;
};

declare type TFormControl = {
  control?: Control;
  error?: MultipleFieldErrors | FieldError;
};

declare const REACT_APP_ENV: "test" | "dev" | "pre" | false;
declare const MOCK: "none" | undefined;
declare const ENEIGHBOR_API: string | undefined;
