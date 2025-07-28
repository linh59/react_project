
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, CreditCard, Hash, Trash2 } from "lucide-react"
import { useTranslation } from "react-i18next"
import type { CardModel } from "../authTypes"
import { toast } from "sonner"

interface CardProps {
    card: CardModel;
}

const CardItem = ({ card }: CardProps) => {
    const { t } = useTranslation();
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
    const handleDeleteCard = (id: string) => {
        // setCards(cards.filter(card => card.id !== id));
        toast.success('Card removed successfully');
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
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteCard(card.id)}
                        className="text-destructive hover:text-destructive/90 hover:bg-destructive/10 transition-colors p-2"
                    >
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </div>

                <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Hash className="h-4 w-4" />
                        <span className="font-mono">{card.short_card_no}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>{t('bankCards.expires')} {card.expire}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default CardItem;