# Can I Recycle THAT? ♻️

A web application that uses machine learning to help Utah residents properly classify and dispose of waste items. Simply snap a photo of an item and get instant feedback on whether it's recyclable, compostable, or trash—along with detailed disposal instructions specific to Utah.

## Purpose

Recycling contamination is a major problem in the waste industry, with average contamination rates in the U.S. at 17-25%. A single greasy pizza box or plastic bag can ruin entire batches of recycling and jam machinery. **Can I Recycle THAT?** empowers individuals to recycle correctly, reduce contamination, and help create a cleaner, more sustainable Utah.

In Utah, improper recycling is taken seriously—infractions can result in fines up to $750. This app removes the guesswork.

## Features

- **AI-Powered Classification**: Upload a photo and get instant waste classification
- **Detailed Instructions**: Specific disposal guidance for Utah residents
- **9 Waste Categories**: Cardboard, Food Organics, Glass, Metal, Paper, Plastic, Textile, Vegetation, and Miscellaneous Trash
- **Confidence Scores**: See how confident the model is in its classification
- **Mobile-First Design**: Fully responsive and works on all devices
- **Environmental Impact Info**: Understand why proper disposal matters

## How It Works

1. **Snap** a clear photo of the item in good lighting
2. **Upload** the image to the web app
3. **Get** instant classification and disposal instructions
4. **Learn** the environmental impact of proper disposal

## Tech Stack

**Frontend:**
- React 18
- Handlebars (templating)
- Vanilla CSS (mobile-first, responsive design)

**Backend:**
- Node.js + Express
- Multer (file uploads)
- Python ML Model (waste classification)

**Deployment:**
- Express server on port 3000

## 📁 Project Structure

```
hackathon/
├── public/
│   ├── css/
│   │   ├── style.css          # Main styles 
│   │   └── about.css          # About page specific styles
│   ├── js/
│   │   └── home.js            # React component for upload
│   └── uploads/               # Uploaded images (temporary)
├── views/
│   ├── layouts/
│   │   └── main.handlebars    # Main layout template
│   ├── home.handlebars        # Home page template
│   └── about.handlebars       # About page template
├── middleware/
│   ├── callData.js            # Python model interface
│   └── outputHandler.js       # ML output formatting
├── index.js                   # Express server entry point
├── package.json               # Dependencies
└── README.md                  # This file
```

## Getting Started

### Prerequisites
- Node.js (v16+)
- Python 3.8+ (for ML model)
- npm

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/aray03/hackathon.git
cd hackathon
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up Python environment**
```bash
python -m venv .venv
source .venv/bin/activate  
pip install -r requirements.txt
```

4. **Start the development server**
```bash
npm run dev
```

5. **Open in browser**
```
http://localhost:3000
```

## Supported Waste Categories

- **Cardboard** - Brown, corrugated material
- **Food Organics** - Compostable food waste
- **Glass** - Bottles, jars, containers
- **Metal** - Aluminum, steel, cans
- **Paper** - Newspaper, magazines, clean paper
- **Plastic** - #1 (PET) and #2 (HDPE) containers
- **Textile** - Fabric, clothing, linens
- **Vegetation** - Leaves, branches, grass clippings
- **Miscellaneous Trash** - Everything else

## 📝 License

There is no License, you can steal this

**Built with ♻️ for a cleaner Utah** 🏔️

*Last updated: February 28, 2026*
