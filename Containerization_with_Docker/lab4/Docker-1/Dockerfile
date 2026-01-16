# Use Java 17 base image
FROM eclipse-temurin:17-jdk-alpine

# Create working directory
WORKDIR /lab4

# Copy the JAR file into the container
COPY target/demo-0.0.1-SNAPSHOT.jar app.jar

# Expose application port
EXPOSE 8080

# Run the application
ENTRYPOINT ["java","-jar","app.jar"]

