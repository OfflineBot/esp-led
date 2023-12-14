#ifndef NEOPIXEL_HPP
#define NEOPIXEL_HPP

#include <Adafruit_NeoPixel.h>

void full_color(Adafruit_NeoPixel strip, uint8_t strip_length, uint8_t r, uint8_t g, uint8_t b);
void set_brightness(Adafruit_NeoPixel strip, int brightness);

#endif