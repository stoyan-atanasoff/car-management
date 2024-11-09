import React, { PropsWithChildren } from 'react'

import { AlertDialog, Button, Flex } from '@radix-ui/themes'

interface ConfirmationDialogProps {
  onCancel: () => void;
  onConfirm: () => void;
  loading: boolean;
  okText: string;
  cancelText: string;
}
const ConfirmationDialog = ({ children, onCancel, onConfirm, loading, okText, cancelText }: PropsWithChildren<ConfirmationDialogProps>) => (
  <AlertDialog.Root open>
    <AlertDialog.Content maxWidth="450px">
      <AlertDialog.Title>Are you absolutely sure</AlertDialog.Title>
      <AlertDialog.Description size="2">
        This action cannot be undone. This will permanently delete table rows
        you have selected.
        {children}
      </AlertDialog.Description>

      <Flex gap="3" mt="4" justify="between" align='center'>
        <AlertDialog.Cancel>
          <Button variant="ghost" onClick={onCancel}>
            {cancelText}
          </Button>
        </AlertDialog.Cancel>
        <AlertDialog.Action>
          <Button variant="solid" color="red" onClick={onConfirm} loading={loading} disabled={loading}>
            {okText}
          </Button>
        </AlertDialog.Action>
      </Flex>
    </AlertDialog.Content>
  </AlertDialog.Root>
)

export default ConfirmationDialog;
