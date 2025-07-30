
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, CreditCard, Calendar, Hash, DollarSign, CheckCircle, Clock, XCircle, User, Mail, MapPin } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const TransactionDetail = () => {
  const { transactionId } = useParams<{ transactionId: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();

  // Mock transaction data - in real app, fetch by ID
  const transaction = {
    id: transactionId,
    planName: 'Premium Monthly',
    amount: 29.99,
    currency: 'USD',
    date: '2024-01-15T10:30:00Z',
    status: 'completed' as const,
    paymentMethod: 'Visa ending in 1234',
    transactionId: 'txn_1234567890',
    description: 'Monthly subscription to Premium Plan',
    billingDetails: {
      name: 'John Doe',
      email: 'john.doe@example.com',
      address: '123 Main St, City, State 12345',
    },
    receipt: {
      subtotal: 29.99,
      tax: 2.40,
      total: 32.39,
    },
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'pending': return <Clock className="h-5 w-5 text-yellow-600" />;
      case 'failed': return <XCircle className="h-5 w-5 text-red-600" />;
      default: return null;
    }
  };

  const getStatusBadge = (status: string) => {
    const baseClasses = "rounded-full px-3 py-1 text-sm font-medium shadow-inner";
    switch (status) {
      case 'completed': 
        return `${baseClasses} bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300`;
      case 'pending': 
        return `${baseClasses} bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300`;
      case 'failed': 
        return `${baseClasses} bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300`;
      default: 
        return `${baseClasses} bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300`;
    }
  };

  return (
    <div className="container mx-auto px-4 py-6 max-w-4xl">
      <div className="mb-8">
        <Button
          variant="ghost"
          onClick={() => navigate('/transactions')}
          className="mb-4 clay-button hover:scale-[1.02] hover:shadow-md transition-all duration-200"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          {t('common.back')}
        </Button>
        <h1 className="text-3xl md:text-4xl font-baloo font-bold text-primary mb-4">
          {t('transactions.transactionDetails')}
        </h1>
        <p className="text-base md:text-lg text-muted-foreground font-poppins">
          {t('transactions.transactionId')}: <span className="font-mono text-sm">{transaction.transactionId}</span>
        </p>
      </div>

      <div className="grid gap-6">
        {/* Transaction Status */}
        <div className="clay-card-enhanced">
          <div className="p-4 md:p-6">
            <div className="flex items-center gap-2 mb-6">
              {getStatusIcon(transaction.status)}
              <h2 className="text-xl font-baloo font-semibold">
                {t('transactions.transactionStatus')}
              </h2>
            </div>
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="space-y-3">
                <Badge className={getStatusBadge(transaction.status)}>
                  {t(`transactions.${transaction.status}`)}
                </Badge>
                <p className="text-sm text-muted-foreground">
                  {new Date(transaction.date).toLocaleString()}
                </p>
                <p className="text-sm text-muted-foreground">
                  {transaction.description}
                </p>
              </div>
              <div className="text-left lg:text-right">
                <p className="text-2xl md:text-3xl font-bold text-primary">
                  ${transaction.amount}
                </p>
                <p className="text-sm text-muted-foreground">
                  {transaction.currency}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Transaction Details */}
        <div className="clay-card-enhanced">
          <div className="p-4 md:p-6">
            <h2 className="text-xl font-baloo font-semibold mb-6">
              {t('transactions.details')}
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="flex items-start gap-3">
                <DollarSign className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-sm text-muted-foreground">{t('transactions.planName')}</p>
                  <p className="text-base font-semibold">{transaction.planName}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CreditCard className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-sm text-muted-foreground">{t('transactions.paymentMethod')}</p>
                  <p className="text-base font-semibold">{transaction.paymentMethod}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Calendar className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-sm text-muted-foreground">{t('transactions.date')}</p>
                  <p className="text-base font-semibold">
                    {new Date(transaction.date).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Hash className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-sm text-muted-foreground">{t('transactions.transactionId')}</p>
                  <p className="text-base font-semibold font-mono text-sm">{transaction.transactionId}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Billing Information */}
        <div className="clay-card-enhanced">
          <div className="p-4 md:p-6">
            <h2 className="text-xl font-baloo font-semibold mb-6">
              {t('transactions.billingInfo')}
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="flex items-start gap-3">
                <User className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-sm text-muted-foreground">{t('transactions.name')}</p>
                  <p className="text-base font-semibold">{transaction.billingDetails.name}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-sm text-muted-foreground">{t('transactions.email')}</p>
                  <p className="text-base font-semibold">{transaction.billingDetails.email}</p>
                </div>
              </div>
              <div className="flex items-start gap-3 md:col-span-2">
                <MapPin className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-sm text-muted-foreground">{t('transactions.address')}</p>
                  <p className="text-base font-semibold">{transaction.billingDetails.address}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Receipt */}
        <div className="clay-card-enhanced">
          <div className="p-4 md:p-6">
            <h2 className="text-xl font-baloo font-semibold mb-6">
              {t('transactions.receipt')}
            </h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">{t('transactions.subtotal')}</span>
                <span className="font-medium">${transaction.receipt.subtotal}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">{t('transactions.tax')}</span>
                <span className="font-medium">${transaction.receipt.tax}</span>
              </div>
              <div className="border-t border-border/40 pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold">{t('transactions.total')}</span>
                  <span className="text-lg font-bold text-primary">${transaction.receipt.total}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionDetail;
