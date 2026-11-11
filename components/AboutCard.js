'use client';
import ProfileCard from './ProfileCard';
import { useTheme } from './ThemeProvider';
import { CONFIG, asset } from '../data/site';

export default function AboutCard() {
  const { theme } = useTheme();
  return (
    <ProfileCard
      name={CONFIG.founder}
      title={CONFIG.role}
      handle={CONFIG.handle}
      status="Aktif"
      contactText="Hubungi"
      avatarUrl={asset(CONFIG.photo)}
      miniAvatarUrl={asset(CONFIG.logo)}
      theme={theme}
      holo={0.8}
      glare={0.5}
      tiltStrength={12}
      parallax={8}
      radius={16}
      enableTilt
      intro
      showUserInfo
      onContactClick={() => document.getElementById('whatsapp')?.scrollIntoView({ behavior: 'smooth' })}
    />
  );
}
