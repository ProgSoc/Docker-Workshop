FROM oven/bun:1 AS base
WORKDIR /usr/src/app

# new install stage
FROM base AS install
RUN mkdir -p /temp/install
# since only package.json is copied, this stage will not be invalidated if any other source file changes
COPY package.json bun.lock /temp/install
RUN cd /temp/install && bun install --frozen-lockfile

FROM base AS builder
COPY --from=install /temp/install/node_modules node_modules
COPY . .
ENV NODE_ENV=production
RUN bun run build

# run the app
USER bun
EXPOSE 3000/tcp
ENTRYPOINT ["bun", "start"]
