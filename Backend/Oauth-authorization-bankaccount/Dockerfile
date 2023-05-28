FROM eclipse-temurin:8-jdk-alpine
VOLUME /tmp
ARG JAR_FILE=Oauth-authorization-bankaccount/build/libs/Oauth-authorization-bankaccount-SNAPSHOT.jar
COPY ${JAR_FILE} app.jar
ENTRYPOINT ["java","-jar","/app.jar"]


#RUN mkdir -p ${PROJECT}/build/dependency && (cd ${PROJECT}/build/dependency; jar -xf ../${PROJECT}/build/libs/${PROJECT}-1.0.jar)

#RUN mkdir -p build/dependency && (cd build/dependency; jar -xf ../libs/*.jar)

#FROM eclipse-temurin:8-jdk-alpine
#VOLUME /tmp
#ARG DEPENDENCY=/workspace/app/Oauth-authorization-bankaccount/build/dependency
#COPY --from=build ${DEPENDENCY}/BOOT-INF/lib /app/lib
#COPY --from=build ${DEPENDENCY}/META-INF /app/META-INF
#COPY --from=build ${DEPENDENCY}/BOOT-INF/classes /app
#ENTRYPOINT ["java","-cp","app:app/lib/*","hello.Application"]


#FROM eclipse-temurin:8-jdk-alpine

#WORKDIR /app

#COPY ./build/libs/*.jar oauth-authorization.jar

#EXPOSE 9000

#ENTRYPOINT ["java","-jar","./oauth-authorization.jar"]



#ENV GRADLE_VERSION 7.2
#
#RUN apk add --no-cache curl && \
#    curl -L https://services.gradle.org/distributions/gradle-${GRADLE_VERSION}-bin.zip -o /tmp/gradle-${GRADLE_VERSION}-bin.zip && \
#    unzip /tmp/gradle-${GRADLE_VERSION}-bin.zip -d /opt && \
#    rm /tmp/gradle-${GRADLE_VERSION}-bin.zip && \
#    apk del curl


#ENV GRADLE_HOME /opt/gradle-${GRADLE_VERSION}
#ENV PATH ${PATH}:${GRADLE_HOME}/bin

#WORKDIR /src

#COPY ["/src", "build.gradle"]

#RUN gradle build



#CMD ["java", "-jar", "build/libs/Oauth-authorization-bankaccount-1.0.jar"]