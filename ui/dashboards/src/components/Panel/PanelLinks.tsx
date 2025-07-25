

import { IconButton, Link as LinkComponent, Menu, MenuItem, Theme } from '@mui/material';
import LaunchIcon from 'mdi-material-ui/Launch';
import { Link } from '@perses-dev/core';
import { MouseEvent, ReactElement, useState } from 'react';
import { InfoTooltip } from '@perses-dev/components';
import { useReplaceVariablesInString } from '@perses-dev/plugin-system';

export function PanelLinks({ links }: { links: Link[] }): ReactElement {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isMenuOpened = Boolean(anchorEl);
  const handleOpenMenu = (event: MouseEvent<HTMLButtonElement>): void => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (): void => {
    setAnchorEl(null);
  };

  // If there is only one link, show it directly
  if (links.length === 1 && links[0]) {
    const link = links[0];
    return <LinkButton link={link} />;
  }

  // Else we show a menu with a list of all links
  return (
    <>
      <InfoTooltip description={`${links.length} links`} enterDelay={100}>
        <IconButton
          aria-label="Panel links"
          size="small"
          onClick={handleOpenMenu}
          sx={(theme) => ({ borderRadius: theme.shape.borderRadius, padding: '4px' })}
        >
          <LaunchIcon
            aria-describedby="links-icon"
            fontSize="inherit"
            sx={{ color: (theme) => theme.palette.text.secondary }}
          />
        </IconButton>
      </InfoTooltip>

      <Menu
        anchorEl={anchorEl}
        open={isMenuOpened}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'panel-links',
        }}
      >
        {links.map((link: Link) => (
          <LinkMenuItem key={link.url} link={link} />
        ))}
      </Menu>
    </>
  );
}

function LinkButton({ link }: { link: Link }): ReactElement {
  const { url, name, tooltip, targetBlank } = useLink(link);

  return (
    <InfoTooltip description={tooltip ?? url} enterDelay={100}>
      <IconButton
        aria-label={name ?? url}
        size="small"
        href={url}
        target={targetBlank ? '_blank' : '_self'}
        sx={(theme) => ({ borderRadius: theme.shape.borderRadius, padding: '4px' })}
      >
        <LaunchIcon fontSize="inherit" sx={{ color: (theme: Theme) => theme.palette.text.secondary }} />
      </IconButton>
    </InfoTooltip>
  );
}

function LinkMenuItem({ link }: { link: Link }): ReactElement {
  const { url, name, tooltip, targetBlank } = useLink(link);

  return (
    <InfoTooltip description={tooltip ?? url} enterDelay={100}>
      <MenuItem component={LinkComponent} href={url} target={targetBlank ? '_blank' : '_self'}>
        {name ?? url}
      </MenuItem>
    </InfoTooltip>
  );
}

function useLink(link: Link): Link {
  const url = useReplaceVariablesInString(link.url) ?? link.url;
  const name = useReplaceVariablesInString(link.name);
  const tooltip = useReplaceVariablesInString(link.tooltip);

  if (link.renderVariables === false) {
    return link;
  }

  return { ...link, url, name, tooltip };
}
