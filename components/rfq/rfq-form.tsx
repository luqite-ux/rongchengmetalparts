'use client'

import { useId, useState } from 'react'
import { Loader2, Mail } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'
import { ctaClassName } from '@/components/site/primitives'
import { InquiryCaptchaField } from '@/components/inquiry-captcha-field'

type Option = { value: string; label: string }

type FormValues = {
  name: string
  company: string
  email: string
  phone: string
  country: string
  product: string
  material: string
  application: string
  quantity: string
  specs: string
  message: string
  consent: boolean
}

type Status = 'idle' | 'submitting' | 'success' | 'error'

const emptyValues: FormValues = {
  name: '',
  company: '',
  email: '',
  phone: '',
  country: '',
  product: '',
  material: '',
  application: '',
  quantity: '',
  specs: '',
  message: '',
  consent: false,
}

const requiredLabels: Partial<Record<keyof FormValues, string>> = {
  name: 'Enter your name.',
  company: 'Enter your company name.',
  email: 'Enter a valid business email.',
  country: 'Enter your country.',
  message: 'Describe the part or requirement.',
  consent: 'Confirm that RunCing may contact you about this inquiry.',
}

const fieldClass = 'h-11 text-base md:text-sm'
const selectClass =
  'h-11 w-full rounded-md border border-input bg-background px-3 text-base transition-colors duration-200 focus-visible:border-ring focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 motion-reduce:transition-none md:text-sm'

function Field({
  id,
  label,
  required,
  error,
  hint,
  children,
}: {
  id: string
  label: string
  required?: boolean
  error?: string
  hint?: string
  children: React.ReactNode
}) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="block text-sm font-medium">
        {label}
        {required ? (
          <span aria-hidden="true" className="text-destructive">
            {' '}
            *
          </span>
        ) : null}
      </label>
      {children}
      {hint && !error ? (
        <p id={`${id}-hint`} className="text-xs text-muted-foreground">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={`${id}-error`} role="alert" className="text-sm font-medium text-destructive">
          {error}
        </p>
      ) : null}
    </div>
  )
}

function buildMailto(email: string, values: FormValues) {
  const lines = [
    `Name: ${values.name}`,
    `Company: ${values.company}`,
    `Email: ${values.email}`,
    `Phone: ${values.phone}`,
    `Country: ${values.country}`,
    `Product: ${values.product}`,
    `Material: ${values.material}`,
    `Application: ${values.application}`,
    `Estimated quantity: ${values.quantity}`,
    `Size / interface: ${values.specs}`,
    '',
    values.message,
  ]
  const subject = encodeURIComponent(`RFQ: ${values.product || 'RunCing Tech inquiry'}`)
  return `mailto:${email}?subject=${subject}&body=${encodeURIComponent(lines.join('\n'))}`
}

export function RfqForm({
  email,
  productOptions,
  materialOptions,
  applicationOptions,
  defaultProduct = '',
}: {
  email: string
  productOptions: Option[]
  materialOptions: Option[]
  applicationOptions: Option[]
  defaultProduct?: string
}) {
  const baseId = useId()
  const id = (name: string) => `${baseId}-${name}`
  const [values, setValues] = useState<FormValues>({ ...emptyValues, product: defaultProduct })
  const [errors, setErrors] = useState<Partial<Record<keyof FormValues, string>>>({})
  const [status, setStatus] = useState<Status>('idle')
  const [captchaRefreshKey, setCaptchaRefreshKey] = useState(0)

  const update = <K extends keyof FormValues>(key: K, value: FormValues[K]) => {
    setValues((current) => ({ ...current, [key]: value }))
    setErrors((current) => (current[key] ? { ...current, [key]: undefined } : current))
  }

  const validate = () => {
    const next: Partial<Record<keyof FormValues, string>> = {}
    if (!values.name.trim()) next.name = requiredLabels.name
    if (!values.company.trim()) next.company = requiredLabels.company
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) next.email = requiredLabels.email
    if (!values.country.trim()) next.country = requiredLabels.country
    if (!values.message.trim()) next.message = requiredLabels.message
    if (!values.consent) next.consent = requiredLabels.consent
    setErrors(next)
    return next
  }

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget
    const found = validate()
    const firstInvalid = (Object.keys(found) as (keyof FormValues)[]).find((key) => found[key])
    if (firstInvalid) {
      document.getElementById(id(firstInvalid))?.focus()
      return
    }

    setStatus('submitting')
    try {
      const response = await fetch('/api/rfq', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...values,
          captchaScope: new FormData(form).get('captchaScope'),
          captchaToken: new FormData(form).get('captchaToken'),
          captchaAnswer: new FormData(form).get('captchaAnswer'),
        }),
      })
      if (response.ok) {
        setValues({ ...emptyValues })
        form.reset()
        setCaptchaRefreshKey((key) => key + 1)
        setStatus('success')
      } else {
        setCaptchaRefreshKey((key) => key + 1)
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  const describedBy = (name: keyof FormValues, hint = false) =>
    errors[name] ? `${id(name)}-error` : hint ? `${id(name)}-hint` : undefined

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      aria-label="Request for quotation"
      className="space-y-6 border bg-card p-5 sm:p-8"
    >
      <p className="text-sm text-muted-foreground">
        Fields marked <span aria-hidden="true">*</span>
        <span className="sr-only">with an asterisk</span> are required.
      </p>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id={id('name')} label="Full name" required error={errors.name}>
          <Input
            id={id('name')}
            name="name"
            autoComplete="name"
            className={fieldClass}
            value={values.name}
            onChange={(event) => update('name', event.target.value)}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={describedBy('name')}
            required
          />
        </Field>
        <Field id={id('company')} label="Company" required error={errors.company}>
          <Input
            id={id('company')}
            name="company"
            autoComplete="organization"
            className={fieldClass}
            value={values.company}
            onChange={(event) => update('company', event.target.value)}
            aria-invalid={Boolean(errors.company)}
            aria-describedby={describedBy('company')}
            required
          />
        </Field>
        <Field id={id('email')} label="Business email" required error={errors.email}>
          <Input
            id={id('email')}
            name="email"
            type="email"
            autoComplete="email"
            className={fieldClass}
            value={values.email}
            onChange={(event) => update('email', event.target.value)}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={describedBy('email')}
            required
          />
        </Field>
        <Field id={id('phone')} label="Phone or WhatsApp" hint="Optional.">
          <Input
            id={id('phone')}
            name="phone"
            type="tel"
            autoComplete="tel"
            className={fieldClass}
            value={values.phone}
            onChange={(event) => update('phone', event.target.value)}
            aria-describedby={describedBy('phone', true)}
          />
        </Field>
        <Field id={id('country')} label="Country or region" required error={errors.country}>
          <Input
            id={id('country')}
            name="country"
            autoComplete="country-name"
            className={fieldClass}
            value={values.country}
            onChange={(event) => update('country', event.target.value)}
            aria-invalid={Boolean(errors.country)}
            aria-describedby={describedBy('country')}
            required
          />
        </Field>
        <Field id={id('quantity')} label="Estimated quantity" hint="Optional. Include the unit.">
          <Input
            id={id('quantity')}
            name="quantity"
            className={fieldClass}
            value={values.quantity}
            onChange={(event) => update('quantity', event.target.value)}
            aria-describedby={describedBy('quantity', true)}
          />
        </Field>
        <Field id={id('product')} label="Product of interest">
          <select
            id={id('product')}
            name="product"
            className={selectClass}
            value={values.product}
            onChange={(event) => update('product', event.target.value)}
          >
            <option value="">Select a product</option>
            {productOptions.map((option) => (
              <option key={option.value} value={option.label}>
                {option.label}
              </option>
            ))}
          </select>
        </Field>
        <Field id={id('material')} label="Material">
          <select
            id={id('material')}
            name="material"
            className={selectClass}
            value={values.material}
            onChange={(event) => update('material', event.target.value)}
          >
            <option value="">Select a material</option>
            {materialOptions.map((option) => (
              <option key={option.value} value={option.label}>
                {option.label}
              </option>
            ))}
          </select>
        </Field>
        <div className="sm:col-span-2">
          <Field id={id('application')} label="Application area">
            <select
              id={id('application')}
              name="application"
              className={selectClass}
              value={values.application}
              onChange={(event) => update('application', event.target.value)}
            >
              <option value="">Select an application area</option>
              {applicationOptions.map((option) => (
                <option key={option.value} value={option.label}>
                  {option.label}
                </option>
              ))}
            </select>
          </Field>
        </div>
        <div className="sm:col-span-2">
          <Field
            id={id('specs')}
            label="Size, thread and interface"
            hint="Optional. Dimensions, thread standard, connection ends, or a drawing reference."
          >
            <Input
              id={id('specs')}
              name="specs"
              className={fieldClass}
              value={values.specs}
              onChange={(event) => update('specs', event.target.value)}
              aria-describedby={describedBy('specs', true)}
            />
          </Field>
        </div>
        <div className="sm:col-span-2">
          <Field
            id={id('message')}
            label="Requirement details"
            required
            error={errors.message}
            hint="Describe the part, media, customization needs and destination. Send drawings by email."
          >
            <Textarea
              id={id('message')}
              name="message"
              rows={5}
              className="text-base md:text-sm"
              value={values.message}
              onChange={(event) => update('message', event.target.value)}
              aria-invalid={Boolean(errors.message)}
              aria-describedby={describedBy('message', true)}
              required
            />
          </Field>
        </div>
      </div>

      <InquiryCaptchaField refreshKey={captchaRefreshKey} className="border bg-stage p-4" />

      <div className="space-y-1.5">
        <label
          htmlFor={id('consent')}
          className="flex min-h-11 cursor-pointer items-start gap-3 text-sm leading-relaxed"
        >
          <input
            id={id('consent')}
            name="consent"
            type="checkbox"
            checked={values.consent}
            onChange={(event) => update('consent', event.target.checked)}
            aria-invalid={Boolean(errors.consent)}
            aria-describedby={describedBy('consent')}
            className="mt-0.5 size-5 shrink-0 accent-primary"
          />
          <span>
            I agree that RunCing may contact me about this inquiry using the details above.
          </span>
        </label>
        {errors.consent ? (
          <p id={`${id('consent')}-error`} role="alert" className="text-sm font-medium text-destructive">
            {errors.consent}
          </p>
        ) : null}
      </div>

      <div aria-live="polite" className={cn(status === 'idle' || status === 'submitting' ? 'hidden' : 'block')}>
        {status === 'success' ? (
          <div className="border-l-4 border-emerald-700 bg-emerald-50 p-4 text-sm text-emerald-950" role="status">
            <p className="font-semibold">Your inquiry has been received.</p>
            <p className="mt-1">Our team will review the details and reply by email.</p>
          </div>
        ) : null}
        {status === 'error' ? (
          <div className="border-l-4 border-destructive bg-destructive/10 p-4 text-sm leading-relaxed">
            <p className="font-semibold">The inquiry could not be sent.</p>
            <p className="mt-1">
              Please try again, or email{' '}
              <a className="font-semibold underline underline-offset-4" href={buildMailto(email, values)}>
                {email}
              </a>
              .
            </p>
          </div>
        ) : null}
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <button
          type="submit"
          disabled={status === 'submitting'}
          className={ctaClassName('primary', 'w-full sm:w-auto disabled:opacity-70')}
        >
          {status === 'submitting' ? (
            <>
              <Loader2 className="size-4 animate-spin motion-reduce:animate-none" aria-hidden="true" />
              Sending
            </>
          ) : (
            'Submit RFQ'
          )}
        </button>
        <a
          href={`mailto:${email}`}
          className={ctaClassName('outline', 'w-full sm:w-auto')}
        >
          <Mail className="size-4" aria-hidden="true" />
          Email {email}
        </a>
      </div>
    </form>
  )
}
