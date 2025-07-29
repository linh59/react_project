


export interface PaymentHistoryModel {
  id: string;
  create_date: string;
  pay_amount: string;
  status: string;
  selected_payment_type: string;
  pay_method_name: string;
}


export interface PaymentHistoryResponse {
  data: PaymentHistoryModel[];
  last: boolean;
  page_no: number;
  page_size: number;
  total_elements: number;
  total_pages: number;
}

export interface PaymentHistoryProps {
  data: PaymentHistoryModel[];
  isLoading: boolean;
  page: number;
  pageSize: number;
  total: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
}