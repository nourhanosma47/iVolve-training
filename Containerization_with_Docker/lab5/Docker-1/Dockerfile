# First Stage: Build
FROM maven:4.0.0-rc-5-eclipse-temurin-17-alpine AS build
WORKDIR /lab5
COPY . .
RUN mvn package

# Second Stage: Runtime
FROM eclipse-temurin:17.0.17_10-jre-alpine-3.23
WORKDIR /final
COPY --from=build /lab5/target/demo-0.0.1-SNAPSHOT.jar .
EXPOSE 8080
ENTRYPOINT ["java","-jar","demo-0.0.1-SNAPSHOT.jar"]

