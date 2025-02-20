import React from 'react';
import { Button, EmptyState, EmptyStateBody, EmptyStateFooter, EmptyStateProps, EmptyStateVariant } from '@patternfly/react-core';
import NotFoundIcon from '../NotFoundIcon';

/** extends EmptyStateProps */
export interface MissingPageProps extends Omit<EmptyStateProps, 'children' | 'title' | 'titleText'> {
  /** The URL that the home page link points to */
  toHomePageUrl?: string;
  /** The text label for the link that points back to the home page */
  toHomePageText?: React.ReactNode;
  /** The title for the invalid object message */
  titleText?: React.ReactNode;
  /** The body text for the invalid object message */
  bodyText?: React.ReactNode;
  /** Custom OUIA ID */
  ouiaId?: string | number;
}

export const MissingPage: React.FunctionComponent<MissingPageProps> = ({
  toHomePageUrl = window.location.origin,
  toHomePageText = 'Return to homepage',
  titleText = 'We lost that page',
  bodyText = "Let's find you a new one. Try a new search or return home.",
  ouiaId = "MissingPage",
  headingLevel = 'h1',
  ...props
}: MissingPageProps) => (
  <EmptyState headingLevel={headingLevel} icon={NotFoundIcon} variant={EmptyStateVariant.full} data-ouia-component-id={ouiaId} {...props} titleText={titleText}>
    <EmptyStateBody data-ouia-component-id={`${ouiaId}-body`}>{bodyText}</EmptyStateBody>
    <EmptyStateFooter data-ouia-component-id={`${ouiaId}-footer`}>
      <Button variant="link" component="a" href={toHomePageUrl} ouiaId={`${ouiaId}-home-button`}>
        {toHomePageText}
      </Button>
    </EmptyStateFooter>
  </EmptyState>
);

export default MissingPage;
