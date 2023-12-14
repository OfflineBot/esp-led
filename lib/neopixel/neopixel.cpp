
#include <Adafruit_NeoPixel.h>

void full_color(Adafruit_NeoPixel strip, uint8_t strip_length, uint8_t r, uint8_t g, uint8_t b) {
    for (int i = 0; i < strip_length; i++) {
        strip.setPixelColor(i, r, g, b);
    }
    strip.show();
}

void set_brightness(Adafruit_NeoPixel strip, int brightness) {
    strip.setBrightness(brightness);
    strip.show();
}