# Gift Assist

Gift Assist is an AI-powered application that helps users find perfect gift suggestions based on their preferences and requirements. The application uses Together AI to generate personalized gift recommendations.

## Features

- Interactive gift suggestion form
- AI-powered gift recommendations
- Responsive design with modern UI components
- Real-time suggestions based on user input
- Custom filtering and preference settings

## Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn/ui
- **AI Integration**: Together AI
- **Form Handling**: React Hook Form
- **Utilities**: clsx, tailwind-merge

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/gift-assist.git
cd gift-assist
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a `.env` file in the root directory and add your Together AI API key and Google Search API key and CX:
```env
NEXT_PUBLIC_TOGETHER_API_KEY=
NEXT_PUBLIC_GOOGLE_API_KEY=
NEXT_PUBLIC_GOOGLE_CX=
```

4. Start the development server:
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Development

- `npm run dev` - Start the development server
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint for code linting

## Project Structure

```
gift-assist/
├── app/                  # Next.js app directory
│   ├── globals.css      # Global styles
│   ├── layout.tsx       # Root layout component
│   └── page.tsx         # Home page component
├── components/          # React components
│   ├── gift-form.tsx    # Gift suggestion form
│   ├── gift-suggestions.tsx # Gift suggestions display
│   └── ui/              # UI components
├── lib/                 # Utility functions and types
│   ├── search.ts        # Search functionality
│   ├── together-ai.ts   # AI integration
│   ├── types.ts         # TypeScript types
│   └── utils.ts         # Helper utilities
└── public/             # Static assets
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
