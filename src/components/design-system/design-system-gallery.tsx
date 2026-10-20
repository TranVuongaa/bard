import { Image } from 'expo-image';
import { styled } from 'nativewind';
import type { ComponentType } from 'react';
import { useEffect, useRef, useState } from 'react';
import { ScrollView, type ScrollViewInstance, Switch, View } from 'react-native';

import {
  Alert,
  Badge,
  BrandLogo,
  Button,
  Chip,
  Icon,
  IconButton,
  SegmentedControl,
  Stepper,
  Text,
  TextField,
  type IconName,
} from '@/components/ui';

const StyledImage = styled(Image, { className: 'style' });
const StyledSwitch = styled(Switch as unknown as ComponentType<Record<string, unknown>>, {
  className: {
    target: false,
    nativeStyleMapping: { color: 'trackColor.true' },
  },
}) as typeof Switch;

const palette = [
  { name: 'Primary yellow', token: 'accent', className: 'bg-accent' },
  { name: 'Lavender', token: 'lavender', className: 'bg-lavender' },
  { name: 'Text primary', token: 'ink', className: 'bg-ink' },
  { name: 'Text secondary', token: 'muted', className: 'bg-muted' },
  { name: 'Surface white', token: 'surface', className: 'bg-surface' },
  { name: 'Surface gray', token: 'canvas', className: 'bg-canvas' },
  { name: 'Border gray', token: 'border', className: 'bg-border' },
] as const;

const iconNames: IconName[] = [
  'home',
  'search',
  'heart',
  'calendar',
  'profile',
  'settings',
  'location',
  'filters',
];

function Section({ number, title, children }: { number: string; title: string; children: React.ReactNode }) {
  return (
    <View className="gap-5 rounded-card bg-surface p-5 shadow-card">
      <Text variant="cardTitle">
        {number}. {title}
      </Text>
      {children}
    </View>
  );
}

function PaletteSwatch({ item }: { item: (typeof palette)[number] }) {
  return (
    <View className="w-28 gap-2">
      <View className={`h-16 rounded-md border border-border ${item.className}`} />
      <Text variant="caption">{item.name}</Text>
      <Text variant="label" tone="secondary">
        {item.token}
      </Text>
    </View>
  );
}

function PolicyCard({ icon, title, copy }: { icon: IconName; title: string; copy: string }) {
  return (
    <View className="flex-row items-center gap-3 rounded-field bg-info-soft p-4">
      <View className="h-11 w-11 items-center justify-center rounded-md bg-surface">
        <Icon name={icon} tone="info" size={23} />
      </View>
      <View className="flex-1 gap-1">
        <Text variant="caption">{title}</Text>
        <Text variant="label" tone="secondary">
          {copy}
        </Text>
      </View>
      <Icon name="chevronRight" tone="info" size={19} />
    </View>
  );
}

function ProfileRow({ icon, label, last = false }: { icon: IconName; label: string; last?: boolean }) {
  return (
    <View className={`min-h-14 flex-row items-center gap-3 px-4 ${last ? '' : 'border-b border-border'}`}>
      <Icon name={icon} size={22} />
      <Text variant="caption" className="flex-1">
        {label}
      </Text>
      <Icon name="chevronRight" size={16} />
    </View>
  );
}

export function DesignSystemGallery({ initialOffset = 0 }: { initialOffset?: number }) {
  const scrollRef = useRef<ScrollViewInstance>(null);
  const [contentReady, setContentReady] = useState(false);
  const [selectedChip, setSelectedChip] = useState('Cabins');
  const [segment, setSegment] = useState('list');
  const [guests, setGuests] = useState(1);
  const [alerts, setAlerts] = useState({ success: true, danger: true });
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    if (!contentReady) return;
    scrollRef.current?.scrollTo({ y: initialOffset, animated: false });
  }, [contentReady, initialOffset]);

  return (
    <ScrollView
      ref={scrollRef}
      className="flex-1 bg-canvas"
      contentContainerClassName="gap-4 px-5 pb-20 pt-16"
      contentInsetAdjustmentBehavior="automatic"
      onContentSizeChange={() => setContentReady(true)}>
      <View className="gap-1 px-1 pb-2">
        <BrandLogo size="large" />
        <Text variant="body" tone="secondary">
          Find unforgettable stays for every kind of trip.
        </Text>
      </View>

      <Section number="01" title="Color palette">
        <View className="flex-row flex-wrap gap-4">
          {palette.map((item) => (
            <PaletteSwatch key={item.name} item={item} />
          ))}
        </View>
      </Section>

      <Section number="02" title="Typography">
        <View className="gap-5">
          <View className="gap-1">
            <Text variant="label" tone="secondary">Display</Text>
            <Text variant="display">Find your next stay</Text>
          </View>
          <View className="gap-1">
            <Text variant="label" tone="secondary">Heading</Text>
            <Text variant="heading">Modern Cabin with Hot Tub</Text>
          </View>
          <View className="gap-1">
            <Text variant="label" tone="secondary">Body</Text>
            <Text variant="body" tone="secondary">
              From mountain cabins to oceanfront villas, Bard helps you find unforgettable stays.
            </Text>
          </View>
          <Text variant="caption">Lake Arrowhead, CA</Text>
        </View>
      </Section>

      <Section number="03" title="Buttons">
        <View className="gap-3">
          <Button label="Book this stay" trailingIcon="arrowRight" onPress={() => {}} />
          <Button label="Continue with Google" variant="secondary" onPress={() => {}} />
          <View className="flex-row flex-wrap gap-3 pt-2">
            <IconButton icon="heart" label="Favorite" />
            <IconButton icon="share" label="Share" />
            <IconButton icon="search" label="Search" />
            <IconButton icon="bookmark" label="Save" />
          </View>
        </View>
      </Section>

      <Section number="04" title="Input fields">
        <View className="gap-3">
          <TextField icon="search" trailingIcon="filters" defaultValue="Cabins in California" />
          <TextField icon="profile" placeholder="Enter your name" />
          <TextField icon="profile" defaultValue="Joanna Smith" />
          <TextField icon="lock" trailingIcon="hidden" secureTextEntry defaultValue="password" />
        </View>
      </Section>

      <Section number="05" title="Filter chips">
        <View className="flex-row flex-wrap gap-2">
          {['Cabins', 'Under $300', 'Pet Friendly', 'Quiet'].map((label) => (
            <Chip
              key={label}
              label={label}
              selected={selectedChip === label}
              onPress={() => setSelectedChip(label)}
            />
          ))}
        </View>
        <View className="flex-row flex-wrap gap-2">
          <Chip label="All stays" icon="home" selected />
          <Chip label="Hot tub" icon="hotTub" />
          <Chip label="Pets" icon="pets" />
        </View>
      </Section>

      <Section number="06" title="Listing card">
        <View className="overflow-hidden rounded-card border border-border bg-surface">
          <StyledImage
            className="h-52 w-full bg-canvas"
            contentFit="cover"
            source="https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?auto=format&fit=crop&w=1200&q=80"
          />
          <View className="gap-3 p-4">
            <View className="flex-row items-start gap-3">
              <View className="flex-1 gap-1">
                <Text variant="cardTitle">Modern Cabin with Hot Tub</Text>
                <View className="flex-row items-center gap-1">
                  <Icon name="location" tone="secondary" size={16} />
                  <Text variant="caption" tone="secondary">Lake Arrowhead, CA</Text>
                </View>
              </View>
              <IconButton icon="heart" label="Favorite Modern Cabin" />
            </View>
            <View className="flex-row flex-wrap gap-2">
              <Badge>Hot tub</Badge>
              <Badge>Pet friendly</Badge>
            </View>
            <View className="flex-row items-end gap-1">
              <Text variant="cardTitle">$280</Text>
              <Text variant="caption" tone="secondary">/ night</Text>
            </View>
          </View>
        </View>
      </Section>

      <Section number="07" title="Policy and profile rows">
        <View className="gap-3">
          <PolicyCard icon="policies" title="Ask about policies" copy="Cancellation, house rules, pets, check-in and more." />
          <PolicyCard icon="document" title="Free cancellation" copy="Full refund up to 7 days before check-in." />
        </View>
        <View className="overflow-hidden rounded-field border border-border bg-surface">
          <ProfileRow icon="profile" label="Personal info" />
          <ProfileRow icon="payments" label="Payment methods" />
          <ProfileRow icon="trips" label="Trips" last />
        </View>
      </Section>

      <Section number="08" title="Iconography">
        <View className="flex-row flex-wrap gap-3">
          {iconNames.map((name) => (
            <View key={name} className="h-12 w-12 items-center justify-center rounded-full border border-border bg-surface">
              <Icon name={name} size={22} />
            </View>
          ))}
        </View>
      </Section>

      <Section number="09" title="Controls">
        <SegmentedControl
          segments={[
            { value: 'list', label: 'List', icon: 'list' },
            { value: 'map', label: 'Map', icon: 'map' },
          ]}
          value={segment}
          onChange={setSegment}
        />
        <View className="flex-row flex-wrap items-center justify-between gap-4">
          <StyledSwitch
            accessibilityLabel="Sample setting"
            className="text-accent"
            onValueChange={setEnabled}
            value={enabled}
          />
          <Stepper value={guests} min={1} max={8} label="Guests" onChange={setGuests} />
        </View>
      </Section>

      <Section number="10" title="Status and badges">
        <View className="gap-3">
          {alerts.success ? (
            <Alert
              key="success"
              variant="success"
              message="Account created successfully"
              onDismiss={() => setAlerts((current) => ({ ...current, success: false }))}
            />
          ) : null}
          {alerts.danger ? (
            <Alert
              key="danger"
              variant="danger"
              message="Something went wrong. Please try again."
              onDismiss={() => setAlerts((current) => ({ ...current, danger: false }))}
            />
          ) : null}
        </View>
        <View className="flex-row flex-wrap gap-2">
          <Badge tone="favorite" favorite>Guest favorite</Badge>
          <Badge tone="success">New</Badge>
          <Badge tone="discount">20% off</Badge>
          <Badge tone="info">Superhost</Badge>
        </View>
      </Section>
    </ScrollView>
  );
}
