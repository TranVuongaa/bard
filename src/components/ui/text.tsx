import { Text as NativeText, type TextProps as NativeTextProps } from 'react-native';

const variantClasses = {
  onboardingHeading: 'font-jakarta-extrabold text-onboarding-heading',
  onboardingBody: 'font-jakarta-medium text-onboarding-body',
  wordmark: 'font-jakarta-extrabold text-wordmark',
  display: 'font-jakarta-extrabold text-display',
  heading: 'font-jakarta-bold text-heading',
  title: 'font-jakarta-bold text-title',
  cardTitle: 'font-jakarta-bold text-card-title',
  body: 'font-jakarta-regular text-body',
  bodyMedium: 'font-jakarta-medium text-body',
  button: 'font-jakarta-semibold text-button',
  caption: 'font-jakarta-medium text-caption',
  label: 'font-jakarta-medium text-label',
} as const;

const toneClasses = {
  primary: 'text-ink',
  secondary: 'text-muted',
  inverse: 'text-surface',
  accent: 'text-accent',
  success: 'text-success',
  danger: 'text-danger',
  info: 'text-info',
} as const;

export type TextVariant = keyof typeof variantClasses;
export type TextTone = keyof typeof toneClasses;

export type TextProps = NativeTextProps & {
  variant?: TextVariant;
  tone?: TextTone;
  className?: string;
};

export function Text({
  variant = 'body',
  tone = 'primary',
  className,
  style,
  ...props
}: TextProps) {
  return (
    <NativeText
      className={`${variantClasses[variant]} ${toneClasses[tone]} ${className ?? ''}`}
      style={style}
      {...props}
    />
  );
}
