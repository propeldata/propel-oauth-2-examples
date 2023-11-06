
# Java Propel OAuth Example

This directory contains the Java example for fetching a Propel access token using OAuth2.

## Environment
Fill out the .env.example with the correct values and copy to .env

## Installation
Java will automatically download the necessary packages from the `pom.xml`.

To compile, run:

```bash
mvn compile
```

## Fetch an access token

```bash
mvn exec:java -Dexec.mainClass="com.example.OAuthTokenFetcher"
```
