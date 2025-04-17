// src/features/accounting/components/counterparties/CounterpartyCard.tsx
import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import {
  CounterpartyCardContainer,
  CounterpartyCard,
  CounterpartyCardHeader,
  CounterpartyCardTitle,
  CounterpartyCardBody,
  CounterpartyCardText,
  CounterpartyCardFooter,
  CounterpartyDetailButton,
} from '../AccountingStyles';

interface Counterparty {
  id: number;
  name: string;
  inn: string;
  contactPerson?: string;
  phone: string;
  email?: string;
  address?: string;
  details?: string;
  status: 'active' | 'inactive';
}

interface CounterpartyCardProps {
  counterparty: Counterparty;
  onDetailsClick: (id: number) => void;
}

const CounterpartyCard: React.FC<CounterpartyCardProps> = ({ counterparty, onDetailsClick }) => {
  return (
    <CounterpartyCardContainer>
      <CounterpartyCard>
        <CounterpartyCardHeader>
          <CounterpartyCardTitle variant="h6">{counterparty.name}</CounterpartyCardTitle>
        </CounterpartyCardHeader>
        <CounterpartyCardBody>
          <CounterpartyCardText>
            <strong>ИНН:</strong> {counterparty.inn}
          </CounterpartyCardText>
          <CounterpartyCardText>
            <strong>Телефон:</strong> {counterparty.phone}
          </CounterpartyCardText>
          {counterparty.email && (
            <CounterpartyCardText>
              <strong>Email:</strong> {counterparty.email}
            </CounterpartyCardText>
          )}
        </CounterpartyCardBody>
        <CounterpartyCardFooter>
          <CounterpartyDetailButton onClick={() => onDetailsClick(counterparty.id)}>
            Подробнее
          </CounterpartyDetailButton>
        </CounterpartyCardFooter>
      </CounterpartyCard>
    </CounterpartyCardContainer>
  );
};

export default CounterpartyCard;