#include "drone_data.h"
#include "Vec3.hpp"
#include "sensor_distance.h"
// #include <array>
// #include <cmath>
// #include <ctime>
// #include <iomanip>
// #include <iostream>
// #include <sstream>
// #include <utility>

DroneData::DroneData(std::string name)
    : flying_{false},
      id_("0"),
      name_(std::move(name)),
      speed_{0},
      battery_{100},
      pos_(0),
      yaw_(0),
      sensorDistance_(),
      state_("connected") {}

std::string DroneData::encode()
{
    std::string speed = std::to_string(speed_);
    std::string battery = std::to_string(battery_);
    std::string xPosition = std::to_string(pos_.x());
    std::string yPosition = std::to_string(pos_.y());
    std::string zPosition = std::to_string(pos_.z());
    std::string angle = std::to_string(yaw_);
    std::string frontDistance = std::to_string(sensorDistance_.front);
    std::string backDistance = std::to_string(sensorDistance_.back);
    std::string leftDistance = std::to_string(sensorDistance_.left);
    std::string rightDistance = std::to_string(sensorDistance_.right);

    std::string data = id_ + " " + name_ + " " + speed + " " + battery + " " + xPosition + " " + yPosition + " " + zPosition + " " + angle + " " + frontDistance + " " + backDistance + " " + leftDistance + " " + rightDistance + " " + state_;
    return data.append("\n");
}

void DroneData::update(std::float_t battery, const Vec4 &pos, const float_t &yaw, const SensorDistance &sensorDistance)
{
    battery_ = battery * 100;

    yaw_ = yaw;
    /* 10 is the tickrate in <framework> in config.xml */
    speed_ = Vec3::norm(Vec3::sub(pos, pos_)) / 10;
    pos_ = pos;
    sensorDistance_ = sensorDistance;
}
