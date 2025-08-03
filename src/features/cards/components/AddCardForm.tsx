import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useTranslation } from 'react-i18next';
import type { AppDispatch, RootState } from '@/app/store';
import { addCard } from '../redux/cardThunks';
import type { CardRequest } from '../authTypes';
import { toast } from 'sonner';
import { handleAPIError } from '@/lib/handleAPIError';

import type { AxiosErrors } from 'axios';
import type { ValidationErrors } from '@/features/auth/authThunks';


const schema = yup.object({
    holder_name: yup.string().required('Card name is required'),
    card_no: yup
        .string()
        .required('Card number is required')
        .matches(/^\d{4}\s?\d{4}\s?\d{4}\s?\d{4}$/, 'Card number must be 16 digits'),
    expire: yup
        .string()
        .required('Expiry date is required')
        .matches(/^(0[1-9]|1[0-2])\/\d{2}$/, 'Expiry must be MM/YY'),
    security_code: yup
        .string()
        .required('CVV is required')
        .matches(/^\d{3,4}$/, 'CVV must be 3 or 4 digits'),
});

const AddCardForm = ({ onSuccess }: { onSuccess?: () => void }) => {
    const { t } = useTranslation();
    const dispatch = useDispatch<AppDispatch>();
    const { addLoading } = useSelector((state: RootState) => state.cards);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<CardRequest>({
        resolver: yupResolver(schema),
        defaultValues: {
            holder_name: '',
            card_no: '',
            expire: '',
            security_code: '',
        },
    });

    const onSubmit = async (data: CardRequest) => {
        try {
            await dispatch(addCard(data)).unwrap();
            toast.success(t('bankCards.addSuccess'));
            reset();
            onSuccess?.();
        } catch (err) {
            
            toast.error(err as string);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
                <Label htmlFor="cardName">{t('bankCards.cardName')}</Label>
                <Input id="cardName" placeholder="Personal Card" {...register('holder_name')} />
                {errors.holder_name && <p className="text-red-500 text-sm">{errors.holder_name.message}</p>}
            </div>

            <div>
                <Label htmlFor="cardNumber">{t('bankCards.cardNumber')}</Label>
                <Input id="cardNumber" placeholder="1234 5678 9012 3456" {...register('card_no')} />
                {errors.card_no && <p className="text-red-500 text-sm">{errors.card_no.message}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <Label htmlFor="expiry">{t('bankCards.expiry')}</Label>
                    <Input id="expiry" placeholder="MM/YY" {...register('expire')} />
                    {errors.expire && <p className="text-red-500 text-sm">{errors.expire.message}</p>}
                </div>
                <div>
                    <Label htmlFor="cvv">{t('bankCards.cvv')}</Label>
                    <Input id="cvv" placeholder="123" {...register('security_code')} />
                    {errors.security_code && <p className="text-red-500 text-sm">{errors.security_code.message}</p>}
                </div>
            </div>

            <Button type="submit" className="w-full" disabled={addLoading}>
                {addLoading ? t('common.loading') : t('bankCards.addCard')}
            </Button>
        </form>
    );
};

export default AddCardForm;
