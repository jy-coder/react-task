import { useContext, useState } from "react";
import {
  Header,
  Container,
  Group,
  Burger,
  Paper,
  Transition,
  Button,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconMoonStars } from "@tabler/icons-react";
import Icon from "./Icon";
import AppContext, { IApp } from "../context/AppContext";
import { HEADER_HEIGHT, useStyles } from "./useStyles";
import { Link } from "react-router-dom";
import { User } from "../../types";
import UserContext from "../context/UserContext";

interface HeaderResponsiveProps {
  links: { link: string; label: string }[];
}

export function HeaderResponsive({ links }: HeaderResponsiveProps) {
  const [opened, { toggle, close }] = useDisclosure(false);
  const [active, setActive] = useState(links[0].link);
  const { classes, cx } = useStyles();
  const { setNavBarHidden, navBarHidden } = useContext<IApp>(AppContext);
  const { isAuth, setIsAuth } = useContext<User>(UserContext);

  const items = links.map((link) => (
    <Link key={link.label} to={link.link}>
      <Button
        onClick={(event) => {
          if (link.label === "Logout") {
            setIsAuth(false);
          }
          // event.preventDefault();
          // setActive(link.link);
          // close();
        }}
      >
        {link.label}
      </Button>
    </Link>
  ));

  const handleClick = () => {
    setNavBarHidden(!navBarHidden);
  };

  return (
    <Header height={HEADER_HEIGHT} mb={120} className={classes.root}>
      <Container className={classes.header}>
        {isAuth && (
          <Icon onClick={handleClick}>
            <IconMoonStars size="1rem" />
          </Icon>
        )}
        <Container size={28} />
        <Group spacing={5} className={classes.links}>
          {items}
        </Group>

        <Burger
          opened={opened}
          onClick={toggle}
          className={classes.burger}
          size="sm"
        />

        <Transition transition="pop-top-right" duration={200} mounted={opened}>
          {(styles) => (
            <Paper className={classes.dropdown} withBorder style={styles}>
              {items}
            </Paper>
          )}
        </Transition>
      </Container>
    </Header>
  );
}
