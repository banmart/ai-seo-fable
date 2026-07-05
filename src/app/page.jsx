"use client";

import { useScrollEngine } from '../hooks/useScrollEngine'
import ScrubStage from '../components/ScrubStage'
import HUD from '../components/HUD'
import Header from '../components/Header'
import { ZoneChaos, ZoneIntegration, ZoneConversion, ZoneScale, ZoneApex } from '../components/Zones'
import Footer from '../components/Footer'

export default function HomePage() {
  useScrollEngine()
  return (
    <>
      <ScrubStage />
      <HUD />
      <Header />
      <main>
        <ZoneChaos />
        <ZoneIntegration />
        <ZoneConversion />
        <ZoneScale />
        <ZoneApex />
      </main>
      <Footer />
    </>
  )
}
