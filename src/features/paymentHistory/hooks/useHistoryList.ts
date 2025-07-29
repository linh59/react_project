import { useEffect, useState } from "react"
import { handleAPIError } from "@/lib/handleAPIError";
import type { PaymentHistoryModel } from "../authTypes";
import { paymentHistoryAPI } from "../apis";

const usePaymentHistoryList = (initialPage = 1, pageSize = 10) => {
    const [data, setData] = useState<PaymentHistoryModel[]>();
    const [page, setPage] = useState(initialPage);
    const [pageSizeState, setPageSize] = useState(pageSize);
    const [total, setTotal] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [search, setSearch] = useState<string | null>(null);
    const [status, setStatus] = useState<string | null>();
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const fetchHistories = async () => {

        setIsLoading(true);
        try {
            const response = await paymentHistoryAPI.getHistory({
                page_no: page,
                page_size: pageSizeState,
                keyword: search,
                status: status
            });

            setData(response.data);
            setTotal(response.total_elements)
            setTotalPages(response.total_pages)
            setErrorMessage(null)

        } catch (error) {
            const err = handleAPIError(error);
            setErrorMessage(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchHistories();
    }, [page, pageSizeState, search, status]);

    return {
        data,
        isLoading,
        errorMessage,
        page,
        pageSize: pageSizeState,
        total,
        totalPages,
        status,
        setSearch,
        setStatus,
        setTotalPages,
        setPage,
        setPageSize,
        fetchHistories
    };
}

export default usePaymentHistoryList