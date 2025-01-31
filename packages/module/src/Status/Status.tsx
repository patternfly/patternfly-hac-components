import { css } from '@emotion/react';
import * as React from 'react';
import { Button, ButtonVariant, Flex, FlexItem, Icon, Popover, PopoverPosition, PopoverProps, Content, ContentVariants, } from '@patternfly/react-core';

export const StatusVariant = {
  link: 'link',
  popover: 'popover',
  plain: 'plain'
} as const;

export type StatusVariant = typeof StatusVariant[keyof typeof StatusVariant];

export const IconStatus = {
  custom: 'custom',
  info: 'info',
  success: 'success',
  warning: 'warning',
  danger: 'danger'
} as const;

export type IconStatus = typeof IconStatus[keyof typeof IconStatus];

export interface StatusProps extends React.PropsWithChildren {
  /** Status label text */
  label?: string;
  /** Description to be displayed under the label */
  description?: string;
  /** If true, only displays icon */
  iconOnly?: boolean;
  /** Variant of the status component to be displayed */
  variant?: StatusVariant;
  /** Status icon */
  icon?: React.ReactElement;
  /** Status to control icon color */
  status: IconStatus;
  /** Icon title for accessibility */
  iconTitle?: string;
  /** Custom OUIA ID */
  ouiaId?: string | number;
  /** Props for the optional popover */
  popoverProps?: PopoverProps;
  /** Optional link variant onClick callback */
  onClick?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
}

const styles = {
  icon: css`
    margin: 0;
    align-self: flex-start;
  `,
  statusLabel: css`
    line-height: var(--pf-t--global--spacer--md);
  `,
  statusDescription: css`
    color: var(--pf-t--color--gray--50);
  `
};

export const Status: React.FC<StatusProps> = ({ variant = StatusVariant.plain, label, children, iconOnly, icon, status, iconTitle, ouiaId = 'Status', popoverProps, onClick, description, ...props }: StatusProps) => {

  if (iconOnly && !iconTitle) {
    // eslint-disable-next-line no-console
    console.warn('iconOnly is true but no iconTitle is provided. Please provide a descriptive iconTitle for accessibility.');
  }

  const statusBody = (
    <Flex title={label} alignItems={{ default: 'alignItemsCenter' }} {...props}>
      {icon && (
        <FlexItem css={styles.icon}>
          <Icon className='pf-v6-u-mr-sm' status={status} title={iconTitle ?? status} data-ouia-component-id={`${ouiaId}-icon`}>
            {icon}
          </Icon>
        </FlexItem>
      )}
      {!iconOnly && (
        <FlexItem>
          <Content ouiaId={`${ouiaId}-label`} 
            css={styles.statusLabel} style={{ marginBlockEnd: 0 }}>{label}</Content>
          {description && <Content component={ContentVariants.small} ouiaId={`${ouiaId}-description`} css={styles.statusDescription}>{description}</Content>}
        </FlexItem>
      )}
    </Flex>
  );

  if (variant === StatusVariant.link) {
    return (
      <Button variant={ButtonVariant.link} title={label} onClick={onClick} ouiaId={`${ouiaId}-link-icon`}>
        {statusBody}
      </Button>
    );
  }

  if (variant === StatusVariant.popover) {
    return (
      <Popover
        position={PopoverPosition.right}
        headerContent={label}
        bodyContent={children}
        aria-label={label}
        data-ouia-component-id={`${ouiaId}-popover`}
        {...popoverProps}
      >
        <Button variant={ButtonVariant.link} isInline style={{ textDecoration: 'none' }} ouiaId={`${ouiaId}-popover-icon`}>
          {statusBody}
        </Button>
      </Popover>
    );
  }

  return statusBody;
};

export default Status;
