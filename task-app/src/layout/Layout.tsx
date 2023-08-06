import { AppShell, Header, Navbar } from '@mantine/core'
import React, { type ReactNode, useContext } from 'react'
import { HeaderResponsive } from '../components/navbar/Header'
import AppContext, { type IApp } from '../components/context/AppContext'
import { MainLinks } from '../components/navbar/MainLinks'
import UserContext from '../components/context/UserContext'
import { type User } from '../types'
import { useStyles } from '../components/navbar/useStyles'

interface ILayoutProps {
  children: ReactNode
}

const Layout: React.FC<ILayoutProps> = ({ children }) => {
  const { navBarHidden } = useContext<IApp>(AppContext)

  const { isAuth } = useContext<User>(UserContext)
  const { classes, cx } = useStyles()

  return (
    <AppShell
      padding="md"
      className={classes.appShell}
      navbar={
        <Navbar
          height={600}
          mt={10}
          width={{ base: navBarHidden || !isAuth ? 0 : 300 }}
          style={
            navBarHidden || !isAuth
              ? { visibility: 'hidden' }
              : { backgroundColor: '#1a2332' }
          }
        >
          <Navbar.Section grow mt="md">
            <MainLinks />
          </Navbar.Section>
        </Navbar>
      }
      header={
        <Header height={60} p="xs">
          <HeaderResponsive
            links={
              !isAuth
                ? [
                    { link: '/login', label: 'Login' },
                    { link: '/register', label: 'Register' }
                  ]
                : [
                    { link: '/tasks', label: 'Task' },
                    { link: '/logout', label: 'Logout' }
                  ]
            }
          />
        </Header>
      }
    >
      {children}
    </AppShell>
  )
}

export default Layout
