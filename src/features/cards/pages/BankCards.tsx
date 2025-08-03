
import { useEffect, } from 'react';
import { useTranslation } from 'react-i18next';
import AddCardDialog from '../components/AddCardDialog';
import { fetchCards } from '@/features/cards/redux/cardThunks';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '@/app/store';
import Cards from '../components/Cards';


const BankCards = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const { list: cards, fetchLoading, fetchError} = useSelector((state: RootState) => state.cards)

  useEffect(() => {
    dispatch(fetchCards())
  }, [dispatch])

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
       
        <Cards cards={cards} isLoading={fetchLoading} errorMessage={fetchError}/>
      
      </div>
    </div>
  );
};

export default BankCards;
