# This simple Dockerfile works to build our nextjs application, however it's not ideal.
# Currently, everytime a change is made and the image is rebuilt, all the node modules are rebuilt from scratch, because the COPY . . invalidates cache when *any* file changes, even if its not a dependency in package.json

# Can you fix this Dockerfile so that changing source files will *not* re-install dependencies every time?

# Hint: create a new stage and *only* copy the files that the dependencies depend on! (i.e package.json)
# Hint 2: you can copy files from other stages by using COPY --from=<stage name> 

FROM oven/bun:1 AS base
WORKDIR /usr/src/app

FROM base AS builder
COPY . .
RUN bun install
ENV NODE_ENV=production
RUN bun run build

# run the app
USER bun
EXPOSE 3000/tcp
ENTRYPOINT ["bun", "start"]
