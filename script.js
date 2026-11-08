/**
 * ============================================================================
 * TROLL ON-SITE CLUB - GAME ENGINE & OPEN-SOURCE VALUATION DATASET
 * ============================================================================
 * All values represent documented public market caps, defense budgets + hardware
 * valuations, construction/appraisal values, and auction/booking records.
 */

const INITIAL_BALANCE = 7000000000000; // $7 Trillion ($7,000,000,000,000)
let currentBalance = INITIAL_BALANCE;
let currentContinent = "North America";
let currentCategory = "companies";
let inventory = {}; // Tracks how many of each item the player bought

// Open-source real-world dataset organized by Continent -> Category -> Top 3
const WORLD_DATA = {
  "North America": {
    companies: [
      { id: "na_comp_1", name: "Apple Inc.", price: 3400000000000, note: "Cupertino, USA (Market Cap)" },
      { id: "na_comp_2", name: "Microsoft Corp.", price: 3100000000000, note: "Redmond, USA (Market Cap)" },
      { id: "na_comp_3", name: "NVIDIA Corp.", price: 3000000000000, note: "Santa Clara, USA (Market Cap)" }
    ],
    militaries: [
      { id: "na_mil_1", name: "US Armed Forces + Fleet/B-21s", price: 2950000000000, note: "USA Budget + 11 Carrier Groups & Hardware" },
      { id: "na_mil_2", name: "Canadian Armed Forces + NORAD Gear", price: 115000000000, note: "Canada Defense + F-35 & Frigate Fleet" },
      { id: "na_mil_3", name: "Mexican Armed Forces + Hardware", price: 42000000000, note: "SEDENA & SEMAR + Fleet Assets" }
    ],
    buildings: [
      { id: "na_bld_1", name: "Apple Park Campus", price: 5000000000, note: "Cupertino, California" },
      { id: "na_bld_2", name: "SoFi Stadium Complex", price: 4950000000, note: "Inglewood, California" },
      { id: "na_bld_3", name: "One World Trade Center", price: 3900000000, note: "New York City, New York" }
    ],
    jets: [
      { id: "na_jet_1", name: "Air Force One (VC-25B Program Unit)", price: 660000000, note: "Modified Boeing 747-8i" },
      { id: "na_jet_2", name: "Tyler Perry's Gulfstream III Studio", price: 125000000, note: "Custom Flying Theater Jet" },
      { id: "na_jet_3", name: "Trump Force One (Boeing 757-200)", price: 100000000, note: "24k Gold-Plated Custom Interior" }
    ],
    cars: [
      { id: "na_car_1", name: "1963 Ferrari 250 GTO (WeatherTech)", price: 70000000, note: "Record Private Collector Sale" },
      { id: "na_car_2", name: "1962 Ferrari 250 GTO (RM Sotheby's)", price: 51700000, note: "Monterey Auction Record" },
      { id: "na_car_3", name: "rolls-Royce Droptail La Rose Noire", price: 30000000, note: "Commissioned Pebble Beach Debut" }
    ],
    musicians: [
      { id: "na_mus_1", name: "Beyoncé (Private Performance)", price: 24000000, note: "Documented Atlantis Royal Fee" },
      { id: "na_mus_2", name: "Taylor Swift (Private Concert)", price: 15000000, note: "Full Eras-Scale Private Booking" },
      { id: "na_mus_3", name: "The Eagles (Private Arena Gig)", price: 6000000, note: "NYC Private Corporate Booking" }
    ]
  },

  "Europe": {
    companies: [
      { id: "eu_comp_1", name: "Novo Nordisk", price: 550000000000, note: "Bagsværd, Denmark (Market Cap)" },
      { id: "eu_comp_2", name: "LVMH Moët Hennessy", price: 380000000000, note: "Paris, France (Market Cap)" },
      { id: "eu_comp_3", name: "ASML Holding", price: 350000000000, note: "Veldhoven, Netherlands (Market Cap)" }
    ],
    militaries: [
      { id: "eu_mil_1", name: "Russian Armed Forces + Strategic Stock", price: 650000000000, note: "Active Hardware + Submarine/Nuclear Fleet" },
      { id: "eu_mil_2", name: "UK Armed Forces + Royal Navy Carriers", price: 320000000000, note: "QE-Class Carriers + Vanguard Subs + RAF" },
      { id: "eu_mil_3", name: "French Armed Forces + Charles de Gaulle", price: 310000000000, note: "Rafale Fleet + Nuclear Deterrent + Navy" }
    ],
    buildings: [
      { id: "eu_bld_1", name: "Olkiluoto 3 Nuclear Plant Complex", price: 12000000000, note: "Eurajoki, Finland" },
      { id: "eu_bld_2", name: "Hinkley Point C Facility (Phase 1)", price: 11000000000, note: "Somerset, United Kingdom" },
      { id: "eu_bld_3", name: "Palace of the Parliament", price: 4300000000, note: "Bucharest, Romania" }
    ],
    jets: [
      { id: "eu_jet_1", name: "Alisher Usmanov Airbus A340-300", price: 450000000, note: "'Bourkhan' Custom VIP Widebody" },
      { id: "eu_jet_2", name: "Roman Abramovich Boeing 787-8", price: 350000000, note: "VIP Dreamliner Configuration" },
      { id: "eu_jet_3", name: "Lufthansa Technik BBJ 777-9 Explorer", price: 325000000, note: "Flying Luxury Penthouse" }
    ],
    cars: [
      { id: "eu_car_1", name: "1955 Mercedes-Benz 300 SLR Uhlenhaut", price: 142000000, note: "Stuttgart Museum Auction Record" },
      { id: "eu_car_2", name: "Bugatti La Voiture Noire", price: 18700000, note: "Molsheim One-Off Hypercar" },
      { id: "eu_car_3", name: "Pagani Zonda HP Barchetta", price: 17500000, note: "San Cesario sul Panaro Ultra-Rare" }
    ],
    musicians: [
      { id: "eu_mus_1", name: "The Rolling Stones (Private Show)", price: 7000000, note: "Private Billionaire Event Booking" },
      { id: "eu_mus_2", name: "Adele (Private Performance)", price: 5000000, note: "Private VIP Gala Rate" },
      { id: "eu_mus_3", name: "Elton John (Private Concert)", price: 4500000, note: "Private Solo & Band Booking" }
    ]
  },

  "Asia": {
    companies: [
      { id: "as_comp_1", name: "Saudi Aramco", price: 1800000000000, note: "Dhahran, Saudi Arabia (Market Cap)" },
      { id: "as_comp_2", name: "TSMC (Taiwan Semiconductor)", price: 950000000000, note: "Hsinchu, Taiwan (Market Cap)" },
      { id: "as_comp_3", name: "Tencent Holdings", price: 480000000000, note: "Shenzhen, China (Market Cap)" }
    ],
    militaries: [
      { id: "as_mil_1", name: "PLA (China) + Naval & J-20 Fleet", price: 1450000000000, note: "3 Carriers + Strategic Rocket & Air Force" },
      { id: "as_mil_2", name: "Indian Armed Forces + Defense Stock", price: 410000000000, note: "INS Vikrant + Su-30MKI/Rafale + Army" },
      { id: "as_mil_3", name: "Saudi Arabian Military + Air Arsenal", price: 290000000000, note: "F-15SA Fleet + Patriot & Naval Hardware" }
    ],
    buildings: [
      { id: "as_bld_1", name: "Masjid al-Haram Expansion", price: 100000000000, note: "Mecca, Saudi Arabia" },
      { id: "as_bld_2", name: "Abraj Al Bait (Clock Towers)", price: 16000000000, note: "Mecca, Saudi Arabia" },
      { id: "as_bld_3", name: "Marina Bay Sands Integrated Resort", price: 8000000000, note: "Marina Bay, Singapore" }
    ],
    jets: [
      { id: "as_jet_1", name: "Prince Alwaleed Airbus A380 Palace", price: 500000000, note: "Double-Decker VIP Flying Palace" },
      { id: "as_jet_2", name: "Sultan of Brunei Boeing 747-430", price: 400000000, note: "Solid Gold Washbasins & Crystal Cabin" },
      { id: "as_jet_3", name: "Joseph Lau Boeing 747-8i VIP", price: 367000000, note: "Hong Kong Custom Widebody" }
    ],
    cars: [
      { id: "as_car_1", name: "Sultan of Brunei Rolls-Royce Silver Spur", price: 14000000, note: "24k Gold-Plated Royal Wedding Car" },
      { id: "as_car_2", name: "1967 Toyota 2000GT Open-Top Bond", price: 10000000, note: "Japanese Collector Valuation" },
      { id: "as_car_3", name: "Aspark Owl Carbon Hypercar", price: 4200000, note: "Osaka Electric Hypercar" }
    ],
    musicians: [
      { id: "as_mus_1", name: "BTS (Full Group Private Reunion)", price: 10000000, note: "Global Megastar Private Appearance" },
      { id: "as_mus_2", name: "BLACKPINK (Full Group Private Show)", price: 6500000, note: "VIP Festival/Private Rate" },
      { id: "as_mus_3", name: "A.R. Rahman (Full Orchestra Live)", price: 3500000, note: "Private Royal Wedding Production" }
    ]
  },

  "Africa": {
    companies: [
      { id: "af_comp_1", name: "Naspers Limited", price: 45000000000, note: "Cape Town, South Africa (Market Cap)" },
      { id: "af_comp_2", name: "FirstRand Limited", price: 25000000000, note: "Johannesburg, South Africa (Market Cap)" },
      { id: "af_comp_3", name: "Dangote Cement & Refinery Group", price: 22000000000, note: "Lagos, Nigeria (Combined Valuation)" }
    ],
    militaries: [
      { id: "af_mil_1", name: "Egyptian Armed Forces + Mistral/Rafale", price: 95000000000, note: "2 Helicopter Carriers + M1A1 Tank Fleet" },
      { id: "af_mil_2", name: "Algerian People's National Army", price: 82000000000, note: "Kilo Subs + Su-30MKA + S-400 Systems" },
      { id: "af_mil_3", name: "South African National Defence Force", price: 28000000000, note: "Valour Frigates + Gripen Fighter Wing" }
    ],
    buildings: [
      { id: "af_bld_1", name: "Grand Egyptian Museum", price: 1200000000, note: "Giza, Egypt" },
      { id: "af_bld_2", name: "Djamaa el Djazaïr (Great Mosque)", price: 1100000000, note: "Algiers, Algeria" },
      { id: "af_bld_3", name: "Iconic Tower Central Business District", price: 3000000000, note: "New Administrative Capital, Egypt" }
    ],
    jets: [
      { id: "af_jet_1", name: "Morocco Royal Boeing 747-8 VIP", price: 350000000, note: "Rabat VVIP Presidential Fleet" },
      { id: "af_jet_2", name: "Nigeria Presidential Airbus A330-200", price: 100000000, note: "Abuja VVIP Transport" },
      { id: "af_jet_3", name: "Aliko Dangote Bombardier Global Express", price: 65000000, note: "XRS Ultra-Long-Range Executive Jet" }
    ],
    cars: [
      { id: "af_car_1", name: "Laraki Epitome Hypercar", price: 2000000, note: "Casablanca Limited Edition" },
      { id: "af_car_2", name: "24k Gold-Trimmed Bugatti Veyron", price: 2800000, note: "Lagos/Johannesburg Collector Import" },
      { id: "af_car_3", name: "Armored Brabus G-V12 900 One of Ten", price: 1200000, note: "Custom VVIP Security Spec" }
    ],
    musicians: [
      { id: "af_mus_1", name: "Burna Boy (Private Stadium-Spec Gig)", price: 2000000, note: "International Headline Private Fee" },
      { id: "af_mus_2", name: "Wizkid (Private Royal/VIP Show)", price: 1500000, note: "VIP Global Booking Fee" },
      { id: "af_mus_3", name: "Black Coffee (Private Ibiza-Spec Set)", price: 1000000, note: "VVIP Private Yacht/Villa Booking" }
    ]
  },

  "South America": {
    companies: [
      { id: "sa_comp_1", name: "Petrobras", price: 92000000000, note: "Rio de Janeiro, Brazil (Market Cap)" },
      { id: "sa_comp_2", name: "MercadoLibre", price: 90000000000, note: "Buenos Aires / Montevideo (Market Cap)" },
      { id: "sa_comp_3", name: "Itaú Unibanco", price: 62000000000, note: "São Paulo, Brazil (Market Cap)" }
    ],
    militaries: [
      { id: "sa_mil_1", name: "Brazilian Armed Forces + Gripen/Sub Fleet", price: 110000000000, note: "NAM Atlântico + Scorpène Subs + Army" },
      { id: "sa_mil_2", name: "Colombian Military Forces + Air Fleet", price: 45000000000, note: "Black Hawk Fleet + Naval Frigates" },
      { id: "sa_mil_3", name: "Chilean Armed Forces + Leopard/F-16s", price: 38000000000, note: "Type 23 Frigates + F-16 Wing" }
    ],
    buildings: [
      { id: "sa_bld_1", name: "Itaipu Dam Hydroelectric Complex", price: 19600000000, note: "Brazil / Paraguay Border" },
      { id: "sa_bld_2", name: "Costanera Center & Gran Torre", price: 1200000000, note: "Santiago, Chile" },
      { id: "sa_bld_3", name: "Estádio Nacional Mané Garrincha", price: 900000000, note: "Brasília, Brazil" }
    ],
    jets: [
      { id: "sa_jet_1", name: "Gulfstream G700 Flagship (São Paulo)", price: 80000000, note: "Banking Billionaire Flagship" },
      { id: "sa_jet_2", name: "Bombardier Global 7500 (Buenos Aires)", price: 75000000, note: "Intercontinental VIP Spec" },
      { id: "sa_jet_3", name: "Lionel Messi Gulfstream V Executive", price: 16000000, note: "Custom Tail #10 Family Configuration" }
    ],
    cars: [
      { id: "sa_car_1", name: "1954 Ferrari 375 Plus (Buenos Aires)", price: 18400000, note: "Argentine Racing Heritage Record" },
      { id: "sa_car_2", name: "Pagani Zonda F Roadster (São Paulo)", price: 12000000, note: "Import Tax + Collector Valuation" },
      { id: "sa_car_3", name: "1955 Maserati A6GCS/53 Spyder", price: 5500000, note: "South American Concours Winner" }
    ],
    musicians: [
      { id: "sa_mus_1", name: "Shakira (Private Concert)", price: 3500000, note: "Private Billionaire Wedding Booking" },
      { id: "sa_mus_2", name: "J Balvin (Private Performance)", price: 2000000, note: "Full Reggaeton Production Booking" },
      { id: "sa_mus_3", name: "Anitta (Private VIP Show)", price: 1500000, note: "Carnival-Scale Private Booking" }
    ]
  },

  "Oceania": {
    companies: [
      { id: "oc_comp_1", name: "BHP Group", price: 145000000000, note: "Melbourne, Australia (Market Cap)" },
      { id: "oc_comp_2", name: "Commonwealth Bank (CBA)", price: 150000000000, note: "Sydney, Australia (Market Cap)" },
      { id: "oc_comp_3", name: "CSL Limited", price: 95000000000, note: "Melbourne, Australia (Market Cap)" }
    ],
    militaries: [
      { id: "oc_mil_1", name: "Australian Defence Force + AUKUS/F-35s", price: 240000000000, note: "72 F-35As + Canberra LHDs + Hobart Destroyers" },
      { id: "oc_mil_2", name: "New Zealand Defence Force + P-8A Fleet", price: 18000000000, note: "Anzac Frigates + Poseidon Maritime Wing" },
      { id: "oc_mil_3", name: "Papua New Guinea Defence Force", price: 1200000000, note: "Guardian-Class Patrol Vessels + Air Wing" }
    ],
    buildings: [
      { id: "oc_bld_1", name: "Royal Adelaide Hospital Complex", price: 2400000000, note: "Adelaide, Australia" },
      { id: "oc_bld_2", name: "Crown Sydney Barangaroo Resort", price: 2200000000, note: "Sydney, Australia" },
      { id: "oc_bld_3", name: "Parliament House Canberra", price: 1800000000, note: "Canberra, Australia" }
    ],
    jets: [
      { id: "oc_jet_1", name: "Andrew Forrest Bombardier Global 7500", price: 75000000, note: "Perth Mining Tycoon Ultra-Long-Range" },
      { id: "oc_jet_2", name: "Anthony Pratt Gulfstream G650ER", price: 70000000, note: "Melbourne Executive Flagship" },
      { id: "oc_jet_3", name: "Gina Rinehart Gulfstream G650ER", price: 68000000, note: "Hancock Prospecting VIP Jet" }
    ],
    cars: [
      { id: "oc_car_1", name: "1970 Ferrari 512 M (Lindsay Fox)", price: 16000000, note: "Melbourne Collector Valuation" },
      { id: "oc_car_2", name: "McLaren F1 Chassis #009 (Sydney)", price: 20000000, note: "Australian Trophy Collection" },
      { id: "oc_car_3", name: "Brabham BT62 Track Hypercar", price: 1400000, note: "Adelaide Built V8 Supercar" }
    ],
    musicians: [
      { id: "oc_mus_1", name: "AC/DC (Private Stadium-Rig Show)", price: 6000000, note: "Full Rock Production Private Fee" },
      { id: "oc_mus_2", name: "Kylie Minogue (Private Gala Concert)", price: 2500000, note: "VIP New Year / Corporate Fee" },
      { id: "oc_mus_3", name: "Lorde (Private Intimate Performance)", price: 1500000, note: "Exclusive VIP Booking" }
    ]
  }
};

// Format numbers cleanly with commas ($7,000,000,000,000)
function formatCurrency(num) {
  return "$" + Math.round(num).toLocaleString("en-US");
}

// Initialize DOM references
const splashScreen = document.getElementById("splash-screen");
const balanceDisplay = document.getElementById("balance-display");
const continentTabs = document.getElementById("continent-tabs");
const categorySelect = document.getElementById("category-select");
const itemsList = document.getElementById("items-list");
const playerNameInput = document.getElementById("player-name");
const speechBubble = document.getElementById("speech-bubble");
const victoryModal = document.getElementById("victory-modal");
const resetBtn = document.getElementById("reset-btn");
const canvas = document.getElementById("pixel-char");
const ctx = canvas.getContext("2d");

/**
 * ============================================================================
 * 1. SPLASH SCREEN FADE-OUT
 * ============================================================================
 */
window.addEventListener("DOMContentLoaded", () => {
  // Render initial UI behind the splash screen
  renderContinents();
  renderItems();
  draw2BitCharacter(false);

  // Fade away splash screen after 2.4 seconds
  setTimeout(() => {
    splashScreen.classList.add("fade-out");
  }, 2400);
});

/**
 * ============================================================================
 * 2. CONTINENT & CATEGORY CONTROLS
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
      renderContinents();
      renderItems();
      updateSpeech(`EXPLORING ${continent.toUpperCase()}!`);
    });
    continentTabs.appendChild(btn);
  });
}

categorySelect.addEventListener("change", (e) => {
  currentCategory = e.target.value;
  renderItems();
});

playerNameInput.addEventListener("input", () => {
  const name = getPlayerName();
  updateSpeech(`KEEP SPENDING, ${name.toUpperCase()}!`);
});

function getPlayerName() {
  const val = playerNameInput.value.trim();
  return val.length > 0 ? val : "you";
}

/**
 * ============================================================================
 * 3. RENDER MARKET ITEMS & PURCHASE LOGIC
 * ============================================================================
 */
function renderItems() {
  itemsList.innerHTML = "";
  const items = WORLD_DATA[currentContinent][currentCategory];

  items.forEach((item) => {
    const ownedCount = inventory[item.id] || 0;
    const canBuyOne = currentBalance >= item.price;
    const canBuyTen = currentBalance >= item.price * 10;
    const maxAffordable = Math.floor(currentBalance / item.price);

    const card = document.createElement("div");
    card.className = "item-card";

    card.innerHTML = `
      <div class="item-header">
        <span class="item-name">${item.name}</span>
        <span class="item-owned">OWNED: ${ownedCount}</span>
      </div>
      <div class="item-meta">${item.note}</div>
      <div class="item-price">${formatCurrency(item.price)}</div>
      <div class="buy-actions">
        <button class="buy-btn" data-qty="1" ${!canBuyOne ? "disabled" : ""}>BUY +1</button>
        <button class="buy-btn" data-qty="10" ${!canBuyTen ? "disabled" : ""}>BUY +10</button>
        <button class="buy-btn" data-qty="max" ${maxAffordable < 1 ? "disabled" : ""}>
          MAX (${maxAffordable > 999 ? "999+" : maxAffordable})
        </button>
      </div>
    `;

    // Attach purchase handlers
    const buttons = card.querySelectorAll(".buy-btn");
    buttons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const qtyType = btn.getAttribute("data-qty");
        let quantity = 1;
        if (qtyType === "10") quantity = 10;
        if (qtyType === "max") quantity = Math.floor(currentBalance / item.price);
        buyAsset(item, quantity);
      });
    });

    itemsList.appendChild(card);
  });
}

function buyAsset(item, quantity) {
  if (quantity <= 0) return;
  const totalCost = item.price * quantity;

  if (currentBalance >= totalCost) {
    currentBalance -= totalCost;
    inventory[item.id] = (inventory[item.id] || 0) + quantity;

    // If remaining balance is less than the cheapest item in the game ($1,000,000),
    // allow automatic rounding to $0 when buying final assets or let player clear exact change.
    if (currentBalance > 0 && currentBalance < 1000000) {
      currentBalance = 0;
    }

    balanceDisplay.textContent = formatCurrency(currentBalance);
    renderItems();
    triggerCharacterCelebration(item.name, quantity);

    // Check win condition ($0 remaining)
    if (currentBalance === 0) {
      victoryModal.classList.remove("hidden");
    }
  }
}

/**
 * ============================================================================
 * 4. LITERAL 2-BIT CHARACTER RENDERER (16x16 Pixel Art on HTML5 Canvas)
 * ============================================================================
 * Uses strictly 4 colors (2-bit depth):
 * '0' = #241c00 (Darkest Ink)
 * '1' = #8c7300 (Mid Mustard)
 * '2' = #f5d000 (Base Yellow)
 * '3' = #fff9cc (Bright Cream Highlight)
 */
const PALETTE = {
  "0": "#241c00",
  "1": "#8c7300",
  "2": "#f5d000",
  "3": "#fff9cc"
};

// Idle 16x16 sprite (2-Bit Troll Club Tycoon with Top Hat & Shades)
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

// Cheering 16x16 sprite (Arms raised holding 2-bit cash)
const SPRITE_CHEER = [
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

function draw2BitCharacter(isCheering) {
  const matrix = isCheering ? SPRITE_CHEER : SPRITE_IDLE;
  ctx.clearRect(0, 0, 16, 16);

  for (let y = 0; y < 16; y++) {
    for (let x = 0; x < 16; x++) {
      const colorCode = matrix[y][x];
      ctx.fillStyle = PALETTE[colorCode];
      ctx.fillRect(x, y, 1, 1);
    }
  }
}

let cheerTimeout = null;
function triggerCharacterCelebration(itemName, qty) {
  draw2BitCharacter(true);
  const shortName = itemName.length > 16 ? itemName.slice(0, 16) + ".." : itemName;
  updateSpeech(`BOUGHT ${qty}x ${shortName.toUpperCase()}!`);

  clearTimeout(cheerTimeout);
  cheerTimeout = setTimeout(() => {
    draw2BitCharacter(false);
  }, 600);
}

function updateSpeech(text) {
  speechBubble.textContent = text;
}

/**
 * ============================================================================
 * 5. RESET GAME HANDLER
 * ============================================================================
 */
resetBtn.addEventListener("click", () => {
  currentBalance = INITIAL_BALANCE;
  inventory = {};
  balanceDisplay.textContent = formatCurrency(currentBalance);
  victoryModal.classList.add("hidden");
  renderItems();
  updateSpeech(`BACK AT $7T, ${getPlayerName().toUpperCase()}!`);
});
