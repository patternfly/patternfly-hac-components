import React from 'react';
import clsx from 'clsx';
import { Button, ButtonProps, Icon } from '@patternfly/react-core';
import { TagIcon } from '@patternfly/react-icons';
import { css } from '@emotion/react';

const styles = {
  buttonTagCount: css`
    display: flex;
    align-items: center;
    padding: var(--pf-t--global--spacer--sm) var(--pf-t--global--spacer--md);
  `,
  tagIcon: (isDisabled: boolean) => css`
    color: var(--pf-t--global--icon--color--${isDisabled ? '200' : '100'});
  `,
  tagText: css`
    margin-left: var(--pf-t--global--spacer--sm);
    font-size: var(--pf-t--global--font--size--sm);
  `,
};

/** extends ButtonProps */
export interface TagCountProps extends ButtonProps {
  /** Count to display in tag count component */
  count?: number;
  /** Additional classes added to the tag count component */
  className?: string;
  /** Icon size */
  iconSize?: 'sm' | 'md' | 'lg' | 'xl';
  /** Custom OUIA ID */
  ouiaId?: string | number;
}

const TagCount: React.FunctionComponent<TagCountProps> = ({
  count, 
  className,
  iconSize = 'md',
  ouiaId = 'TagCount',
  ...props 
}: TagCountProps) => {
  const tagClasses = clsx(styles.buttonTagCount, className);
  return (
    <Button 
      icon={
        <>
          <Icon iconSize={iconSize} data-ouia-component-id={`${ouiaId}-icon`}>
            <TagIcon css={styles.tagIcon(!count)} />
          </Icon>
          <span css={styles.tagText} data-ouia-component-id={`${ouiaId}-text`}>{count}</span>
        </>
      }
      aria-label="Tag count" 
      {...props}
      variant="plain"
      isDisabled={!count}
      className={tagClasses}
      ouiaId={ouiaId}
    />
  );
};

export default TagCount;
