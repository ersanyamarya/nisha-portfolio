import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import useForm from '../../hooks/useForm';

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/i;

export type ContactProps = {
  open: boolean;
  onClose: () => void;
};

export default function Contact({ open, onClose }: ContactProps) {
  const { state, registerField, noErrors, reset, valueExists } = useForm(
    {
      name: '',
      email: '',
      message: '',
    },
    ''
  );

  // Reset form when modal is closed
  React.useEffect(() => {
    if (!open) {
      reset();
    }
  }, [open]);

  const handleSubmit = async () => {
    onClose();
    try {
      const data = await fetch('/.netlify/functions/contact-form', {
        method: 'POST',
        body: JSON.stringify(state),
      }).then(res => res.json());
      if (data.status === 'success') alert('Message Sent.');
      reset();
    } catch (error) {
      console.error(error);
      alert('Error sending message.');
      reset();
    }
  };

  const { error: nameError, ...nameField } = registerField('name', {
    placeholder: 'Your name',
    validator: value => (value.length < 1 ? 'Name is required' : ''),
  });
  const { error: emailError, ...emailField } = registerField('email', {
    placeholder: 'Email address',
    validator: value => (!value.match(EMAIL_REGEX) ? 'Invalid email' : ''),
  });
  const { error: messageError, ...messageField } = registerField('message', {
    placeholder: 'What would you like to discuss?',
    validator: value => (value.length < 1 ? 'Message is required' : ''),
  });

  return (
    <Dialog
      open={open}
      onOpenChange={isOpen => !isOpen && onClose()}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl">Get in touch</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-5">
          <label className="hidden">
            Don't fill this out if you're human: <input name="bot-field" />
          </label>

          <div className="flex flex-col gap-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              type="text"
              {...nameField}
            />
            {nameError && <p className="text-sm text-destructive">{nameError}</p>}
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              {...emailField}
            />
            {emailError && <p className="text-sm text-destructive">{emailError}</p>}
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              rows={4}
              {...messageField}
            />
            {messageError && <p className="text-sm text-destructive">{messageError}</p>}
          </div>

          <Button
            size="lg"
            disabled={!noErrors || !valueExists(['name', 'email', 'message'])}
            onClick={handleSubmit}>
            Send message
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
