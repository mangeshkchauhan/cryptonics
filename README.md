# Cryptonics - Advanced Cryptocurrency Tracker

A modern, feature-rich cryptocurrency tracking platform built with Next.js 14, TypeScript, and Tailwind CSS. Track real-time prices, view interactive charts, and explore detailed market data for thousands of cryptocurrencies.

![Cryptonics](public/btc.png)

## 🚀 Features

### Core Functionality
- **Real-time Data**: Live cryptocurrency prices from CoinGecko API
- **Interactive Charts**: Professional-grade price charts with multiple timeframes
- **Multi-currency Support**: USD, EUR, and INR currency options
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Fast Performance**: Built with Next.js 14 App Router for optimal speed

### Pages & Components
- **Homepage**: Hero section with animated Bitcoin logo and feature highlights
- **Coins Listing**: Paginated cryptocurrency list with search functionality
- **Coin Details**: Comprehensive individual coin pages with charts and statistics
- **Exchanges**: Cryptocurrency exchange listings with trust scores
- **Modern UI**: Dark theme with glass morphism effects and smooth animations

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Headless UI** - Unstyled, accessible UI components

### Data & State Management
- **React Query (TanStack Query)** - Server state management with caching
- **Context API** - Global currency state management
- **Axios** - HTTP client for API requests

### Charts & Visualization
- **Chart.js** - Interactive charts
- **React Chart.js 2** - React wrapper for Chart.js

### Development Tools
- **Bun** - Fast JavaScript runtime and package manager
- **ESLint** - Code linting
- **TypeScript** - Static type checking

## 🏗️ Architecture

### Project Structure
```
src/
├── app/                    # Next.js App Router pages
│   ├── coins/             
│   │   ├── [id]/          # Dynamic coin detail pages
│   │   └── page.tsx       # Coins listing page
│   ├── exchanges/         # Exchanges page
│   ├── layout.tsx         # Root layout
│   ├── page.tsx          # Homepage
│   └── providers.tsx     # App-level providers
├── components/
│   ├── crypto/           # Cryptocurrency-specific components
│   │   ├── CoinCard.tsx
│   │   ├── ExchangeCard.tsx
│   │   └── PriceChart.tsx
│   ├── layout/           # Layout components
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── Layout.tsx
│   ├── pages/            # Page-level components
│   │   ├── HomePage.tsx
│   │   ├── CoinsPage.tsx
│   │   ├── CoinDetailsPage.tsx
│   │   └── ExchangesPage.tsx
│   ├── ui/               # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── LoadingSpinner.tsx
│   │   ├── ErrorMessage.tsx
│   │   └── Pagination.tsx
│   └── common/           # Common components
│       └── CurrencySelector.tsx
├── contexts/             # React contexts
│   └── CurrencyContext.tsx
├── hooks/                # Custom React hooks
│   └── useCrypto.ts
├── lib/                  # Utility libraries
│   ├── api.ts
│   └── utils.ts
├── services/             # API service layer
│   └── cryptoService.ts
└── types/                # TypeScript type definitions
    └── crypto.ts
```

### Key Improvements from Original

#### Architecture Enhancements
- **Migrated from Create React App to Next.js 14** for better performance and SEO
- **TypeScript throughout** for type safety and better development experience
- **Modern state management** with React Query for server state and Context for client state
- **Component-based architecture** with clear separation of concerns

#### UI/UX Improvements
- **Modern design system** with dark theme and glass morphism effects
- **Improved responsiveness** across all devices
- **Better accessibility** with semantic HTML and ARIA labels
- **Enhanced animations** with Framer Motion
- **Professional loading states** and error handling

#### Performance Optimizations
- **React Query caching** reduces unnecessary API calls
- **Image optimization** with Next.js Image component
- **Code splitting** with Next.js automatic optimization
- **Efficient pagination** with proper state management

#### Developer Experience
- **Type safety** with comprehensive TypeScript definitions
- **Modern tooling** with Bun for faster development
- **Clean code structure** with proper separation of concerns
- **Reusable components** for maintainable codebase

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ or Bun 1.0+
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd cryptonics
   ```

2. **Install dependencies**
   ```bash
   bun install
   ```

3. **Start development server**
   ```bash
   bun run dev
   ```

4. **Open in browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Available Scripts

```bash
bun run dev      # Start development server
bun run build    # Build for production
bun run start    # Start production server
bun run lint     # Run ESLint
```

## 🔧 Configuration

### Environment Variables
No environment variables required for basic functionality. The app uses the public CoinGecko API.

### Currency Support
Currently supports:
- USD (US Dollar)
- EUR (Euro) 
- INR (Indian Rupee)

Additional currencies can be added by updating the `CurrencySelector` component and type definitions.

## 📡 API Integration

### CoinGecko API
The application integrates with the CoinGecko API for cryptocurrency data:

- **Endpoint**: `https://api.coingecko.com/api/v3`
- **Rate Limits**: Respects CoinGecko's free tier limits
- **Caching**: Implements intelligent caching with React Query

### API Services
- `getCoins()` - Paginated cryptocurrency listings
- `getCoinDetails()` - Detailed coin information
- `getCoinChart()` - Historical price data for charts
- `getExchanges()` - Cryptocurrency exchange listings

## 🎨 Design System

### Color Palette
- **Primary**: Blue gradient (`from-blue-500 to-purple-600`)
- **Background**: Dark grays (`gray-900`, `gray-800`)
- **Text**: White and gray variants
- **Accents**: Green for positive, Red for negative values

### Typography
- **Primary Font**: Geist Sans
- **Monospace**: Geist Mono
- **Responsive scales**: 4xl to 6xl for headings

### Components
All components follow a consistent design pattern with:
- Glass morphism backgrounds
- Hover animations
- Proper spacing and typography
- Accessible color contrasts

## 🚀 Deployment

### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Other Platforms
The app can be deployed to any platform supporting Next.js:
- Netlify
- Railway
- AWS Amplify
- Heroku

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [CoinGecko API](https://www.coingecko.com/api) for cryptocurrency data
- [Next.js](https://nextjs.org/) for the fantastic React framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Chart.js](https://www.chartjs.org/) for beautiful charts
- [Lucide React](https://lucide.dev/) for the icon library

---

**Built with ❤️ by the Cryptonics Team**
