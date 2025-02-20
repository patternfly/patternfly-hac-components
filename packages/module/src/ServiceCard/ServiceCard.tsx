import React from 'react';
import { Card, CardBody, CardFooter, CardHeader, CardProps, Content, ContentVariants, Flex, FlexItem } from '@patternfly/react-core';
import { HelperText } from '@patternfly/react-core/dist/dynamic/components/HelperText';
import { HelperTextItem } from '@patternfly/react-core/dist/dynamic/components/HelperText';
import { createUseStyles } from 'react-jss';
import clsx from 'clsx';

/** extends CardProps */
export interface ServiceCardProps extends CardProps {
  /** Service card title */
  title: string;
  /** Service card subtitle */
  subtitle?: React.ReactNode;
  /** Service card description */
  description: React.ReactNode;
  /** Service card icon */
  icon: React.ReactNode;
  /** Optional Service card helper text*/
  helperText?: React.ReactNode;
  /** Optional footer */
  footer?: React.ReactElement | null;
  /** Optional custom OUIA ID */
  ouiaId?: string | number;
  /** Optional flag modifying the card header layout */
  isStacked?: boolean;
  /** Optional flag indicating if the card height fills the available space */
  isFullHeight?: boolean;
}

const useStyles = createUseStyles({
  fullHeightCard: {
    height: '100%'
  },
  image: {
    marginRight: 'var(--pf-t--global--spacer--md)',
    width: 48
  }
});

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
}: ServiceCardProps) => {
  const classes = useStyles();

  return (
    <Card className={clsx({ [classes.fullHeightCard]: isFullHeight })} ouiaId={`${ouiaId}-card`} {...props}>
      <CardHeader>
        <Flex direction={{ default: isStacked ? 'column' : 'row' }} alignItems={{ default: isStacked ? 'alignItemsFlexStart' : 'alignItemsCenter' }}>
          <FlexItem className={classes.image}>
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
  )
}

export default ServiceCard;
