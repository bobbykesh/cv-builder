'use client';

import React from 'react';
import {
  Header,
  Footer,
  Toast,
  ConfirmDialog,
} from '@/components/shared';
import {
  Hero,
  PartnerBar,
  TemplateCarousel,
  PreWrittenDemo,
  SocialProofBanner,
  ReviewsSection,
  FeaturesSection,
  FinalCTA,
} from '@/components/landing';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <PartnerBar />
        <TemplateCarousel />
        <PreWrittenDemo />
        <SocialProofBanner />
        <ReviewsSection />
        <FeaturesSection />
        <FinalCTA />
      </main>
      <Footer />
      <Toast />
      <ConfirmDialog />
    </>
  );
}
