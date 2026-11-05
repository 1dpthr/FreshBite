import { FormEvent, useMemo, useState } from "react"

type Page = "home" | "menu" | "cart" | "orders" | "support"
type IconName = "arrow" | "bag" | "bot" | "burger" | "cake" | "cart" | "check" | "chevron" | "chicken" | "clock" | "close" | "cup" | "facebook" | "help" | "instagram" | "mail" | "map" | "menu" | "minus" | "pasta" | "phone" | "pizza" | "plus" | "search" | "send" | "star" | "trash" | "twitter"

type Dish = {
  id: number
  name: string
  category: string
  description: string
  price: number
  rating: string
  time: string
  image: string
}

type CartItem = Dish & { quantity: number }
type Message = { role: "assistant" | "user"; text: string }

function Icon({
  name,
  size = 20,
  className = "",
}: {
  name: IconName,
  size?: number,
  className?: string,
}) {
  const paths: Record<IconName, React.ReactNode> = {
    arrow: (
      <>
        <path d="M5 12h14" />
        <path d="m13 6 6 6-6 6" />
      </>
    ),
    bag: (
      <>
        <path d="M6 8h12l-1 12H7L6 8Z" />
        <path d="M9 9V6a3 3 0 0 1 6 0v3" />
      </>
    ),
    bot: (
      <>
        <rect x="4" y="7" width="16" height="13" rx="4" />
        <path d="M9 12h.01M15 12h.01M9 16h6M12 7V4" />
        <circle cx="12" cy="3" r="1" />
      </>
    ),
    burger: (
      <>
        <path d="M5 11a7 5 0 0 1 14 0H5ZM4 15h16M6 19h12a2 2 0 0 0 2-2H4a2 2 0 0 0 2 2Z" />
      </>
    ),
    cake: (
      <>
        <path d="M5 11h14v9H5zM4 15c2 0 2 1.5 4 1.5s2-1.5 4-1.5 2 1.5 4 1.5 2-1.5 4-1.5M8 11V8m4 3V7m4 4V8" />
      </>
    ),
    cart: (
      <>
        <circle cx="9" cy="20" r="1" />
        <circle cx="18" cy="20" r="1" />
        <path d="M3 4h2l2.2 10.4a2 2 0 0 0 2 1.6h8.7a2 2 0 0 0 2-1.7L21 8H6" />
      </>
    ),
    check: <path d="m5 12 4 4L19 6" />,
    chevron: <path d="m9 18 6-6-6-6" />,
    chicken: (
      <>
        <path d="M14.5 5.5c2.7 2.7 2.8 6.9.3 9.4s-6.7 2.4-9.4-.3S4 8.8 6.5 6.3s5.3-3.5 8-.8ZM15 15l2.5 2.5M18 16.5c1-1 2.5-.5 2.5.5.9.1 1.4 1.6.4 2.6s-2.5.5-2.6-.4c-1 0-1.5-1.5-.5-2.5" />
      </>
    ),
    clock: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </>
    ),
    close: <path d="M6 6l12 12M18 6 6 18" />,
    cup: (
      <>
        <path d="M5 6h12v7a6 6 0 0 1-12 0V6ZM17 8h1a3 3 0 0 1 0 6h-1" />
      </>
    ),
    facebook: (
      <path d="M14 8h3V4h-3a5 5 0 0 0-5 5v3H6v4h3v6h4v-6h3l1-4h-4V9a1 1 0 0 1 1-1Z" />
    ),
    help: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M9.8 9a2.3 2.3 0 1 1 3.3 2.1c-.8.4-1.1.9-1.1 1.9M12 17h.01" />
      </>
    ),
    instagram: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r=".6" fill="currentColor" />
      </>
    ),
    mail: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 7 9 6 9-6" />
      </>
    ),
    map: (
      <>
        <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
        <circle cx="12" cy="10" r="2.5" />
      </>
    ),
    menu: <path d="M4 7h16M4 12h16M4 17h16" />,
    minus: <path d="M5 12h14" />,
    pasta: (
      <>
        <path d="M4 13h16a8 8 0 0 1-16 0ZM8 10c0-3 3-2 3-5m2 5c0-3 3-2 3-5" />
      </>
    ),
    phone: (
      <path d="M6.6 3h3l1.5 4-2 1.5a15 15 0 0 0 6.4 6.4l1.5-2 4 1.5v3a3 3 0 0 1-3 3A15 15 0 0 1 3.6 6a3 3 0 0 1 3-3Z" />
    ),
    pizza: (
      <>
        <path d="m12 3 8 17H4L12 3ZM7 14h10" />
        <circle cx="12" cy="10" r="1" />
        <circle cx="10" cy="16" r="1" />
      </>
    ),
    plus: <path d="M12 5v14M5 12h14" />,
    search: (
      <>
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-4-4" />
      </>
    ),
    send: <path d="m22 2-7 20-4-9-9-4 20-7ZM11 13 22 2" />,
    star: (
      <path d="m12 3 2.7 5.5 6.1.9-4.4 4.3 1 6.1-5.4-2.9-5.4 2.9 1-6.1-4.4-4.3 6.1-.9L12 3Z" />
    ),
    trash: (
      <>
        <path d="M4 7h16M9 7V4h6v3M7 7l1 14h8l1-14M10 11v6M14 11v6" />
      </>
    ),
    twitter: (
      <path d="M21 5.5c-.7.3-1.4.5-2.2.6a3.8 3.8 0 0 0-6.6 2.6v.9A10.7 10.7 0 0 1 4.4 5.7s-3.5 7.8 4.3 11.3a11 11 0 0 1-6.5 1.8c7.8 4.3 17.3 0 17.3-10 0-.2 0-.4-.1-.6.7-.8 1.2-1.7 1.6-2.7Z" />
    ),
  }
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  )
}

const categories = [
  { name: "Burgers", icon: "burger" as IconName },
  { name: "Pizza", icon: "pizza" as IconName },
  { name: "Pasta", icon: "pasta" as IconName },
  { name: "Chicken", icon: "chicken" as IconName },
  { name: "Desserts", icon: "cake" as IconName },
  { name: "Drinks", icon: "cup" as IconName },
]

const foodImages = {
  burger:
    "https://images.unsplash.com/photo-1762922425249-144c3bb9167e?auto=format&fit=crop&w=900&q=85",
  pizza:
    "https://images.unsplash.com/photo-1790355126680-31fafd786f74?auto=format&fit=crop&w=900&q=85",
  pasta:
    "https://images.unsplash.com/photo-1791410300150-0752bc56717c?auto=format&fit=crop&w=900&q=85",
  chicken:
    "https://images.unsplash.com/photo-1773756606644-bbbb1bd16b87?auto=format&fit=crop&w=900&q=85",
  flatbread:
    "https://images.unsplash.com/photo-1786082271424-10450164ebb6?auto=format&fit=crop&w=900&q=85",
  cake: "https://images.unsplash.com/photo-1768260731727-275f15ed2556?auto=format&fit=crop&w=900&q=85",
  brownie:
    "https://images.unsplash.com/photo-1766413580427-88906bbd722d?auto=format&fit=crop&w=900&q=85",
  drink:
    "https://images.unsplash.com/photo-1701566352550-98f803b3c675?auto=format&fit=crop&w=900&q=85",
  bowl: "https://images.unsplash.com/photo-1563897539633-7374c276c212?auto=format&fit=crop&w=900&q=85",
}

const dishes: Dish[] = [
  {
    id: 1,
    name: "Smoky House Burger",
    category: "Burgers",
    description:
      "Flame-grilled beef, cheddar, caramelized onion and house sauce.",
    price: 1290,
    rating: "4.9",
    time: "20–25 min",
    image: foodImages.burger,
  },
  {
    id: 2,
    name: "Creamy Truffle Pasta",
    category: "Pasta",
    description: "Silky mushroom cream, parmesan, herbs and a hint of truffle.",
    price: 1450,
    rating: "4.8",
    time: "25–30 min",
    image: foodImages.pasta,
  },
  {
    id: 3,
    name: "Herb Grilled Chicken",
    category: "Chicken",
    description: "Tender herb-marinated chicken with seasonal vegetables.",
    price: 1390,
    rating: "4.7",
    time: "25–30 min",
    image: foodImages.chicken,
  },
  {
    id: 4,
    name: "Classic Margherita",
    category: "Pizza",
    description: "San Marzano tomato, fresh mozzarella, basil and olive oil.",
    price: 1190,
    rating: "4.9",
    time: "20–25 min",
    image: foodImages.pizza,
  },
  {
    id: 5,
    name: "Crispy Chicken Burger",
    category: "Burgers",
    description: "Crunchy chicken fillet, pickles, slaw and pepper mayo.",
    price: 1090,
    rating: "4.7",
    time: "20–25 min",
    image: foodImages.flatbread,
  },
  {
    id: 6,
    name: "Roasted Chicken Pizza",
    category: "Pizza",
    description: "Roasted chicken, capsicum, olives, mozzarella and red sauce.",
    price: 1540,
    rating: "4.6",
    time: "25–30 min",
    image: foodImages.pizza,
  },
  {
    id: 7,
    name: "Arrabbiata Penne",
    category: "Pasta",
    description:
      "Penne in a bright tomato sauce with chilli, garlic and basil.",
    price: 1250,
    rating: "4.7",
    time: "20–25 min",
    image: foodImages.pasta,
  },
  {
    id: 8,
    name: "Garden Chicken Bowl",
    category: "Chicken",
    description: "Grilled chicken, fresh greens, grains and lemon dressing.",
    price: 1320,
    rating: "4.8",
    time: "20–25 min",
    image: foodImages.bowl,
  },
  {
    id: 9,
    name: "Chocolate Cherry Cake",
    category: "Desserts",
    description: "Dark chocolate sponge, cream and a bright cherry finish.",
    price: 690,
    rating: "4.9",
    time: "10–15 min",
    image: foodImages.cake,
  },
  {
    id: 10,
    name: "Warm Fudge Brownie",
    category: "Desserts",
    description: "Warm chocolate brownie with vanilla ice cream and fudge.",
    price: 750,
    rating: "4.8",
    time: "10–15 min",
    image: foodImages.brownie,
  },
  {
    id: 11,
    name: "Fresh Mint Mojito",
    category: "Drinks",
    description: "Fresh mint, lime, sparkling water and crushed ice.",
    price: 390,
    rating: "4.7",
    time: "5–10 min",
    image: foodImages.drink,
  },
  {
    id: 12,
    name: "Citrus Cooler",
    category: "Drinks",
    description: "Orange, lime and grapefruit served chilled over ice.",
    price: 420,
    rating: "4.6",
    time: "5–10 min",
    image: foodImages.drink,
  },
]

const formatPrice = (value: number) => `PKR ${value.toLocaleString("en-PK")}`

function FoodCard({
  dish,
  addToCart,
}: {
  dish: Dish,
  addToCart: (dish: Dish) => void,
}) {
  return (
    <article className="dish-card group">
      <div className="relative h-[210px] overflow-hidden rounded-[16px] bg-[#edf0ea]">
        <img
          src={dish.image}
          alt={dish.name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
        />
        <span className="absolute left-3 top-3 flex items-center gap-1 rounded-full bg-white/95 px-2.5 py-1.5 text-[11px] font-bold shadow-sm">
          <Icon
            name="star"
            size={12}
            className="fill-[#d4a749] stroke-[#d4a749]"
          />
          {dish.rating}
        </span>
      </div>
      <div className="px-1 pb-1 pt-4">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-[16px] font-bold tracking-[-0.02em]">
            {dish.name}
          </h3>
          <span className="flex shrink-0 items-center gap-1 text-[10px] font-medium text-[#777]">
            <Icon name="clock" size={12} />
            {dish.time}
          </span>
        </div>
        <p className="mt-2 min-h-[40px] text-[12px] leading-5 text-[#777]">
          {dish.description}
        </p>
        <div className="mt-4 flex items-center justify-between gap-3">
          <p className="text-[14px] font-bold text-[#202522]">
            {formatPrice(dish.price)}
          </p>
          <button
            onClick={() => addToCart(dish)}
            className="rounded-lg bg-[#e8efe8] px-3.5 py-2.5 text-xs font-bold text-[#52765b] transition hover:bg-[#52765b] hover:text-white"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </article>
  )
}

function PageHeader({
  eyebrow,
  title,
  text,
}: {
  eyebrow: string,
  title: string,
  text: string,
}) {
  return (
    <div className="mb-8 max-w-2xl">
      <p className="eyebrow">{eyebrow}</p>
      <h1 className="mt-2 text-[34px] font-bold tracking-[-0.045em] sm:text-[42px]">
        {title}
      </h1>
      <p className="mt-3 text-sm leading-6 text-[#777] sm:text-base">{text}</p>
    </div>
  )
}

function HomePage({
  navigate,
  addToCart,
}: {
  navigate: (page: Page) => void,
  addToCart: (dish: Dish) => void,
}) {
  return (
    <main>
      <section className="mx-auto max-w-[1240px] px-5 pt-10 lg:px-8 lg:pt-14">
        <div className="mb-8">
          <p className="mb-1 text-sm font-semibold text-[#52765b]">
            Welcome back, Ayesha
          </p>
          <h1 className="text-[34px] font-bold tracking-[-0.045em] sm:text-[42px]">
            Good food, good mood!
          </h1>
          <p className="mt-2 text-base text-[#777]">
            Discover freshly prepared meals and flavors you will love.
          </p>
        </div>
        <div className="hero-grid relative min-h-[356px] overflow-hidden rounded-[24px] bg-[#e0e9df]">
          <div className="relative z-10 flex min-h-[356px] max-w-[590px] flex-col justify-center px-7 py-12 sm:px-12 lg:px-14">
            <span className="mb-5 w-fit rounded-full bg-white/80 px-3.5 py-2 text-xs font-bold uppercase tracking-[0.14em] text-[#52765b]">
              FreshBite welcome offer
            </span>
            <h2 className="text-[38px] font-bold leading-[1.06] tracking-[-0.05em] sm:text-[50px]">
              Get <span className="text-[#52765b]">20% OFF</span>
              <br />
              your first order.
            </h2>
            <p className="mt-4 max-w-[430px] text-sm leading-6 text-[#5e6b61]">
              Fresh favorites delivered to your door. Use code{" "}
              <strong>FRESH20</strong> at checkout.
            </p>
            <button
              onClick={() => navigate("menu")}
              className="primary-button mt-7"
            >
              Order Now <Icon name="arrow" size={17} />
            </button>
          </div>
          <div className="absolute inset-y-0 right-0 hidden w-[49%] lg:block">
            <img
              src="https://images.unsplash.com/photo-1633195000232-ca6e3cbcfd41?auto=format&fit=crop&w=1100&q=88"
              alt="A table filled with freshly prepared dishes"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#e0e9df] to-transparent" />
          </div>
          <img
            src="https://images.unsplash.com/photo-1633195000232-ca6e3cbcfd41?auto=format&fit=crop&w=900&q=85"
            alt=""
            className="absolute inset-0 h-full w-full object-cover opacity-20 lg:hidden"
          />
        </div>
      </section>

      <section className="mx-auto max-w-[1240px] px-5 py-14 lg:px-8 lg:py-18">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Explore the menu</p>
            <h2>What are you craving?</h2>
          </div>
          <button onClick={() => navigate("menu")} className="text-link">
            View full menu <Icon name="arrow" size={16} />
          </button>
        </div>
        <div className="hide-scrollbar flex gap-3 overflow-x-auto pb-2 sm:grid sm:grid-cols-3 lg:grid-cols-6">
          {categories.map((category) => (
            <button
              key={category.name}
              onClick={() => navigate("menu")}
              className="category-card min-w-[140px]"
            >
              <span className="category-icon">
                <Icon name={category.icon} size={24} />
              </span>
              <span className="font-semibold">{category.name}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="border-y border-[#e8e9e4] bg-white">
        <div className="mx-auto max-w-[1240px] px-5 py-14 lg:px-8 lg:py-18">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Handpicked for you</p>
              <h2>Featured dishes</h2>
            </div>
            <button onClick={() => navigate("menu")} className="text-link">
              Browse all <Icon name="arrow" size={16} />
            </button>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {dishes.slice(0, 4).map((dish) => (
              <FoodCard key={dish.id} dish={dish} addToCart={addToCart} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1240px] px-5 py-14 lg:px-8 lg:py-18">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Your activity</p>
            <h2>Recently placed orders</h2>
          </div>
          <button onClick={() => navigate("orders")} className="text-link">
            Track order <Icon name="arrow" size={16} />
          </button>
        </div>
        <div className="overflow-hidden rounded-2xl border border-[#e8e9e4] bg-white">
          {[
            [
              "#FB-2941",
              "Smoky House Burger · 2 items",
              "Today, 12:40 PM",
              "PKR 2,180",
              "On the way",
            ],
            [
              "#FB-2876",
              "Classic Margherita · 3 items",
              "12 June, 7:15 PM",
              "PKR 2,760",
              "Delivered",
            ],
          ].map((order, index) => (
            <div
              key={order[0]}
              className={`flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between lg:px-7 ${
                index ? "border-t border-[#e8e9e4]" : ""
              }`}
            >
              <div className="flex items-center gap-4">
                <span className="grid size-12 place-items-center rounded-xl bg-[#e8efe8] text-[#52765b]">
                  <Icon name="bag" />
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold">{order[0]}</h3>
                    <span className="status-badge">{order[4]}</span>
                  </div>
                  <p className="mt-1 text-xs text-[#777]">{order[1]}</p>
                </div>
              </div>
              <div className="flex items-center justify-between gap-8 pl-16 sm:pl-0">
                <div className="text-right">
                  <p className="text-xs text-[#888]">{order[2]}</p>
                  <p className="mt-1 text-sm font-bold">{order[3]}</p>
                </div>
                <button
                  onClick={() => navigate("orders")}
                  className="secondary-button"
                >
                  View order
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}

function MenuPage({ addToCart }: { addToCart: (dish: Dish) => void }) {
  const [query, setQuery] = useState("")
  const [category, setCategory] = useState("All")
  const filtered = dishes.filter(
    (dish) =>
      (category === "All" || dish.category === category) &&
      `${dish.name} ${dish.description}`
        .toLowerCase()
        .includes(query.toLowerCase()),
  )
  return (
    <main className="mx-auto min-h-[70vh] max-w-[1240px] px-5 py-10 lg:px-8 lg:py-14">
      <PageHeader
        eyebrow="Made fresh every day"
        title="Explore Our Menu"
        text="Find your next favorite meal from our thoughtfully prepared selection."
      />
      <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <label className="relative block w-full lg:max-w-[430px]">
          <span className="sr-only">Search menu</span>
          <Icon
            name="search"
            size={19}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-[#777]"
          />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="input-field pl-11"
            placeholder="Search dishes, ingredients..."
          />
        </label>
        <div className="hide-scrollbar flex gap-2 overflow-x-auto pb-1">
          {["All", ...categories.map((item) => item.name)].map((item) => (
            <button
              key={item}
              onClick={() => setCategory(item)}
              className={`filter-button ${category === item ? "active" : ""}`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
      {filtered.length ? (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((dish) => (
            <FoodCard key={dish.id} dish={dish} addToCart={addToCart} />
          ))}
        </div>
      ) : (
        <div className="grid min-h-[330px] place-items-center rounded-2xl border border-dashed border-[#d5d8d1] bg-white p-8 text-center">
          <div>
            <span className="mx-auto grid size-14 place-items-center rounded-full bg-[#e8efe8] text-[#52765b]">
              <Icon name="search" size={24} />
            </span>
            <h2 className="mt-5 text-xl font-bold">No dishes found</h2>
            <p className="mt-2 text-sm text-[#777]">
              Try a different search or explore another category.
            </p>
            <button
              onClick={() => {
                setQuery("")
                setCategory("All")
              }}
              className="secondary-button mt-5"
            >
              Clear filters
            </button>
          </div>
        </div>
      )}
    </main>
  )
}

function CartPage({
  cart,
  setCart,
  navigate,
  placeOrder,
}: {
  cart: CartItem[],
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>,
  navigate: (page: Page) => void,
  placeOrder: () => void,
}) {
  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  )
  const delivery = cart.length ? 180 : 0
  const tax = Math.round(subtotal * 0.05)
  const total = subtotal + delivery + tax
  const updateQuantity = (id: number, change: number) =>
    setCart((items) =>
      items.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item,
      ),
    )
  const submit = (event: FormEvent) => {
    event.preventDefault()
    placeOrder()
  }
  if (!cart.length)
    return (
      <main className="mx-auto grid min-h-[68vh] max-w-[1240px] place-items-center px-5 py-14">
        <div className="text-center">
          <span className="mx-auto grid size-20 place-items-center rounded-full bg-[#e8efe8] text-[#52765b]">
            <Icon name="cart" size={32} />
          </span>
          <h1 className="mt-6 text-3xl font-bold tracking-tight">
            Your cart is empty
          </h1>
          <p className="mt-3 text-sm text-[#777]">
            Your next delicious meal is just a few clicks away.
          </p>
          <button
            onClick={() => navigate("menu")}
            className="primary-button mx-auto mt-6"
          >
            Explore menu <Icon name="arrow" size={17} />
          </button>
        </div>
      </main>
    )
  return (
    <main className="mx-auto max-w-[1240px] px-5 py-10 lg:px-8 lg:py-14">
      <PageHeader
        eyebrow="Almost there"
        title="Cart & Checkout"
        text="Review your meal, add delivery details, and place your order."
      />
      <form
        onSubmit={submit}
        className="grid gap-7 lg:grid-cols-[1fr_420px] lg:items-start"
      >
        <div className="space-y-6">
          <section className="panel">
            <div className="panel-title">
              <h2>Your order</h2>
              <span>
                {cart.reduce((sum, item) => sum + item.quantity, 0)} items
              </span>
            </div>
            <div className="divide-y divide-[#e8e9e4]">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 py-5 first:pt-1 last:pb-1"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="size-24 rounded-xl object-cover sm:size-28"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex justify-between gap-3">
                      <div>
                        <h3 className="font-bold">{item.name}</h3>
                        <p className="mt-1 text-xs text-[#777]">
                          {item.category}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() =>
                          setCart((items) =>
                            items.filter((entry) => entry.id !== item.id),
                          )
                        }
                        className="grid size-9 place-items-center rounded-lg text-[#888] hover:bg-red-50 hover:text-red-600"
                        aria-label={`Remove ${item.name}`}
                      >
                        <Icon name="trash" size={17} />
                      </button>
                    </div>
                    <div className="mt-5 flex items-center justify-between">
                      <div className="flex items-center rounded-lg border border-[#e1e4de]">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, -1)}
                          className="grid size-9 place-items-center"
                          aria-label="Decrease quantity"
                        >
                          <Icon name="minus" size={14} />
                        </button>
                        <span className="w-8 text-center text-sm font-bold">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, 1)}
                          className="grid size-9 place-items-center"
                          aria-label="Increase quantity"
                        >
                          <Icon name="plus" size={14} />
                        </button>
                      </div>
                      <p className="text-sm font-bold">
                        {formatPrice(item.price * item.quantity)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
          <section className="panel">
            <div className="panel-title">
              <h2>Delivery information</h2>
              <span>Required</span>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="field-label">
                Full name
                <input
                  required
                  className="input-field"
                  defaultValue="Ayesha Khan"
                />
              </label>
              <label className="field-label">
                Phone number
                <input
                  required
                  type="tel"
                  className="input-field"
                  placeholder="+92 300 0000000"
                />
              </label>
              <label className="field-label sm:col-span-2">
                Email address
                <input
                  required
                  type="email"
                  className="input-field"
                  defaultValue="ayesha@example.com"
                />
              </label>
              <label className="field-label sm:col-span-2">
                Delivery address
                <textarea
                  required
                  className="input-field min-h-24 resize-none"
                  placeholder="House, street, area and city"
                />
              </label>
              <label className="field-label sm:col-span-2">
                Delivery instructions{" "}
                <span className="font-normal text-[#999]">(optional)</span>
                <textarea
                  className="input-field min-h-20 resize-none"
                  placeholder="Gate code, landmark or rider instructions"
                />
              </label>
            </div>
          </section>
        </div>
        <aside className="panel lg:sticky lg:top-24">
          <div className="panel-title">
            <h2>Order summary</h2>
          </div>
          <div className="space-y-3 border-b border-[#e8e9e4] pb-5 text-sm">
            <div className="flex justify-between text-[#777]">
              <span>Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between text-[#777]">
              <span>Delivery fee</span>
              <span>{formatPrice(delivery)}</span>
            </div>
            <div className="flex justify-between text-[#777]">
              <span>Tax (5%)</span>
              <span>{formatPrice(tax)}</span>
            </div>
          </div>
          <div className="flex justify-between py-5 text-lg font-bold">
            <span>Total</span>
            <span>{formatPrice(total)}</span>
          </div>
          <fieldset>
            <legend className="mb-3 text-sm font-bold">Payment method</legend>
            <label className="payment-option">
              <input type="radio" name="payment" value="cod" defaultChecked />{" "}
              <span>
                <strong>Cash on Delivery</strong>
                <small>Pay when your order arrives</small>
              </span>
            </label>
            <label className="payment-option mt-2">
              <input type="radio" name="payment" value="online" />{" "}
              <span>
                <strong>Online Payment</strong>
                <small>Card or mobile wallet</small>
              </span>
            </label>
          </fieldset>
          <button
            type="submit"
            className="primary-button mt-6 w-full justify-center"
          >
            Place Order <Icon name="arrow" size={17} />
          </button>
          <p className="mt-3 text-center text-[11px] leading-5 text-[#888]">
            By placing your order, you agree to FreshBite's terms and privacy
            policy.
          </p>
        </aside>
      </form>
    </main>
  )
}

function OrdersPage({ navigate }: { navigate: (page: Page) => void }) {
  const stages = [
    "Order Confirmed",
    "Preparing Food",
    "Ready for Delivery",
    "Out for Delivery",
    "Delivered",
  ]
  const current = 3
  return (
    <main className="mx-auto max-w-[1120px] px-5 py-10 lg:px-8 lg:py-14">
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <PageHeader
          eyebrow="Live order status"
          title="Track Your Order"
          text="Follow your meal from our kitchen to your doorstep."
        />
        <button
          onClick={() => navigate("support")}
          className="secondary-button mb-8 w-fit"
        >
          <Icon name="help" size={17} /> Need help?
        </button>
      </div>
      <section className="panel overflow-hidden p-0">
        <div className="flex flex-col gap-4 bg-[#52765b] p-6 text-white sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <div>
            <p className="text-xs font-semibold text-white/70">ORDER NUMBER</p>
            <h2 className="mt-1 text-2xl font-bold">#FB-2941</h2>
          </div>
          <div className="sm:text-right">
            <p className="text-xs text-white/70">Estimated delivery</p>
            <p className="mt-1 text-lg font-bold">Today, 1:25 PM</p>
          </div>
        </div>
        <div className="p-6 lg:p-8">
          <div className="mb-10 flex items-center justify-between">
            <div>
              <p className="text-xs text-[#777]">Placed today</p>
              <p className="mt-1 text-sm font-semibold">
                12:40 PM · Cash on Delivery
              </p>
            </div>
            <span className="status-badge bg-[#e8efe8] text-[#52765b]">
              Out for delivery
            </span>
          </div>
          <div className="relative grid gap-0 sm:grid-cols-5">
            <div className="absolute left-[10%] right-[10%] top-5 hidden h-1 bg-[#e8e9e4] sm:block">
              <div
                className="h-full bg-[#52765b]"
                style={{ width: `${((current - 1) / 4) * 100}%` }}
              />
            </div>
            {stages.map((stage, index) => (
              <div
                key={stage}
                className="relative flex gap-4 pb-7 last:pb-0 sm:block sm:pb-0 sm:text-center"
              >
                <span
                  className={`relative z-10 grid size-10 shrink-0 place-items-center rounded-full border-2 ${
                    index <= current
                      ? "border-[#52765b] bg-[#52765b] text-white"
                      : "border-[#dfe3dc] bg-white text-[#a4aaa4]"
                  }`}
                >
                  {index < current ? (
                    <Icon name="check" size={17} />
                  ) : (
                    index + 1
                  )}
                </span>
                <div className="sm:mt-3">
                  <p
                    className={`text-xs font-bold ${
                      index <= current ? "text-[#202522]" : "text-[#999]"
                    }`}
                  >
                    {stage}
                  </p>
                  <p className="mt-1 text-[10px] text-[#999]">
                    {index < current
                      ? ["12:40 PM", "12:45 PM", "1:05 PM"][index]
                      : index === current
                        ? "In progress"
                        : "Up next"}
                  </p>
                </div>
                {index < stages.length - 1 && (
                  <span
                    className={`absolute bottom-0 left-[19px] top-10 w-0.5 sm:hidden ${
                      index < current ? "bg-[#52765b]" : "bg-[#e1e4df]"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_360px]">
        <section className="panel">
          <div className="panel-title">
            <h2>Order details</h2>
            <span>2 items</span>
          </div>
          {dishes.slice(0, 2).map((dish, index) => (
            <div
              key={dish.id}
              className={`flex items-center gap-4 py-4 ${
                index ? "border-t border-[#e8e9e4]" : ""
              }`}
            >
              <img
                src={dish.image}
                alt=""
                className="size-16 rounded-xl object-cover"
              />
              <div className="flex-1">
                <h3 className="text-sm font-bold">{dish.name}</h3>
                <p className="mt-1 text-xs text-[#777]">Qty 1</p>
              </div>
              <p className="text-sm font-bold">{formatPrice(dish.price)}</p>
            </div>
          ))}
          <div className="mt-3 flex justify-between border-t border-[#e8e9e4] pt-5 font-bold">
            <span>Total paid</span>
            <span>PKR 2,920</span>
          </div>
        </section>
        <div className="space-y-6">
          <section className="panel">
            <div className="panel-title">
              <h2>Delivery details</h2>
            </div>
            <div className="space-y-4 text-sm">
              <div className="flex gap-3">
                <Icon
                  name="map"
                  size={18}
                  className="mt-0.5 shrink-0 text-[#52765b]"
                />
                <p>
                  <strong>Ayesha Khan</strong>
                  <br />
                  <span className="text-xs leading-5 text-[#777]">
                    House 42, Street 8, DHA Phase 6, Karachi
                  </span>
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Icon name="phone" size={18} className="text-[#52765b]" />
                <span className="text-xs text-[#777]">+92 300 1234567</span>
              </div>
            </div>
          </section>
          <section className="panel">
            <div className="panel-title">
              <h2>Restaurant</h2>
            </div>
            <p className="text-sm font-bold">FreshBite Kitchen — DHA</p>
            <p className="mt-2 text-xs leading-5 text-[#777]">
              Khayaban-e-Shahbaz, Karachi
              <br />
              Open until 11:30 PM
            </p>
          </section>
        </div>
      </div>
    </main>
  )
}

function SupportPage() {
  const suggestions = [
    "What food items are available?",
    "Where is my order?",
    "What are your delivery charges?",
    "What are your opening hours?",
  ]
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      text: "Hi Ayesha! I’m your FreshBite AI Assistant. I can help you explore the menu, understand delivery charges, or check an order. How can I help today?",
    },
  ])
  const [input, setInput] = useState("")
  const [typing, setTyping] = useState(false)
  const getReply = (message: string) => {
    const lower = message.toLowerCase()
    if (lower.includes("where") || lower.includes("order"))
      return "Your current order #FB-2941 is out for delivery and should arrive around 1:25 PM. The rider is on the way."
    if (lower.includes("charge") || lower.includes("delivery"))
      return "Our standard delivery fee is PKR 180. It may vary slightly by distance and will always be shown before checkout."
    if (lower.includes("hour") || lower.includes("open"))
      return "FreshBite is open daily from 11:00 AM to 11:30 PM. Last orders are accepted 30 minutes before closing."
    if (
      lower.includes("food") ||
      lower.includes("available") ||
      lower.includes("menu")
    )
      return "We have burgers, pizzas, pasta, chicken dishes, desserts, and refreshing drinks. Visit the Menu page to see today’s full selection."
    return "Thanks for reaching out. I can help with menu options, delivery, order tracking, opening hours, and general FreshBite questions."
  }
  const send = (text = input) => {
    const clean = text.trim()
    if (!clean || typing) return
    setMessages((history) => [...history, { role: "user", text: clean }])
    setInput("")
    setTyping(true)
    window.setTimeout(() => {
      setMessages((history) => [
        ...history,
        { role: "assistant", text: getReply(clean) },
      ])
      setTyping(false)
    }, 900)
  }
  return (
    <main className="mx-auto max-w-[1000px] px-5 py-10 lg:px-8 lg:py-14">
      <PageHeader
        eyebrow="Here whenever you need us"
        title="FreshBite AI Assistant"
        text="Get quick, friendly answers about your food, delivery, or order."
      />
      <div className="overflow-hidden rounded-2xl border border-[#e8e9e4] bg-white shadow-[0_12px_35px_rgba(32,37,34,.06)]">
        <div className="flex items-center justify-between border-b border-[#e8e9e4] px-5 py-4">
          <div className="flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-xl bg-[#52765b] text-white">
              <Icon name="bot" size={21} />
            </span>
            <div>
              <h2 className="text-sm font-bold">FreshBite Assistant</h2>
              <p className="flex items-center gap-1.5 text-[11px] text-[#777]">
                <span className="size-1.5 rounded-full bg-green-500" />
                Online now
              </p>
            </div>
          </div>
          <button
            onClick={() =>
              setMessages([
                {
                  role: "assistant",
                  text: "Conversation cleared. How can I help you today?",
                },
              ])
            }
            className="text-xs font-semibold text-[#777] hover:text-[#202522]"
          >
            Clear conversation
          </button>
        </div>
        <div
          className="h-[420px] space-y-4 overflow-y-auto bg-[#fafbf9] p-5 sm:p-7"
          aria-live="polite"
        >
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[82%] rounded-2xl px-4 py-3 text-sm leading-6 sm:max-w-[70%] ${
                  message.role === "user"
                    ? "rounded-br-md bg-[#52765b] text-white"
                    : "rounded-bl-md border border-[#e8e9e4] bg-white text-[#3e4640]"
                }`}
              >
                {message.text}
              </div>
            </div>
          ))}
          {typing && (
            <div className="flex justify-start">
              <div className="flex gap-1.5 rounded-2xl rounded-bl-md border border-[#e8e9e4] bg-white px-4 py-4">
                <span className="typing-dot" />
                <span className="typing-dot" />
                <span className="typing-dot" />
              </div>
            </div>
          )}
        </div>
        <div className="border-t border-[#e8e9e4] p-4 sm:p-5">
          <p className="mb-3 text-[11px] font-bold uppercase tracking-wider text-[#888]">
            Suggested questions
          </p>
          <div className="hide-scrollbar mb-4 flex gap-2 overflow-x-auto">
            {suggestions.map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => send(suggestion)}
                className="shrink-0 rounded-full border border-[#dfe4dc] bg-white px-3.5 py-2 text-xs font-medium text-[#59635b] hover:border-[#8fa28c] hover:bg-[#f2f6f1]"
              >
                {suggestion}
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <label className="flex-1">
              <span className="sr-only">Message FreshBite Assistant</span>
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") send()
                }}
                className="input-field"
                placeholder="Type your message..."
              />
            </label>
            <button
              onClick={() => send()}
              disabled={!input.trim() || typing}
              className="grid size-12 shrink-0 place-items-center rounded-xl bg-[#52765b] text-white transition hover:bg-[#416549] disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="Send message"
            >
              <Icon name="send" size={19} />
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}

function Header({
  page,
  navigate,
  cartCount,
}: {
  page: Page,
  navigate: (page: Page) => void,
  cartCount: number,
}) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const links: { label: string; page: Page }[] = [
    { label: "Home", page: "home" },
    { label: "Menu", page: "menu" },
    { label: "My Orders", page: "orders" },
    { label: "Support", page: "support" },
  ]
  const go = (target: Page) => {
    navigate(target)
    setMobileOpen(false)
  }
  return (
    <>
      <header className="sticky top-0 z-50 border-b border-[#e8e9e4] bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex h-[76px] max-w-[1240px] items-center justify-between px-5 lg:px-8">
          <button
            onClick={() => go("home")}
            className="flex items-center gap-2.5"
            aria-label="FreshBite home"
          >
            <span className="grid size-9 place-items-center rounded-full bg-[#52765b] text-white">
              <Icon name="bag" size={20} />
            </span>
            <span className="text-[21px] font-bold tracking-[-0.04em]">
              Fresh<span className="text-[#52765b]">Bite</span>
            </span>
          </button>
          <nav
            className="hidden items-center gap-9 md:flex"
            aria-label="Main navigation"
          >
            {links.map((link) => (
              <button
                key={link.page}
                onClick={() => go(link.page)}
                className={`nav-link ${page === link.page ? "active" : ""}`}
              >
                {link.label}
              </button>
            ))}
          </nav>
          <div className="flex items-center gap-2 sm:gap-4">
            <button
              onClick={() => go("cart")}
              className={`relative grid size-10 place-items-center rounded-full border transition hover:border-[#8fa28c] hover:bg-[#f3f6f1] ${
                page === "cart"
                  ? "border-[#8fa28c] bg-[#e8efe8]"
                  : "border-[#e4e7e1]"
              }`}
              aria-label={`Cart with ${cartCount} items`}
            >
              <Icon name="cart" size={20} />
              {cartCount > 0 && (
                <span className="absolute -right-1 -top-1 grid size-5 place-items-center rounded-full bg-[#52765b] text-[10px] font-bold text-white">
                  {cartCount}
                </span>
              )}
            </button>
            <button
              className="hidden items-center gap-2.5 rounded-full p-1 pr-3 hover:bg-[#f3f5f1] sm:flex"
              aria-label="Open profile"
            >
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80"
                alt="Profile of Ayesha Khan"
                className="size-9 rounded-full object-cover"
              />
              <span className="text-sm font-semibold">Ayesha</span>
              <Icon name="chevron" size={14} className="rotate-90" />
            </button>
            <button
              className="grid size-10 place-items-center rounded-full md:hidden"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <Icon name="menu" />
            </button>
          </div>
        </div>
      </header>
      {mobileOpen && (
        <div className="fixed inset-0 z-[60] md:hidden">
          <button
            className="absolute inset-0 bg-[#19231d]/40 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu overlay"
          />
          <aside className="absolute right-0 top-0 h-full w-[82%] max-w-sm bg-white p-6 shadow-2xl">
            <div className="mb-9 flex items-center justify-between">
              <span className="text-xl font-bold">
                Fresh<span className="text-[#52765b]">Bite</span>
              </span>
              <button
                className="grid size-10 place-items-center rounded-full bg-[#f4f5f2]"
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
              >
                <Icon name="close" />
              </button>
            </div>
            <nav className="flex flex-col gap-2">
              {links.map((link) => (
                <button
                  key={link.page}
                  onClick={() => go(link.page)}
                  className={`rounded-xl px-4 py-3.5 text-left text-base font-semibold ${
                    page === link.page
                      ? "bg-[#e8efe8] text-[#52765b]"
                      : "text-[#566058]"
                  }`}
                >
                  {link.label}
                </button>
              ))}
              <button
                onClick={() => go("cart")}
                className={`flex items-center justify-between rounded-xl px-4 py-3.5 text-left text-base font-semibold ${
                  page === "cart"
                    ? "bg-[#e8efe8] text-[#52765b]"
                    : "text-[#566058]"
                }`}
              >
                <span>Cart</span>
                <span className="rounded-full bg-[#52765b] px-2 py-0.5 text-xs text-white">
                  {cartCount}
                </span>
              </button>
            </nav>
          </aside>
        </div>
      )}
    </>
  )
}

function Footer({ navigate }: { navigate: (page: Page) => void }) {
  return (
    <footer className="bg-[#202522] text-white">
      <div className="mx-auto grid max-w-[1240px] gap-10 px-5 py-12 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr] lg:px-8 lg:py-16">
        <div>
          <button
            onClick={() => navigate("home")}
            className="flex items-center gap-2.5 text-xl font-bold"
          >
            <span className="grid size-9 place-items-center rounded-full bg-[#78947f]">
              <Icon name="bag" size={19} />
            </span>
            Fresh<span className="-ml-2.5 text-[#9eb291]">Bite</span>
          </button>
          <p className="mt-5 max-w-sm text-sm leading-6 text-[#b5beb7]">
            Delicious food prepared fresh and delivered with care across
            Karachi.
          </p>
        </div>
        <div>
          <h3 className="text-sm font-bold">Contact us</h3>
          <div className="mt-5 space-y-2.5 text-sm text-[#b5beb7]">
            <p>hello@freshbite.pk</p>
            <p>+92 21 111 373 742</p>
            <p>Karachi, Pakistan</p>
          </div>
        </div>
        <div>
          <h3 className="text-sm font-bold">Follow FreshBite</h3>
          <div className="mt-5 flex gap-2.5">
            {[
              ["instagram", "Instagram"],
              ["facebook", "Facebook"],
              ["twitter", "Twitter"],
            ].map(([icon, label]) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="grid size-10 place-items-center rounded-full border border-white/15 text-[#c7cec8] hover:border-[#91a585] hover:bg-[#91a585] hover:text-white"
              >
                <Icon name={icon as IconName} size={17} />
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-[1240px] flex-col gap-2 px-5 py-5 text-[11px] text-[#88928a] sm:flex-row sm:justify-between lg:px-8">
          <p>© 2025 FreshBite. All rights reserved.</p>
          <div className="flex gap-5">
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default function App() {
  const [page, setPage] = useState<Page>("home")
  const [cart, setCart] = useState<CartItem[]>([
    { ...dishes[0], quantity: 1 },
    { ...dishes[10], quantity: 1 },
  ])
  const [notice, setNotice] = useState("")
  const cartCount = useMemo(
    () => cart.reduce((sum, item) => sum + item.quantity, 0),
    [cart],
  )
  const navigate = (target: Page) => {
    setPage(target)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }
  const showNotice = (text: string) => {
    setNotice(text)
    window.setTimeout(() => setNotice(""), 2300)
  }
  const addToCart = (dish: Dish) => {
    setCart((items) => {
      const existing = items.find((item) => item.id === dish.id)
      return existing
        ? items.map((item) =>
            item.id === dish.id
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          )
        : [...items, { ...dish, quantity: 1 }]
    })
    showNotice(`${dish.name} added to your cart`)
  }
  const placeOrder = () => {
    setCart([])
    showNotice("Order #FB-2941 placed successfully")
    navigate("orders")
  }
  return (
    <div className="min-h-screen bg-[#f7f7f5] text-[#202522]">
      {notice && (
        <div
          className="fixed right-4 top-4 z-[80] flex max-w-[calc(100%-2rem)] items-center gap-3 rounded-xl bg-[#202522] px-4 py-3 text-sm font-medium text-white shadow-xl"
          role="status"
        >
          <span className="grid size-6 place-items-center rounded-full bg-[#78947f]">
            <Icon name="check" size={15} />
          </span>
          {notice}
        </div>
      )}
      <Header page={page} navigate={navigate} cartCount={cartCount} />
      {page === "home" && (
        <HomePage navigate={navigate} addToCart={addToCart} />
      )}
      {page === "menu" && <MenuPage addToCart={addToCart} />}
      {page === "cart" && (
        <CartPage
          cart={cart}
          setCart={setCart}
          navigate={navigate}
          placeOrder={placeOrder}
        />
      )}
      {page === "orders" && <OrdersPage navigate={navigate} />}
      {page === "support" && <SupportPage />}
      <Footer navigate={navigate} />
    </div>
  )
}
