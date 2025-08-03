
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, CreditCard, Hash, Trash2 } from "lucide-react"
import { useTranslation } from "react-i18next"
import type { CardModel } from "../authTypes"
import { useDispatch } from "react-redux"
import type { AppDispatch } from "@/app/store"
import { deleteCardThunk } from "../redux/cardThunks"
import { toast } from "sonner"
import ConfirmDialog from "@/components/ConfirmDialog"
import { useState } from "react"

interface CardProps {
    card: CardModel;
}

const CardItem = ({ card }: CardProps) => {
    const { t } = useTranslation();
    const dispatch = useDispatch<AppDispatch>();
    const [openDialog, setOpenDialog] = useState(false);
    const [loading, setLoading] = useState(false);
    const getCardTypeIcon = (type: string) => {
        switch (type) {
            case 'VISA':
                return <div className="text-blue-600 font-bold text-sm">VISA</div>;
            case 'MASTER':
                return <div className="text-red-600 font-bold text-sm">MC</div>;
            case 'AMEX':
                return <div className="text-green-600 font-bold text-sm">AMEX</div>;
            default:
                return <CreditCard className="h-5 w-5 text-muted-foreground" />;
        }
    };
    const handleDeleteCard = async () => {
        try {
            setLoading(true);
            await dispatch(deleteCardThunk(card.id)).unwrap();
            toast.success(t('bankCards.deleteSuccess'));
            setOpenDialog(false);
        } catch {
            toast.error(t('bankCards.deleteFailed') || 'Failed to delete card');
        } finally {
            setLoading(false);
        }


    };

    return (

        <div key={card.id} className="clay-card-enhanced transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
            <div className="p-4 md:p-6">
                <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                        <div className="p-2 bg-primary/10 rounded-lg">
                            {getCardTypeIcon(card.card_type)}
                        </div>
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <h3 className="font-semibold text-base">{card.holder_name}</h3>
                                {card.selected && (
                                    <Badge className="bg-primary/20 text-primary text-xs rounded-full px-2 py-1">
                                        Default
                                    </Badge>
                                )}
                            </div>
                        </div>
                    </div>
                    <ConfirmDialog
                        open={openDialog}
                        onOpenChange={setOpenDialog}
                        title={t('bankCards.confirmDeleteTitle') || 'Confirm Delete'}
                        description={t('bankCards.confirmDeleteMessage') || 'Are you sure you want to delete this card?'}
                        trigger={
                            <Button
                                variant="ghost"
                                size="sm"
                                className="text-destructive hover:text-destructive/90 hover:bg-destructive/10 transition-colors p-2"
                            >
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        }
                        onConfirm={handleDeleteCard}
                        confirmText={t('common.ok')}
                        cancelText={t('common.cancel')}
                        loading={loading}
                    />
                </div>

                <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Hash className="h-4 w-4" />
                        <span className="font-mono">{card.short_card_no}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>{t('bankCards.expiry')} {card.expire}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default CardItem;