#include "drone_data.hpp"
#include "Vec3.hpp"
#include <array>
#include <cmath>
#include <ctime>
#include <iomanip>
#include <iostream>
#include <sstream>
// #include <tao/json/pointer.hpp>
#include <utility>

// #include <tao/json.hpp>

DroneData::DroneData(std::string name)
    : flying_{false},
      name_("Drone_2"), speed_{0}, battery_{100}, pos_(0) {}

std::string DroneData::encode()
{

    // const tao::json::value pulse = {
    //     {"type", "pulse"},
    //     {"data",
    //      {{"timestamp", std::time(nullptr)},
    //       {"name", name_},
    //       {"flying", flying_},
    //       {"battery", battery_},
    //       {"speed", speed_},
    //       {"ledOn", false},
    //       {"real", false}}}};
    std::float_t battery = battery_;

    return std::to_string(battery).append("\n");
}

void DroneData::update(std::float_t battery, const Vec4 &pos)
{
    battery_ = battery * 100;

    if (!flying_)
    {
        return;
    }

    /* 10 is the tickrate in <framework> in config.xml */
    speed_ = Vec3::norm(Vec3::sub(pos, pos_)) / 10;
    pos_ = pos;
}

void DroneData::enable() { flying_ = true; }

void DroneData::disable() { flying_ = false; }

