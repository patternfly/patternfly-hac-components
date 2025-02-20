import React from 'react';
import { Button, EmptyState, EmptyStateBody, EmptyStateFooter, EmptyStateProps, EmptyStateStatus, EmptyStateVariant } from '@patternfly/react-core';
import { ExclamationCircleIcon } from '@patternfly/react-icons';

/** extends EmptyStateProps */
export interface UnavailableContentProps extends Omit<EmptyStateProps, 'children' | 'titleText' | 'bodyText'> {
  /** The URL that the status page link points to */
  statusPageUrl?: string;
  /** The text label for the link that points to the status page */
  statusPageLinkText?: React.ReactNode;
  /** The title for the unavailable content message */
  titleText?: React.ReactNode;
  /** The body text for the unavailable content message */
  bodyText?: React.ReactNode;
  /** Custom OUIA ID */
  ouiaId?: string | number;
}

const UnavailableContent: React.FunctionComponent<UnavailableContentProps> = ({ 
  statusPageUrl = '',
  statusPageLinkText = 'Status Page',
  titleText = 'This page is temporarily unavailable',
  bodyText = 'Try refreshing the page. If the problem persists, contact your organization administrator or visit our status page for known outages.',
  ouiaId = 'UnavailableContent',
  headingLevel = "h5",
  ...props 
}: UnavailableContentProps) => (
  <EmptyState headingLevel={headingLevel} status={EmptyStateStatus.danger} icon={ExclamationCircleIcon}  titleText={titleText} variant={EmptyStateVariant.lg} data-ouia-component-id={ouiaId} {...props}>
    <EmptyStateBody data-ouia-component-id={`${ouiaId}-body`}>
      {bodyText}
    </EmptyStateBody>
    <EmptyStateFooter data-ouia-component-id={`${ouiaId}-footer`}>
      <Button component='a' variant='primary' href={statusPageUrl} target="_blank" rel="noopener noreferrer" ouiaId={`${ouiaId}-link-button`}>
        {statusPageLinkText}
      </Button>
    </EmptyStateFooter>
  </EmptyState>
);

export default UnavailableContent;
