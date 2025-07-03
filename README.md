# Roe-AI Lite Presentation

A production-quality, scroll-based presentation built with React, Vite, and Framer Motion. Features smooth animations, professional design, and an engaging user experience for showcasing merchant risk intelligence solutions.

## Features

### Visual Excellence
- **Modern Design System**: CSS custom properties with professional typography (Inter + JetBrains Mono)
- **Smooth Scroll Navigation**: Progress bar and interactive navigation dots
- **Framer Motion Animations**: Entrance animations with intersection observer
- **Responsive Design**: Mobile-optimized with adaptive layouts
- **Professional Typography**: Enhanced contrast and readability

### Interactive Elements
- **Smart Navigation**: Click dots to jump to specific sections
- **Progress Tracking**: Real-time scroll progress indicator
- **Hover Effects**: Micro-interactions throughout the interface
- **Accessible Design**: Keyboard navigation and screen reader support

### Content Highlights
- **Risk Prioritization Matrix**: Interactive SVG with clear quadrant labeling
- **Technical Architecture**: Detailed system diagrams with explanations
- **Code Examples**: Syntax-highlighted SQL demos
- **ROI Metrics**: Compelling statistics with visual emphasis
- **Implementation Timeline**: 30-day pilot roadmap

## Setup & Installation

1. **Clone and Install**
   ```bash
   git clone <repository-url>
   cd roe-slides
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:5174/](http://localhost:5174/) in your browser

3. **Add Roe AI Logo** (Optional)
   - Copy your logo file to `public/roe_ai_logo.jpeg`
   - The presentation will automatically display it on the hero slide
   - If the file doesn't exist, the logo will be hidden gracefully

## Project Structure

```
roe-slides/
├── public/
│   ├── architecture.png      # System architecture diagram
│   ├── matrix.svg           # Risk prioritization matrix
│   └── roe_ai_logo.jpeg     # Company logo (add this file)
├── src/
│   ├── App.jsx              # Main presentation component
│   ├── index.css            # Design system & styling
│   └── main.jsx             # React app entry point
└── package.json             # Dependencies
```

## Customization

### Brand Colors
Update CSS custom properties in `src/index.css`:
```css
:root {
  --brand-primary: #E44E00;
  --brand-secondary: #FF6B35;
  --brand-gradient: linear-gradient(135deg, #E44E00 0%, #FF6B35 100%);
}
```

### Content Updates
Modify sections in `src/App.jsx`:
- Update company/product names
- Adjust metrics and statistics
- Customize technical details
- Modify timeline and roadmap

### Styling Adjustments
- **Typography**: Adjust font sizes with `clamp()` functions
- **Spacing**: Modify CSS custom property values
- **Colors**: Update the color palette variables
- **Animations**: Adjust Framer Motion transition timing

## Assets

### Required Files
- `public/architecture.png` - System architecture diagram
- `public/matrix.svg` - Risk prioritization matrix (auto-generated)

### Optional Files
- `public/roe_ai_logo.jpeg` - Company logo for hero slide

### Asset Guidelines
- **Images**: Use high-resolution PNGs or JPEGs
- **Logos**: Recommended size: 80px height for optimal display
- **Diagrams**: Ensure good contrast for presentation viewing

## Navigation

### Scroll Navigation
- **Mouse/Trackpad**: Scroll naturally through sections
- **Keyboard**: Use arrow keys or Page Up/Down
- **Touch**: Swipe gestures on mobile devices

### Quick Navigation
- **Navigation Dots**: Click any dot on the right side to jump to that section
- **Progress Bar**: Shows current position in presentation

### Sections Overview
1. **Hero** - Logo and title slide
2. **Executive Summary** - High-level overview
3. **Challenge** - Problem statement
4. **Solution** - Roe-AI Lite overview
5. **ROI** - Key metrics and benefits
6. **Discovery** - Implementation workshop
7. **Requirements** - Data and infrastructure needs
8. **Risk Matrix** - Prioritization framework
9. **Detection Rules** - Automated triggers
10. **Architecture** - System overview
11. **Technical Deep Dive** - Implementation details
12. **SQL Demo** - Developer-friendly interface
13. **Pilot Plan** - 30-day timeline
14. **Next Steps** - Call to action

## Development

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

### Linting
```bash
npm run lint
```

## Content Guidelines

### Slide Structure
- **Title**: Clear, action-oriented headlines
- **Subtitle**: Supporting context (optional)
- **Content**: 3-4 bullet points maximum
- **Visuals**: Supporting diagrams or charts

### Writing Style
- **Concise**: Use bullet points and short sentences
- **Technical**: Include specific metrics and technical details
- **Business-focused**: Emphasize ROI and business impact
- **Action-oriented**: Clear next steps and calls-to-action

## Performance

### Optimizations
- **Lazy Loading**: Images load as needed
- **Efficient Animations**: GPU-accelerated transforms
- **Minimal Dependencies**: Lightweight React + Framer Motion
- **Modern CSS**: Hardware-accelerated properties

### Browser Support
- **Modern Browsers**: Chrome 88+, Firefox 85+, Safari 14+
- **Mobile**: iOS Safari 14+, Chrome Mobile 88+
- **Features**: CSS Custom Properties, Intersection Observer, Smooth Scrolling

## Deployment

### Recommended Platforms
- **Vercel**: `vercel deploy`
- **Netlify**: Drag & drop `dist/` folder
- **GitHub Pages**: Enable in repository settings
- **AWS S3**: Upload static files to bucket

### Environment Setup
No environment variables required - fully static deployment.

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m "Description"`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## License

This project is proprietary software developed for Roe-AI presentation purposes.

---

**Contact**: Jaden Fix · Solutions Engineer · roe-ai.com
