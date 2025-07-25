

import { Button, ButtonGroup, ClickAwayListener, Grow, MenuList, Paper, Popper } from '@mui/material';
import { useState, useRef, ReactElement } from 'react';
import MenuDown from 'mdi-material-ui/MenuDown';

export interface ButtonMenuProps {
  children: JSX.Element[];
}

/**
 * ButtonMenu is a button with a drop down menu for more actions.
 * The first child is the button, the other are the menu entries.
 **/
const ButtonMenu = ({ children }: ButtonMenuProps): ReactElement => {
  const primary = children[0];
  const menuEntries = children.slice(1);
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLDivElement>(null);

  const handleToggle = (): void => {
    setOpen((prevOpen) => !prevOpen);
  };

  return (
    <>
      <ButtonGroup variant="contained" ref={anchorRef} aria-label="split button">
        {primary}
        <Button size="small" aria-expanded={open ? 'true' : undefined} aria-haspopup="menu" onClick={handleToggle}>
          <MenuDown />
        </Button>
      </ButtonGroup>
      <Popper
        sx={{
          zIndex: 1,
        }}
        open={open}
        anchorEl={anchorRef.current}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={() => setOpen(false)}>
                <MenuList id="split-button-menu" autoFocusItem>
                  {menuEntries}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  );
};

export default ButtonMenu;
