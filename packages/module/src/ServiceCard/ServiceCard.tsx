import { css } from '@emotion/react';
import React from 'react';
import { Card, CardBody, CardFooter, CardHeader, CardProps, Content, ContentVariants, Flex, FlexItem } from '@patternfly/react-core';
import { HelperText, HelperTextItem } from '@patternfly/react-core/dist/dynamic/components/HelperText';
import clsx from 'clsx';

/** extends CardProps */
export interface ServiceCardProps extends CardProps {
  /** Service card title */
  title: string;
  /** Service card subtitle */
  subtitle?: string;
  /** Service card description */
  description: string;
  /** Service card icon */
  icon: React.ReactNode;
  /** Optional Service card helper text*/
  helperText?: string;
  /** Optional footer */
  footer?: React.ReactElement | null;
  /** Optional custom OUIA ID */
  ouiaId?: string | number;
  /** Optional flag modifying the card header layout */
  isStacked?: boolean;
  /** Optional flag indicating if the card height fills the available space */
  isFullHeight?: boolean;
}

const styles = {
  fullHeightCard: css`
    height: 100%;
  `,
  image: css`
    margin-right: var(--pf-t--global--spacer--md);
    width: 48px;
  `
};

const ServiceCard: React.FunctionComponent<ServiceCardProps> = ({
  title,
  subtitle,
  description,
  icon,
  helperText,
  footer = null,
  ouiaId='ServiceCard',
  isStacked = false,
  isFullHeight = false,
  ...props
}: ServiceCardProps) => (
  <Card className={clsx({ [styles.fullHeightCard.toString()]: isFullHeight })} ouiaId={`${ouiaId}-card`} {...props}>
    <CardHeader>
      <Flex direction={{ default: isStacked ? 'column' : 'row' }} alignItems={{ default: isStacked ? 'alignItemsFlexStart' : 'alignItemsCenter' }}>
        <FlexItem css={styles.image}>
          {icon}
        </FlexItem>
        <FlexItem>
          <Content>
            <Content component={ContentVariants.h2} ouiaId={`${ouiaId}-title`}>{title}</Content>
            {subtitle ?? null}
          </Content>
        </FlexItem>
      </Flex>
    </CardHeader>
    <CardBody data-ouia-component-id={`${ouiaId}-description`}>{description}</CardBody>
    { footer || helperText ? (
      <CardFooter data-ouia-component-id={`${ouiaId}-footer`}>
        { helperText ?
          ( <HelperText data-ouia-component-id={`${ouiaId}-helper-text`}>
            <HelperTextItem className="pf-v6-u-mb-lg">
              {helperText}
            </HelperTextItem>
          </HelperText>) : null
        }
        { footer }
      </CardFooter>) : null}
  </Card>
);

export default ServiceCard;