import {
  Button,
  EmptyState,
  EmptyStateBody,
  EmptyStateFooter,
  EmptyStateProps,
  EmptyStateStatus,
  EmptyStateVariant,
  Stack,
  StackItem, 
} from '@patternfly/react-core';
import { createUseStyles } from 'react-jss'
import React from 'react';

const useStyles = createUseStyles({
  errorDescription: {
    margin: 'auto'
  }
})

/** extends EmptyStateProps */
export interface ErrorStateProps extends Omit<EmptyStateProps, 'children' | 'titleText' | 'status'> {
  /** Title of the error. */
  titleText?: React.ReactNode;
  /** A description of the error, if no body text is provided then it will be set to the defaultBodyText. */
  bodyText?: React.ReactNode;
  /** A default description of the error used if no errorDescription is provided. */
  defaultBodyText?: React.ReactNode;
  /** Custom footer content */
  customFooter?: React.ReactNode;
  /** ErrorState OUIA ID */
  ouiaId?: string | number;
  /** Status of the error message. */
  status?: 'danger' | 'warning' | 'success' | 'info' | 'custom' | 'none';
}

const ErrorState: React.FunctionComponent<ErrorStateProps> = ({ 
  titleText = 'Something went wrong', 
  bodyText, 
  defaultBodyText, 
  customFooter, 
  ouiaId = "ErrorState", 
  headingLevel = "h4",
  status = EmptyStateStatus.danger,
  variant = EmptyStateVariant.lg,
  ...props 
}: ErrorStateProps) => { 
  const classes = useStyles();
  return (
    <EmptyState 
      headingLevel={headingLevel} 
      {...(status !== 'none' && { status } )}
      variant={variant} 
      titleText={titleText} 
      data-ouia-component-id={ouiaId} 
      {...props}
    >
      <EmptyStateBody data-ouia-component-id={`${ouiaId}-body`}>
        <Stack>
          {bodyText ? <StackItem className={classes.errorDescription}>{bodyText}</StackItem> : defaultBodyText}
        </Stack>
      </EmptyStateBody>
      <EmptyStateFooter data-ouia-component-id={`${ouiaId}-footer`}>
        { customFooter ||
          (document.referrer ? (
            <Button variant="primary" onClick={() => history.back()} ouiaId={`${ouiaId}-back-button`}>
              Return to last page
            </Button>
          ) : (
            <Button variant="primary" component="a" href="." target="_blank" rel="noopener noreferrer" ouiaId={`${ouiaId}-home-button`}>
              Go to home page
            </Button>
          ))}
      </EmptyStateFooter>
    </EmptyState>
  );
}

export default ErrorState;
