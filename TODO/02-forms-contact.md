# Forms & Contact System Improvements

## Current Issues

### 🚨 Critical Issues

#### 1. Form Validation Missing
**Location:** Multiple forms across the site
**Issue:** No client-side validation implemented
**Impact:** Poor UX, potential invalid submissions

#### 2. Email Configuration
**Location:** `/app/api/contact/route.ts`
**Issue:** Resend API key may not be configured
**Impact:** Contact forms won't send emails

#### 3. Error Handling
**Location:** All form components
**Issue:** No user feedback for errors
**Impact:** Users don't know if submission failed

---

## Forms Inventory

### 1. Main Contact Form
**Location:** `/app/contact/page.tsx`
**Current State:** Basic form, needs validation
**Required Fixes:**
- Add field validation
- Implement loading states
- Add success/error messages
- Test email delivery

### 2. AI Sprint Form
**Location:** `/app/ai-sprint/page.tsx`
**Current State:** Multi-step form
**Required Fixes:**
- Validate each step
- Save progress locally
- Add confirmation step
- Test submission flow

### 3. AI Assessment Form
**Location:** `/app/ai-assessment/page.tsx`
**Current State:** Assessment questionnaire
**Required Fixes:**
- Add progress indicator
- Validate responses
- Calculate scores
- Send results email

### 4. Newsletter Signup
**Location:** Footer component
**Current State:** Email input only
**Required Fixes:**
- Email validation
- Duplicate checking
- Success confirmation
- Add to mailing list

### 5. Demo Request Forms
**Location:** Various lab pages
**Current State:** Mixed implementations
**Required Fixes:**
- Standardize form component
- Add calendar integration
- Send confirmation emails
- Track submissions

---

## Implementation Plan

### 1. Create Reusable Form Components

#### Base Form Field Component
```typescript
// components/ui/form-field.tsx
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface FormFieldProps {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  error?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
}

export function FormField({
  label,
  name,
  type = 'text',
  required = false,
  error,
  placeholder,
  value,
  onChange,
  onBlur
}: FormFieldProps) {
  const [touched, setTouched] = useState(false);

  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={() => {
          setTouched(true);
          onBlur?.();
        }}
        className={cn(
          "w-full px-4 py-2 border rounded-lg transition-colors",
          "focus:outline-none focus:ring-2 focus:ring-blue-500",
          error && touched ? "border-red-500" : "border-gray-300"
        )}
      />

      {error && touched && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
}
```

#### Form Validation Hook
```typescript
// hooks/useFormValidation.ts
import { useState, useCallback } from 'react';

interface ValidationRules {
  [key: string]: {
    required?: boolean;
    email?: boolean;
    minLength?: number;
    maxLength?: number;
    pattern?: RegExp;
    custom?: (value: any) => string | undefined;
  };
}

export function useFormValidation<T extends Record<string, any>>(
  initialValues: T,
  rules: ValidationRules
) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const validate = useCallback((fieldName: string, value: any) => {
    const fieldRules = rules[fieldName];
    if (!fieldRules) return undefined;

    if (fieldRules.required && !value) {
      return 'This field is required';
    }

    if (fieldRules.email && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        return 'Please enter a valid email';
      }
    }

    if (fieldRules.minLength && value && value.length < fieldRules.minLength) {
      return `Must be at least ${fieldRules.minLength} characters`;
    }

    if (fieldRules.maxLength && value && value.length > fieldRules.maxLength) {
      return `Must be less than ${fieldRules.maxLength} characters`;
    }

    if (fieldRules.pattern && value && !fieldRules.pattern.test(value)) {
      return 'Invalid format';
    }

    if (fieldRules.custom) {
      return fieldRules.custom(value);
    }

    return undefined;
  }, [rules]);

  const handleChange = useCallback((fieldName: string, value: any) => {
    setValues(prev => ({ ...prev, [fieldName]: value }));
    const error = validate(fieldName, value);
    setErrors(prev => ({ ...prev, [fieldName]: error || '' }));
  }, [validate]);

  const handleBlur = useCallback((fieldName: string) => {
    setTouched(prev => ({ ...prev, [fieldName]: true }));
  }, []);

  const isValid = Object.keys(rules).every(field => !validate(field, values[field]));

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    isValid,
    setValues,
    reset: () => {
      setValues(initialValues);
      setErrors({});
      setTouched({});
    }
  };
}
```

### 2. Contact Form Implementation

```typescript
// app/contact/ContactForm.tsx
'use client';

import { useState } from 'react';
import { useFormValidation } from '@/hooks/useFormValidation';
import { FormField } from '@/components/ui/form-field';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { values, errors, handleChange, handleBlur, isValid, reset } = useFormValidation(
    {
      name: '',
      email: '',
      company: '',
      message: ''
    },
    {
      name: { required: true, minLength: 2 },
      email: { required: true, email: true },
      company: { required: true },
      message: { required: true, minLength: 10 }
    }
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isValid) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values)
      });

      if (!response.ok) throw new Error('Failed to send message');

      toast.success('Message sent successfully! We'll be in touch soon.');
      reset();
    } catch (error) {
      toast.error('Failed to send message. Please try again.');
      console.error('Contact form error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
      <FormField
        label="Name"
        name="name"
        required
        value={values.name}
        onChange={(value) => handleChange('name', value)}
        onBlur={() => handleBlur('name')}
        error={errors.name}
      />

      <FormField
        label="Email"
        name="email"
        type="email"
        required
        value={values.email}
        onChange={(value) => handleChange('email', value)}
        onBlur={() => handleBlur('email')}
        error={errors.email}
      />

      <FormField
        label="Company"
        name="company"
        required
        value={values.company}
        onChange={(value) => handleChange('company', value)}
        onBlur={() => handleBlur('company')}
        error={errors.company}
      />

      <div className="mb-4">
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
          Message <span className="text-red-500">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={4}
          value={values.message}
          onChange={(e) => handleChange('message', e.target.value)}
          onBlur={() => handleBlur('message')}
          className={cn(
            "w-full px-4 py-2 border rounded-lg transition-colors",
            "focus:outline-none focus:ring-2 focus:ring-blue-500",
            errors.message ? "border-red-500" : "border-gray-300"
          )}
        />
        {errors.message && (
          <p className="mt-1 text-sm text-red-500">{errors.message}</p>
        )}
      </div>

      <Button
        type="submit"
        disabled={!isValid || isSubmitting}
        className="w-full"
      >
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </Button>
    </form>
  );
}
```

### 3. API Route Implementation

```typescript
// app/api/contact/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { z } from 'zod';

const resend = new Resend(process.env.RESEND_API_KEY);

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  company: z.string().min(1),
  message: z.string().min(10)
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate request body
    const validatedData = contactSchema.parse(body);

    // Send email via Resend
    const { data, error } = await resend.emails.send({
      from: 'contact@sprinter.ai',
      to: 'sales@sprinter.ai',
      subject: `New Contact Form Submission from ${validatedData.name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${validatedData.name}</p>
        <p><strong>Email:</strong> ${validatedData.email}</p>
        <p><strong>Company:</strong> ${validatedData.company}</p>
        <p><strong>Message:</strong></p>
        <p>${validatedData.message}</p>
      `
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 500 }
      );
    }

    // Send confirmation email to user
    await resend.emails.send({
      from: 'noreply@sprinter.ai',
      to: validatedData.email,
      subject: 'Thank you for contacting Sprinter AI',
      html: `
        <h2>Thank you for reaching out!</h2>
        <p>Hi ${validatedData.name},</p>
        <p>We've received your message and will get back to you within 24 hours.</p>
        <p>Best regards,<br>The Sprinter AI Team</p>
      `
    });

    return NextResponse.json(
      { message: 'Email sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact form error:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid form data', details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
```

### 4. Testing Checklist

#### Form Validation Tests
- [ ] Required fields show errors when empty
- [ ] Email validation works correctly
- [ ] Min/max length validation works
- [ ] Custom validation rules apply
- [ ] Error messages are clear and helpful

#### Submission Tests
- [ ] Form submits with valid data
- [ ] Loading state displays during submission
- [ ] Success message shows after submission
- [ ] Form resets after successful submission
- [ ] Error message shows for failed submission

#### Email Delivery Tests
- [ ] Contact form sends to correct recipient
- [ ] Confirmation email sent to user
- [ ] Email formatting is correct
- [ ] All form fields included in email
- [ ] Resend API key configured properly

#### Edge Cases
- [ ] Form handles network errors gracefully
- [ ] Form prevents double submission
- [ ] Form works on mobile devices
- [ ] Form is keyboard accessible
- [ ] Form works with autofill

---

## Environment Variables

```bash
# .env.local
RESEND_API_KEY=re_xxxxxxxxxxxx
NEXT_PUBLIC_CONTACT_EMAIL=sales@sprinter.ai
```

---

## Success Metrics

- ✅ All forms have proper validation
- ✅ Users receive clear feedback
- ✅ Emails deliver reliably
- ✅ Forms are accessible
- ✅ Submission success rate > 95%
- ✅ Zero spam submissions
- ✅ Mobile-friendly forms