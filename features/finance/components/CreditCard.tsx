import React from 'react';
import {
  CreditCardSimpleContainer,
  CreditCardHeaderSimple,
  CreditCardTitle,
  CreditCardDueDate,
  CreditCardBody,
  CreditCardItem,
  CreditCardLabel,
  CreditCardValue,
  CreditCardProgressContainerSimple,
  CreditCardProgress,
  CreditCardFooterSimple,
  CreditCardFooterItem,
} from './FinanceStyles';

interface CreditCardProps {
  creditLimit: number;
  debt: number;
  gracePeriod?: string;
  minPayment: number;
  paymentDueDate?: string;
}

const CreditCard: React.FC<CreditCardProps> = ({
  creditLimit,
  debt,
  gracePeriod,
  minPayment,
  paymentDueDate,
}) => {
  const progress = creditLimit > 0 ? Math.min((debt / creditLimit) * 100, 100) : 0;
  const available = creditLimit - debt;

  return (
    <CreditCardSimpleContainer>
      <CreditCardHeaderSimple>
        <CreditCardTitle>
          Лимит: ₽ {creditLimit.toLocaleString('ru-RU')}
        </CreditCardTitle>
        <CreditCardDueDate>
          Дата платежа<br />
          <strong>{paymentDueDate || '—'}</strong>
        </CreditCardDueDate>
      </CreditCardHeaderSimple>

      <CreditCardBody>
        <CreditCardItem>
          <CreditCardLabel>Долг</CreditCardLabel>
          <CreditCardValue>
            ₽ {debt.toLocaleString('ru-RU')}
          </CreditCardValue>
          <CreditCardProgressContainerSimple>
            <CreditCardProgress progress={progress} />
          </CreditCardProgressContainerSimple>
        </CreditCardItem>

        <CreditCardItem>
          <CreditCardLabel>Доступно</CreditCardLabel>
          <CreditCardValue>
            ₽ {available.toLocaleString('ru-RU')}
          </CreditCardValue>
        </CreditCardItem>

        <CreditCardItem>
          <CreditCardLabel>Льготный период</CreditCardLabel>
          <CreditCardValue>
            {gracePeriod ? `${gracePeriod} дней` : '—'}
          </CreditCardValue>
        </CreditCardItem>
      </CreditCardBody>

      <CreditCardFooterSimple>
        <CreditCardFooterItem>
          Мин. платёж:<br />
          <strong>
            ₽ {minPayment.toLocaleString('ru-RU')}
          </strong>
        </CreditCardFooterItem>
      </CreditCardFooterSimple>
    </CreditCardSimpleContainer>
  );
};

export default CreditCard;
