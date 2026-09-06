import { useState } from "react";

import EventHero from "../components/events/EventHero";
import FeaturedEvent from "../components/events/FeaturedEvent";
import EventFilter from "../components/events/EventFilter";
import EventsGrid from "../components/events/EventsGrid";

export default function Events() {

  const [search, setSearch] = useState("");

  const [category, setCategory] = useState("All");

  return (
    <>
      <EventHero />

      <FeaturedEvent />

      <EventFilter
        search={search}
        setSearch={setSearch}
        category={category}
        setCategory={setCategory}
      />

      <EventsGrid
        search={search}
        category={category}
      />
    </>
  );
}