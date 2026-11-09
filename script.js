/**
 * ============================================================================
 * TROLL ON-SITE CLUB: 2-BIT INTERACTIVE STORY ENGINE
 * ============================================================================
 * Combines real open-source asset valuations across all 6 continents with
 * an interactive RPG typewriter narrative, chapter system, and chronicle log.
 */

const INITIAL_BALANCE = 7000000000000; // $7 Trillion
let currentBalance = INITIAL_BALANCE;
let currentContinent = "North America";
let currentCategory = "companies";
let inventory = {};
let storyChronicle = []; // Stores the player's choices as a readable story

// Continent arrival narrative intros
const CONTINENT_INTRO = {
  "North America": "Your private encrypted terminal links to Wall Street and the Pentagon. Silicon Valley executives are sweating.",
  "Europe": "You touch down in Geneva. Old-money European dynasties lock their châteaux as your $7T wire clears.",
  "Asia": "From Riyadh to Tokyo, sovereign wealth funds call emergency meetings as your shadow falls over the East.",
  "Africa": "From Cairo to Lagos and Johannesburg, industrial titans and generals await your next acquisition.",
  "South America": "From São Paulo to the Andes, presidents and billionaires clear the runway for your arrival.",
  "Oceania": "Sydney Harbour and mining magnates go on high alert. Even the Pacific isn't safe from your wallet."
};

// Real Open-Source Valuation Dataset + Satirical Story Consequences
const WORLD_DATA = {
  "North America": {
    companies: [
      {
        id: "na_comp_1",
        name: "Apple Inc.",
        price: 3400000000000,
        lore: "Cupertino, USA (Market Cap) — Buy out every iPhone on Earth.",
        story: "purchased Apple Inc. and forced every iPhone startup screen to display the Troll On-Site Club logo."
      },
      {
        id: "na_comp_2",
        name: "Microsoft Corp.",
        price: 3100000000000,
        lore: "Redmond, USA (Market Cap) — Own Windows, Xbox, and Azure.",
        story: "bought Microsoft and brought back Clippy as the Supreme AI CEO of the planet."
      },
      {
        id: "na_comp_3",
        name: "NVIDIA Corp.",
        price: 3000000000000,
        lore: "Santa Clara, USA (Market Cap) — Monopolize global AI GPUs.",
        story: "acquired NVIDIA and redirected all global AI supercomputers to mine 2-bit yellow memes."
      }
    ],
    militaries: [
      {
        id: "na_mil_1",
        name: "US Armed Forces + Fleet/B-21s",
        price: 2950000000000,
        lore: "Pentagon Budget + 11 Carrier Strike Groups & Stealth Fleet.",
        story: "privatized the US Military and used an aircraft carrier to deliver a single iced coffee."
      },
      {
        id: "na_mil_2",
        name: "Canadian Armed Forces + NORAD Gear",
        price: 115000000000,
        lore: "Canada Defense + F-35 Fleet & Arctic Radar Network.",
        story: "acquired the Canadian Armed Forces and deployed NORAD satellites to track lost keys."
      },
      {
        id: "na_mil_3",
        name: "Mexican Armed Forces + Hardware",
        price: 42000000000,
        lore: "SEDENA & SEMAR + Naval Patrol Fleet.",
        story: "contracted the Mexican Naval Fleet to guard a private beach taco stand in Tulum."
      }
    ],
    buildings: [
      {
        id: "na_bld_1",
        name: "Apple Park Campus",
        price: 5000000000,
        lore: "Cupertino, CA — The $5 Billion 'Spaceship' Ring.",
        story: "turned the giant circular Apple Park headquarters into the world's most expensive go-kart track."
      },
      {
        id: "na_bld_2",
        name: "SoFi Stadium Complex",
        price: 4950000000,
        lore: "Inglewood, CA — Most expensive sports venue on Earth.",
        story: "bought SoFi Stadium just to play retro 2-bit arcade games on the 70,000-square-foot Infinity Screen."
      },
      {
        id: "na_bld_3",
        name: "One World Trade Center",
        price: 3900000000,
        lore: "New York City — 1,776-foot Manhattan supertall tower.",
        story: "purchased One World Trade Center and made the top 40 floors a personal sneaker closet."
      }
    ],
    jets: [
      {
        id: "na_jet_1",
        name: "Air Force One (VC-25B Unit)",
        price: 660000000,
        lore: "Modified Boeing 747-8i Flying Command Center.",
        story: "bought an Air Force One VC-25B and painted it 2-bit yellow."
      },
      {
        id: "na_jet_2",
        name: "Tyler Perry's Gulfstream III Studio",
        price: 125000000,
        lore: "Custom Flying Private Theater & VIP Jet.",
        story: "acquired the Flying Theater Gulfstream to binge-watch cartoons at 45,000 feet."
      },
      {
        id: "na_jet_3",
        name: "Custom 24k Gold Boeing 757-200",
        price: 100000000,
        lore: "VIP Airliner with Gold-Plated Seatbuckles.",
        story: "bought the Gold-Plated 757 and uses it ausschließlich for 10-minute grocery runs."
      }
    ],
    cars: [
      {
        id: "na_car_1",
        name: "1963 Ferrari 250 GTO (WeatherTech)",
        price: 70000000,
        lore: "Record North American Private Collector Sale.",
        story: "bought a $70M 1963 Ferrari 250 GTO and parallel parked it outside a convenience store."
      },
      {
        id: "na_car_2",
        name: "1962 Ferrari 250 GTO (RM Sotheby's)",
        price: 51700000,
        lore: "Monterey Auction Record Classic.",
        story: "added the $51.7M Monterey Ferrari 250 GTO to the garage as a rainy-day beater."
      },
      {
        id: "na_car_3",
        name: "Rolls-Royce Droptail La Rose Noire",
        price: 30000000,
        lore: "Pebble Beach Ultra-Bespoke Commission.",
        story: "commissioned the $30M Rolls-Royce Droptail just to leave the roof down in a thunderstorm."
      }
    ],
    musicians: [
      {
        id: "na_mus_1",
        name: "Beyoncé (Private Performance)",
        price: 24000000,
        lore: "Documented Private Royal Launch Booking Fee.",
        story: "paid Beyoncé $24M to perform a private living-room concert while eating cereal."
      },
      {
        id: "na_mus_2",
        name: "Taylor Swift (Private Concert)",
        price: 15000000,
        lore: "Full Eras-Scale Private Takeover.",
        story: "booked Taylor Swift for $15M to sing acoustic background music during a nap."
      },
      {
        id: "na_mus_3",
        name: "The Eagles (Private Arena Gig)",
        price: 6000000,
        lore: "NYC Private Corporate Booking Record.",
        story: "hired The Eagles for $6M to play 'Hotel California' on loop in the elevator."
      }
    ]
  },

  "Europe": {
    companies: [
      {
        id: "eu_comp_1",
        name: "Novo Nordisk",
        price: 550000000000,
        lore: "Bagsværd, Denmark (Market Cap) — Pharma Giant.",
        story: "bought Novo Nordisk and became larger than the entire GDP of Denmark."
      },
      {
        id: "eu_comp_2",
        name: "LVMH Moët Hennessy",
        price: 380000000000,
        lore: "Paris, France (Market Cap) — Louis Vuitton, Dior, Moët.",
        story: "acquired LVMH and made pixel-art yellow hoodies the mandatory uniform of Paris Fashion Week."
      },
      {
        id: "eu_comp_3",
        name: "ASML Holding",
        price: 350000000000,
        lore: "Veldhoven, Netherlands — Extreme UV Lithography Monopoly.",
        story: "bought ASML Holding, controlling every extreme-ultraviolet chip machine on Earth."
      }
    ],
    militaries: [
      {
        id: "eu_mil_1",
        name: "Russian Armed Forces + Strategic Stock",
        price: 650000000000,
        lore: "Active Hardware + Submarine & Icebreaker Fleet.",
        story: "bought out the entire Russian submarine fleet to organize deep-sea hide-and-seek."
      },
      {
        id: "eu_mil_2",
        name: "UK Armed Forces + Royal Navy Carriers",
        price: 320000000000,
        lore: "HMS Queen Elizabeth + HMS Prince of Wales + RAF.",
        story: "purchased the Royal Navy and anchored HMS Queen Elizabeth right outside the River Thames."
      },
      {
        id: "eu_mil_3",
        name: "French Armed Forces + Charles de Gaulle",
        price: 310000000000,
        lore: "Nuclear Carrier + Rafale Fighter Wings + Army.",
        story: "hired the French Air Force Rafale squadron to sky-write 'YOU' above the Eiffel Tower."
      }
    ],
    buildings: [
      {
        id: "eu_bld_1",
        name: "Olkiluoto 3 Nuclear Plant Complex",
        price: 12000000000,
        lore: "Eurajoki, Finland — Europe's Priciest Modern Structure.",
        story: "bought Finland's $12B Olkiluoto 3 nuclear plant just to charge a single gaming laptop."
      },
      {
        id: "eu_bld_2",
        name: "Hinkley Point C Facility",
        price: 11000000000,
        lore: "Somerset, UK — Mega-Infrastructure Project.",
        story: "acquired Hinkley Point C and converted the turbine hall into an indoor rave venue."
      },
      {
        id: "eu_bld_3",
        name: "Palace of the Parliament",
        price: 4300000000,
        lore: "Bucharest, Romania — Heaviest Building on Earth.",
        story: "bought Bucharest's 1,100-room Palace of the Parliament and still can't find the bathroom."
      }
    ],
    jets: [
      {
        id: "eu_jet_1",
        name: "Airbus A340-300 VIP 'Bourkhan'",
        price: 450000000,
        lore: "Europe's Largest Private Widebody Jet.",
        story: "purchased the $450M Airbus A340 VIP jet to fly croissants fresh from Paris to Geneva."
      },
      {
        id: "eu_jet_2",
        name: "Boeing 787-8 VIP Dreamliner",
        price: 350000000,
        lore: "Custom Oligarch-Spec 50-Seat Dreamliner.",
        story: "bought a $350M VIP 787 Dreamliner because commercial first class had too much eye contact."
      },
      {
        id: "eu_jet_3",
        name: "Lufthansa Technik BBJ 777-9 Explorer",
        price: 325000000,
        lore: "Flying Luxury Superyacht Concept.",
        story: "ordered the BBJ 777-9 Explorer with a holodeck Lounge in the sky."
      }
    ],
    cars: [
      {
        id: "eu_car_1",
        name: "1955 Mercedes-Benz 300 SLR Uhlenhaut",
        price: 142000000,
        lore: "Stuttgart Museum Record — Most Expensive Car Ever Sold.",
        story: "bought the $142M Mercedes 300 SLR Uhlenhaut Coupé and took it through an automatic car wash."
      },
      {
        id: "eu_car_2",
        name: "Bugatti La Voiture Noire",
        price: 18700000,
        lore: "Molsheim One-Off W16 Hypercar.",
        story: "purchased Bugatti La Voiture Noire and put a 'Student Driver' bumper sticker on the back."
      },
      {
        id: "eu_car_3",
        name: "Pagani Zonda HP Barchetta",
        price: 17500000,
        lore: "Modena 1-of-3 Open-Top Masterpiece.",
        story: "revved a $17.5M Pagani Zonda HP Barchetta through Monaco at 3 AM."
      }
    ],
    musicians: [
      {
        id: "eu_mus_1",
        name: "The Rolling Stones (Private Show)",
        price: 7000000,
        lore: "Private Billionaire Party Booking.",
        story: "paid The Rolling Stones $7M to play a private set in a medieval castle courtyard."
      },
      {
        id: "eu_mus_2",
        name: "Adele (Private Performance)",
        price: 5000000,
        lore: "VIP Private Gala Booking Rate.",
        story: "hired Adele for $5M to sing 'Hello' every time someone rings the doorbell."
      },
      {
        id: "eu_mus_3",
        name: "Elton John (Private Concert)",
        price: 4500000,
        lore: "Private Grand Piano Performance.",
        story: "flew Elton John in for $4.5M to play piano music during dinner."
      }
    ]
  },

  "Asia": {
    companies: [
      {
        id: "as_comp_1",
        name: "Saudi Aramco",
        price: 1800000000000,
        lore: "Dhahran, Saudi Arabia — World's Largest Energy Giant.",
        story: "bought Saudi Aramco and now gets free gas station snacks for life."
      },
      {
        id: "as_comp_2",
        name: "TSMC (Taiwan Semiconductor)",
        price: 950000000000,
        lore: "Hsinchu, Taiwan — Foundry of the Modern World.",
        story: "acquired TSMC and engraved a tiny 2-bit smiley face onto every 3nm silicon wafer."
      },
      {
        id: "as_comp_3",
        name: "Tencent Holdings",
        price: 480000000000,
        lore: "Shenzhen, China — Gaming & WeChat Empire.",
        story: "purchased Tencent and gave the player account infinite skins in every video game on Earth."
      }
    ],
    militaries: [
      {
        id: "as_mil_1",
        name: "PLA (China) + Naval & J-20 Fleet",
        price: 1450000000000,
        lore: "3 Aircraft Carriers + Stealth Air Wings & Rocket Force.",
        story: "took command of 3 aircraft carriers and staged a synchronized maritime light show."
      },
      {
        id: "as_mil_2",
        name: "Indian Armed Forces + Defense Stock",
        price: 410000000000,
        lore: "INS Vikrant Carrier + Rafale/Su-30MKI + Army.",
        story: "deployed INS Vikrant and an entire fighter wing as a personal escort into the Indian Ocean."
      },
      {
        id: "as_mil_3",
        name: "Saudi Arabian Military + Air Arsenal",
        price: 290000000000,
        lore: "F-15SA Fleet + Patriot Batteries & Royal Navy.",
        story: "acquired the Royal Air Arsenal to guard a private desert oasis."
      }
    ],
    buildings: [
      {
        id: "as_bld_1",
        name: "Masjid al-Haram Expansion",
        price: 100000000000,
        lore: "Mecca — Most Expensive Construction Project in History.",
        story: "funded a $100B mega-complex buyout, shocking global real estate appraisers."
      },
      {
        id: "as_bld_2",
        name: "Abraj Al Bait (Clock Towers)",
        price: 16000000000,
        lore: "Mecca — $16 Billion Skyscraper Complex.",
        story: "bought the $16B Clock Towers so there is zero excuse for ever being late again."
      },
      {
        id: "as_bld_3",
        name: "Marina Bay Sands Integrated Resort",
        price: 8000000000,
        lore: "Singapore — Three-Tower SkyPark Infinity Pool.",
        story: "bought Singapore's Marina Bay Sands just to have the rooftop infinity pool completely empty."
      }
    ],
    jets: [
      {
        id: "as_jet_1",
        name: "Airbus A380 'Flying Palace'",
        price: 500000000,
        lore: "Double-Decker VIP Superjumbo with Concert Hall.",
        story: "bought the $500M double-decker Airbus A380 Palace complete with a onboard Turkish bath."
      },
      {
        id: "as_jet_2",
        name: "Sultan's Boeing 747-430 Gold VIP",
        price: 400000000,
        lore: "Solid Gold Washbasins & Lalique Crystal Cabin.",
        story: "acquired the Sultan's 747-430 with solid gold sinks."
      },
      {
        id: "as_jet_3",
        name: "Hong Kong Boeing 747-8i VIP",
        price: 367000000,
        lore: "Bespoke Spiral-Staircase Widebody.",
        story: "purchased the $367M Hong Kong 747-8i VIP for weekend dim sum runs."
      }
    ],
    cars: [
      {
        id: "as_car_1",
        name: "Sultan of Brunei 24k Gold Rolls-Royce",
        price: 14000000,
        lore: "Gold-Plated Silver Spur II Royal Limousine.",
        story: "cruised in the solid-gold Rolls-Royce Silver Spur, blinding satellites from orbit."
      },
      {
        id: "as_car_2",
        name: "1967 Toyota 2000GT Open-Top",
        price: 10000000,
        lore: "Ultra-Rare Japanese Collector Crown Jewel.",
        story: "bought the $10M 1967 Toyota 2000GT for midnight Tokyo expressway drives."
      },
      {
        id: "as_car_3",
        name: "Aspark Owl Carbon Hypercar",
        price: 4200000,
        lore: "Osaka 1,980-HP Electric Hypercar.",
        story: "launched the $4.2M Aspark Owl from 0 to 60 mph in 1.7 seconds just to beat a yellow light."
      }
    ],
    musicians: [
      {
        id: "as_mus_1",
        name: "BTS (Full Group Private Reunion)",
        price: 10000000,
        lore: "Seoul Megastar Private Stage Production.",
        story: "paid $10M to stage a private BTS stadium-level performance for an audience of one."
      },
      {
        id: "as_mus_2",
        name: "BLACKPINK (Full Group Private Show)",
        price: 6500000,
        lore: "Global Headline VIP Booking.",
        story: "booked BLACKPINK for $6.5M to perform live at the Troll On-Site Club afterparty."
      },
      {
        id: "as_mus_3",
        name: "A.R. Rahman (Full Orchestra Live)",
        price: 3500000,
        lore: "Private Royal Symphony Production.",
        story: "hired A.R. Rahman and a 100-piece orchestra to score every walk into a room."
      }
    ]
  },

  "Africa": {
    companies: [
      {
        id: "af_comp_1",
        name: "Naspers Limited",
        price: 45000000000,
        lore: "Cape Town, South Africa — Tech & Media Conglomerate.",
        story: "bought out Naspers Limited and took over tech venture capital across the Southern Hemisphere."
      },
      {
        id: "af_comp_2",
        name: "FirstRand Limited",
        price: 25000000000,
        lore: "Johannesburg, South Africa — Banking Powerhouse.",
        story: "acquired FirstRand Bank so the vault literally belongs to 'you'."
      },
      {
        id: "af_comp_3",
        name: "Dangote Cement & Refinery Group",
        price: 22000000000,
        lore: "Lagos, Nigeria — Industrial & Mega-Refinery Empire.",
        story: "purchased the Dangote industrial empire to pave private golden highways."
      }
    ],
    militaries: [
      {
        id: "af_mil_1",
        name: "Egyptian Armed Forces + Mistral/Rafale",
        price: 95000000000,
        lore: "2 Helicopter Carriers + M1A1 Tank Divisions.",
        story: "stationed two Mistral-class helicopter carriers in the Suez Canal to collect VIP tolls."
      },
      {
        id: "af_mil_2",
        name: "Algerian People's National Army",
        price: 82000000000,
        lore: "Kilo-Class Submarines + Su-30MKA Fighter Wing.",
        story: "acquired the Mediterranean submarine wing for private underwater sightseeing."
      },
      {
        id: "af_mil_3",
        name: "South African National Defence Force",
        price: 28000000000,
        lore: "Valour-Class Frigates + Gripen Supersonic Jets.",
        story: "scrambled South African Gripen jets to escort your private jet over Table Mountain."
      }
    ],
    buildings: [
      {
        id: "af_bld_1",
        name: "Iconic Tower CBD Complex",
        price: 3000000000,
        lore: "New Administrative Capital, Egypt — Africa's Tallest Tower.",
        story: "claimed Egypt's $3B Iconic Tower as the African regional HQ for the Troll On-Site Club."
      },
      {
        id: "af_bld_2",
        name: "Grand Egyptian Museum",
        price: 1200000000,
        lore: "Giza, Egypt — Mega-Museum by the Pyramids.",
        story: "bought the $1.2B Grand Egyptian Museum and added a 2-bit statue next to the Pharaohs."
      },
      {
        id: "af_bld_3",
        name: "Djamaa el Djazaïr Complex",
        price: 1100000000,
        lore: "Algiers, Algeria — World's Tallest Minaret Complex.",
        story: "acquired the $1.1B Algiers coastal architectural marvel."
      }
    ],
    jets: [
      {
        id: "af_jet_1",
        name: "Royal Boeing 747-8 VIP",
        price: 350000000,
        lore: "Casablanca/Rabat VVIP Widebody Flagship.",
        story: "flew the $350M Royal 747-8 across the Sahara with a full banquet onboard."
      },
      {
        id: "af_jet_2",
        name: "Presidential Airbus A330-200 VIP",
        price: 100000000,
        lore: "Abuja VVIP Command Airliner.",
        story: "acquired the $100M VVIP Airbus A330 for non-stop continental hops."
      },
      {
        id: "af_jet_3",
        name: "Bombardier Global Express XRS VIP",
        price: 65000000,
        lore: "Lagos Billionaire Ultra-Long-Range Jet.",
        story: "bought a $65M Bombardier Global Express as a backup puddle-jumper."
      }
    ],
    cars: [
      {
        id: "af_car_1",
        name: "24k Gold-Trimmed Bugatti Veyron",
        price: 2800000,
        lore: "Lagos/Johannesburg Collector Trophy Hypercar.",
        story: "cruised Victoria Island in a $2.8M Gold-Trimmed Bugatti Veyron."
      },
      {
        id: "af_car_2",
        name: "Laraki Epitome Hypercar",
        price: 2000000,
        lore: "Casablanca 1,750-HP Twin-Turbo V8.",
        story: "unleashed all 1,750 horsepower of the Moroccan Laraki Epitome on the coast road."
      },
      {
        id: "af_car_3",
        name: "Armored Brabus G-V12 900",
        price: 1200000,
        lore: "1-of-10 V12 Armored Luxury SUV.",
        story: "bought an armored V12 Brabus G-Wagon convoy."
      }
    ],
    musicians: [
      {
        id: "af_mus_1",
        name: "Burna Boy (Private Stadium-Spec Gig)",
        price: 2000000,
        lore: "Afro-Fusion Global Megastar Private Booking.",
        story: "paid Burna Boy $2M to perform a private rooftop concert in Lagos."
      },
      {
        id: "af_mus_2",
        name: "Wizkid (Private VIP Concert)",
        price: 1500000,
        lore: "VVIP Global Performance Fee.",
        story: "booked Wizkid for $1.5M to headline a Tuesday afternoon yacht party."
      },
      {
        id: "af_mus_3",
        name: "Black Coffee (Private Sunset Set)",
        price: 1000000,
        lore: "Grammy-Winning DJ Private Villa Booking.",
        story: "flew in Black Coffee for $1M to spin house music at sunset in Clifton."
      }
    ]
  },

  "South America": {
    companies: [
      {
        id: "sa_comp_1",
        name: "Petrobras",
        price: 92000000000,
        lore: "Rio de Janeiro, Brazil — Deepwater Energy Titan.",
        story: "bought Petrobras and turned offshore oil rigs into luxury helipad resorts."
      },
      {
        id: "sa_comp_2",
        name: "MercadoLibre",
        price: 90000000000,
        lore: "Buenos Aires / Montevideo — E-Commerce Giant.",
        story: "acquired MercadoLibre so every package in South America arrives with a Troll Club sticker."
      },
      {
        id: "sa_comp_3",
        name: "Itaú Unibanco",
        price: 62000000000,
        lore: "São Paulo, Brazil — Latin America's Largest Bank.",
        story: "bought Itaú Unibanco and replaced the hold music with 8-bit chiptunes."
      }
    ],
    militaries: [
      {
        id: "sa_mil_1",
        name: "Brazilian Armed Forces + Gripen/Subs",
        price: 110000000000,
        lore: "NAM Atlântico Carrier + Scorpène Submarines.",
        story: "deployed the flagship NAM Atlântico off Copacabana Beach for a private fireworks show."
      },
      {
        id: "sa_mil_2",
        name: "Colombian Military + Black Hawk Wing",
        price: 45000000000,
        lore: "Massive Helicopter Fleet + Naval Frigates.",
        story: "used an entire squadron of Black Hawk helicopters to airlift fresh Colombian coffee."
      },
      {
        id: "sa_mil_3",
        name: "Chilean Armed Forces + F-16/Navy",
        price: 38000000000,
        lore: "Type 23 Frigates + F-16 Fighting Falcons.",
        story: "hired the Chilean F-16 wing to race over the Atacama Desert."
      }
    ],
    buildings: [
      {
        id: "sa_bld_1",
        name: "Itaipu Dam Hydroelectric Mega-Structure",
        price: 19600000000,
        lore: "Brazil/Paraguay Border — $19.6B Engineering Wonder.",
        story: "bought the $19.6B Itaipu Dam to power the Troll On-Site Club neon sign."
      },
      {
        id: "sa_bld_2",
        name: "Costanera Center & Gran Torre",
        price: 1200000000,
        lore: "Santiago, Chile — Tallest Skyscraper in South America.",
        story: "turned the top of Santiago's Gran Torre into a private observatory."
      },
      {
        id: "sa_bld_3",
        name: "Estádio Nacional Mané Garrincha",
        price: 900000000,
        lore: "Brasília, Brazil — $900M World Cup Arena.",
        story: "bought a 72,000-seat Brazilian stadium just to play 5-a-side football with friends."
      }
    ],
    jets: [
      {
        id: "sa_jet_1",
        name: "Gulfstream G700 Flagship (São Paulo)",
        price: 80000000,
        lore: "Ultra-Long-Range Billionaire Flagship.",
        story: "landed the $80M Gulfstream G700 in São Paulo to skip city traffic."
      },
      {
        id: "sa_jet_2",
        name: "Bombardier Global 7500 (Buenos Aires)",
        price: 75000000,
        lore: "Four-Zone Cabin Executive Jet.",
        story: "bought a $75M Global 7500 to fly Argentine steak hot from Buenos Aires."
      },
      {
        id: "sa_jet_3",
        name: "Custom #10 Gulfstream V Executive",
        price: 16000000,
        lore: "Rosario/Miami Custom VIP Tail #10.",
        story: "picked up the #10 Gulfstream V as a spare weekend jet."
      }
    ],
    cars: [
      {
        id: "sa_car_1",
        name: "1954 Ferrari 375 Plus",
        price: 18400000,
        lore: "Argentine Racing Heritage Auction Legend.",
        story: "roared through Buenos Aires in an $18.4M 1954 Ferrari 375 Plus."
      },
      {
        id: "sa_car_2",
        name: "Pagani Zonda F Roadster (São Paulo)",
        price: 12000000,
        lore: "Ultra-Rare Carbon Fiber Collector Icon.",
        story: "parked a $12M Pagani Zonda F right in the middle of Avenida Paulista."
      },
      {
        id: "sa_car_3",
        name: "1955 Maserati A6GCS/53 Spyder",
        price: 5500000,
        lore: "Concours-Winning Coachbuilt Classic.",
        story: "took the $5.5M 1955 Maserati Spyder out for a coastal cruise in Punta del Este."
      }
    ],
    musicians: [
      {
        id: "sa_mus_1",
        name: "Shakira (Private Concert)",
        price: 3500000,
        lore: "Global Superstar Private Booking.",
        story: "paid Shakira $3.5M for a private concert on a private island."
      },
      {
        id: "sa_mus_2",
        name: "J Balvin (Private Performance)",
        price: 2000000,
        lore: "Full Reggaeton Stage Takeover.",
        story: "booked J Balvin for $2M to turn a Medellín penthouse into a private festival."
      },
      {
        id: "sa_mus_3",
        name: "Anitta (Private VIP Show)",
        price: 1500000,
        lore: "Rio Carnival-Scale Private Booking.",
        story: "hired Anitta for $1.5M to throw an off-season Rio Carnival just for the Club."
      }
    ]
  },

  "Oceania": {
    companies: [
      {
        id: "oc_comp_1",
        name: "Commonwealth Bank (CBA)",
        price: 150000000000,
        lore: "Sydney, Australia — Oceania's Most Valuable Bank.",
        story: "bought Commonwealth Bank and made 'Troll Dollars' legal tender at every ATM in Sydney."
      },
      {
        id: "oc_comp_2",
        name: "BHP Group",
        price: 145000000000,
        lore: "Melbourne, Australia — Global Mining Behemoth.",
        story: "acquired BHP Group to dig a giant 2-bit smiley face visible from space in the Outback."
      },
      {
        id: "oc_comp_3",
        name: "CSL Limited",
        price: 95000000000,
        lore: "Melbourne, Australia — Biotech Giant.",
        story: "bought out CSL Limited, securing the top 3 corporations in Oceania."
      }
    ],
    militaries: [
      {
        id: "oc_mil_1",
        name: "Australian Defence Force + AUKUS/F-35s",
        price: 240000000000,
        lore: "72 F-35A Lightning IIs + Canberra LHDs + Destroyers.",
        story: "bought the Australian Defence Force fleet to patrol the Great Barrier Reef."
      },
      {
        id: "oc_mil_2",
        name: "New Zealand Defence Force + P-8A Wing",
        price: 18000000000,
        lore: "Anzac Frigates + Poseidon Maritime Patrol Jets.",
        story: "hired the New Zealand Defence Force to guard a private Hobbiton replica."
      },
      {
        id: "oc_mil_3",
        name: "Papua New Guinea Defence Force",
        price: 1200000000,
        lore: "Guardian-Class Patrol Fleet + Air Transport Wing.",
        story: "recruited the Guardian-Class Patrol Fleet as yacht support vessels."
      }
    ],
    buildings: [
      {
        id: "oc_bld_1",
        name: "Royal Adelaide Hospital Complex",
        price: 2400000000,
        lore: "Adelaide — Oceania's Most Expensive Building.",
        story: "purchased the $2.4B Adelaide mega-complex."
      },
      {
        id: "oc_bld_2",
        name: "Crown Sydney Barangaroo Resort",
        price: 2200000000,
        lore: "Sydney Harbour — 75-Floor Luxury Tower.",
        story: "bought all 75 floors of Crown Sydney for uninterrupted Harbour Bridge views."
      },
      {
        id: "oc_bld_3",
        name: "Parliament House Canberra",
        price: 1800000000,
        lore: "Canberra — $1.8B National Capitol Complex.",
        story: "bought Parliament House in Canberra and rode a skateboard down the grass roof."
      }
    ],
    jets: [
      {
        id: "oc_jet_1",
        name: "Bombardier Global 7500 (Perth Flagship)",
        price: 75000000,
        lore: "Mining Tycoon Non-Stop London-to-Perth Jet.",
        story: "flew the $75M Global 7500 across the Outback at Mach 0.92."
      },
      {
        id: "oc_jet_2",
        name: "Gulfstream G650ER (Melbourne VIP)",
        price: 70000000,
        lore: "Ultra-Long-Range Pacific Flagship.",
        story: "acquired the $70M Melbourne G650ER for trans-Pacific hops."
      },
      {
        id: "oc_jet_3",
        name: "Gulfstream G650ER (Pilbara Executive)",
        price: 68000000,
        lore: "Bespoke VIP Outback & Global Jet.",
        story: "added a second $68M G650ER so guests never have to share a cabin."
      }
    ],
    cars: [
      {
        id: "oc_car_1",
        name: "McLaren F1 Chassis #009 (Sydney)",
        price: 20000000,
        lore: "Oceania's Most Valuable Collector Hypercar.",
        story: "took the $20M McLaren F1 across the Sydney Harbour Bridge at dawn."
      },
      {
        id: "oc_car_2",
        name: "1970 Ferrari 512 M (Melbourne)",
        price: 16000000,
        lore: "Historic V12 Le Mans Racing Icon.",
        story: "daily-drove a $16M 1970 Ferrari 512 M Le Mans race car to get flat whites in Melbourne."
      },
      {
        id: "oc_car_3",
        name: "Brabham BT62 Track Hypercar",
        price: 1400000,
        lore: "Adelaide-Built 700-HP Track Monster.",
        story: "unleashed the Adelaide-built Brabham BT62 on the streets."
      }
    ],
    musicians: [
      {
        id: "oc_mus_1",
        name: "AC/DC (Private Stadium-Rig Show)",
        price: 6000000,
        lore: "Full Cannon & Bell Rock Production.",
        story: "paid AC/DC $6M to blast 'Thunderstruck' with real cannons in the backyard."
      },
      {
        id: "oc_mus_2",
        name: "Kylie Minogue (Private Gala Show)",
        price: 2500000,
        lore: "Sydney Harbour VIP Private Performance.",
        story: "hired Kylie Minogue for $2.5M to headline a private Sydney Harbour yacht party."
      },
      {
        id: "oc_mus_3",
        name: "Lorde (Private Intimate Performance)",
        price: 1500000,
        lore: "Exclusive Auckland/Queenstown VIP Set.",
        story: "booked Lorde for $1.5M to sing 'Royals' while counting the remaining trillions."
      }
    ]
  }
};

// Format numbers cleanly ($7,000,000,000,000)
function formatCurrency(num) {
  return "$" + Math.round(num).toLocaleString("en-US");
}

// DOM Elements
const splashScreen = document.getElementById("splash-screen");
const newsText = document.getElementById("news-text");
const chapterDisplay = document.getElementById("chapter-display");
const dossierBtn = document.getElementById("dossier-btn");
const playerNameInput = document.getElementById("player-name");
const balanceDisplay = document.getElementById("balance-display");
const spentPercent = document.getElementById("spent-percent");
const progressFill = document.getElementById("progress-fill");
const currentRegionLabel = document.getElementById("current-region-label");
const continentTabs = document.getElementById("continent-tabs");
const categorySelect = document.getElementById("category-select");
const itemsList = document.getElementById("items-list");
const storyDialogue = document.getElementById("story-dialogue");
const charStatus = document.getElementById("char-status");
const dossierModal = document.getElementById("dossier-modal");
const dossierPlayerName = document.getElementById("dossier-player-name");
const dossierLog = document.getElementById("dossier-log");
const closeDossierBtn = document.getElementById("close-dossier-btn");
const victoryModal = document.getElementById("victory-modal");
const resetBtn = document.getElementById("reset-btn");
const canvas = document.getElementById("pixel-char");
const ctx = canvas.getContext("2d");

/**
 * ============================================================================
 * 1. INITIALIZATION & SPLASH FADE-OUT
 * ============================================================================
 */
window.addEventListener("DOMContentLoaded", () => {
  renderContinents();
  renderItems();
  draw2BitCharacter("idle");

  // Fade away the intro screen after 2.7 seconds
  setTimeout(() => {
    splashScreen.classList.add("fade-out");
  }, 2700);
});

function getPlayerName() {
  const raw = playerNameInput.value.trim();
  return raw.length > 0 ? raw : "you";
}

playerNameInput.addEventListener("input", () => {
  const name = getPlayerName();
  typewriterSpeak(`"New alias registered: '${name}'. The world central banks have no idea who ${name} is."`);
  newsText.textContent = `BREAKING: Trillionaire operative "${name}" spotted moving funds across ${currentContinent}...`;
});

/**
 * ============================================================================
 * 2. TYPEWRITER RPG DIALOGUE & CHAPTER PROGRESSION
 * ============================================================================
 */
let typeTimer = null;

function typewriterSpeak(text) {
  clearInterval(typeTimer);
  storyDialogue.textContent = "";
  let idx = 0;

  typeTimer = setInterval(() => {
    storyDialogue.textContent += text.charAt(idx);
    idx++;
    if (idx >= text.length) {
      clearInterval(typeTimer);
    }
  }, 14);
}

function updateStoryChapter() {
  const spent = INITIAL_BALANCE - currentBalance;
  const pct = Math.min(100, Math.floor((spent / INITIAL_BALANCE) * 100));

  spentPercent.textContent = `${pct}% LIQUIDATED`;
  progressFill.style.width = `${pct}%`;

  if (currentBalance === 0) {
    chapterDisplay.textContent = "CHAPTER V: ZERO-BALANCE GOD";
  } else if (pct >= 75) {
    chapterDisplay.textContent = "CHAPTER IV: THE SHADOW HEGEMON";
  } else if (pct >= 40) {
    chapterDisplay.textContent = "CHAPTER III: SOVEREIGN MENACE";
  } else if (pct >= 10) {
    chapterDisplay.textContent = "CHAPTER II: CONTINENTAL WHISPERER";
  } else {
    chapterDisplay.textContent = "CHAPTER I: THE $7T GLITCH";
  }
}

/**
 * ============================================================================
 * 3. CONTINENT & ASSET RENDERING
 * ============================================================================
 */
function renderContinents() {
  continentTabs.innerHTML = "";
  Object.keys(WORLD_DATA).forEach((continent) => {
    const btn = document.createElement("button");
    btn.className = "continent-btn" + (continent === currentContinent ? " active" : "");
    btn.textContent = continent.toUpperCase();
    btn.addEventListener("click", () => {
      currentContinent = continent;
      currentRegionLabel.textContent = continent.toUpperCase();
      renderContinents();
      renderItems();
      typewriterSpeak(`"${CONTINENT_INTRO[continent]}"`);
      newsText.textContent = `ALERT: "${getPlayerName()}" private jet just touched down in ${continent} with ${formatCurrency(currentBalance)} remaining.`;
    });
    continentTabs.appendChild(btn);
  });
}

categorySelect.addEventListener("change", (e) => {
  currentCategory = e.target.value;
  renderItems();
  const label = categorySelect.options[categorySelect.selectedIndex].text;
  typewriterSpeak(`"Scanning ${currentContinent} for ${label}. Pick your target, ${getPlayerName()}."`);
});

function renderItems() {
  itemsList.innerHTML = "";
  const items = WORLD_DATA[currentContinent][currentCategory];

  items.forEach((item) => {
    const owned = inventory[item.id] || 0;
    const canBuyOne = currentBalance >= item.price;
    const canBuyTen = currentBalance >= item.price * 10;
    const maxAffordable = Math.floor(currentBalance / item.price);

    const card = document.createElement("div");
    card.className = "item-card";

    card.innerHTML = `
      <div class="item-header">
        <span class="item-name">${item.name}</span>
        <span class="item-owned">OWNED: ${owned}</span>
      </div>
      <div class="item-lore">${item.lore}</div>
      <div class="item-price">${formatCurrency(item.price)}</div>
      <div class="buy-actions">
        <button class="buy-btn" data-qty="1" ${!canBuyOne ? "disabled" : ""}>ACQUIRE x1</button>
        <button class="buy-btn" data-qty="10" ${!canBuyTen ? "disabled" : ""}>x10</button>
        <button class="buy-btn" data-qty="max" ${maxAffordable < 1 ? "disabled" : ""}>
          ALL-IN (${maxAffordable > 999 ? "999+" : maxAffordable})
        </button>
      </div>
    `;

    card.querySelectorAll(".buy-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const mode = btn.getAttribute("data-qty");
        let qty = 1;
        if (mode === "10") qty = 10;
        if (mode === "max") qty = Math.floor(currentBalance / item.price);
        executeStoryPurchase(item, qty);
      });
    });

    itemsList.appendChild(card);
  });
}

/**
 * ============================================================================
 * 4. STORY PURCHASE EXECUTION & CHRONICLE GENERATOR
 * ============================================================================
 */
function executeStoryPurchase(item, quantity) {
  if (quantity <= 0) return;
  const totalCost = item.price * quantity;
  if (currentBalance < totalCost) return;

  currentBalance -= totalCost;
  inventory[item.id] = (inventory[item.id] || 0) + quantity;

  // Clear residual pocket change below the cheapest $1M asset so the story can conclude cleanly
  if (currentBalance > 0 && currentBalance < 1000000) {
    currentBalance = 0;
  }

  const player = getPlayerName();
  balanceDisplay.textContent = formatCurrency(currentBalance);
  updateStoryChapter();
  renderItems();

  // Trigger RPG Story Reaction
  const qtyText = quantity > 1 ? `(${quantity}x) ` : "";
  const narrativeLine = `${player} ${qtyText}${item.story}`;
  typewriterSpeak(`"${narrativeLine}"`);
  newsText.textContent = `WORLD SHOCK: ${narrativeLine} (${formatCurrency(totalCost)} spent!)`;

  // Save to Chronicle Log
  storyChronicle.unshift(`[${currentContinent.toUpperCase()}] ${narrativeLine}`);
  dossierBtn.textContent = `CHRONICLE (${storyChronicle.length})`;

  // Animate 2-bit character
  animateCharacterReaction();

  // Check if all $7 Trillion has been spent
  if (currentBalance === 0) {
    setTimeout(() => {
      victoryModal.classList.remove("hidden");
    }, 550);
  }
}

/**
 * ============================================================================
 * 5. LITERAL 2-BIT CHARACTER RENDERER (Lower Middle 16x16 Canvas)
 * ============================================================================
 */
const PALETTE = {
  "0": "#211a00", // Deep Umber Ink
  "1": "#8a7000", // Bronze Gold
  "2": "#f2cc00", // 2-Bit Yellow
  "3": "#fff8c4"  // Lemon Cream
};

const SPRITE_IDLE = [
  "2222200000022222",
  "2222203333022222",
  "2222201111022222",
  "2220000000000222",
  "2222033333302222",
  "2220000000000222",
  "2220300300030222",
  "2220333333330222",
  "2220300000030222",
  "2222033333302222",
  "2222200000022222",
  "2220010330100222",
  "2201110110111022",
  "2203011111103022",
  "2222000220002222",
  "2220000220000222"
];

const SPRITE_TALK = [
  "2222200000022222",
  "2222203333022222",
  "2220000000000222",
  "2222033333302222",
  "2030000000000302",
  "2030300300030302",
  "2000333333330002",
  "2201303333031022",
  "2220030000300222",
  "2222200000022222",
  "2222010330102222",
  "2222010110102222",
  "2222011111102222",
  "2222000220002222",
  "2220002222000222",
  "2222222222222222"
];

function draw2BitCharacter(mode) {
  const sprite = mode === "talk" ? SPRITE_TALK : SPRITE_IDLE;
  ctx.clearRect(0, 0, 16, 16);
  for (let y = 0; y < 16; y++) {
    for (let x = 0; x < 16; x++) {
      ctx.fillStyle = PALETTE[sprite[y][x]];
      ctx.fillRect(x, y, 1, 1);
    }
  }
}

let animTimer = null;
function animateCharacterReaction() {
  draw2BitCharacter("talk");
  charStatus.textContent = "[ACQUIRING ASSET!]";
  clearTimeout(animTimer);
  animTimer = setTimeout(() => {
    draw2BitCharacter("idle");
    charStatus.textContent = "[SCHEMING]";
  }, 650);
}

/**
 * ============================================================================
 * 6. CHRONICLE DOSSIER & RESET MODALS
 * ============================================================================
 */
dossierBtn.addEventListener("click", () => {
  dossierPlayerName.textContent = getPlayerName().toUpperCase();
  if (storyChronicle.length === 0) {
    dossierLog.innerHTML = "<p>No assets acquired yet. Begin your global spending spree.</p>";
  } else {
    dossierLog.innerHTML = storyChronicle.map((entry, i) => `<p>${storyChronicle.length - i}. ${entry}</p>`).join("");
  }
  dossierModal.classList.remove("hidden");
});

closeDossierBtn.addEventListener("click", () => {
  dossierModal.classList.add("hidden");
});

resetBtn.addEventListener("click", () => {
  currentBalance = INITIAL_BALANCE;
  inventory = {};
  storyChronicle = [];
  balanceDisplay.textContent = formatCurrency(currentBalance);
  dossierBtn.textContent = "CHRONICLE (0)";
  updateStoryChapter();
  victoryModal.classList.add("hidden");
  renderItems();
  typewriterSpeak(`"Timeline reset, ${getPlayerName()}. $7,000,000,000,000 is back in the vault. Write a new story."`);
});
