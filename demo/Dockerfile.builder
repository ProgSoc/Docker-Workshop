FROM rust:latest AS builder
WORKDIR /usr/src/myapp
COPY . .
RUN cargo build --release
CMD ["/usr/src/myapp/target/release/hello-docker"]