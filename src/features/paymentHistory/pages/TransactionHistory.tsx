import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Filter, List, Grid } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import HistoriesTable from '../components/HistoriesTable';
import usePaymentHistoryList from '../hooks/useHistoryList';
import PaginationComponent from '../components/PaginationComponent';
import SearchFilterComponent from '../components/SearchFilterComponent';
import HistoriesListView from '../components/HistoriesListView';


const TransactionHistory = () => {
  const { t } = useTranslation();
  const {
    data,
    page,
    pageSize,
    total,
    isLoading,
    totalPages,
    status,
    setStatus,
    setSearch,
    setPage,
    setPageSize,
  } = usePaymentHistoryList(1, 10);

  const [viewMode, setViewMode] = useState<'table' | 'list'>('table');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');



  // const filteredTransactions = transactions.filter(transaction => {
  //   const matchesSearch = transaction.planName.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     transaction.transactionId.toLowerCase().includes(searchTerm.toLowerCase());
  //   const matchesStatus = statusFilter === 'all' || transaction.status === statusFilter;
  //   return matchesSearch && matchesStatus;
  // });




  return (
    <div className="container mx-auto px-4 py-6 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-baloo font-bold text-primary mb-4">
          {t('transactions.title')}
        </h1>
        <p className="text-base md:text-lg text-muted-foreground font-poppins">
          {t('transactions.description')}
        </p>
      </div>

      {/* Filters and Controls */}
      <div className="clay-card-enhanced mb-6">
        <div className="p-4 md:p-6">
          <SearchFilterComponent
            onSearchChange={setSearch}
            onFilterByStatus={setStatus}
          >
            <div className="flex items-center justify-end gap-2 w-full sm:w-auto">
              <Button
                variant={viewMode === 'table' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('table')}
                className="flex-1 sm:flex-none"
              >
                <Grid className="h-4 w-4 " />

              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('list')}
                className="flex-1 sm:flex-none"
              >
                <List className="h-4 w-4 " />

              </Button>
            </div>
          </SearchFilterComponent>

        </div>
      </div>



      {viewMode === 'table' && data && (<Card className="clay-card-enhanced">
        <CardContent className="p-4 md:p-6 ">
          <div className="flex items-center justify-between">
            {/* Table View */}
            <HistoriesTable
              data={data}
              isLoading={isLoading}
              page={page}
              pageSize={pageSize}
              total={total}
              onPageChange={setPage}
              onPageSizeChange={setPageSize}
            />

          </div>

        </CardContent>
      </Card>
      )}

      {/* List View */}
      {viewMode === 'list' && data && (
        <div className="space-y-4">
          <HistoriesListView
            data={data}
            isLoading={isLoading}
            page={page}
            pageSize={pageSize}
            total={total}
            onPageChange={setPage}
            onPageSizeChange={setPageSize}
          />
        </div>
      )}

      {/* Pagination */}
      <PaginationComponent
        page={page}
        pageSize={pageSize}
        total={total}
        totalPages={totalPages}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
      />


    </div>
  );
};

export default TransactionHistory;
