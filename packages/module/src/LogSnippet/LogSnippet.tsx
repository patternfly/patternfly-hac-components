import * as React from 'react';
import { Alert, AlertVariant, CodeBlock, CodeBlockCode, Flex, FlexItem, FlexProps } from '@patternfly/react-core';

/** extends FlexProps */
export interface LogSnippetProps extends FlexProps {
  /** Log snippet or code to be displayed */
  logSnippet?: React.ReactNode;
  /** Message to appear above the log snippet */
  message: string | React.ReactNode;
  /** Log snippet alert variant */
  variant?: AlertVariant;
  /** Custom OUIA ID */
  ouiaId?: string | number;
}

export const LogSnippet: React.FunctionComponent<LogSnippetProps> = ({ logSnippet, message, variant = AlertVariant.danger, ouiaId = "LogSnippet", ...props }: LogSnippetProps) => (
  <Flex direction={{ default: 'column' }} data-ouia-component-id={ouiaId} {...props}>
    <FlexItem>
      { typeof message === 'string' ? <Alert isInline isPlain title={message} variant={variant} data-ouia-component-id={`${ouiaId}-message`} /> : message }
    </FlexItem>
    { logSnippet && <FlexItem>
      <CodeBlock data-ouia-component-id={`${ouiaId}-code-block`}>
        <CodeBlockCode data-ouia-component-id={`${ouiaId}-code-content`}>{logSnippet}</CodeBlockCode>
      </CodeBlock> 
    </FlexItem> }
  </Flex>
);

export default LogSnippet;
