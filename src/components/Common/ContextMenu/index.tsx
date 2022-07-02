import {
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 } from "uuid";

type Props = {
  children: any;
  menuItems: Array<{
    title: string;
    goTo?: string;
    color?: string;
    action?: any;
    Icon?: any;
  }>;
};

export default function ContextMenu(props: Props) {
  const theme = useTheme();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const onContextToggle = (event: any) => {
    event.preventDefault();
    setAnchorEl((pAE) => (pAE ? null : event.currentTarget));
  };
  const doAction = (action?: any, goTo?: string) => {
    if (goTo) navigate(goTo);
    else if (action) action();
    setAnchorEl(null);
  };
  return (
    <>
      {props.children({ onContextToggle })}
      <Menu
        sx={{ p: 0 }}
        PaperProps={{ sx: { bgcolor: "rgb(18,18,18)" } }}
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={onContextToggle}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        {props.menuItems.map((menuItem) => {
          return (
            <MenuItem
              key={v4()}
              sx={{ width: theme.spacing(25) }}
              onClick={() => doAction(menuItem.action, menuItem.goTo)}
            >
              {menuItem.Icon && (
                <ListItemIcon>
                  <menuItem.Icon
                    fontSize="small"
                    style={{ color: menuItem.color || "white" }}
                  />
                </ListItemIcon>
              )}
              <ListItemText sx={{ color: menuItem.color || "white" }}>
                {menuItem.title}
              </ListItemText>
            </MenuItem>
          );
        })}
      </Menu>
    </>
  );
}
