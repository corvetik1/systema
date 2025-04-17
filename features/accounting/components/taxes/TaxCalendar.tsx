// src/features/accounting/components/taxes/TaxCalendar.tsx
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Box, Typography } from '@mui/material';
import {
  TaxCalendarContainer,
  TaxCalendarHeader,
  TaxCalendarTitle,
  TaxCalendarDays,
  TaxCalendarDayName,
  TaxCalendarGrid,
  TaxCalendarCell,
  TaxCalendarDateNumber,
  TaxEventOverdue,
  TaxEventOnTime,
  TaxEventPending,
  TaxTooltip,
} from '../AccountingStyles';
import { RootState } from '../../../../app/store';
import { selectTaxes } from '../../store/taxes/selectors';

const TaxCalendar: React.FC = () => {
  const taxes = useSelector((state: RootState) => selectTaxes(state));
  const [hoveredCell, setHoveredCell] = useState<number | null>(null);

  // Моковые данные для календаря (Октябрь 2023)
  const daysInMonth = 31;
  const firstDayOfMonth = new Date(2023, 9, 1).getDay(); // Октябрь 2023 начинается с воскресенья
  const startOffset = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1; // Смещение для начала месяца
  const calendarDays = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const emptyCells = Array.from({ length: startOffset }, () => null);

  const getTaxForDate = (day: number) => {
    const dateStr = `2023-10-${day.toString().padStart(2, '0')}`;
    // Проверка, что taxes — массив
    if (!Array.isArray(taxes)) {
      console.error('taxes is not an array:', taxes);
      return null;
    }
    return taxes.find((tax) => tax.paymentDate === dateStr) || null;
  };

  const getEventStyle = (status: string) => {
    switch (status) {
      case 'overdue':
        return TaxEventOverdue;
      case 'on-time':
        return TaxEventOnTime;
      case 'pending':
        return TaxEventPending;
      default:
        return Box;
    }
  };

  return (
    <TaxCalendarContainer>
      <TaxCalendarHeader>
        <TaxCalendarTitle>Октябрь 2023</TaxCalendarTitle>
      </TaxCalendarHeader>
      <TaxCalendarDays>
        {['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'].map((day) => (
          <TaxCalendarDayName key={day}>{day}</TaxCalendarDayName>
        ))}
      </TaxCalendarDays>
      <TaxCalendarGrid>
        {emptyCells.map((_, index) => (
          <TaxCalendarCell key={`empty-${index}`} />
        ))}
        {calendarDays.map((day) => {
          const tax = getTaxForDate(day);
          const EventBox = tax ? getEventStyle(tax.status) : Box;
          return (
            <TaxCalendarCell
              key={day}
              component={EventBox}
              onMouseEnter={() => tax && setHoveredCell(day)}
              onMouseLeave={() => setHoveredCell(null)}
            >
              <TaxCalendarDateNumber>{day}</TaxCalendarDateNumber>
              {tax && (
                <TaxTooltip className={hoveredCell === day ? 'visible' : ''}>
                  <Typography variant="body2">
                    <strong>{tax.name}</strong>
                    <br />
                    {tax.amount.toLocaleString('ru-RU', { style: 'currency', currency: 'RUB' })}
                    <br />
                    {tax.status === 'overdue' && 'Просрочен'}
                    {tax.status === 'on-time' && 'Своевременно'}
                    {tax.status === 'pending' && 'Ожидается'}
                  </Typography>
                </TaxTooltip>
              )}
            </TaxCalendarCell>
          );
        })}
      </TaxCalendarGrid>
    </TaxCalendarContainer>
  );
};

export default TaxCalendar;