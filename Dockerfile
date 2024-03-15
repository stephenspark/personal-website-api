# Latest stable node
FROM node:20.11.1-alpine AS base

ENV NODE_ENV production

# Install all node_modules, including dev dependencies
FROM base AS deps

WORKDIR /app

COPY package*.json ./
RUN npm install --include=dev

# Setup production node_modules
FROM base AS production-deps

WORKDIR /app

COPY --from=deps /app/node_modules /app/node_modules
ADD package*.json ./
RUN npm prune --omit=dev

# Build the app
FROM base AS build

WORKDIR /app

COPY --from=deps /app/node_modules /app/node_modules
COPY . .
RUN npm run build

# Generate prisma client from schema
FROM base AS prisma-client

WORKDIR /app

COPY --from=deps /app/node_modules /app/node_modules
COPY ./prisma /app/prisma
RUN npx prisma generate

# Build the production image with minimal footprint
FROM base

WORKDIR /app

COPY --from=production-deps /app/node_modules /app/node_modules
COPY --from=build /app/dist /app/dist
COPY --from=prisma-client /app/node_modules/.prisma /app/node_modules/.prisma
COPY . .

CMD ["npm", "run", "serve"]
