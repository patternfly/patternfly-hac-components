import React, { useMemo } from 'react';
import {
  SeverityCriticalIcon,
  SeverityImportantIcon,
  SeverityMinorIcon,
  SeverityModerateIcon,
  SeverityNoneIcon,
  SeverityUndefinedIcon
} from '@patternfly/react-icons';
import { Flex, FlexItem } from '@patternfly/react-core';

const severityLevels = (severity: SeverityType) => {
  switch (severity) {
  case 'critical':
    return <SeverityCriticalIcon color='var(--pf-t--global--icon--color--severity--critical--default)'/>;
  case 'important':
    return <SeverityImportantIcon color='var(--pf-t--global--icon--color--severity--important--default)' />;
  case 'minor':
    return <SeverityMinorIcon color='var(--pf-t--global--icon--color--severity--minor--default)' />;
  case 'moderate':
    return <SeverityModerateIcon color='var(--pf-t--global--icon--color--severity--moderate--default)' />;
  case 'none':
    return <SeverityNoneIcon color='var(--pf-t--global--icon--color--severity--none--default)' />;
  default:
    return <SeverityUndefinedIcon color='var(--pf-t--global--icon--color--severity--undefined--default)' />;
  }
};

export const SeverityType = {
  critical: 'critical',
  important: 'important',
  minor: 'minor',
  moderate: 'moderate',
  none: 'none',
  undefined: 'undefined',  
} as const;

export type SeverityType = (typeof SeverityType)[keyof typeof SeverityType];

export interface SeverityProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> {
  /** Determines a variant of displayed severity */
  severity: SeverityType;
  /** Label displayed next to the severity */
  label: React.ReactNode;
  /** Option to hide the label */
  labelHidden?: boolean;
  /** Custom className */
  className?: string;
  /** Custom OUIA ID */
  ouiaId?: string | number;
}

export const Severity: React.FunctionComponent<SeverityProps> = ({
  severity,
  label,
  labelHidden,
  ouiaId = 'Severity-icon',
  ...props
}: SeverityProps) => {


  const title = { title: `${severity} ${label}` };

  const severityVariant = useMemo(() => severityLevels(severity), [ severity ]);

  return (
    <React.Fragment>
      <Flex spaceItems={{ default: 'spaceItemsSm' }}>
        <FlexItem>
          {/* eslint-disable-next-line react/no-unknown-property */}
          <span  {...title} {...props} widget-type="Severity" widget-id={label} data-ouia-component-id={ouiaId}>
            {severityVariant}
          </span>
        </FlexItem>
        <FlexItem>
          {!labelHidden && label}
        </FlexItem>
      </Flex>
    </React.Fragment>
  );
};

export default Severity;
