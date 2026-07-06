FROM openjdk:25-ea-slim
WORKDIR /app

# မိမိစက်ထဲက target folder ထဲက ထွက်လာတဲ့ jar ဖိုင်ကိုပဲ Container ထဲ တန်းထည့်တာဖြစ်ပါတယ်
COPY target/*.jar app.jar

EXPOSE 8080
CMD ["java", "-jar", "app.jar"]