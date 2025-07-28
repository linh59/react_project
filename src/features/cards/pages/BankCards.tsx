
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { CreditCard, Plus, Trash2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

interface BankCard {
  id: string;
  name: string;
  number: string;
  expiry: string;
  type: 'visa' | 'mastercard' | 'amex';
  isDefault: boolean;
}

const BankCards = () => {
  const { t } = useTranslation();
  const [cards, setCards] = useState<BankCard[]>([
    {
      id: '1',
      name: 'Personal Card',
      number: '**** **** **** 1234',
      expiry: '12/25',
      type: 'visa',
      isDefault: true,
    },
    {
      id: '2',
      name: 'Business Card',
      number: '**** **** **** 5678',
      expiry: '08/26',
      type: 'mastercard',
      isDefault: false,
    },
  ]);
  
  const [isAddCardOpen, setIsAddCardOpen] = useState(false);
  const [newCard, setNewCard] = useState({
    name: '',
    number: '',
    expiry: '',
    cvv: '',
  });

  const handleAddCard = () => {
    if (!newCard.name || !newCard.number || !newCard.expiry || !newCard.cvv) {
      toast.error('Please fill in all fields');
      return;
    }
    
    const card: BankCard = {
      id: Date.now().toString(),
      name: newCard.name,
      number: `**** **** **** ${newCard.number.slice(-4)}`,
      expiry: newCard.expiry,
      type: 'visa',
      isDefault: cards.length === 0,
    };
    
    setCards([...cards, card]);
    setNewCard({ name: '', number: '', expiry: '', cvv: '' });
    setIsAddCardOpen(false);
    toast.success('Card added successfully');
  };

  const handleDeleteCard = (id: string) => {
    setCards(cards.filter(card => card.id !== id));
    toast.success('Card removed successfully');
  };

  return (
    <div className="container mx-auto px-4 py-6 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-4xl font-baloo font-bold text-primary mb-4">
          {t('bankCards.title')}
        </h1>
        <p className="text-lg text-muted-foreground font-poppins">
          {t('bankCards.description')}
        </p>
      </div>

      <div className="grid gap-6">
        {/* Add Card Button */}
        <Dialog open={isAddCardOpen} onOpenChange={setIsAddCardOpen}>
          <DialogTrigger asChild>
            <Button className="w-full md:w-auto">
              <Plus className="h-4 w-4 mr-2" />
              {t('bankCards.addCard')}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{t('bankCards.addNewCard')}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="cardName">{t('bankCards.cardName')}</Label>
                <Input
                  id="cardName"
                  placeholder="Personal Card"
                  value={newCard.name}
                  onChange={(e) => setNewCard({ ...newCard, name: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="cardNumber">{t('bankCards.cardNumber')}</Label>
                <Input
                  id="cardNumber"
                  placeholder="1234 5678 9012 3456"
                  value={newCard.number}
                  onChange={(e) => setNewCard({ ...newCard, number: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="expiry">{t('bankCards.expiry')}</Label>
                  <Input
                    id="expiry"
                    placeholder="MM/YY"
                    value={newCard.expiry}
                    onChange={(e) => setNewCard({ ...newCard, expiry: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="cvv">{t('bankCards.cvv')}</Label>
                  <Input
                    id="cvv"
                    placeholder="123"
                    value={newCard.cvv}
                    onChange={(e) => setNewCard({ ...newCard, cvv: e.target.value })}
                  />
                </div>
              </div>
              <Button onClick={handleAddCard} className="w-full">
                {t('bankCards.addCard')}
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Cards List */}
        <div className="grid gap-4">
          {cards.map((card) => (
            <Card key={card.id} variant="enhanced">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-primary/10 rounded-full">
                      <CreditCard className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{card.name}</h3>
                        {card.isDefault && <Badge variant="secondary">Default</Badge>}
                      </div>
                      <p className="text-sm text-muted-foreground">{card.number}</p>
                      <p className="text-xs text-muted-foreground">
                        {t('bankCards.expires')} {card.expiry}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteCard(card.id)}
                    className="text-destructive hover:text-destructive/90"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {cards.length === 0 && (
          <Card variant="enhanced">
            <CardContent className="p-8 text-center">
              <CreditCard className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">{t('bankCards.noCards')}</h3>
              <p className="text-muted-foreground">{t('bankCards.noCardsDescription')}</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default BankCards;
