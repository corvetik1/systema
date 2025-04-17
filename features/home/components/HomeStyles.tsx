import { SxProps, Theme } from '@mui/material/styles';

export const homeRootSx: SxProps<Theme> = {
  background: 'linear-gradient(to bottom, #f8fafc 0%, #e3e3e3 100%)',
  minHeight: '100vh',
  fontFamily: 'Roboto, Arial, sans-serif',
};

export const tenderCardSx: SxProps<Theme> = {
  background: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)',
  p: 3,
  borderRadius: 4,
  boxShadow: '0 6px 16px rgba(0,0,0,0.12)',
  transition: 'transform 0.2s',
  '&:hover': { transform: 'scale(1.02)' },
};

export const tableCellSx: SxProps<Theme> = {
  py: 1.5,
  px: 2,
  fontSize: '0.9rem',
  verticalAlign: 'middle',
  whiteSpace: 'nowrap',
};
export const tableCellWrapSx: SxProps<Theme> = {
  ...tableCellSx,
  whiteSpace: 'normal',
  minWidth: 150,
};
export const tableCellDocumentsSx: SxProps<Theme> = {
  minWidth: 200,
};
export const tableCellActionsSx: SxProps<Theme> = {
  minWidth: 100,
};
export const tableCellColorSx: SxProps<Theme> = {
  minWidth: 120,
};
export const tableCellDateLawRemainSx: SxProps<Theme> = {
  minWidth: 120,
};

export const customSelectSx: SxProps<Theme> = {
  appearance: 'none',
  backgroundImage:
    "url('data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke=\'%2347524e\'%3E%3Cpath stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'M19 9l-7 7-7-7\'/%3E%3C/svg%3E')",
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'right 0.5rem center',
  backgroundSize: '1em',
  pr: 4,
};

export const modalSx: SxProps<Theme> = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  opacity: 1,
  transition: 'opacity 0.3s ease',
};
export const modalContentSx: SxProps<Theme> = {
  transform: 'scale(1)',
  transition: 'transform 0.3s ease',
};

export const btnHoverSx: SxProps<Theme> = {
  transition: 'transform 0.2s',
  '&:hover': { transform: 'translateY(-1px)' },
};

// --- Tender Stages Filters ---
export const tenderStageBlockSx: SxProps<Theme> = {
  background: '#fff',
  p: 4,
  borderRadius: 4,
  boxShadow: '0 4px 12px rgba(0,0,0,0.10)',
  transition: 'transform 0.2s',
  '&:hover': { transform: 'scale(1.02)' },
};

export const tenderStageSwitchSx: SxProps<Theme> = {
  width: 48,
  height: 24,
  p: 0,
  '& .MuiSwitch-switchBase': {
    margin: 0.5,
    padding: 0,
    transform: 'translateX(0px)',
    transition: 'all 0.3s ease',
    '&.Mui-checked': {
      transform: 'translateX(24px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        backgroundColor: '#1976d2',
        opacity: 1,
      },
    },
  },
  '& .MuiSwitch-thumb': {
    boxSizing: 'border-box',
    width: 20,
    height: 20,
    backgroundColor: '#fff',
    boxShadow: '0 1px 2px rgba(0,0,0,0.3)',
  },
  '& .MuiSwitch-track': {
    borderRadius: 12,
    backgroundColor: '#d1d5db',
    opacity: 1,
    transition: 'background-color 0.3s ease',
  },
};
