

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import AddCardForm from './AddCardForm';

const AddCardDialog = () => {
    const [isAddCardOpen, setIsAddCardOpen] = useState(false);
    const { t } = useTranslation();


    return (
        <Dialog open={isAddCardOpen} onOpenChange={setIsAddCardOpen}>
            <DialogTrigger asChild>
                <Button >
                    <Plus className="h-4 w-4 mr-2" />
                    {t('bankCards.addCard')}
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{t('bankCards.addNewCard')}</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                    <AddCardForm />
                </div>
            </DialogContent>
        </Dialog>
    )
}
export default AddCardDialog;