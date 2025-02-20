import React from 'react';
import {
  Card,
  CardExpandableContent,
  CardHeader,
  CardProps,
  CardTitle,
  Divider,
  Flex,
  FlexItem,
} from '@patternfly/react-core';
import { createUseStyles } from 'react-jss';

export const MultiContentCardDividerVariant = {
  left: 'left',
  right: 'right'
} as const;

export type MultiContentCardDividerVariant = typeof MultiContentCardDividerVariant[keyof typeof MultiContentCardDividerVariant];

export interface MutliContentCardProps {
  /** Card element to be displayed as a content */
  content: React.ReactElement;
  /** Allows adding divider on the left/right from the card */
  dividerVariant?: MultiContentCardDividerVariant;
}

/** extends CardProps */
export interface MultiContentCardProps extends Omit<CardProps, 'children' | 'title'> {
  /** Cards to be displayed as a content */
  cards?: (React.ReactElement | MutliContentCardProps)[];
  /** Actions to be displayed in the expandable section */
  actions?: React.ReactElement;
  /** Toggle text for the expandable section */
  toggleText?: React.ReactNode;
  /** Toggle content for the expandable section */
  toggleContent?: React.ReactElement;
  /** When set to true, all content cards will be separated with dividers */
  withDividers?: boolean;
  /** Indicates whether the card is expandable */
  isExpandable?: boolean;
  /** Indicates whether the card is expanded by default */
  defaultExpanded?: boolean;
  /** Indicates whether the actions toggle is right aligned */
  isToggleRightAligned?: boolean;
  /** Custom OUIA ID */
  ouiaId?: string | number;
}

export const isCardWithProps = (
  card: React.ReactElement | MutliContentCardProps
): card is MutliContentCardProps => !!card && !React.isValidElement(card);

const useStyles = createUseStyles({
  cardTitle: {
    fontSize: 'var(--pf-t--global--font--size--heading--h3)',
  }
});

const MultiContentCard: React.FunctionComponent<MultiContentCardProps> = ({
  cards = [],
  isToggleRightAligned = false,
  actions,
  toggleText,
  toggleContent,
  withDividers = false,
  isExpandable = false,
  defaultExpanded = true,
  ouiaId = 'MultiContentCard',
  ...props
}: MultiContentCardProps) => {
  const [ isExpanded, setIsExpanded ] = React.useState(defaultExpanded);
  const classes = useStyles();
  const onExpand = () => {
    setIsExpanded(!isExpanded);
  };
  
  const renderCards = (cards: (React.ReactElement | MutliContentCardProps)[], withDividers?: boolean) =>  (
    <Flex alignSelf={{ default: 'alignSelfStretch' }} alignItems={{ default: 'alignItemsStretch' }}>
      {cards.map((card, index) => (
        <React.Fragment key={`card-${index}`}>
          {index > 0 && isCardWithProps(card) && card.dividerVariant === MultiContentCardDividerVariant.left && (
            <Divider 
              orientation={{ md: 'vertical' }} 
              inset={{ default: 'inset3xl' }}
            />
          )}
          <FlexItem key={`card-${index}`} flex={{ default: 'flex_1' }} data-ouia-component-id={`${ouiaId}-content-${index}`}>
            {isCardWithProps(card) ? card.content : card}
          </FlexItem>
          {(index + 1 < cards.length && (withDividers || isCardWithProps(card) && card.dividerVariant === MultiContentCardDividerVariant.right)) && (
            <Divider 
              orientation={{ md: 'vertical' }} 
              inset={{ default: 'inset3xl' }}
            />
          )}
        </React.Fragment>
      ))} 
    </Flex>
  );
  
  return (
    <Card isExpanded={isExpanded} ouiaId={ouiaId} {...props}>
      {isExpandable && (
        <CardHeader
          data-ouia-component-id={`${ouiaId}-header`}
          onExpand={onExpand}
          isToggleRightAligned={isToggleRightAligned}
          toggleButtonProps={{
            'aria-label': 'Details',
            'aria-expanded': isExpanded
          }}
          actions={{ actions }}
        >
          {toggleText ? <CardTitle component="h3" className={classes.cardTitle} data-ouia-component-id={`${ouiaId}-title`}>{toggleText}</CardTitle> : toggleContent}
        </CardHeader>
      )}
      {isExpandable ? <CardExpandableContent data-ouia-component-id={`${ouiaId}-expandable-content`}>{renderCards(cards, withDividers)}</CardExpandableContent> : renderCards(cards, withDividers)}
    </Card>
  );}


export default MultiContentCard;
