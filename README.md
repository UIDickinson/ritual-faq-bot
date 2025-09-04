# Ritual AI Chatbot

A full-stack AI-powered chatbot application that provides intelligent, step-by-step guidance using OpenAI's GPT models and Pinecone vector database for retrieval-augmented generation (RAG). The application features a modern React frontend with a beautiful gradient design and an Express.js backend.

## Features

- 🤖 **AI-Powered Responses**: Uses OpenAI GPT-4 for generating contextual responses
- 🔍 **Semantic Search**: Leverages Pinecone vector database for intelligent context retrieval
- 💬 **Real-time Chat**: Responsive chat interface with typing indicators
- 🎨 **Modern UI**: Built with shadcn/ui components and Tailwind CSS
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile devices
- ⚡ **Fast Development**: Hot module replacement with Vite
- 🔒 **Type Safety**: Full TypeScript implementation across frontend and backend

## Quick Start

### Prerequisites

- Node.js 18+ installed
- OpenAI API key
- Pinecone API key and index

### Local Development

1. **Clone and Install**
   ```bash
   git clone <your-repo-url>
   cd ritual-ai-chatbot
   npm install
   ```

2. **Environment Setup**
   Create a `.env` file in the root directory:
   ```env
   OPENAI_API_KEY=your_openai_api_key_here
   PINECONE_API_KEY=your_pinecone_api_key_here
   PINECONE_INDEX_NAME=your_pinecone_index_name
   DATABASE_URL=your_postgresql_url_here
   ```

3. **Start Development Server**
   ```bash
   npm run dev
   ```
   
   The application will be available at `http://localhost:5000`

### Other Commands

```bash
npm run build     # Build for production
npm run start     # Start production server
npm run check     # Type check with TypeScript
npm run db:push   # Push database schema changes
```

## Vercel Deployment

### Method 1: Vercel CLI (Recommended)

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel
   ```
   Follow the prompts to configure your project.

4. **Set Environment Variables**
   In your Vercel dashboard or via CLI:
   ```bash
   vercel env add OPENAI_API_KEY
   vercel env add PINECONE_API_KEY
   vercel env add PINECONE_INDEX_NAME
   vercel env add DATABASE_URL
   ```

### Method 2: GitHub Integration

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Configure build settings:
     - **Build Command**: `npm run build`
     - **Output Directory**: `dist/public`
     - **Install Command**: `npm install`

3. **Configure Environment Variables**
   In Vercel dashboard → Settings → Environment Variables, add:
   - `OPENAI_API_KEY`
   - `PINECONE_API_KEY`
   - `PINECONE_INDEX_NAME`
   - `DATABASE_URL`

### Vercel Configuration

Create `vercel.json` in your root directory:
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist/public",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "functions": {
    "dist/index.js": {
      "runtime": "nodejs18.x"
    }
  },
  "rewrites": [
    {
      "source": "/api/(.*)",
      "destination": "/api/$1"
    },
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

## Project Structure

```
ritual-ai-chatbot/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   │   ├── chat/       # Chat-specific components
│   │   │   └── ui/         # shadcn/ui components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── lib/            # Utility functions and configurations
│   │   ├── pages/          # Application pages
│   │   ├── App.tsx         # Main application component
│   │   ├── main.tsx        # React entry point
│   │   └── index.css       # Global styles and Tailwind imports
│   └── index.html          # HTML template
├── server/                 # Backend Express application
│   ├── utils/              # Utility functions
│   │   ├── openai.ts       # OpenAI client configuration
│   │   └── pinecone.ts     # Pinecone client configuration
│   ├── index.ts            # Express server entry point
│   ├── routes.ts           # API route definitions
│   ├── storage.ts          # Data storage interface
│   └── vite.ts             # Vite development server integration
├── shared/                 # Shared code between frontend and backend
│   └── schema.ts           # Type definitions and validation schemas
├── package.json            # Dependencies and scripts
├── vite.config.ts          # Vite configuration
├── tailwind.config.ts      # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
└── drizzle.config.ts       # Database ORM configuration
```

## File Details and How to Make Changes

### Frontend Components

#### `client/src/components/chat/ChatInterface.tsx`
**Purpose**: Main chat component handling message display and user interactions
**Key Features**:
- Message state management
- API communication with backend
- Real-time typing indicators
- Error handling and user feedback

**To modify**: Change chat behavior, add new message types, or modify UI layout

#### `client/src/components/chat/MessageBubble.tsx`
**Purpose**: Individual message rendering with markdown support
**To modify**: Change message appearance, add new message formats, or modify styling

#### `client/src/components/chat/ChatInput.tsx`
**Purpose**: User input handling and message sending
**To modify**: Add input validation, keyboard shortcuts, or new input types

#### `client/src/components/ui/`
**Purpose**: Reusable UI components from shadcn/ui library
**To modify**: Customize component styling or add new components using `npx shadcn-ui@latest add [component-name]`

### Backend API

#### `server/routes.ts`
**Purpose**: API endpoint definitions, particularly the `/api/chat` endpoint
**Key Features**:
- Request validation with Zod schemas
- OpenAI integration for chat completion
- Pinecone integration for semantic search
- Error handling and response formatting

**To modify**: Add new API endpoints, change AI behavior, or modify response processing

#### `server/utils/openai.ts`
**Purpose**: OpenAI client configuration and initialization
**To modify**: Change AI models, adjust parameters, or add new OpenAI features

#### `server/utils/pinecone.ts`
**Purpose**: Pinecone vector database client configuration
**To modify**: Change vector search parameters or add new Pinecone operations

### Shared Code

#### `shared/schema.ts`
**Purpose**: Type definitions and validation schemas shared between frontend and backend
**Key Features**:
- Database table schemas using Drizzle ORM
- Request/response type definitions
- Zod validation schemas

**To modify**: Add new data types, modify existing schemas, or add validation rules

### Configuration Files

#### `vite.config.ts`
**Purpose**: Build tool configuration for development and production
**Key Features**:
- React plugin configuration
- Path aliases for imports
- Development server settings

**To modify**: Add new build plugins, change aliases, or modify build settings

#### `tailwind.config.ts`
**Purpose**: CSS framework configuration
**To modify**: Add new colors, fonts, or design tokens

#### `package.json`
**Purpose**: Project metadata, dependencies, and npm scripts
**To modify**: Add new dependencies, modify scripts, or update project information

## Environment Variables

| Variable | Description | Required |
|----------|-------------|-----------|
| `OPENAI_API_KEY` | OpenAI API key for GPT completions | Yes |
| `PINECONE_API_KEY` | Pinecone API key for vector search | Yes |
| `PINECONE_INDEX_NAME` | Name of your Pinecone index | Yes |
| `DATABASE_URL` | PostgreSQL connection string | Yes |
| `NODE_ENV` | Environment (development/production) | Auto-set |
| `PORT` | Server port (default: 5000) | No |

## How to Make Changes

### Adding New Chat Features

1. **Frontend Changes**:
   - Modify `ChatInterface.tsx` for new UI behavior
   - Update message types in the component state
   - Add new UI components if needed

2. **Backend Changes**:
   - Update `routes.ts` to handle new request types
   - Modify the chat processing logic
   - Update response schemas in `shared/schema.ts`

### Styling Changes

1. **Global Styles**: Edit `client/src/index.css`
2. **Component Styles**: Use Tailwind classes or modify component CSS
3. **Theme Variables**: Update CSS variables in `index.css`
4. **Colors**: Modify `tailwind.config.ts` for new color schemes

### Database Changes

1. **Schema Updates**: Modify `shared/schema.ts`
2. **Migrations**: Run `npm run db:push` to apply changes
3. **Storage Logic**: Update `server/storage.ts` for new data operations

### Adding New Pages

1. **Create Page Component**: Add new file in `client/src/pages/`
2. **Update Routing**: Modify `client/src/App.tsx` to include new route
3. **Add Navigation**: Update UI components to link to new page

## Dependencies

### Core Dependencies
- **React 18**: Frontend framework
- **Express.js**: Backend server framework
- **TypeScript**: Type safety across the application
- **Vite**: Fast build tool and development server

### AI & Database
- **OpenAI**: GPT completions and embeddings
- **Pinecone**: Vector database for semantic search
- **Drizzle ORM**: Database toolkit with PostgreSQL

### UI & Styling
- **Tailwind CSS**: Utility-first CSS framework
- **shadcn/ui**: Component library built on Radix UI
- **Lucide React**: Icon library
- **Framer Motion**: Animation library

### State Management
- **TanStack Query**: Server state management
- **Zod**: Schema validation and type inference

## Troubleshooting

### Common Issues

1. **Environment Variables Not Loading**
   - Ensure `.env` file is in the root directory
   - Check that variable names match exactly
   - Restart the development server after changes

2. **Build Failures**
   - Run `npm run check` to identify TypeScript errors
   - Ensure all dependencies are installed with `npm install`
   - Check that environment variables are set in production

3. **API Errors**
   - Verify OpenAI and Pinecone API keys are valid
   - Check API rate limits and quotas
   - Review server logs for detailed error messages

4. **Database Connection Issues**
   - Verify DATABASE_URL is correct and accessible
   - Run `npm run db:push` to ensure schema is up to date
   - Check database provider status

### Development Tips

- Use `npm run dev` for hot reloading during development
- Check browser console for frontend errors
- Monitor server logs for backend issues
- Use TypeScript checking with `npm run check`
- Test API endpoints independently using tools like Postman

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes following the existing code style
4. Run type checking: `npm run check`
5. Test your changes locally
6. Commit with clear messages: `git commit -m "Add feature description"`
7. Push and create a pull request

## License

MIT License - see LICENSE file for details
