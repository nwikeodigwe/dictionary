# Dictionary API

A RESTful API that provides word definitions and related information, built with TypeScript, Express, and Node.js.

## Features

- Word definitions and meanings
- Random word generation
- Swagger documentation
- Error handling and logging
- TypeScript support
- Jest testing

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Installation

1. Clone the repository:

```bash
git clone https://github.com/nwikeodigwe/dictionary.git
cd dictionary
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory:

```env
PORT=3000
NODE_ENV=development
```

## Usage

### Development

```bash
npm start
```

### Testing

```bash
npm test
```

## API Endpoints

### English Dictionary

- `GET /en` - Get a random word
- `GET /en/:word` - Get definition for a specific word

### Documentation

- `GET /docs` - Swagger API documentation

## Project Structure

```
app/
├── src/
│   ├── routes/         # API routes
│   ├── utils/          # Utility functions
│   ├── middleware/     # Express middleware
│   └── startup/        # Application startup
├── logs/              # Application logs
└── coverage/          # Test coverage reports
```

## Technologies Used

- TypeScript
- Express.js
- Jest
- Winston (logging)
- Swagger UI
- Cheerio (web scraping)

## License

ISC

## Author

Nwike Odigwe
