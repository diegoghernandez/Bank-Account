FROM eclipse-temurin:8-jdk-alpine
VOLUME /tmp
ARG JAR_FILE=Oauth-resource-bankaccount/build/libs/Oauth-resource-bankaccount-SNAPSHOT.jar
COPY ${JAR_FILE} app.jar
ENTRYPOINT ["java","-jar","/app.jar"]