
#include "Vec4.hpp"
#include "sensor_distance.h"
// #include <cmath>
// #include <string>

class DroneData
{
private:
    bool flying_;
    std::string id_;
    std::string name_;
    std::float_t speed_;
    std::float_t battery_;
    Vec4 pos_;
    float_t yaw_;
    SensorDistance sensorDistance_;
    std::string state_;

public:
    explicit DroneData(std::string name);

    std::string encode();

    const std::string &get_name() const { return name_; }

    void update(std::float_t battery, const Vec4 &pos, const float_t &yaw, const SensorDistance &sensorDistance);

    bool isFlying() const { return flying_; }

    void setPosition(Vec4 pos) { pos_ = pos; };

    void setBattery(std::float_t battery) { battery_ = battery; };

    void setState(std::string state) { state_ = state; };

    void setName(std::string name) { name_ = name; };

    void setId(std::string id) { id_ = id; };

    void enable();

    void disable();
};
