
FROM openjdk:11 as builder

COPY /home/ubuntu/keys/ssl/keystore.p12 src/main/resources
COPY /home/ubuntu/keys/ssl/application.properties src/main/resources
COPY /home/ubuntu/keys/ssl/application-s3.properties src/main/resources
COPY gradlew .
COPY gradle gradle
COPY build.gradle .
COPY settings.gradle .
COPY src src
RUN chmod +x ./gradlew
RUN ./gradlew bootJar

FROM openjdk:11
COPY --from=builder build/libs/*.jar app.jar
EXPOSE 7777

ARG SERVER_MODE
RUN echo "$SERVER_MODE"
ENV SERVER_MODE=$SERVER_MODE

ENTRYPOINT ["java", "-Dspring.profiles.active=${SERVER_MODE}","-Duser.timezone=Asia/Seoul", "-jar", "/app.jar"]
