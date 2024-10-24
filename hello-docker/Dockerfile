FROM rust:latest AS builder
WORKDIR /usr/src/myapp
COPY . .
RUN cargo build --release
FROM debian:bookworm-slim
COPY --from=builder /usr/src/myapp/target/release/hello-docker /usr/local/bin/hello-docker
CMD ["/usr/local/bin/hello-docker"]