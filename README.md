# ReserveNow.my - Restaurant Reservation Assistant

🍽️ **Book your table in seconds via WhatsApp**

A modern web application that enables diners to send pre-filled WhatsApp messages to Malaysian restaurants for reservations. No sign-up required, no complex booking systems – just instant, direct communication.

## Features

- 🔍 **Restaurant Discovery**: Browse 20+ curated restaurants across KL, Penang, and Johor Bahru
- 🎯 **Smart Search & Filters**: Find restaurants by name, cuisine type, location, or price range
- 📱 **WhatsApp Integration**: Professionally formatted reservation messages sent directly via WhatsApp
- ❤️ **Favorites**: Save your preferred restaurants for quick access (localStorage)
- 📅 **Smart Form**: Date picker, time selector, and comprehensive validation
- ✨ **Premium Design**: Modern UI with smooth animations and mobile-first responsive design
- 🚀 **Lightning Fast**: Built with Vite for optimal performance

## Tech Stack

- **Frontend**: React 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router v6
- **Forms**: React Hook Form
- **Icons**: Lucide React
- **Date Picker**: react-datepicker

## Getting Started

### Prerequisites

- Node.js 16+ and npm

### Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

3. Open http://localhost:5173 in your browser

### Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory, ready for deployment.

## Project Structure

```
src/
├── components/     # Reusable UI components
│   ├── Button.jsx
│   ├── Input.jsx
│   ├── Card.jsx
│   ├── Header.jsx
│   ├── Footer.jsx
│   ├── SearchBar.jsx
│   ├── FilterPanel.jsx
│   ├── RestaurantCard.jsx
│   ├── ReservationForm.jsx
│   └── MessagePreview.jsx
├── pages/          # Page components
│   ├── HomePage.jsx
│   ├── RestaurantListingPage.jsx
│   ├── RestaurantDetailPage.jsx
│   └── FavoritesPage.jsx
├── utils/          # Utility functions
│   ├── restaurantService.js
│   └── whatsappService.js
├── context/        # React Context providers
│   └── FavoritesContext.jsx
├── data/           # Static data
│   └── restaurantData.json
├── App.jsx         # Main app component with routing
├── main.jsx        # React entry point
└── index.css       # Global styles and Tailwind
```

## Key Features Explained

### WhatsApp Integration

The app generates properly formatted WhatsApp messages using the `wa.me` API:

```javascript
const message = `🍽️ RESERVATION REQUEST
Restaurant: Sushi Mentai TTDI
Date: Friday, 17 Jan 2026
Time: 7:30 PM
Party Size: 4 people
Name: Ahmad Zainal
Contact: +60 12-345 6789
Special Requests: Window seat preferred
---
Sent via ReserveNow.my`;

const url = `https://wa.me/60123456789?text=${encodeURIComponent(message)}`;
```

### Responsive Design

- Mobile-first approach with Tailwind CSS
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Touch-friendly buttons (min 44x44px)
- Mobile filter drawer for better UX

### Form Validation

- Name: 2-50 characters
- Party size: 1-20 people
- Date: Today to 90 days ahead
- Phone: Malaysian mobile format validation
- Special requests: Max 200 characters

## Deployment

This app can be deployed to:

- **Vercel**: `vercel deploy`
- **Netlify**: Drag and drop `dist/` folder
- **GitHub Pages**: Configure base path in `vite.config.js`

## Future Enhancements

- [ ] User accounts for reservation history
- [ ] Restaurant submission form
- [ ] Multi-language support (Bahasa Malaysia, Chinese)
- [ ] Restaurant reviews and ratings
- [ ] Advanced availability indicators
- [ ] SMS/Email confirmation options

## License

MIT

## Contact

For questions or suggestions: hello@reservenow.my

---

Built with ❤️ for Malaysia
