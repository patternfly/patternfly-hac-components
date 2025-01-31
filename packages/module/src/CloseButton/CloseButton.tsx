import { css } from '@emotion/react';
import React from 'react';
import { Button, ButtonProps, ButtonVariant } from '@patternfly/react-core';
import { CloseIcon } from '@patternfly/react-icons';

const styles = {
  closeButton: css`
    float: inline-end;
    padding: 10px 14px;
  `
};

/** extends ButtonProps */
export interface CloseButtonProps extends ButtonProps {
  /** Data test ID used for testing. */
  dataTestID?: string;
};

export const CloseButton: React.FunctionComponent<CloseButtonProps> = ({
  dataTestID,
  onClick,
  ouiaId="CloseButton",
  ...props
}: CloseButtonProps) => (
  <Button icon={<CloseIcon />}
    aria-label={props['aria-label'] || 'Close'}
    css={styles.closeButton}
    data-test-id={dataTestID}
    onClick={onClick}
    variant={ButtonVariant.plain}
    ouiaId={ouiaId}
    {...props}
  />
);

export default CloseButton;
