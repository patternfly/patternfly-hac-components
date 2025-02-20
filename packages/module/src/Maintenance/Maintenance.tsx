import React from 'react';
import { Button, EmptyState, EmptyStateBody, EmptyStateFooter, EmptyStateProps, EmptyStateStatus, EmptyStateVariant } from '@patternfly/react-core';
import { HourglassHalfIcon } from '@patternfly/react-icons';

/** extends EmptyStateProps */
export interface MaintenanceProps extends Omit<EmptyStateProps, 'children' | 'title'> {
    /** The title for the maintenance message */
    titleText?: React.ReactNode;
    /** Custom body text */
    bodyText?: React.ReactNode;
    /** A default bodyText used if no bodyText is provided */
    defaultBodyText?: React.ReactNode;
    /** Start time in a specific time zone */
    startTime?: React.ReactNode;
    /** End time in a specific time zone */
    endTime?: React.ReactNode;
    /** Time zone specification */
    timeZone?: React.ReactNode;
    /** Information link */
    redirectLinkUrl?: string;
    /** Information link title */
    redirectLinkText?: React.ReactNode;
    /** Custom footer content */
    customFooter?: React.ReactNode;
    /** Custom OUIA ID */
    ouiaId?: string | number;  }

const Maintenance: React.FunctionComponent<MaintenanceProps> = ({ 
  titleText = 'Maintenance in progress',
  defaultBodyText = 'We are currently undergoing scheduled maintenance. Thank you for understanding.',
  startTime,
  endTime,
  timeZone = 'UTC',
  bodyText,
  redirectLinkUrl = 'https://status.redhat.com',
  redirectLinkText = 'status.redhat.com.',
  customFooter = 'For more information please visit',
  ouiaId = 'Maintenance',
  headingLevel = 'h5',
  ...props 
}: MaintenanceProps) => {
  let formattedBodyText = bodyText;
  if (startTime && endTime && timeZone) {
    formattedBodyText += ` ${startTime} to ${endTime} ${timeZone}.`;
  }

  return (
    <EmptyState headingLevel={headingLevel} status={EmptyStateStatus.danger} icon={HourglassHalfIcon}  titleText={titleText} variant={EmptyStateVariant.lg} data-ouia-component-id={ouiaId} {...props}>
      <EmptyStateBody data-ouia-component-id={`${ouiaId}-body`}>
        {bodyText ? formattedBodyText : defaultBodyText}
      </EmptyStateBody>
      <EmptyStateFooter data-ouia-component-id={`${ouiaId}-footer`}>
        {customFooter && (
          <span>
            {customFooter}{' '}
            <Button 
              variant="link" 
              component="span" 
              isInline 
              href={redirectLinkUrl} 
              target="_blank" 
              ouiaId={`${ouiaId}-link`}
            >
              {redirectLinkText}
            </Button>
          </span>
        )}
      </EmptyStateFooter>
    </EmptyState>
  )};

export default Maintenance;


