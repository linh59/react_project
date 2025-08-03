import { useTranslation } from 'react-i18next';
import { Search, Filter, List, Grid } from 'lucide-react';
import { Input } from '@/components/ui/input';
import type { ReactNode } from 'react';

interface SearchProps {
    children?: ReactNode; 
    onSearchChange: (value: string) => void;
    onFilterByStatus: (value: string) => void;
}
const SearchFilterComponent = (props: SearchProps) => {
    const { t } = useTranslation();
    return (
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            <div className="flex-1 flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder={t('transactions.searchPlaceholder')}

                        onChange={(e) => props.onSearchChange(e.target.value)}
                        className="pl-10"
                    />
                </div>
                {/* <Select onValueChange={(e) => props.onFilterByStatus(e)}>
                            <SelectTrigger className="w-full sm:w-48">
                                <SelectValue placeholder={t('transactions.filterStatus')} />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">{t('transactions.allStatuses')}</SelectItem>
                                <SelectItem value="complete">{t('transactions.completed')}</SelectItem>
                                <SelectItem value="pending">{t('transactions.pending')}</SelectItem>
                                <SelectItem value="cancel">{t('transactions.cancel')}</SelectItem>
                            </SelectContent>
                        </Select> */}
            </div>
             {props.children}

        </div>


    )
}
export default SearchFilterComponent;