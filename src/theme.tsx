import { createTheme } from '@mui/material/styles';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

// declare module '@mui/material/styles' {
//   interface PaletteColor {
//   }
//
//   interface SimplePaletteColorOptions extends PaletteColor {
//   }
// }
// declare module '@mui/material/styles' {
//   interface PaletteOptions {
//   }
//
//   interface Palette extends PaletteOptions {
//   }
// }

declare module '@mui/material/Chip' {
  interface ChipPropsVariantOverrides {
    answer: true;
    difficulty: true;
  }
}

declare module '@mui/material/styles' {
  interface Theme {
    borderRadius: {
      main: string;
      medium: string;
    };
    fontSize: {
      lg: string;
      md: string;
      sm: string;
      xs: string;
    };
  }
  interface ThemeOptions extends Theme {}
}

let theme = createTheme({
  unstable_sx: () => ({}),
  borderRadius: {
    main: '18px',
    medium: '16px',
  },
  fontSize: {
    lg: '18px',
    md: '16px',
    sm: '14px',
    xs: '12px',
  },
  palette: {
    primary: {
      main: '#3A7859',
      dark: '#2D6A4C',
    },
    success: { main: '#42A976' },
    error: { main: '#EF7D54' },
    warning: { main: '#EAC505' },
  },
});

theme = createTheme(theme, {
  components: {
    MuiContainer: {
      defaultProps: {
        component: 'main',
        sx: {
          [theme.breakpoints.down('sm')]: {
            marginTop: '100px',
            padding: '0 10px',
          },
          [theme.breakpoints.up('sm')]: {
            marginTop: '134px',
          },
        },
      },
    },

    MuiTypography: {
      variants: [
        {
          props: { variant: 'h1' },
          style: {
            color: theme.palette.primary.main,
            [theme.breakpoints.down('sm')]: {
              fontSize: '40px',
            },
            [theme.breakpoints.up('sm')]: {
              fontSize: '50px',
            },
            fontWeight: theme.typography.fontWeightBold,
            lineHeight: '150%',
          },
        },
        {
          props: { variant: 'h2' },
          style: {
            [theme.breakpoints.down('sm')]: {
              fontSize: '20px',
            },
            [theme.breakpoints.up('sm')]: {
              fontSize: '30px',
            },
            fontWeight: theme.typography.fontWeightBold,
            lineHeight: '150%',
          },
        },
      ],
    },

    MuiChip: {
      variants: [
        {
          props: { variant: 'answer' },
          style: {
            border: '2px solid #95B6A9',
            background: 'transparent',
            [theme.breakpoints.down('sm')]: {
              borderRadius: theme.borderRadius.medium,
              width: '250px',
              height: '46px',
              fontSize: theme.fontSize.sm,
            },
            [theme.breakpoints.up('sm')]: {
              borderRadius: theme.borderRadius.main,
              width: '290px',
              height: '56px',
              fontSize: theme.fontSize.lg,
            },
            ':hover': {
              color: theme.palette.primary.main,
              background: '#D4E0E0',
              border: 'none',
            },
          },
        },
        {
          props: { variant: 'difficulty' },
          style: {
            [theme.breakpoints.down('sm')]: {
              borderRadius: '9px 0px 9px 9px',
              width: '80px',
              height: '28px',
              fontSize: theme.fontSize.xs,
            },
            [theme.breakpoints.up('sm')]: {
              borderRadius: '12px 0px 12px 12px',
              width: '100px',
              height: '37px',
              fontSize: theme.fontSize.md,
            },
            color: 'white',
          },
        },
      ],
    },

    MuiMenuItem: {
      styleOverrides: {
        root: {
          color: theme.palette.primary.main,
          borderRadius: theme.borderRadius.medium,
          marginTop: '4px',
          ':hover': { background: '#E7EBF1' },
        },
      },
    },

    MuiSelect: {
      defaultProps: {
        IconComponent: KeyboardArrowDownIcon,
        MenuProps: {
          PaperProps: {
            sx: {
              borderRadius: theme.borderRadius.main,
              mt: '6px',
              padding: '0 8px',
            },
          },
        },
      },
      styleOverrides: {
        root: {
          '& .MuiSvgIcon-root': {
            marginRight: '10px',
          },
          '& .MuiCircularProgress-svg': {
            paddingRight: '10px',
          },
          borderRadius: theme.borderRadius.main,
          [theme.breakpoints.down('sm')]: {
            width: '280px',
          },
          [theme.breakpoints.up('sm')]: {
            width: '320px',
          },
        },
      },
    },

    MuiButton: {
      defaultProps: { variant: 'contained' },
      variants: [
        {
          props: { variant: 'contained' },
          style: {
            borderRadius: theme.borderRadius.main,
            background: theme.palette.primary.main,
            padding: '16px',
            [theme.breakpoints.down('sm')]: {
              minWidth: '100px',
              fontSize: theme.fontSize.xs,
            },
            [theme.breakpoints.up('sm')]: {
              minWidth: '150px',
            },
            ':hover': { background: theme.palette.primary.dark },
          },
        },
      ],
    },
  },
});

export default theme;
