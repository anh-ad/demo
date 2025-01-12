#include <Arduino.h>
#if defined(ESP32)
#include <WiFi.h>
#elif defined(ESP8266)
#include <ESP8266WiFi.h>
#endif
#include <Firebase_ESP_Client.h>
// Provide the token generation process info.
#include "addons/TokenHelper.h"
// Provide the RTDB payload printing info and other helper functions.
#include "addons/RTDBHelper.h"

// Insert your network credentials
#define WIFI_SSID "VNPT_THANH QUYEN_4G"
#define WIFI_PASSWORD "99999999"
// Insert Firebase project API Key
#define API_KEY "AIzaSyAc-39LIE5wH_e3cjVO8J9GEACANSREV2k"

// Insert RTDB URLefine the RTDB URL */
#define DATABASE_URL "https://fir-11805-default-rtdb.europe-west1.firebasedatabase.app/"
#define D2 27
// Define Firebase Data object
FirebaseData fbdo;

FirebaseAuth auth;
FirebaseConfig config;

unsigned long sendDataPrevMillis = 0;
int intValue;
float floatValue;
int stringValue;
bool signupOK = false;
int count;
void setup()
{
  Serial.begin(115200);
  pinMode(D2, OUTPUT);
  digitalWrite(D2, 0);
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.print("Connecting to Wi-Fi");
  while (WiFi.status() != WL_CONNECTED)
  {
    Serial.print(".");
    delay(300);
  }
  Serial.println();
  Serial.print("Connected with IP: ");
  Serial.println(WiFi.localIP());
  Serial.println();

  /* Assign the api key (required) */
  config.api_key = API_KEY;

  /* Assign the RTDB URL (required) */
  config.database_url = DATABASE_URL;

  /* Sign up */
  if (Firebase.signUp(&config, &auth, "", ""))
  {
    Serial.println("ok");
    signupOK = true;
  }
  else
  {
    Serial.printf("%s\n", config.signer.signupError.message.c_str());
  }

  /* Assign the callback function for the long running token generation task */
  config.token_status_callback = tokenStatusCallback; // see addons/TokenHelper.h

  Firebase.begin(&config, &auth);
  Firebase.reconnectWiFi(true);
}

void loop()
{
  if (Firebase.ready() && signupOK && (millis() - sendDataPrevMillis > 1000 || sendDataPrevMillis == 0))
  {
    sendDataPrevMillis = millis();
    if (Firebase.RTDB.getInt(&fbdo, "/DK/control"))
    {
      if (fbdo.dataType() == "int")
      {
        stringValue = fbdo.intData();
        Serial.println(stringValue);
      }
    }
    else
    {
      Serial.println(fbdo.errorReason());
    }
  }
  if (stringValue==10)
    digitalWrite(D2, 1);
  if(stringValue==20)
    digitalWrite(D2, 0);
}
