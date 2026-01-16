# Use Maven base image with Java 17
FROM maven:3.9.1-eclipse-temurin-17

# Create work directory
WORKDIR /lab3

# Copy application source code
COPY . .

# Build the application
RUN mvn package

# Run the application
CMD ["java", "-jar", "target/demo-0.0.1-SNAPSHOT.jar"]

# Expose port 8080
EXPOSE 8080


