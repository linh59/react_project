
import { useEffect, } from 'react';
import { useTranslation } from 'react-i18next';
import useCardList from '../hooks/useCardList';
import Cards from '../components/cards';
import AddCardDialog from '../components/AddCardDialog';


const BankCards = () => {
  const { t } = useTranslation();
  const { cards, isLoading, errorMessage, fetchCards } = useCardList();


  useEffect(() => {
    fetchCards();
  }, [])

  return (
    <div className="container mx-auto px-4 py-6 max-w-6xl">
      <div className="mb-2">
        <h1 className="text-4xl font-baloo font-bold text-primary mb-4">
          {t('bankCards.title')}
        </h1>
        <p className="text-lg text-muted-foreground font-poppins">
          {t('bankCards.description')}
        </p>
      </div>

      <div className="grid gap-6">
        {/* Add Card Button */}
       <div className='flex justify-end '>
         <AddCardDialog />
       </div>

        {/* Cards List */}
       
        <Cards cards={cards} isLoading={isLoading} errorMessage={errorMessage}/>
      
      </div>
    </div>
  );
};

export default BankCards;
