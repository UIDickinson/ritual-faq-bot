# Overview

This is a full-stack AI chatbot application built with React frontend and Express backend. The application provides an intelligent conversational interface that leverages OpenAI's GPT models and Pinecone vector database for retrieval-augmented generation (RAG). Users can ask questions and receive step-by-step, contextually-aware responses powered by semantic search through stored knowledge.

The system combines modern web technologies with AI capabilities to deliver a responsive chat experience with real-time message handling, markdown formatting, and a polished UI using shadcn/ui components.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React with TypeScript using Vite as the build tool
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query for server state management and caching
- **UI Framework**: shadcn/ui components built on Radix UI primitives with Tailwind CSS
- **Styling**: Tailwind CSS with CSS variables for theming and a gradient background design
- **Component Structure**: Modular chat components including ChatInterface, MessageBubble, ChatInput, and TypingIndicator

## Backend Architecture
- **Framework**: Express.js with TypeScript
- **API Design**: RESTful API with a single `/api/chat` endpoint for message processing
- **Request Validation**: Zod schemas for type-safe request/response validation
- **Development Setup**: Custom Vite integration for hot module replacement in development
- **Error Handling**: Centralized error middleware with structured error responses

## Database and Storage
- **Primary Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Vector Database**: Pinecone for semantic search and similarity matching
- **Schema Management**: Drizzle migrations with shared schema definitions
- **In-Memory Storage**: Fallback MemStorage implementation for development/testing

## AI and ML Integration
- **Language Model**: OpenAI GPT-5 for generating conversational responses
- **Embeddings**: OpenAI text-embedding-3-small for converting text to vector representations
- **RAG Pipeline**: 
  1. User query embedding generation
  2. Semantic search in Pinecone (top-k=5)
  3. Context retrieval and formatting
  4. GPT completion with system prompt for step-by-step responses
- **Response Formatting**: Support for markdown formatting including code blocks, bold text, and structured content

## Authentication and Sessions
- **Session Management**: PostgreSQL session store using connect-pg-simple
- **User Schema**: Basic user authentication with username/password (currently using in-memory storage)

## Development and Build Tools
- **Build System**: Vite for fast development and optimized production builds
- **TypeScript**: Full type safety across frontend, backend, and shared schemas
- **Code Quality**: ESBuild for production bundling with ES modules
- **Development Server**: Custom Express server with Vite middleware integration

# External Dependencies

## AI and Vector Services
- **OpenAI API**: GPT-5 language model and text-embedding-3-small for embeddings
- **Pinecone**: Vector database service for semantic search and similarity matching

## Database Services
- **Neon Database**: Serverless PostgreSQL provider (@neondatabase/serverless)
- **PostgreSQL**: Primary relational database for user data and chat history

## UI and Component Libraries
- **Radix UI**: Headless UI components for accessibility and functionality
- **Tailwind CSS**: Utility-first CSS framework for styling
- **shadcn/ui**: Pre-built component library with consistent design system
- **Lucide React**: Icon library for UI elements

## Development and Utility Libraries
- **TanStack Query**: Server state management and caching
- **React Hook Form**: Form handling with validation
- **Zod**: Schema validation and type inference
- **date-fns**: Date formatting and manipulation
- **wouter**: Lightweight routing for React

## Build and Development Tools
- **Vite**: Fast build tool and development server
- **ESBuild**: JavaScript bundler for production builds
- **TypeScript**: Static type checking and enhanced developer experience
- **PostCSS**: CSS processing with Tailwind CSS integration

## Environment Configuration
Required environment variables:
- `DATABASE_URL`: PostgreSQL connection string
- `OPENAI_API_KEY`: OpenAI API authentication
- `PINECONE_API_KEY`: Pinecone service authentication
- `PINECONE_INDEX_NAME`: Pinecone index identifier for vector storage