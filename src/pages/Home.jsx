import Hero from "../components/home/hero/Hero";
import Statistics from "../components/home/Statistics";
import AboutPreview from "../components/home/AboutPreview";
import LeadershipPreview from "../components/home/LeadershipPreview";
import EventsPreview from "../components/home/EventsPreview";
import NewsPreview from "../components/home/NewsPreview";
import GalleryPreview from "../components/home/GalleryPreview";
import PartnersSection from "../components/home/PartnersSection";
import MembershipCTA from "../components/home/MembershipCTA";

import usePublicHomepage from "../hooks/usePublicHomepage";

export default function Home() {
  const {
    sections,
    sectionOrder,
    loading,
  } = usePublicHomepage();

  /*
   * Map section keys to actual React components.
   */
  const componentMap = {
    hero: Hero,
    statistics: Statistics,
    about: AboutPreview,
    leadership: LeadershipPreview,
    events: EventsPreview,
    news: NewsPreview,
    gallery: GalleryPreview,
    partners: PartnersSection,
    membership: MembershipCTA,
  };

  /*
   * While Firebase is loading, show the normal order.
   */
  if (loading) {
    return (
      <>
        <Hero />
        <Statistics />
        <AboutPreview />
        <LeadershipPreview />
        <EventsPreview />
        <NewsPreview />
        <GalleryPreview />
        <PartnersSection />
        <MembershipCTA />
      </>
    );
  }

  return (
    <>
      {sectionOrder.map((sectionKey) => {
        /*
         * Don't show disabled sections.
         */
        if (!sections[sectionKey]) {
          return null;
        }

        /*
         * Find the component.
         */
        const SectionComponent =
          componentMap[sectionKey];

        if (!SectionComponent) {
          return null;
        }

        return (
          <SectionComponent
            key={sectionKey}
          />
        );
      })}
    </>
  );
}