import React from 'react';
import {
  CreditCardSimpleContainer,
  CreditCardHeaderSimple,
  CreditCardTitle,
  CreditCardBody,
  CreditCardItem,
  CreditCardLabel,
  CreditCardValue,
} from './FinanceStyles';

interface DebitCardProps {
  name: string;
  balance: number;
}

const DebitCard: React.FC<DebitCardProps> = ({ name, balance }) => {
  return (
    <CreditCardSimpleContainer>
      <CreditCardHeaderSimple>
        <CreditCardTitle>{name}</CreditCardTitle>
      </CreditCardHeaderSimple>
      <CreditCardBody>
        <CreditCardItem>
          <CreditCardLabel>Баланс</CreditCardLabel>
          <CreditCardValue>₽ {balance.toLocaleString('ru-RU')}</CreditCardValue>
        </CreditCardItem>
      </CreditCardBody>
    </CreditCardSimpleContainer>
  );
};

export default DebitCard;
