import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import type { PaymentHistoryProps } from "../authTypes";
import { getHistoryStatusBadge } from "../utils/gethistoryStatusBadge";
import { getHistoryDetailPath } from "../utils/goToHistoryDetail";



const HistoriesListView = (props: PaymentHistoryProps) => {
    const navigate = useNavigate();

    const { t } = useTranslation();
    return (
        < > {props.isLoading ? (
            <div className="p-4 text-center">Loading...</div>
        ) : (
            <>
                {props.data.map((transaction) => (
                    <div key={transaction.id} className="clay-card transition-all duration-300  hover:shadow-xl">
                        <div className="p-4 md:p-6">
                            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                                <div className="flex-1 space-y-3">
                                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                                        <h3 className="font-semibold text-lg">{transaction.selected_payment_type}</h3>
                                        <Badge className={getHistoryStatusBadge(transaction.status)}>
                                            {t(`transactions.${transaction.status}`)}
                                        </Badge>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4 text-sm">
                                        <div className="text-muted-foreground">
                                            <span className="font-medium">{t('transactions.amount')}: </span>
                                            <span className="font-semibold text-primary">${transaction.pay_amount}</span>
                                        </div>
                                        <div className="text-muted-foreground">
                                            <span className="font-medium">{t('transactions.date')}: </span>
                                            {new Date(transaction.create_date).toLocaleDateString()}
                                        </div>
                                        <div className="text-muted-foreground">
                                            <span className="font-medium">{t('transactions.paymentMethod')}: </span>
                                            {transaction.pay_method_name}
                                        </div>
                                        <div className="text-muted-foreground">
                                            <span className="font-medium">ID: </span>
                                            <span className="font-mono text-xs">{transaction.id}</span>
                                        </div>
                                    </div>
                                </div>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => navigate(getHistoryDetailPath(transaction.id))}
                                    className="clay-button hover:scale-[1.02] hover:shadow-md transition-all duration-200 w-full sm:w-auto"
                                >
                                    <Eye className="h-4 w-4 mr-2" />
                                    {t('transactions.viewDetails')}
                                </Button>
                            </div>
                        </div>
                    </div>
                ))}
            </>
        )
        }
        </>
    )
}

export default HistoriesListView;