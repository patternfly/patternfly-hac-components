import { css } from '@emotion/react';
import * as React from 'react';
import Shortcut, { ShortcutProps } from '../Shortcut/Shortcut';
import { Grid, GridItem, GridItemProps, GridProps } from '@patternfly/react-core';

/** extends GridProps */
export interface ShortcutGridProps extends GridProps {
  /** Array of shortcuts to be displayed in the grid */
  shortcuts: ShortcutProps[];
  /** Shortcut GridItem props */
  gridItemProps?: GridItemProps;
  /** Custom OUIA ID */
  ouiaId?: string | number;
}

const styles = {
  shortcutGridItem: css`
    test-align: right;
    margin-right: var(--pf-t--global--spacer--md);
  `
};

const ShortcutGrid: React.FunctionComponent<ShortcutGridProps> = ({ shortcuts, gridItemProps, ouiaId = 'ShortcutGrid', ...props }: ShortcutGridProps) => (
  <Grid span={6} hasGutter key="grid" data-ouia-component-id={ouiaId} {...props}>
    {shortcuts.map((shortcut, index) => {
      const { description, ...props } = shortcut;
      return(
        <React.Fragment key={index}>
          <GridItem css={styles.shortcutGridItem} data-ouia-component-id={`${ouiaId}-item-${index}`} {...gridItemProps}>
            <Shortcut {...props}/>
          </GridItem>
          <GridItem data-ouia-component-id={`${ouiaId}-item-description-${index}`}>{description}</GridItem>
        </React.Fragment>
      )})}
  </Grid>)

export default ShortcutGrid;