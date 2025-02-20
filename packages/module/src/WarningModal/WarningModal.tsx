import React, { ReactNode, useState } from 'react';
import { Button, ButtonVariant, Checkbox, Flex, FlexItem, Stack, StackItem, TextInput, TextInputProps } from '@patternfly/react-core';
import { ModalProps, Modal, ModalVariant } from '@patternfly/react-core/deprecated';

/** extends ModalProps */
export interface WarningModalProps extends Omit<ModalProps, 'ref'> {
  /** Callback for the confirm action button. */
  onConfirm?: () => void;
  /** Custom label for the confirm action button */
  confirmButtonLabel?: React.ReactNode;
  /** Custom label for the cancel action button */
  cancelButtonLabel?: React.ReactNode;
  /** Whether modal requires a checkbox before confirming */
  withCheckbox?: boolean;
  /** Custom checkbox label */
  checkboxLabel?: ReactNode;
  /** Visual variant of the confirm button */
  confirmButtonVariant?: ButtonVariant;
  /** Custom OUIA ID */
  ouiaId?: string | number;
  /** Confirmation text input props */
  confirmationInputProps?: TextInputProps;
  /** Text the user should type to confirm selection when using confirmation input */
  confirmationText?: string;
  /** Label for the text confirmation input */
  confirmationInputLabel?: ReactNode;
}

const WarningModal: React.FunctionComponent<WarningModalProps> = ({
  isOpen,
  onConfirm,
  onClose,
  children,
  confirmButtonLabel = 'Confirm',
  cancelButtonLabel = 'Cancel',
  variant = ModalVariant.small,
  titleIconVariant = 'warning',
  withCheckbox = false,
  checkboxLabel='I understand that this action cannot be undone',
  confirmButtonVariant = ButtonVariant.primary,
  ouiaId = 'WarningModal',
  confirmationInputProps,
  confirmationText,
  confirmationInputLabel = <>Type <strong>{confirmationText} </strong> to confirm the action:</>,
  ...props
}: WarningModalProps) => {
  const [ checked, setChecked ] = useState(false);
  const [ inputValue, setInputValue ] = React.useState('');

  const deleteNameSanitized = React.useMemo(() => confirmationText?.trim().replace(/\s+/g, ' '), [ confirmationText ]);

  const textConfirmed = confirmationInputProps ? inputValue.trim() === deleteNameSanitized : true;

  const isConfirmButtonDisabled = React.useMemo(() => {
    if (withCheckbox) {
      return !checked || (confirmationInputProps && !textConfirmed);
    }
    return confirmationInputProps ? !textConfirmed : false;
  }, [ checked, textConfirmed, withCheckbox, confirmationInputProps ]);

  return (
    <Modal
      variant={variant}
      isOpen={isOpen}
      onClose={onClose}
      onEscapePress={onClose}
      titleIconVariant={titleIconVariant}
      actions={[
        <Button
          ouiaId={`${ouiaId}-confirm-button`}
          key="confirm"
          variant={confirmButtonVariant}
          onClick={() => {
            onConfirm?.();
            setChecked(false);
          }}
          isDisabled={isConfirmButtonDisabled}
        >
          {confirmButtonLabel}
        </Button>,
        <Button
          ouiaId={`${ouiaId}-cancel-button`}
          key="cancel"
          variant={ButtonVariant.link}
          onClick={onClose}
        >
          {cancelButtonLabel}
        </Button>,
      ]}
      ouiaId={ouiaId}
      {...props}
    >
      <Stack hasGutter>
        <StackItem>{children}</StackItem>
        <StackItem>
          {confirmationText ? (
            <Flex direction={{ default: 'column' }} spaceItems={{ default: 'spaceItemsSm' }}>
              <FlexItem>
                {confirmationInputLabel}
              </FlexItem>
              <TextInput
                ouiaId={`${ouiaId}-confirmation-text-input`}
                value={inputValue}
                onChange={(_e, value) => setInputValue(value)}
                {...{ type: 'text', isRequired: true, ...confirmationInputProps }}
              />
            </Flex>
          ) : null}          
        </StackItem>
        <StackItem>
          {withCheckbox ? (
            <Checkbox
              isChecked={checked}
              onChange={(_event, value) => setChecked(value)}
              label={checkboxLabel}
              id="warning-modal-check"
              className="pf-v6-u-mt-lg"
              ouiaId={`${ouiaId}-confirm-checkbox`}
            />
          ) : null}
        </StackItem>
      </Stack>
    </Modal>
  )

};


export default WarningModal;
