FROM eclipse-temurin:8-jdk-alpine
VOLUME /tmp
ARG JAR_FILE=Security-bankaccount/build/libs/Security-bankaccount-SNAPSHOT.jar
COPY ${JAR_FILE} app.jar
ENTRYPOINT ["java","-jar","/app.jar"]