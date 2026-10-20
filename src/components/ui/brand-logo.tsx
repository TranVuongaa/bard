import { Image, type ImageProps } from 'expo-image';
import { styled } from 'nativewind';

const StyledImage = styled(Image, { className: 'style' });
const sizeClasses = {
  compact: 'w-logo-compact',
  standard: 'w-logo-standard',
  large: 'w-logo-large',
} as const;

type BrandLogoProps = {
  size?: keyof typeof sizeClasses;
  className?: string;
  style?: ImageProps['style'];
};

export function BrandLogo({ size = 'standard', className, style }: BrandLogoProps) {
  return (
    <StyledImage
      source={require('@/assets/images/brand/bard-wordmark.png')}
      className={`aspect-logo shrink-0 ${sizeClasses[size]} ${className ?? ''}`}
      style={style}
      contentFit="contain"
      accessible
      accessibilityLabel="Bard"
    />
  );
}
