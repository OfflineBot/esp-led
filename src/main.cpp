
#include <Arduino.h>

#include <Adafruit_NeoPixel.h>
#include <ESPAsyncWebServer.h>
#include <AsyncTCP.h>
#include <WiFi.h>
#include <SPIFFS.h>

#include "neopixel.hpp"

const char* ssid = "WIFI@DB";
const char* password = "OfflineBot";

const uint16_t NUM_PIXELS = 60;
const uint8_t PIN = 25;

AsyncWebServer server(80);
Adafruit_NeoPixel strip = Adafruit_NeoPixel(NUM_PIXELS, PIN, NEO_GRB + NEO_KHZ800);

void setup() {

    Serial.begin(9600);

    if(!SPIFFS.begin(true)) {
        Serial.println("Cant connect to SPIFFS!");
        return;
    }

    WiFi.begin(ssid, password);
    Serial.println("Connecting to WiFi");
    while(WiFi.status() != WL_CONNECTED) 
        Serial.print(".");
    Serial.print("\nWiFi Connected: "); Serial.println(WiFi.localIP());

    strip.begin();
    strip.setBrightness(255);
    strip.show();

    // server routes

    // STATICS
    server.on("/static/css/main.css", HTTP_GET, [](AsyncWebServerRequest *request) {
        request->send(SPIFFS, "/static/css/main.css", "text/css");
    });
    server.on("/static/js/main.js", HTTP_GET, [](AsyncWebServerRequest *request) {
        request->send(SPIFFS, "/static/js/main.js", "application/javascript");
    });

    // GET
    server.on("/", HTTP_GET, [](AsyncWebServerRequest *request) {
        request->send(SPIFFS, "/main.html");
    });

    // POST
    server.on("/full-color", HTTP_POST, [](AsyncWebServerRequest *request) {
        
        int r, g, b = 0;

        if (request->hasParam("r", true))
            r = request->getParam("r", true)->value().toInt();
        if (request->hasParam("g", true)) 
            g = request->getParam("g", true)->value().toInt();
        if (request->hasParam("b", true))
            b = request->getParam("b", true)->value().toInt();

        full_color(strip, NUM_PIXELS, r, g, b);

        request->redirect("/");
    });

    server.on("/brightness", HTTP_POST, [](AsyncWebServerRequest *request) {
        int brightness = 0;

        if (request->hasParam("brightness", true))
            brightness = request->getParam("brightness", true)->value().toInt();

        set_brightness(strip, brightness);

        request->redirect("/");
    });

    // server routes end

    server.begin();
}

void loop() {

}
