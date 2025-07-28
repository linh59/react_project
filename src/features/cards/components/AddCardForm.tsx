

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

const AddCardForm = () => {
    const { t } = useTranslation();
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


        setNewCard({ name: '', number: '', expiry: '', cvv: '' });
        toast.success('Card added successfully');
    };
    return (
        <>
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
        </>
    )
}
export default AddCardForm;