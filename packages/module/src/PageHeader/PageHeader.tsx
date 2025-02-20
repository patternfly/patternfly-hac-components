import React from 'react';
import {
  Flex,
  FlexItem,
  Split,
  SplitItem,
  Content,
  PageSection,
  Button,
  ButtonVariant,
  ButtonProps,
  Divider,
} from '@patternfly/react-core';
import { ExternalLinkAltIcon } from '@patternfly/react-icons';
import { createUseStyles } from 'react-jss';

/** extends ButtonProps */
export interface PageHeaderLinkProps extends ButtonProps {
  /** Title for the link */
  label: string;
  /** Indicates if the link points to an external page */
  isExternal?: boolean;
}

export interface PageHeaderProps extends React.PropsWithChildren {
  /** Title for page header */
  title: React.ReactNode;
  /** Subtitle for page header */
  subtitle: React.ReactNode;
  /** Optional link below subtitle */
  linkProps?: PageHeaderLinkProps;
  /** Optional icon for page header (appears to the left of the page header's title with a divider) */
  icon?: React.ReactNode;
  /** Optional label for page header (appears to the right of the page header's title) */
  label?: React.ReactNode;
  /** Breadcrumbs component */
  breadcrumbs?: React.ReactNode;
  /** Menu that appears to the far right of the title */
  actionMenu?: React.ReactNode;
  /** Custom OUIA ID */
  ouiaId?: string | number;
  /** Child nodes */
  children?: React.ReactNode;
}

const useStyles = createUseStyles({
  iconMinWidth: {
    minWidth: '48px',
  }
});

export const PageHeader: React.FunctionComponent<PageHeaderProps> = ({
  title,
  subtitle,
  linkProps,
  icon,
  label,
  breadcrumbs = null,
  actionMenu,
  ouiaId = 'PageHeader',
  children = null
}: PageHeaderProps) => {
  const classes = useStyles();
  const { isExternal = false, ...linkRestProps } = linkProps ?? {};

  return (
    <PageSection hasBodyWrapper={false}>
      { breadcrumbs && (
        <div className="pf-v6-u-mb-md">
          {breadcrumbs}
        </div>
      )}
      <Flex>
        {icon && (
          <>
            <FlexItem alignSelf={{ default: 'alignSelfCenter' }} className={`${classes.iconMinWidth}`}>
              {icon}
            </FlexItem>
            <Divider orientation={{
              default: 'vertical',
            }} />
          </>
        )}
        <FlexItem flex={{ default: 'flex_1' }}>
          <Split hasGutter>
            <SplitItem>
              <Content className="pf-v6-u-mb-sm" component="h1" ouiaId={`${ouiaId}-title`}>
                {title}
              </Content>
            </SplitItem>
            {label && (
              <SplitItem>
                {label}
              </SplitItem>
            )}
            <SplitItem isFilled />
            {actionMenu && (
              <SplitItem>
                {actionMenu}
              </SplitItem>
            )}
          </Split>
          <Content component="p" ouiaId={`${ouiaId}-subtitle`}>
            {subtitle}
          </Content>
          {linkProps && (
            <Button variant={ButtonVariant.link} component="a" ouiaId={`${ouiaId}-link-button`} isInline icon={isExternal ? <ExternalLinkAltIcon className='pf-v6-u-ml-sm' /> : null} iconPosition="end" {...linkRestProps}>
              {linkProps.label}
            </Button>
          )}
        </FlexItem>
      </Flex>
      {children}
    </PageSection>
  )};

export default PageHeader;
