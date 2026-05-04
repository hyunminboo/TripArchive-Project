package com.example.backend.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import software.amazon.awssdk.auth.credentials.AwsBasicCredentials;
import software.amazon.awssdk.auth.credentials.DefaultCredentialsProvider;
import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.presigner.S3Presigner;

@Configuration
public class S3Config {

    @Value("${cloud.aws.credentials.access-key:}")
    private String accessKey;

    @Value("${cloud.aws.credentials.secret-key:}")
    private String secretKey;

    @Value("${cloud.aws.region:ap-northeast-2}")
    private String region;

    @Bean
    public S3Presigner s3Presigner(){
        S3Presigner.Builder builder= S3Presigner.builder()
                .region(Region.of(region));

        if(!accessKey.isBlank() && !secretKey.isBlank()){
            AwsBasicCredentials credentials =
                    AwsBasicCredentials.create(accessKey,secretKey);

            builder.credentialsProvider(StaticCredentialsProvider.create(credentials));
        }else {
            builder.credentialsProvider(DefaultCredentialsProvider.create());
        }

        return builder.build();

    }
}










