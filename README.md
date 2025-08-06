# E-Commerce Mobile App with Expo

A modern e-commerce mobile application built with Expo and React Native, featuring product browsing, cart management, and user profile functionality.

## 📱 App Screens

### Register Screen
<img width="300" height="600" alt="Screenshot 2025-08-06 115035" src="https://github.com/user-attachments/assets/243c8924-8e22-40f0-964c-93a54866ace6" /> <br />
- Displays featured products in a grid layout
- Shows product images, names, and prices
- Quick add to cart functionality
- Clean and intuitive user interface

### Login Screen
<img width="300" height="600" alt="Screenshot 2025-08-06 115044" src="https://github.com/user-attachments/assets/3895907f-ead6-40ab-944b-d9452b44a9c5" /> <br />
- Detailed product view with high-quality images
- Product description and specifications
- Price and discount information
- Add to cart and favorite options
- Color and size selection

### Home Screen
<img width="300" height="600" alt="Screenshot 2025-08-06 115014" src="https://github.com/user-attachments/assets/0698df01-acd7-4631-b57c-460648ea7be7" /> <br />
- Displays selected items with thumbnails
- Quantity adjustment controls
- Price summary with subtotal and discounts
- Proceed to checkout button

## 🛠 Features

- **Product Catalog**: Browse through various products with images and details
- **Shopping Cart**: Add/remove items and adjust quantities
- **Responsive Design**: Optimized for both mobile and tablet screens
- **Modern UI**: Clean and intuitive user interface
- **Product Filtering**: Sort and filter products by categories

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or later)
- npm or yarn
- Expo Go app (for testing on physical devices)

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/ecommerce-app.git
   cd ecommerce-app
   ```

2. Install dependencies
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server
   ```bash
   npx expo start
   ```

4. Run the app
   - Press `a` for Android emulator
   - Press `i` for iOS simulator
   - Scan the QR code with Expo Go (Android) or Camera app (iOS)

## 🛠 Tech Stack

- **Framework**: Expo (React Native)
- **Navigation**: React Navigation
- **State Management**: React Context API
- **UI Components**: Custom components with React Native
- **Styling**: StyleSheet
- **Icons**: Custom icon set

## 📂 Project Structure

```
ecommerce-app/
├── app/
│   ├── (tabs)/
│   │   ├── index.tsx     # Home screen
│   │   ├── cart.tsx      # Cart screen
│   │   └── profile.tsx   # User profile
├── components/           # Reusable components
├── constants/            # App constants
├── context/              # State management
├── assets/               # Images and fonts
├── app.json              # Expo configuration
└── package.json          # Project dependencies
```

## 🤝 Contributing

Contributions are always welcome! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
