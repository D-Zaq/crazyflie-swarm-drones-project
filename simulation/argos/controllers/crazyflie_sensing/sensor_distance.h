#ifndef SENSORDISTANCE_H
#define SENSORDISTANCE_H

#include <cstdint>

struct SensorDistance
{
public:
    std::uint16_t front, left, back, right, up;
};

#endif /* SENSORDISTANCE_H */
