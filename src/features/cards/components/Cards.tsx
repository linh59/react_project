import { Card, CardContent } from "@/components/ui/card"
import { CreditCard, Loader } from "lucide-react"
import { useTranslation } from "react-i18next"
import type { CardModel } from "../authTypes"
import CardItem from "./CardItem";

interface CardsProps {
  cards: CardModel[];
  isLoading: boolean;
  errorMessage?: string | null;
}

const Cards = (props: CardsProps) => {
  const { t } = useTranslation();
  if (props.isLoading) return <div className='text-center mx-auto'><Loader className="animate-spin" /></div>;
  if (props.errorMessage) return <p className="text-red-500">{props.errorMessage}</p>;
  return (
    <div>
      <div className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
        {props.cards.map((card) => (
          <CardItem card={card} key={card.id} />
        ))}
      </div>

      {props.cards.length === 0 && (
        <Card variant="enhanced">
          <CardContent className="p-8 text-center">
            <CreditCard className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">{t('bankCards.noCards')}</h3>
            <p className="text-muted-foreground">{t('bankCards.noCardsDescription')}</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
export default Cards