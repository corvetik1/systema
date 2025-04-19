import React from 'react';
import {
  CreditCardSimpleContainer,
  CreditCardHeaderSimple,
  CreditCardTitle,
  CreditCardBody,
  CreditCardItem,
  CreditCardLabel,
  CreditCardValue,
  CreditCardFooterSimple,
  CreditCardFooterItem,
} from './FinanceStyles';

interface LoanCardProps {
  name: string;
  amount: number;
  interestRate: number;
  term: number;
  endDate?: string;
  monthlyPayment: number;
}

const LoanCard: React.FC<LoanCardProps> = ({
  name,
  amount,
  interestRate,
  term,
  endDate,
  monthlyPayment,
}) => {
  return (
    <CreditCardSimpleContainer>
      <CreditCardHeaderSimple>
        <CreditCardTitle>{name}</CreditCardTitle>
      </CreditCardHeaderSimple>

      <CreditCardBody>
        <CreditCardItem>
          <CreditCardLabel>Сумма кредита</CreditCardLabel>
          <CreditCardValue>₽ {amount.toLocaleString('ru-RU')}</CreditCardValue>
        </CreditCardItem>

        <CreditCardItem>
          <CreditCardLabel>Процентная ставка</CreditCardLabel>
          <CreditCardValue>{interestRate}%</CreditCardValue>
        </CreditCardItem>

        <CreditCardItem>
          <CreditCardLabel>Срок</CreditCardLabel>
          <CreditCardValue>{term} мес.</CreditCardValue>
        </CreditCardItem>

        <CreditCardItem>
          <CreditCardLabel>Дата окончания</CreditCardLabel>
          <CreditCardValue>{endDate || '—'}</CreditCardValue>
        </CreditCardItem>
      </CreditCardBody>

      <CreditCardFooterSimple>
        <CreditCardFooterItem>
          Платеж в месяц:<br />
          <strong>₽ {monthlyPayment.toLocaleString('ru-RU')}</strong>
        </CreditCardFooterItem>
      </CreditCardFooterSimple>
    </CreditCardSimpleContainer>
  );
};

export default LoanCard;
