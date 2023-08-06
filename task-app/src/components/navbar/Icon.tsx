import React from "react";
import { Group, ActionIcon, Box, rem } from "@mantine/core";

interface IIconProps {
  children: JSX.Element;
  onClick?: () => void;
}

const Icon: React.FunctionComponent<IIconProps> = ({ children, onClick }) => {
  return (
    <Box>
      <Group position="apart">
        <ActionIcon variant="default" size={30} onClick={onClick}>
          {children}
        </ActionIcon>
      </Group>
    </Box>
  );
};

export default Icon;
