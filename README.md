# White Label Supermarket

A modern, responsive e-commerce application built with React, TypeScript, and Tailwind CSS. This project demonstrates a complete shopping experience with product browsing, cart management, promotional pricing, and admin functionality.

## 🚀 Features

- **Product Catalog**: Browse products with search and category filtering
- **Shopping Cart**: Add/remove items with quantity management
- **Promotional Pricing**: BOGOF (Buy One Get One Free) deals with user-friendly messaging
- **Volume Discounts**: 20% off orders over £10
- **Admin Panel**: Upload and manage product catalogs via CSV/XLSX files
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Toast Notifications**: Real-time feedback for user actions
- **Comprehensive Testing**: Unit and integration tests with Vitest

## 🛠 Tech Stack

- **Frontend**: React 19.1.1, TypeScript
- **Styling**: Tailwind CSS 4.1.13
- **State Management**: Zustand
- **Routing**: React Router DOM
- **Testing**: Vitest, Testing Library
- **Build Tool**: Vite
- **File Processing**: Papa Parse (CSV), SheetJS (XLSX)
- **Icons**: Lucide React

## 📦 Installation & Setup

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn

### Getting Started

1. **Clone the repository**

   ```bash
   git clone https://github.com/tintolee/white-label-supermarket.git
   cd white-label-supermarket
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run test` - Run test suite
- `npm run test:ui` - Run tests with UI
- `npm run lint` - Run ESLint

## 🏗 Project Structure

```
src/
├── app/                 # App configuration
│   ├── config.ts       # Constants and configuration
│   └── router.tsx      # Route definitions
├── assets/             # Static assets
├── components/         # Reusable UI components
│   └── ui/            # Base UI components (Button, Input)
├── data/              # Static data files
│   └── products.csv   # Sample product catalog
├── features/          # Feature-based modules
│   ├── cart/          # Shopping cart functionality
│   └── products/      # Product display and management
├── hooks/             # Custom React hooks
├── lib/               # Utility libraries
├── pages/             # Page components
├── styles/            # Global styles
└── types.ts           # TypeScript type definitions
```

## 💡 Key Design Decisions & Trade-offs

### 1. Data-Driven Promotional Pricing

**Decision**: Use `salePrice` field in product data instead of hardcoded business logic.

**Trade-offs**:

- ✅ **Pro**: Simpler, more maintainable code
- ✅ **Pro**: Easy to add new promotions via data updates
- ✅ **Pro**: No complex cart calculations required
- ❌ **Con**: Less flexible for complex promotional rules

### 2. Zustand for State Management

**Decision**: Chose Zustand over Redux/Context API to demonstrate my versatility.

**Trade-offs**:

- ✅ **Pro**: Minimal boilerplate, simple API
- ✅ **Pro**: TypeScript-first design
- ✅ **Pro**: No providers needed
- ❌ **Con**: Less ecosystem support than Redux

### 3. File-based Product Management

**Decision**: Support CSV/XLSX uploads for to update product catalogs.

**Trade-offs**:

- ✅ **Pro**: Familiar format for non-technical users
- ✅ **Pro**: Easy bulk updates
- ✅ **Pro**: Works offline
- ❌ **Con**: No real-time collaboration

### 4. Frontend-Only Architecture

**Decision**: No backend, all data processing in browser.

**Trade-offs**:

- ✅ **Pro**: Simple deployment and setup
- ✅ **Pro**: No server costs
- ✅ **Pro**: Fast development cycle
- ❌ **Con**: No persistent data storage
- ❌ **Con**: Limited scalability
- ❌ **Con**: No real user authentication

### 5. Tailwind CSS for Styling

**Decision**: Utility-first CSS framework.

**Trade-offs**:

- ✅ **Pro**: Rapid development
- ✅ **Pro**: Consistent design system
- ✅ **Pro**: Small production bundle
- ❌ **Con**: Verbose HTML in some cases

## 🔮 Future Enhancements

### Near-term (1-2 weeks)

- [ ] **Persistent Storage**: Add localStorage/IndexedDB for cart persistence
- [ ] **Enhanced Search**: Implement fuzzy search and filters (price range, availability)
- [ ] **Product Images**: Add image upload functionality for admin
- [ ] **Inventory Management**: Stock tracking and low-stock alerts
- [ ] **Order History**: Simple order tracking and history
- [ ] **Order History**: Add functionality to upload more than 3 products with CSV

### Medium-term (1-2 months)

- [ ] **Backend Integration**: REST API with database (PostgreSQL/MongoDB)
- [ ] **User Authentication**: JWT-based auth with user profiles
- [ ] **Payment Integration**: Stripe/PayPal checkout flow
- [ ] **Advanced Promotions**: Time-based deals, category discounts, coupon codes
- [ ] **Analytics Dashboard**: Sales metrics and inventory insights
- [ ] **Email Notifications**: Order confirmations and promotional emails

### Long-term (3-6 months)

- [ ] **Multi-tenant Architecture**: Support multiple stores
- [ ] **Mobile App**: React Native
- [ ] **Real-time Features**: WebSocket for live inventory updates
- [ ] **AI Recommendations**: Product suggestions based on purchase history
- [ ] **Advanced Admin Features**: User management, detailed reporting
- [ ] **Internationalization**: Multi-language and currency support

## 🧪 Testing Strategy

The project includes comprehensive testing:

- **Unit Tests**: Individual component and function testing
- **Integration Tests**: Feature-level testing (cart operations, product filtering)
- **UI Tests**: User interaction flows
- **Coverage**: All critical business logic and user flows

Run tests with:

```bash
npm run test        # Run all tests
```

## 🚀 Deployment

### Production Build

```bash
npm run build
npm run preview
```

## 🤖 AI Tools Usage

This project was developed with assistance from AI tools to enhance productivity and code quality:

### GitHub Copilot

- **Code Autocompletion**: Used extensively for faster development and reduced boilerplate
- **Search Functionality**: Assisted in implementing product search and filtering logic
- **Footer Component**: Generated footer layout based on White Label website screenshot reference
- **Test Fixes**: Helped resolve failing tests during the Buy one get one free pricing refactor
- **Time Savings**: Allowed focus on core business logic and user experience rather than repetitive coding tasks

### Verification & Validation

- **Code Review**: All AI-generated code was manually reviewed and tested
- **Test Coverage**: Ensured all AI-assisted features had proper test coverage
- **Performance**: Verified that AI suggestions didn't introduce performance issues
- **Best Practices**: Validated that generated code followed project conventions and TypeScript best practices

The AI tools served as productivity multipliers, enabling faster iteration while maintaining code quality through careful human oversight.

## 👨‍💻 Author

**Oluwatosin Adelaja**

- GitHub: [@tintolee](https://github.com/tintolee)

---

\_Built with ❤️
