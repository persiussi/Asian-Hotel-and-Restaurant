"use client";

import Image from "next/image";
import Link from "next/link";
import type { FormEvent } from "react";
import { useEffect, useState } from "react";

const mapsUrl =
  "https://www.google.com/maps/place/Asian+Hotel+and+Restaurant/@33.7641875,74.0956875,17z/data=!4m9!3m8!1s0x38e037e97b9d7787:0x796f047a5b633025!5m2!4m1!1i2!8m2!3d33.7641875!4d74.0956875!16s%2Fg%2F11qpqgm5cd";

const stays = [
  {
    title: "Standard Room",
    copy: "Clean stay for quick trips and family visits.",
    price: "₹ Ask",
    image: "/business/asian-standard-room.png",
  },
  {
    title: "Family Room",
    copy: "More space for groups, guests and longer stays.",
    price: "₹ Ask",
    image: "/business/asian-family-room.png",
  },
  {
    title: "Restaurant Table",
    copy: "Local meals, tea and family dining.",
    price: "₹ Ask",
    image: "/business/asian-restaurant-table.png",
  },
];

const highlights = [
  ["Rooms", "Comfortable hotel stay"],
  ["Restaurant", "Fresh local dining"],
  ["Maps", "Easy directions"],
];

type IconName = "bed" | "calendar" | "check" | "map" | "play" | "plate" | "star";

type Booking = {
  id: string;
  type: string;
  date: string;
  time: string;
  guests: number;
  name: string;
  phone: string;
  note: string;
};

const bookingOptions = ["Standard Room", "Family Room", "Restaurant Table", "Room + Restaurant"];

function getToday() {
  return new Date().toISOString().slice(0, 10);
}

function Icon({ name }: { name: IconName }) {
  const paths: Record<IconName, React.ReactNode> = {
    bed: (
      <>
        <path d="M4 11V6h7v5" />
        <path d="M4 18v-7h16v7" />
        <path d="M20 11V8h-6v3" />
      </>
    ),
    calendar: (
      <>
        <path d="M7 3v4" />
        <path d="M17 3v4" />
        <path d="M4 8h16v12H4z" />
      </>
    ),
    check: <path d="m5 12 4 4L19 6" />,
    map: (
      <>
        <path d="M12 21s7-4.6 7-11a7 7 0 1 0-14 0c0 6.4 7 11 7 11Z" />
        <path d="M12 10.5h.01" />
      </>
    ),
    play: <path d="m8 5 11 7-11 7V5Z" />,
    plate: (
      <>
        <circle cx="12" cy="12" r="7" />
        <circle cx="12" cy="12" r="3" />
      </>
    ),
    star: <path d="m12 3 2.7 5.5 6.1.9-4.4 4.3 1 6-5.4-2.9-5.4 2.9 1-6-4.4-4.3 6.1-.9L12 3Z" />,
  };

  return (
    <svg aria-hidden="true" className="icon" viewBox="0 0 24 24">
      {paths[name]}
    </svg>
  );
}

export default function Home() {
  const [bookingType, setBookingType] = useState("Standard Room");
  const [bookingDate, setBookingDate] = useState(getToday);
  const [bookingTime, setBookingTime] = useState("19:00");
  const [guests, setGuests] = useState(2);
  const [guestName, setGuestName] = useState("");
  const [guestPhone, setGuestPhone] = useState("");
  const [bookingNote, setBookingNote] = useState("");
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [message, setMessage] = useState("Choose a room or table and send a booking request.");

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const savedBookings = window.localStorage.getItem("asian-hotel-bookings");

      if (savedBookings) {
        setBookings(JSON.parse(savedBookings) as Booking[]);
      }
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  function saveBookings(nextBookings: Booking[]) {
    setBookings(nextBookings);
    window.localStorage.setItem("asian-hotel-bookings", JSON.stringify(nextBookings));
  }

  function selectBookingType(type: string) {
    setBookingType(type);
    setMessage(`${type} selected. Complete the details to request booking confirmation.`);
    document.getElementById("booking")?.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  function prepareBooking(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!guestName.trim() || !guestPhone.trim()) {
      setMessage("Please add your name and phone number before sending the booking.");
      return;
    }

    const nextBooking: Booking = {
      id: `${Date.now()}`,
      type: bookingType,
      date: bookingDate,
      time: bookingTime,
      guests,
      name: guestName.trim(),
      phone: guestPhone.trim(),
      note: bookingNote.trim(),
    };

    saveBookings([nextBooking, ...bookings]);
    setMessage(`${bookingType} booking request saved for ${guestName.trim()}. Please confirm with the hotel.`);
    setBookingNote("");
  }

  return (
    <main>
      <header className="topbar">
        <Link className="brand" href="#top">
          <span>AH</span>
          <strong>Asian Hotel</strong>
        </Link>
        <nav>
          <Link href="#stays">Stay</Link>
          <Link href="#dining">Dining</Link>
          <Link href="#gallery">Gallery</Link>
          <Link href="#location">Location</Link>
        </nav>
        <a className="nav-action" href={mapsUrl} target="_blank" rel="noreferrer">
          <Icon name="map" />
          Directions
        </a>
      </header>

      <section className="hero" id="top">
        <video className="hero-video" autoPlay loop muted playsInline poster="/business/asian-hotel-hero.png">
          <source src="/business/asian-hotel-loop.mp4" type="video/mp4" />
        </video>
        <div className="shade" />
        <div className="hero-grid">
          <div className="hero-copy">
            <p className="kicker">
              <Icon name="star" /> Hotel rooms and restaurant dining
            </p>
            <h1>Asian Hotel and Restaurant</h1>
            <p>
              A warm stay-and-dine experience for travellers, families and local
              guests, with comfortable rooms and fresh restaurant meals.
            </p>
            <div className="hero-actions">
              <Link className="primary-button" href="#booking">
                <Icon name="calendar" />
                Plan a visit
              </Link>
              <a className="ghost-button" href={mapsUrl} target="_blank" rel="noreferrer">
                <Icon name="map" />
                Open map
              </a>
            </div>
          </div>

          <aside className="booking-card" id="booking">
            <p className="kicker">
              <Icon name="calendar" /> Quick enquiry
            </p>
            <h2>Book a room or table</h2>
            <form onSubmit={prepareBooking}>
              <label>
                Booking type
                <select value={bookingType} onChange={(event) => setBookingType(event.target.value)}>
                  {bookingOptions.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
              </label>
              <div className="booking-row">
                <label>
                  Date
                  <input
                    min={getToday()}
                    type="date"
                    value={bookingDate}
                    onChange={(event) => setBookingDate(event.target.value)}
                  />
                </label>
                <label>
                  Time
                  <input type="time" value={bookingTime} onChange={(event) => setBookingTime(event.target.value)} />
                </label>
              </div>
              <label>
                Guests
                <input
                  min="1"
                  max="12"
                  type="number"
                  value={guests}
                  onChange={(event) => setGuests(Number(event.target.value))}
                />
              </label>
              <label>
                Name
                <input
                  placeholder="Guest name"
                  type="text"
                  value={guestName}
                  onChange={(event) => setGuestName(event.target.value)}
                />
              </label>
              <label>
                Phone
                <input
                  placeholder="Contact number"
                  type="tel"
                  value={guestPhone}
                  onChange={(event) => setGuestPhone(event.target.value)}
                />
              </label>
              <label>
                Request
                <textarea
                  placeholder="Late check-in, family dinner, room preference..."
                  value={bookingNote}
                  onChange={(event) => setBookingNote(event.target.value)}
                />
              </label>
              <button type="submit">
                <Icon name="check" />
                Send booking request
              </button>
            </form>
            <p className="message">{message}</p>
          </aside>
        </div>
      </section>

      <section className="highlights">
        {highlights.map(([title, copy]) => (
          <div key={title}>
            <Icon name={title === "Rooms" ? "bed" : title === "Restaurant" ? "plate" : "map"} />
            <strong>{title}</strong>
            <span>{copy}</span>
          </div>
        ))}
      </section>

      <section className="stay-section" id="stays">
        <div className="section-head">
          <div>
            <p className="kicker">
              <Icon name="bed" /> Stay options
            </p>
            <h2>Rooms and restaurant, together in one local stop.</h2>
          </div>
          <a href={mapsUrl} target="_blank" rel="noreferrer">
            Check route
          </a>
        </div>
        <div className="card-grid">
          {stays.map(({ title, copy, price, image }) => (
            <article className="stay-card" key={title}>
              <Image src={image} alt={title} width={720} height={540} />
              <div>
                <span>{price}</span>
                <h3>{title}</h3>
                <p>{copy}</p>
                <button onClick={() => selectBookingType(title)} type="button">
                  Book now
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="booking-section">
        <div className="section-head">
          <div>
            <p className="kicker">
              <Icon name="calendar" /> Booking desk
            </p>
            <h2>Your room and table requests.</h2>
          </div>
          {bookings.length > 0 ? (
            <button className="clear-button" onClick={() => saveBookings([])} type="button">
              Clear list
            </button>
          ) : null}
        </div>
        <div className="booking-board">
          <div className="booking-summary">
            <strong>{bookings.length}</strong>
            <span>saved request{bookings.length === 1 ? "" : "s"}</span>
            <p>
              Requests are saved in this browser for the guest. The hotel should
              confirm availability, price and timing directly.
            </p>
          </div>
          <div className="booking-list">
            {bookings.length === 0 ? (
              <div className="empty-booking">
                <Icon name="calendar" />
                <strong>No booking request yet</strong>
                <span>Select a room or restaurant table, then submit the booking form.</span>
              </div>
            ) : (
              bookings.map((booking) => (
                <article className="booking-item" key={booking.id}>
                  <div>
                    <strong>{booking.type}</strong>
                    <span>
                      {booking.date} at {booking.time} · {booking.guests} guest
                      {booking.guests === 1 ? "" : "s"}
                    </span>
                  </div>
                  <p>
                    {booking.name} · {booking.phone}
                    {booking.note ? ` · ${booking.note}` : ""}
                  </p>
                  <small>Pending hotel confirmation</small>
                </article>
              ))
            )}
          </div>
        </div>
      </section>

      <section className="dining-section" id="dining">
        <div>
          <p className="kicker">
            <Icon name="plate" /> Restaurant
          </p>
          <h2>Comfort food for guests and families.</h2>
          <p>
            The restaurant section is designed for local meals, tea, family
            dining and hotel guests who want a simple, dependable food option.
          </p>
        </div>
        <div className="food-panel">
          <Image src="/business/asian-hotel-gallery.png" alt="Restaurant food spread" fill sizes="(max-width: 900px) 100vw, 50vw" />
        </div>
      </section>

      <section className="gallery-section" id="gallery">
        <div>
          <p className="kicker">
            <Icon name="play" /> Photos and video
          </p>
          <h2>Preview the stay before arriving.</h2>
          <p>
            These project-owned visuals include a hotel lobby photo, a room and
            dining gallery image, plus a short local MP4 loop.
          </p>
        </div>
        <div className="gallery-grid">
          <div className="photo-card wide">
            <Image src="/business/asian-hotel-hero.png" alt="Asian Hotel reception and dining" fill sizes="100vw" />
          </div>
          <div className="photo-card">
            <Image src="/business/asian-hotel-gallery.png" alt="Asian Hotel room and dining" fill sizes="(max-width: 900px) 100vw, 50vw" />
          </div>
          <video className="video-card" controls muted loop playsInline poster="/business/asian-hotel-hero.png">
            <source src="/business/asian-hotel-loop.mp4" type="video/mp4" />
          </video>
        </div>
      </section>

      <section className="location-section" id="location">
        <div>
          <p className="kicker">
            <Icon name="map" /> Location
          </p>
          <h2>Find Asian Hotel and Restaurant.</h2>
          <p>
            Use the map for directions. For current room availability, menu,
            prices and timing, confirm directly with the business.
          </p>
          <a className="primary-button dark" href={mapsUrl} target="_blank" rel="noreferrer">
            <Icon name="map" />
            Navigate now
          </a>
        </div>
        <div className="map-frame">
          <iframe
            title="Map showing Asian Hotel and Restaurant"
            src="https://www.google.com/maps?q=33.7641875,74.0956875&z=17&output=embed"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>

      <footer className="footer">
        <strong>Asian Hotel and Restaurant</strong>
        <span>Hotel and restaurant website with photos and video</span>
      </footer>
    </main>
  );
}
