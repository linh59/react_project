import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Eye } from "lucide-react";
import { useTranslation } from "react-i18next";
import type { PaymentHistoryProps } from "../authTypes";
import { useNavigate } from "react-router-dom";
import { getHistoryDetailPath } from "../utils/goToHistoryDetail";
import { getHistoryStatusBadge } from "../utils/gethistoryStatusBadge";

const HistoriesTable = (props: PaymentHistoryProps) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <>
      <Table className="border-collapse-separate border-spacing-0">
        <TableHeader>
          <TableRow className="border-b border-border/40">
            <TableHead className="text-left font-semibold">{t('transactions.planName')}</TableHead>
            <TableHead className="text-left font-semibold">{t('transactions.amount')}</TableHead>
            <TableHead className="text-left font-semibold hidden md:table-cell">{t('transactions.date')}</TableHead>
            <TableHead className="text-left font-semibold">{t('transactions.status')}</TableHead>
            <TableHead className="text-left font-semibold hidden lg:table-cell">{t('transactions.paymentMethod')}</TableHead>
            <TableHead className="text-left font-semibold">{t('transactions.actions')}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="divide-y divide-border/40">
          {props.isLoading ? (
            <div className="p-4 text-center">Loading...</div>
          ) : (
            <>
              {props.data.map((transaction) => (
                <TableRow key={transaction.id} className="hover:bg-muted/30 transition-colors">
                  <TableCell className="font-medium">
                    <div>
                      <div className="font-semibold">{transaction.selected_payment_type}</div>
                      <div className="text-sm text-muted-foreground md:hidden">
                        {new Date(transaction.create_date).toLocaleDateString()}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="font-semibold text-primary">${transaction.pay_amount}</TableCell>
                  <TableCell className="hidden md:table-cell text-muted-foreground">
                    {new Date(transaction.create_date).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Badge className={getHistoryStatusBadge(transaction.status)}>
                      {t(`transactions.${transaction.status}`)}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden lg:table-cell text-muted-foreground">
                    {transaction.pay_method_name}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => navigate(getHistoryDetailPath(transaction.id))}
                      className="clay-button text-sm hover:scale-[1.02] hover:shadow-md transition-all duration-200"
                    >
                      <Eye className="h-4 w-4 " />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </>
          )
          }

        </TableBody>
      </Table>

    </>
  )
}
export default HistoriesTable;