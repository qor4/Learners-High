🎞7월 26일 

# S3에 파일 업로드를 위해 S3 학습

```
public class S3Service {

    private final AmazonS3 amazonS3;

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    public String uploadToAWS(MultipartFile file) {
        String key = UUID.randomUUID() + "_" + file.getOriginalFilename();
        try {

            ObjectMetadata metadata = new ObjectMetadata();
            metadata.setContentType(file.getContentType());
            metadata.setContentLength(file.getSize());
            PutObjectRequest request = new PutObjectRequest(bucket, key, file.getInputStream(), metadata);
            request.withCannedAcl(CannedAccessControlList.AuthenticatedRead); // 접근권한 체크
            PutObjectResult result = amazonS3.putObject(request);
            return key;
        } catch (AmazonServiceException e) {
            // The call was transmitted successfully, but Amazon S3 couldn't process
            // it, so it returned an error response.
            log.error("uploadToAWS AmazonServiceException filePath={}, yyyymm={}, error={}", e.getMessage());
        } catch (SdkClientException e) {
            // Amazon S3 couldn't be contacted for a response, or the client
            // couldn't parse the response from Amazon S3.
            log.error("uploadToAWS SdkClientException filePath={}, error={}", e.getMessage());
        } catch (Exception e) {
            // Amazon S3 couldn't be contacted for a response, or the client
            // couldn't parse the response from Amazon S3.
            log.error("uploadToAWS SdkClientException filePath={}, error={}", e.getMessage());
        }

        return "";
    }

}

```

### 파일을 업로드 함.

![image.png](./image.png)

### 성공은 됨. 하지만 intellij에서 region 오류가 남.
![image-1.png](./image-1.png)

-- 잘 읽어보면 설정된 버킷의 region은 "ap-northeast-2"인데 왜 안 맞추냐는 것 같다.

### properties 와 동일하게 맞췄음에도 계속 오류가 나서 5시간째 헤매고 있다.

#### 내가 설정한 region 
![image-2.png](./image-2.png)

#### 현재 버킷의 region 
![image-3.png](./image-3.png)

-- 내일 코치님께 여쭤볼 생각...
