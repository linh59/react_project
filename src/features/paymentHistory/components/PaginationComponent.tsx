import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useTranslation } from 'react-i18next';

interface PaginationProps {
    page: number;
    pageSize: number;
    totalPages: number;
    total: number;
    onPageChange: (page: number) => void;
    onPageSizeChange: (size: number) => void;
}
const PaginationComponent = (props: PaginationProps) => {
    const { t } = useTranslation();
    return (
        <div className="flex flex-col lg:flex-row items-center justify-between mt-8 gap-4">
            <div className="text-sm text-muted-foreground order-2 lg:order-1">
          {t('transactions.showing')} {(props.page - 1) * props.pageSize + 1} - {Math.min(props.page * props.pageSize, props.total)} {t('transactions.of')} {props.total} {t('transactions.results')}
        </div>
            <div className="flex flex-col sm:flex-row items-center gap-4 order-1 lg:order-2">
                <Select value={props.pageSize.toString()} onValueChange={(value) => props.onPageSizeChange(parseInt(value))}>
                    <SelectTrigger className="w-full sm:w-40">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="10">10 {t('transactions.perPage')}</SelectItem>
                        <SelectItem value="20">20 {t('transactions.perPage')}</SelectItem>
                        <SelectItem value="50">50 {t('transactions.perPage')}</SelectItem>
                    </SelectContent>
                </Select>
                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious
                                onClick={() => props.onPageChange(Math.max(1, props.page - 1))}
                                className={props.page === 1 ? 'pointer-events-none opacity-50' : 'clay-button hover:scale-[1.02]'}
                            />
                        </PaginationItem>
                        {/* {Array.from({ length: props.totalPages }, (_, i) => i + 1).map((page) => (
                <PaginationItem key={page}>
                  <PaginationLink
                    onClick={() => props.onPageChange(page)}
                    isActive={props.page === page}
                    className="clay-button hover:scale-[1.02]"
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ))} */}
                        <PaginationItem>
                            <PaginationNext
                                onClick={() => props.onPageChange(Math.min(props.totalPages, props.page + 1))}
                                className={props.page === props.totalPages ? 'pointer-events-none opacity-50' : 'clay-button hover:scale-[1.02]'}
                            />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>
        </div>
    )
}
export default PaginationComponent;