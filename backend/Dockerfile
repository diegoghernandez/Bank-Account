FROM eclipse-temurin:17-jdk-alpine as build
WORKDIR /workspace/app

COPY . /workspace/app
RUN chmod +x gradlew
RUN --mount=type=cache,target=/root/.gradle ./gradlew clean build
RUN mkdir -p build/dependency && (cd build/dependency; jar -xf ../libs/*-SNAPSHOT.jar)

FROM eclipse-temurin:17-jdk-alpine
VOLUME /tmp

ARG CLIENT=http://localhost:5173
ARG EMAIL
ARG PASSWORD
ARG KEY=key
ARG ISSUER=issuer

ARG DB_URL=jdbc:postgresql://localhost:5432/bankaccount?createDatabaseIfNotExist=true
ARG DB_NAME=postgres
ARG DB_PASS=root

ENV ENV_CLIENT=$CLIENT
ENV ENV_EMAIL=$EMAIL
ENV ENV_ALLOWED-ORIGINS=$CLIENT
ENV ENV_JWT-SECRET-KEY=$KEY
ENV ENV_JWT-ISSUER=$ISSUER

ENV USERNAME_EMAIL=$EMAIL
ENV USERNAME_PASSWORD=$PASSWORD

ENV SPRING_DATASOURCE_URL=$DB_URL
ENV SPRING_DATASOURCE_USERNAME=$DB_NAME
ENV SPRING_DATASOURCE_PASSWORD=$DB_PASS

ARG DEPENDENCY=/workspace/app/build/dependency
COPY --from=build ${DEPENDENCY}/BOOT-INF/lib /app/lib
COPY --from=build ${DEPENDENCY}/META-INF /app/META-INF
COPY --from=build ${DEPENDENCY}/BOOT-INF/classes /app
ENTRYPOINT ["java","-cp","app:app/lib/*","com.bankaccount.back.BackendApplication"]