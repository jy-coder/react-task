import { createStyles, rem } from '@mantine/core';

export const HEADER_HEIGHT = rem(60);

export const useStyles = createStyles((theme) => ({
  root: {
    position: 'relative',
    zIndex: 100,
    backgroundColor: theme.colors.darkGrey
  },

  appShell: {
    root: {
      backgroundColor: theme.colors.darkGrey
    },
    main: {
      backgroundColor: theme.colors.darkGrey
    }
  },

  hiddenNav: {
    position: 'relative',
    zIndex: 100,
    visibility: 'hidden'
  },

  dropdown: {
    position: 'absolute',
    top: HEADER_HEIGHT,
    left: 0,
    right: 0,
    zIndex: 0,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    borderTopWidth: 0,
    overflow: 'hidden',

    [theme.fn.largerThan('sm')]: {
      display: 'none'
    }
  },

  header: {
    maxWidth: '120rem !important',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%'
  },

  links: {
    [theme.fn.smallerThan('sm')]: {
      display: 'none'
    }
  },

  burger: {
    [theme.fn.largerThan('sm')]: {
      display: 'none'
    }
  },

  link: {
    display: 'block',
    lineHeight: 1,
    padding: `${rem(8)} ${rem(12)}`,
    borderRadius: theme.radius.sm,
    textDecoration: 'none',
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[6]
          : theme.colors.gray[0]
    },

    [theme.fn.smallerThan('sm')]: {
      borderRadius: 0,
      padding: theme.spacing.md
    }
  },

  linkActive: {
    '&, &:hover': {
      backgroundColor: theme.fn.variant({
        variant: 'light',
        color: theme.primaryColor
      }).background,
      color: theme.fn.variant({ variant: 'light', color: theme.primaryColor })
        .color
    }
  },

  input: {
    input: {
      backgroundColor: `${theme.colors.lightGrey}`,
      color: theme.colors.white
    },
    wrapper: {
      backgroundColor: `${theme.colors.lightGrey}`,
      color: theme.colors.white
    }
  },
  passwordInput: {
    input: {
      backgroundColor: `${theme.colors.lightGrey}`,
      color: theme.colors.white
    }
  },
  center: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: theme.colors.darkGrey
  },
  paper: {
    backgroundColor: theme.colors.darkGrey
  }
}));
