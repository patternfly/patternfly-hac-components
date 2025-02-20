import * as React from 'react';
import { ExpandableSection, Title } from '@patternfly/react-core';
import { createUseStyles } from 'react-jss';
import ErrorState from '../ErrorState';
import ErrorStack from '../ErrorStack';

const useStyles = createUseStyles({
  expandableSectionToggle: {
    "& > .pf-v6-c-expandable-section__toggle": {
      margin: "auto",
    }
  },
})

export interface ErrorBoundaryProps {
  /** The title text to display on the error page */
  headerTitle?: React.ReactNode;
  /** Indicates if the error is silent */
  silent?: boolean;
  /** The title text to display with the error */
  errorTitle?: React.ReactNode;
  /** The description text to display with the error */
  errorDescription?: React.ReactNode;
  /** The default description text to display with the error if no errorDescription is provided */
  defaultErrorDescription?: React.ReactNode;
  /** The text for the toggle link that users can select to view error details */
  errorToggleText?: string;
  /** The component that the error boundary component is wrapped around, which should be returned if there is no error  */
  children?: React.ReactNode;
  /** Custom OUIA ID */
  ouiaId?: string | number;
  /** The heading level to use on the header title, default is h1 */
  headerTitleHeadingLevel?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  /** The heading level to use on the error title, default is h2 */
  errorTitleHeadingLevel?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

export interface ErrorBoundaryState {
  /** Indicates if there is currently an error */
  hasError: boolean;
  /** Error */
  error?: Error;
  /** Used for browser session history */
  historyState: History['state'];
}

interface ErrorPageProps extends ErrorBoundaryProps {
  /** JSS classes */
  classes: Record<string | number | symbol, string>;
}

export const ErrorBoundary: React.FunctionComponent<ErrorBoundaryProps> = ({
  headerTitleHeadingLevel = "h1",
  errorTitleHeadingLevel = "h2",
  ...props
}: ErrorBoundaryProps) => {
  const classes = useStyles();
  return (
    <ErrorBoundaryContent 
      classes={classes} 
      headerTitleHeadingLevel={headerTitleHeadingLevel} 
      errorTitleHeadingLevel={errorTitleHeadingLevel}
      {...props} 
    />
  );
}

// As of time of writing, React only supports error boundaries in class components
class ErrorBoundaryContent extends React.Component<ErrorPageProps, ErrorBoundaryState> {
  constructor(props: Readonly<ErrorPageProps>) {
    super(props);
    this.state = {
      hasError: false,
      historyState: history.state,
    };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error, historyState: history.state };
  }

  updateState = () => {
    if (this.state.historyState !== history.state) {
      this.setState({
        hasError: false,
        historyState: history.state,
      });
    }
  };

  componentDidUpdate(): void {
    this.updateState();
  }

  componentDidMount(): void {
    this.updateState();
  }

  render() {
    const { ouiaId = 'ErrorBoundary', errorTitleHeadingLevel, headerTitleHeadingLevel, ...props } = this.props;
    
    if (this.state.hasError) {
      if (this.props.silent) {
        return null;
      }

      return (
        <div data-ouia-component-id={ouiaId}>
          {props?.headerTitle && <Title headingLevel={headerTitleHeadingLevel || 'h1'} size="2xl" ouiaId={`${ouiaId}-title`}>{props.headerTitle}</Title>}
          <ErrorState
            titleText={props.errorTitle}
            headingLevel={errorTitleHeadingLevel}
            bodyText={
              <>
                <span>{props.errorDescription}</span>
                {this.state.error && ( 
                  <ExpandableSection className={props.classes.expandableSectionToggle} toggleText={props.errorToggleText ? props.errorToggleText : "Show details"} data-ouia-component-id={`${ouiaId}-toggle`}>
                    <ErrorStack error={this.state.error} data-ouia-component-id={`${ouiaId}-stack`}/>
                  </ExpandableSection>
                )}
              </>
            }
            defaultBodyText={props.defaultErrorDescription}
          />
        </div>
      );
    }

    return props.children;
  }
};

export default ErrorBoundary;
